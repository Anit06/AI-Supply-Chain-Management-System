const test = require("node:test");
const assert = require("node:assert/strict");

const {
    convertQuantityToKg,
    calculateWarehouseUsagePercent,
    calculateInventoryValue,
    calculateWarehouseUsedStock,
} = require("../src/utils/dashboardMetrics");

test("converts supported units to kilograms", () => {
    assert.equal(convertQuantityToKg(1000, "G"), 1);
    assert.equal(convertQuantityToKg(2000, "ML"), 2);
    assert.equal(convertQuantityToKg(5, "KG"), 5);
    assert.equal(convertQuantityToKg(3, "L"), 3);
    assert.equal(convertQuantityToKg(7, "Pieces"), 7);
});

test("calculates inventory value from holding and warehouse stock at live product prices", () => {
    const products = [
        { _id: "p1", price: 30 },
        { _id: "p2", price: 50 },
    ];
    const holdings = [
        { productId: "p1", stock: 100 },
        { productId: "p2", stock: 20 },
    ];
    const inventory = [
        { product: "p1", stock: 40 },
        { product: "p1", stock: 60 },
        { product: "p2", stock: 10 },
    ];

    assert.equal(calculateInventoryValue(products, holdings, inventory), 6000 + 1500);
});

test("computes warehouse usage percentage from used and capacity", () => {
    assert.equal(calculateWarehouseUsagePercent(500, 250), 50);
    assert.equal(calculateWarehouseUsagePercent(450, 110), 24.444444444444443);
});

test("converts warehouse inventory into per-warehouse used stock using unit-aware totals", () => {
    const products = [
        { _id: "p1", unit: "KG" },
        { _id: "p2", unit: "G" },
        { _id: "p3", unit: "ML" },
    ];
    const warehouseInventory = [
        { productId: "p1", stock: 120 },
        { productId: "p2", stock: 2000 },
        { productId: "p3", stock: 5000 },
    ];

    assert.equal(calculateWarehouseUsedStock(warehouseInventory, products), 120 + 2 + 5);
});
