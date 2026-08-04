const ORDER_STATUS_TRANSITIONS = {
    Placed: ["Confirmed", "Cancelled"],
    Confirmed: ["Packed"],
    Packed: ["Shipped"],
    Shipped: ["Delivered"],
    Delivered: [],
    Cancelled: []
};

const getAllowedNextStatuses = (currentStatus) => {
    return ORDER_STATUS_TRANSITIONS[currentStatus] || [];
};

const calculateOrderWeight = (items = []) => {
    return items.reduce((total, item) => {
        const quantity = Number(item.quantity || 0);
        const unit = String(item.unit || "").toUpperCase();

        if (unit === "KG") {
            return total + quantity;
        }

        if (unit === "G") {
            return total + (quantity / 1000);
        }

        if (unit === "L" || unit === "ML") {
            return total + quantity;
        }

        return total;
    }, 0);
};

const validateOrderStatusTransition = ({ currentStatus, nextStatus, order = {}, supplierId = null }) => {
    if (!currentStatus || !nextStatus) {
        return {
            isValid: false,
            message: "Status update requires both the current and next status."
        };
    }

    if (currentStatus === nextStatus) {
        return {
            isValid: true,
            message: "Status unchanged."
        };
    }

    const allowedStatuses = getAllowedNextStatuses(currentStatus);

    if (!allowedStatuses.includes(nextStatus)) {
        return {
            isValid: false,
            message: `Invalid status transition from ${currentStatus} to ${nextStatus}.`
        };
    }

    if (nextStatus === "Shipped") {
        if (currentStatus !== "Packed") {
            return {
                isValid: false,
                message: "Only a Packed order can be shipped."
            };
        }

        const selectedSupplierId = supplierId || order.allocatedSupplier;

        if (!selectedSupplierId) {
            return {
                isValid: false,
                message: "Supplier allocation is required before shipping."
            };
        }

        if (order.allocatedSupplier && selectedSupplierId.toString() !== order.allocatedSupplier.toString()) {
            return {
                isValid: false,
                message: "Supplier is already allocated for this order."
            };
        }
    }

    return {
        isValid: true,
        message: "Status transition is valid."
    };
};

module.exports = {
    getAllowedNextStatuses,
    calculateOrderWeight,
    validateOrderStatusTransition
};
