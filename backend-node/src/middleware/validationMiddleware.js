const mongoose = require("mongoose");

const normalizeError = (field, message) => ({
  field,
  message,
});

const trimIfString = (value) => {
  if (typeof value === "string") {
    return value.trim();
  }

  return value;
};

const validateRequiredFields = (data = {}, requiredFields = []) => {
  const errors = [];

  requiredFields.forEach((field) => {
    const value = data?.[field];

    if (value === undefined || value === null || (typeof value === "string" && value.trim() === "")) {
      errors.push(normalizeError(field, `${field} is required`));
      return;
    }

    if (typeof value === "string") {
      data[field] = value.trim();
    }
  });

  return errors;
};

const validateObjectId = (value, field = "id") => {
  if (!value || !mongoose.Types.ObjectId.isValid(value)) {
    return [normalizeError(field, `${field} is invalid` )];
  }

  return [];
};

const validateRequestBody = (req, requiredFields = [], options = {}) => {
  const errors = [];

  if (!req || !req.body || typeof req.body !== "object") {
    return errors;
  }

  if (req.is && req.is("multipart/form-data")) {
    return errors;
  }

  const body = req.body || {};
  const trimmedFields = options.trimFields || [];

  requiredFields.forEach((field) => {
    const value = body[field];

    if (value === undefined || value === null || (typeof value === "string" && value.trim() === "")) {
      errors.push(normalizeError(field, `${field} is required`));
      return;
    }

    if (trimmedFields.includes(field) && typeof value === "string") {
      body[field] = value.trim();
    }
  });

  return errors;
};

const validateEmail = (value, field = "email") => {
  if (value === undefined || value === null || value === "") {
    return [];
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value))) {
    return [normalizeError(field, `${field} is invalid` )];
  }

  return [];
};

const validatePhone = (value, field = "phone") => {
  if (value === undefined || value === null || value === "") {
    return [];
  }

  const cleanValue = String(value).trim();

  if (!/^[0-9+()\-\s]{7,15}$/.test(cleanValue)) {
    return [normalizeError(field, `${field} is invalid` )];
  }

  return [];
};

const validatePositiveNumber = (value, field = "value") => {
  if (value === undefined || value === null || value === "") {
    return [];
  }

  const numericValue = Number(value);

  if (!Number.isFinite(numericValue) || numericValue <= 0) {
    return [normalizeError(field, `${field} must be a positive number` )];
  }

  return [];
};

const validatePrice = (value, field = "price") => {
  const numericValue = Number(value);

  if (value === undefined || value === null || value === "") {
    return [];
  }

  if (!Number.isFinite(numericValue) || numericValue <= 0) {
    return [normalizeError(field, `${field} must be greater than 0` )];
  }

  return [];
};

const validateQuantity = (value, field = "quantity") => {
  if (value === undefined || value === null || value === "") {
    return [];
  }

  const numericValue = Number(value);

  if (!Number.isInteger(numericValue) || numericValue <= 0) {
    return [normalizeError(field, `${field} must be a positive integer` )];
  }

  return [];
};

const validateStock = (value, field = "stock") => {
  if (value === undefined || value === null || value === "") {
    return [];
  }

  const numericValue = Number(value);

  if (!Number.isFinite(numericValue) || numericValue < 0) {
    return [normalizeError(field, `${field} cannot be negative` )];
  }

  return [];
};

const validateOrderStatus = (value, field = "status") => {
  if (value === undefined || value === null || value === "") {
    return [];
  }

  const allowed = ["Pending", "Confirmed", "Processing", "Shipped", "Delivered", "Cancelled", "Rejected"];

  if (!allowed.includes(String(value).trim())) {
    return [normalizeError(field, `${field} is invalid` )];
  }

  return [];
};

const validatePaymentMethod = (value, field = "paymentMethod") => {
  if (value === undefined || value === null || value === "") {
    return [];
  }

  const allowed = ["COD", "UPI", "Card", "Net Banking", "Wallet"];

  if (!allowed.includes(String(value).trim())) {
    return [normalizeError(field, `${field} is invalid` )];
  }

  return [];
};

const validateWarehouseCapacity = (value, field = "capacity") => {
  if (value === undefined || value === null || value === "") {
    return [];
  }

  const numericValue = Number(value);

  if (!Number.isFinite(numericValue) || numericValue <= 0) {
    return [normalizeError(field, `${field} must be greater than 0` )];
  }

  return [];
};

const validateSupplierCapacity = (value, field = "supplierCapacity") => {
  if (value === undefined || value === null || value === "") {
    return [];
  }

  const numericValue = Number(value);

  if (!Number.isFinite(numericValue) || numericValue <= 0) {
    return [normalizeError(field, `${field} must be greater than 0` )];
  }

  return [];
};

module.exports = {
  normalizeError,
  trimIfString,
  validateRequiredFields,
  validateRequestBody,
  validateObjectId,
  validateEmail,
  validatePhone,
  validatePositiveNumber,
  validatePrice,
  validateQuantity,
  validateStock,
  validateOrderStatus,
  validatePaymentMethod,
  validateWarehouseCapacity,
  validateSupplierCapacity,
};
