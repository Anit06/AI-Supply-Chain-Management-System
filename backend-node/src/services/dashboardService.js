const Product = require("../models/Product");
const Inventory = require("../models/Inventory");
const Warehouse = require("../models/Warehouse");
const ProductPrice = require("../models/ProductPrice");
const ProductHolding = require("../models/ProductHolding");
const {
    calculateInventoryValue,
    calculateWarehouseUsedStock,
    calculateWarehouseUsagePercent,
} = require("../utils/dashboardMetrics");

const getAdminDashboardMetrics = async () => {
    const [products, warehouseData, productPrices, productHoldings, inventoryDocs] = await Promise.all([
        Product.find().lean(),
        Warehouse.find().lean(),
        ProductPrice.find().lean(),
        ProductHolding.find().lean(),
        Inventory.find().lean(),
    ]);

    const productMap = new Map((products || []).map((product) => [String(product._id), product]));

    (productPrices || []).forEach((priceDoc) => {
        const product = productMap.get(String(priceDoc.productId));
        if (product) {
            product.price = Number(priceDoc.price ?? product.price ?? 0);
        }
    });

    (productHoldings || []).forEach((holdingDoc) => {
        const product = productMap.get(String(holdingDoc.productId));
        if (product) {
            product.stock = Number(holdingDoc.stock ?? holdingDoc.quantity ?? product.stock ?? 0);
            product.unit = holdingDoc.unit || product.unit || "KG";
        }
    });

    const totalInventoryValue = calculateInventoryValue(products, productHoldings, inventoryDocs);
    const totalStock = (products || []).reduce((sum, product) => {
        return sum + Number(product.stock ?? product.quantity ?? 0);
    }, 0) + (inventoryDocs || []).reduce((sum, item) => sum + Number(item.stock || 0), 0);

    const warehouseSummary = (warehouseData || []).map((warehouse) => {
        const warehouseInventory = (inventoryDocs || []).filter(
            (item) => String(item.warehouse) === String(warehouse._id)
        );

        const usedStock = calculateWarehouseUsedStock(warehouseInventory, products);
        const capacity = Number(warehouse.capacity || 0);
        const utilization = calculateWarehouseUsagePercent(capacity, usedStock);

        return {
            ...warehouse,
            totalStock: usedStock,
            utilization: Number.isFinite(utilization) ? Number(utilization.toFixed(2)) : 0,
        };
    });

    return {
        inventoryValue: Number(totalInventoryValue || 0),
        totalStock: Number(totalStock || 0),
        warehouseSummary,
        priceDocs: productPrices,
        holdingDocs: productHoldings,
    };
};

module.exports = {
    getAdminDashboardMetrics,
};
