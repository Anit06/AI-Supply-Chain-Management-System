const test = require('node:test');
const assert = require('node:assert/strict');

const {
  getAllowedNextStatuses,
  validateOrderStatusTransition,
  calculateOrderWeight
} = require('../src/services/orderWorkflowService');

test('allows only the configured next statuses for each state', () => {
  assert.deepEqual(getAllowedNextStatuses('Placed'), ['Confirmed', 'Cancelled']);
  assert.deepEqual(getAllowedNextStatuses('Confirmed'), ['Packed']);
  assert.deepEqual(getAllowedNextStatuses('Packed'), ['Shipped']);
  assert.deepEqual(getAllowedNextStatuses('Shipped'), ['Delivered']);
  assert.deepEqual(getAllowedNextStatuses('Delivered'), []);
  assert.deepEqual(getAllowedNextStatuses('Cancelled'), []);
});

test('rejects shipping without supplier allocation', () => {
  const result = validateOrderStatusTransition({
    currentStatus: 'Packed',
    nextStatus: 'Shipped',
    order: { allocatedSupplier: null, assignedWeight: 0 }
  });

  assert.equal(result.isValid, false);
  assert.match(result.message, /supplier/i);
});

test('calculates order weight from item quantities and units', () => {
  const weight = calculateOrderWeight([
    { quantity: 20, unit: 'KG' },
    { quantity: 10, unit: 'KG' },
    { quantity: 500, unit: 'G' }
  ]);

  assert.equal(weight, 30.5);
});
