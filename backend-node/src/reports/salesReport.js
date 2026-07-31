const PDFDocument = require("pdfkit");
const ExcelJS = require("exceljs");

/*
====================================
GENERATE MONTHLY SALES PDF
====================================
*/

exports.generateMonthlySalesPDF = (res, report) => {
  const doc = new PDFDocument({
    margin: 40,
    size: "A4",
  });

  res.setHeader("Content-Type", "application/pdf");

  res.setHeader(
    "Content-Disposition",
    "attachment; filename=MonthlySalesReport.pdf",
  );

  doc.pipe(res);

  // TITLE

  doc.fontSize(22).fillColor("#1e40af").text("Monthly Sales Report", {
    align: "center",
  });

  doc.moveDown();

  doc
    .fontSize(10)
    .fillColor("black")
    .text(`Generated : ${new Date().toLocaleString()}`);

  doc.text(`Warehouse : ${report.warehouseName}`);

  doc.text(`Month : ${report.month}`);

  doc.text(`Year : ${report.year}`);

  doc.moveDown();

  doc.fontSize(16).fillColor("#2563eb").text("Sales Summary");

  doc.moveDown(0.5);

  doc.fontSize(11).fillColor("black");

  doc.text(`Products Sold : ${report.products.length}`);

  doc.text(`Total Revenue : ₹${report.grandTotalRevenue}`);

  doc.moveDown();

  // TABLE HEADER

  doc.font("Helvetica-Bold");

  doc.text("Product", 50);

  doc.text("Unit", 220);

  doc.text("Quantity", 300);

  doc.text("Revenue", 430);

  doc.moveDown(0.3);

  doc.font("Helvetica");

  report.products.forEach((product) => {
    doc.text(product.productName, 50);

    doc.text(product.unit, 220);

    doc.text(String(product.quantitySold), 300);

    doc.text(`₹${product.revenue}`, 430);

    doc.moveDown(0.2);
  });

  doc.end();
};

exports.generateMonthlySalesExcel = async (res, report) => {
  const workbook = new ExcelJS.Workbook();

  workbook.creator = "AI Supply Chain Management System";
  workbook.created = new Date();

  const worksheet = workbook.addWorksheet("Monthly Sales Report");

  // Title
  worksheet.mergeCells("A1:D1");

  worksheet.getCell("A1").value = "Monthly Sales Report";

  worksheet.getCell("A1").font = {
    bold: true,
    size: 18,
  };

  worksheet.getCell("A1").alignment = {
    horizontal: "center",
  };

  // Report Info
  worksheet.getCell("A3").value = "Warehouse";
  worksheet.getCell("B3").value = report.warehouseName;

  worksheet.getCell("A4").value = "Month";
  worksheet.getCell("B4").value = report.month;

  worksheet.getCell("A5").value = "Year";
  worksheet.getCell("B5").value = report.year;

  worksheet.getCell("A6").value = "Total Revenue";
  worksheet.getCell("B6").value = report.grandTotalRevenue;

  // Header
  worksheet.columns = [
    { header: "Product", key: "product", width: 30 },
    { header: "Unit", key: "unit", width: 15 },
    { header: "Quantity Sold", key: "quantity", width: 20 },
    { header: "Revenue", key: "revenue", width: 20 },
  ];

  const headerRow = worksheet.getRow(8);

  headerRow.values = ["Product", "Unit", "Quantity Sold", "Revenue"];

  headerRow.font = {
    bold: true,
  };

  headerRow.alignment = {
    horizontal: "center",
  };

  report.products.forEach((product) => {
    worksheet.addRow({
      product: product.productName,
      unit: product.unit,
      quantity: product.quantitySold,
      revenue: product.revenue,
    });
  });

  worksheet.eachRow((row) => {
    row.eachCell((cell) => {
      cell.alignment = {
        horizontal: "center",
        vertical: "middle",
      };
    });
  });

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  );

  res.setHeader(
    "Content-Disposition",
    "attachment; filename=MonthlySalesReport.xlsx",
  );

  await workbook.xlsx.write(res);

  res.end();
};

