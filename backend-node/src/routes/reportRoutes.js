const express = require("express");
const router = express.Router();

const reportController = require("../controllers/reportController");

/*
====================================
WAREHOUSE REPORTS
====================================
*/

// Inventory Report
router.get(
    "/inventory",
    reportController.getInventoryReport
);

// Summary Cards
router.get(
    "/summary",
    reportController.getSummaryReport
);

// Low Stock Products
router.get(
    "/low-stock",
    reportController.getLowStockReport
);

/*
====================================
EXPORT REPORTS
====================================
*/

// Generate PDF
router.get(
    "/inventory/pdf",
    reportController.exportInventoryPDF
);

// Export Excel
router.get(
    "/inventory/excel",
    reportController.exportInventoryExcel
);

module.exports = router;