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

const calculateWarehouseUsagePercent = (capacity, used) => {
    const normalizedCapacity = Number(capacity || 0);
    const normalizedUsed = Number(used || 0);

    if (!normalizedCapacity) {
        return 0;
    }

    return (normalizedUsed / normalizedCapacity) * 100;
};

module.exports = {
    convertQuantityToKg,
    calculateWarehouseUsagePercent,
};
