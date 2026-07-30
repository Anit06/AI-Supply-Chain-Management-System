const Order = require("../models/Order");
const Inventory = require("../models/Inventory");

const BUSINESS_TIME_ZONE = process.env.BUSINESS_TIME_ZONE || "Asia/Kolkata";

const businessMonthBounds = () => {
    const now = new Date();
    const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: BUSINESS_TIME_ZONE,
        year: "numeric",
        month: "numeric"
    }).formatToParts(now);
    const part = type => Number(parts.find(item => item.type === type).value);
    const year = part("year");
    const month = part("month");

    const toUtcBoundary = (boundaryYear, boundaryMonth) => {
        const approximateUtc = Date.UTC(boundaryYear, boundaryMonth - 1, 1);
        const offsetName = new Intl.DateTimeFormat("en-US", {
            timeZone: BUSINESS_TIME_ZONE,
            timeZoneName: "longOffset"
        }).formatToParts(new Date(approximateUtc))
            .find(item => item.type === "timeZoneName").value;
        const offset = offsetName.match(/^GMT([+-])(\d{2}):(\d{2})$/);
        if (!offset) {
            throw new Error(`Cannot determine UTC offset for ${BUSINESS_TIME_ZONE}.`);
        }
        const milliseconds = (Number(offset[2]) * 60 + Number(offset[3])) * 60 * 1000;
        return new Date(approximateUtc - (offset[1] === "+" ? milliseconds : -milliseconds));
    };

    const nextYear = month === 12 ? year + 1 : year;
    const nextMonth = month === 12 ? 1 : month + 1;
    return {
        startDate: toUtcBoundary(year, month),
        endDate: toUtcBoundary(nextYear, nextMonth)
    };
};

const getCurrentMonthDemand = async () => {
    const { startDate, endDate } = businessMonthBounds();

    const orders = await Order.find({
        createdAt: { $gte: startDate, $lt: endDate },
        status: { $ne: "Cancelled" }
    }).populate("warehouseId", "name");

    console.info(
        `Current-demand order window (${BUSINESS_TIME_ZONE}): ` +
        `${startDate.toISOString()} to ${endDate.toISOString()}. Orders: ${orders.length}.`
    );

    const result = {};

    for (const order of orders) {
        const warehouseName = order.warehouseId?.name;
        if (!warehouseName) continue;

        for (const item of order.items || []) {
            if (!item.productName) continue;

            // A structured key prevents two different warehouse/product
            // combinations from colliding when either name contains "_".
            const key = JSON.stringify([warehouseName, item.productName]);
            if (!result[key]) {
                result[key] = {
                    warehouseName,
                    productName: item.productName,
                    category: item.category || "General",
                    currentMonthDemand: 0
                };
            }
            result[key].currentMonthDemand += (item.quantity || 0);
        }
    }

    return Object.values(result);
};

const getWarehouseProducts = async () => {
    const inventories = await Inventory.find({})
        // Inventory documents are shared with the Spring service. Their
        // persisted fields are `warehouse` and `product`, while Product uses
        // `name`; the previous names made this result always empty.
        .populate("warehouse", "name")
        .populate("product", "name category")
        .lean();

    const products = inventories
        .filter(item => item.warehouse?.name && item.product?.name)
        .map(item => ({
            warehouseName: item.warehouse.name,
            productName: item.product.name,
            category: item.product.category || "General"
        }));

    // Do not create duplicate predictions when legacy inventory data contains
    // more than one row for the same warehouse/product pair.
    return Array.from(new Map(products.map(item => [
        `${item.warehouseName}\u0000${item.productName}`,
        item
    ])).values());
};

module.exports = {
    getCurrentMonthDemand,
    getWarehouseProducts,
    businessMonthBounds
};