/*
====================================
GENERATE YEARLY SALES PDF
====================================
*/

exports.generateYearlySalesPDF = (res, report) => {
  const doc = new PDFDocument({
    margin: 40,
    size: "A4",
  });

  res.setHeader("Content-Type", "application/pdf");

  res.setHeader(
    "Content-Disposition",
    "attachment; filename=YearlySalesReport.pdf",
  );

  doc.pipe(res);

  // TITLE
  doc.fontSize(22).fillColor("#1e40af").text("Yearly Sales Report", {
    align: "center",
  });

  doc.moveDown();

  doc
    .fontSize(10)
    .fillColor("black")
    .text(`Generated : ${new Date().toLocaleString()}`);

  doc.text(`Warehouse : ${report.warehouseName}`);
  doc.text(`Year : ${report.year}`);

  doc.moveDown();

  doc.fontSize(16).fillColor("#2563eb").text("Sales Summary");

  doc.moveDown(0.5);

  doc.fontSize(11);

  doc.text(`Products Sold : ${report.products.length}`);
  doc.text(`Total Revenue : ${report.grandTotalRevenue}`);

  doc.moveDown();

  // Table Header
  doc.font("Helvetica-Bold");

  doc.text("Product", 50);
  doc.text("Unit", 220);
  doc.text("Quantity", 300);
  doc.text("Revenue", 430);

  doc.moveDown(0.3);

  doc.font("Helvetica");

  report.products.forEach((product) => {
    doc.text(product.productName, 50);

    doc.text(product.unit, 220);

    doc.text(String(product.quantitySold), 300);

    doc.text(`${product.revenue}`, 430);

    doc.moveDown(0.2);
  });

  doc.end();
};

//yearly excel report
exports.generateYearlySalesExcel = async (res, report) => {
  const workbook = new ExcelJS.Workbook();

  workbook.creator = "AI Supply Chain Management System";
  workbook.created = new Date();

  const worksheet = workbook.addWorksheet("Yearly Sales Report");

  // Title
  worksheet.mergeCells("A1:D1");

  worksheet.getCell("A1").value = "Yearly Sales Report";

  worksheet.getCell("A1").font = {
    bold: true,
    size: 18,
  };

  worksheet.getCell("A1").alignment = {
    horizontal: "center",
  };

  // Report Info
  worksheet.getCell("A3").value = "Warehouse";
  worksheet.getCell("B3").value = report.warehouseName;

  worksheet.getCell("A4").value = "Year";
  worksheet.getCell("B4").value = report.year;

  worksheet.getCell("A5").value = "Total Revenue";
  worksheet.getCell("B5").value = report.grandTotalRevenue;
  worksheet.getCell("B5").numFmt = "₹#,##0.00";

  // Header
  worksheet.columns = [
    { header: "Product", key: "product", width: 30 },
    { header: "Unit", key: "unit", width: 15 },
    { header: "Quantity Sold", key: "quantity", width: 20 },
    { header: "Revenue", key: "revenue", width: 20 },
  ];

  const headerRow = worksheet.getRow(8);

  headerRow.values = ["Product", "Unit", "Quantity Sold", "Revenue"];

  headerRow.font = {
    bold: true,
  };

  headerRow.alignment = {
    horizontal: "center",
  };

  report.products.forEach((product) => {
    worksheet.addRow({
      product: product.productName,
      unit: product.unit,
      quantity: product.quantitySold,
      revenue: product.revenue,
    });
  });

  worksheet.eachRow((row) => {
    row.eachCell((cell) => {
      cell.alignment = {
        horizontal: "center",
        vertical: "middle",
      };
    });
  });

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  );

  res.setHeader(
    "Content-Disposition",
    "attachment; filename=YearlySalesReport.xlsx",
  );

  await workbook.xlsx.write(res);

  res.end();
};
