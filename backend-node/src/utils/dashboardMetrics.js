const normalizeUnit = (value = "") => String(value || "").trim().toUpperCase();

const convertQuantityToKg = (quantity, unit) => {
    const amount = Number(quantity || 0);
    const normalizedUnit = normalizeUnit(unit);

    if (!Number.isFinite(amount)) {
        return 0;
    }

    if (normalizedUnit === "G" || normalizedUnit === "GRAM") {
        return amount / 1000;
    }

    if (normalizedUnit === "ML" || normalizedUnit === "LITER" || normalizedUnit === "LITRE") {
        return amount / 1000;
    }

    if (normalizedUnit === "L") {
        return amount;
    }

    if (normalizedUnit === "KG" || normalizedUnit === "KILOGRAM") {
        return amount;
    }

    return amount;
};

const calculateWarehouseUsedStock = (warehouseInventory = [], products = []) => {
    const productMap = new Map((products || []).map((product) => [String(product._id || product.id), product]));

    return (warehouseInventory || []).reduce((sum, item) => {
        const product = productMap.get(String(item.productId || item.product || ""));
        const stock = Number(item.stock || 0);
        const unit = product?.unit || item.unit || "KG";
        return sum + convertQuantityToKg(stock, unit);
    }, 0);
};

const calculateInventoryValue = (products = [], holdings = [], inventory = []) => {
    const productMap = new Map((products || []).map((product) => [String(product._id || product.id), product]));

    const holdingValue = (holdings || []).reduce((sum, holding) => {
        const product = productMap.get(String(holding.productId || holding.product || ""));
        const price = Number(product?.price || holding.price || 0);
        const stock = Number(holding.stock ?? holding.quantity ?? 0);
        return sum + stock * price;
    }, 0);

    const warehouseInventoryValue = (inventory || []).reduce((sum, item) => {
        const product = productMap.get(String(item.product || item.productId || ""));
        const price = Number(product?.price || 0);
        const stock = Number(item.stock || 0);
        return sum + stock * price;
    }, 0);

    return holdingValue + warehouseInventoryValue;
};

const calculateWarehouseUsagePercent = (capacity, used) => {
    const normalizedCapacity = Number(capacity || 0);
    const normalizedUsed = Number(used || 0);

    if (!normalizedCapacity) {
        return 0;
    }

    return (normalizedUsed / normalizedCapacity) * 100;
};

module.exports = {
    normalizeUnit,
    convertQuantityToKg,
    calculateWarehouseUsedStock,
    calculateInventoryValue,
    calculateWarehouseUsagePercent,
};
