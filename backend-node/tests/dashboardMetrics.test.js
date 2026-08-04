const test = require("node:test");
const assert = require("node:assert/strict");

const {
    convertQuantityToKg,
    calculateWarehouseUsagePercent,
} = require("../src/utils/dashboardMetrics");

test("converts supported units to kilograms", () => {
    assert.equal(convertQuantityToKg(1000, "G"), 1);
    assert.equal(convertQuantityToKg(2000, "ML"), 2);
    assert.equal(convertQuantityToKg(5, "KG"), 5);
    assert.equal(convertQuantityToKg(3, "L"), 3);
    assert.equal(convertQuantityToKg(7, "Pieces"), 7);
});

test("computes warehouse usage percentage from used and capacity", () => {
    assert.equal(calculateWarehouseUsagePercent(500, 250), 50);
    assert.equal(calculateWarehouseUsagePercent(450, 110), 24.444444444444443);
});
