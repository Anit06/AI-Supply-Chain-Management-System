const test = require('node:test');
const assert = require('node:assert/strict');

const { validateCartItemQuantity, calculateCartTotals } = require('../src/services/cartService');

test('rejects quantities below one', () => {
    const result = validateCartItemQuantity(0, 10);
    assert.equal(result.valid, false);
    assert.match(result.message, /at least 1/i);
});

test('rejects quantities above stock', () => {
    const result = validateCartItemQuantity(11, 10);
    assert.equal(result.valid, false);
    assert.match(result.message, /available/i);
});

test('calculates totals from cart items', () => {
    const items = [
        { price: 40, quantity: 2 },
        { price: 20, quantity: 1 }
    ];

    const result = calculateCartTotals(items);
    assert.equal(result.cartTotal, 100);
});
