const reportService = require("../services/reportService");
const inventoryReport = require("../reports/inventoryReport");

/*
====================================
Inventory Report
====================================
*/

exports.getInventoryReport = async (req, res) => {
  try {
    const inventory = await reportService.getInventoryReport();

    res.status(200).json({
      success: true,

      totalProducts: inventory.length,

      inventory,
    });
  } catch (error) {
    console.error("Inventory Report Error:", error);

    res.status(500).json({
      success: false,

      message: "Failed to fetch inventory report",
    });
  }
};

/*
====================================
Summary Report
====================================
*/

exports.getSummaryReport = async (req, res) => {
  try {
    const summary = await reportService.getSummaryReport();

    res.status(200).json({
      success: true,

      summary,
    });
  } catch (error) {
    console.error("Summary Report Error:", error);

    res.status(500).json({
      success: false,

      message: "Failed to fetch summary report",
    });
  }
};

/*
====================================
Low Stock Report
====================================
*/

exports.getLowStockReport = async (req, res) => {
  try {
    const products = await reportService.getLowStockReport();

    res.status(200).json({
      success: true,

      totalLowStockProducts: products.length,

      products,
    });
  } catch (error) {
    console.error("Low Stock Report Error:", error);

    res.status(500).json({
      success: false,

      message: "Failed to fetch low stock report",
    });
  }
};

/*
====================================
EXPORT PDF
====================================
*/

exports.exportInventoryPDF = async (req, res) => {
  try {
    const inventory = await reportService.getInventoryReport();

    const summary = await reportService.getSummaryReport();

    const warehouseCapacity = await reportService.getWarehouseCapacityReport();

    inventoryReport.generateInventoryPDF(
      res,

      inventory,

      summary,
      warehouseCapacity,
    );
  } catch (error) {
    console.error("PDF Export Error:", error);

    res.status(500).json({
      success: false,

      message: "Failed to export PDF",
    });
  }
};

/*
====================================
EXPORT EXCEL
====================================
*/

exports.exportInventoryExcel = async (req, res) => {
  try {
    const inventory = await reportService.getInventoryReport();

    const warehouseCapacity = await reportService.getWarehouseCapacityReport();

    await inventoryReport.generateInventoryExcel(
      res,

      inventory,
      warehouseCapacity,
    );
  } catch (error) {
    console.error("Excel Export Error:", error);

    res.status(500).json({
      success: false,

      message: "Failed to export Excel",
    });
  }
};
