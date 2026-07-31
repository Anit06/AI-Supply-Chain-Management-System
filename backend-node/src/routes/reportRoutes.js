const express = require("express");
const router = express.Router();

const reportController = require("../controllers/reportController");

//WAREHOUSE REPORTS

// Inventory Report
router.get("/inventory", reportController.getInventoryReport);

// Summary Cards
router.get("/summary", reportController.getSummaryReport);

// Low Stock Products
router.get("/low-stock", reportController.getLowStockReport);

//EXPORT REPORTS

// Generate PDF
router.get("/inventory/pdf", reportController.exportInventoryPDF);

// Export Excel
router.get("/inventory/excel", reportController.exportInventoryExcel);

/*
====================================
SALES REPORTS
====================================
*/

// Monthly Sales Report (JSON)
router.get("/sales/monthly", reportController.getMonthlySalesReport);

// Export Monthly Sales PDF
router.get("/sales/monthly/pdf", reportController.exportMonthlySalesPDF);

//Export Monthly Sales Excel
router.get("/sales/monthly/excel", reportController.exportMonthlySalesExcel);

// Export Yearly Sales Report (JSON)
router.get(
    "/sales/yearly",
    reportController.getYearlySalesReport
);

// Export Yearly Sales PDF
router.get(
    "/sales/yearly/pdf",
    reportController.exportYearlySalesPDF
);
// Export Yearly Sales Excel
router.get(
    "/sales/yearly/excel",
    reportController.exportYearlySalesExcel
);

module.exports = router;
