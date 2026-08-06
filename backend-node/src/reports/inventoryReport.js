const PDFDocument = require("pdfkit");
const ExcelJS = require("exceljs");

//GENERATE INVENTORY PDF

exports.generateInventoryPDF = (
    res,
    inventory,
    summary,
    warehouseCapacity
) => {

    const PDFDocument = require("pdfkit");

    const doc = new PDFDocument({
        margin: 40,
        size: "A4"
    });

    res.setHeader(
        "Content-Type",
        "application/pdf"
    );

    res.setHeader(
        "Content-Disposition",
        "attachment; filename=WarehouseInventoryReport.pdf"
    );

    doc.pipe(res);

    // TITLE
    doc
        .fontSize(22)
        .fillColor("#1e40af")
        .text("Warehouse Inventory Report", {
            align: "center"
        });

    doc.moveDown();

    doc
        .fontSize(10)
        .fillColor("black")
        .text(`Generated : ${new Date().toLocaleString()}`);

    doc.moveDown();
    // SUMMARY

    doc
        .fontSize(16)
        .fillColor("#2563eb")
        .text("Summary");

    doc.moveDown(0.5);

    doc.fontSize(11);

    doc.text(`Total Products : ${summary.totalProducts}`);
    doc.text(`Total Warehouses : ${summary.totalWarehouses}`);
    doc.text(`Total Stock : ${summary.totalStock}`);
    doc.text(`Warehouse Capacity : ${summary.usedCapacity} / ${summary.totalCapacity}`);
    doc.text(`Capacity Utilization : ${summary.capacityPercentage}%`);
    doc.text(`Low Stock Products : ${summary.lowStock}`);

    doc.moveDown(1);


    // WAREHOUSE SECTIONS
    warehouseCapacity.forEach((warehouse) => {

        const products = inventory.filter(

            item => item.warehouseId === warehouse.warehouseId

        );

        doc
            .fontSize(15)
            .fillColor("#1d4ed8")
            .text(`Warehouse : ${warehouse.warehouseName}`);

        doc
            .fontSize(11)
            .fillColor("black");

        doc.text(`Capacity : ${warehouse.currentStock} / ${warehouse.capacity}`);

        doc.text(`Available Capacity : ${warehouse.availableCapacity}`);

        doc.text(`Utilization : ${warehouse.percentage}%`);

        doc.moveDown(0.5);

        // TABLE HEADER

        doc.font("Helvetica-Bold");

        doc.text("Product", 50);

        doc.text("Category", 240);

        doc.text("Stock", 410);

        doc.text("Status", 470);

        doc.moveDown(0.3);

        doc.font("Helvetica");

        products.forEach(product => {

            let status = "In Stock";

            if (product.stock <= 20) {

                status = "Low Stock";

            }

            doc.text(product.productName, 50);

            doc.text(product.category, 240);

            doc.text(String(product.stock), 410);

            doc.text(status, 470);

            doc.moveDown(0.2);

        });

        doc.moveDown();

        doc
            .strokeColor("#d1d5db")
            .moveTo(40, doc.y)
            .lineTo(550, doc.y)
            .stroke();

        doc.moveDown();

    });

    doc.end();

};

//GENERATE INVENTORY EXCEL

exports.generateInventoryExcel = async (
    res,
    inventory,
    warehouseCapacity
) => {

    const workbook = new ExcelJS.Workbook();

    workbook.creator = "AI Supply Chain Management System";
    workbook.created = new Date();

    const worksheet = workbook.addWorksheet(
        "Warehouse Inventory Report"
    );


    //TITLE



    worksheet.mergeCells("A1:H1");

    worksheet.getCell("A1").value =
        "Warehouse Inventory Report";

    worksheet.getCell("A1").font = {
        bold: true,
        size: 18
    };

    worksheet.getCell("A1").alignment = {
        horizontal: "center"
    };

    //HEADERS
    worksheet.columns = [

        {
            header: "Warehouse",
            key: "warehouse",
            width: 25
        },

        {
            header: "Capacity",
            key: "capacity",
            width: 15
        },

        {
            header: "Used",
            key: "used",
            width: 15
        },

        {
            header: "Available",
            key: "available",
            width: 15
        },

        {
            header: "Utilization %",
            key: "percentage",
            width: 18
        },

        {
            header: "Product",
            key: "product",
            width: 28
        },

        {
            header: "Category",
            key: "category",
            width: 20
        },

        {
            header: "Stock",
            key: "stock",
            width: 12
        }

    ];


    // HEADER STYLE

    const headerRow = worksheet.getRow(2);

    headerRow.values = [

        "Warehouse",

        "Capacity",

        "Used",

        "Available",

        "Utilization %",

        "Product",

        "Category",

        "Stock"

    ];

    headerRow.font = {

        bold: true

    };

    headerRow.alignment = {

        horizontal: "center"

    };

    //DATA

    warehouseCapacity.forEach((warehouse) => {

        const warehouseProducts = inventory.filter(

            item =>

                item.warehouseId ===

                warehouse.warehouseId

        );

        warehouseProducts.forEach(product => {

            worksheet.addRow({

                warehouse:

                    warehouse.warehouseName,

                capacity:

                    warehouse.capacity,

                used:

                    warehouse.currentStock,

                available:

                    warehouse.availableCapacity,

                percentage:

                    warehouse.percentage + "%",

                product:

                    product.productName,

                category:

                    product.category,

                stock:

                    product.stock

            });

        });

    });

    //CENTER ALIGNMENT
    worksheet.eachRow((row) => {

        row.eachCell((cell) => {

            cell.alignment = {

                vertical: "middle",

                horizontal: "center"

            };

        });

    });

    // LOW STOCK COLOR


    worksheet.eachRow((row, rowNumber) => {

        if (rowNumber <= 2) return;

        const stock = row.getCell(8).value;

        if (stock <= 20) {

            row.getCell(8).font = {

                color: {

                    argb: "FF0000"

                },

                bold: true

            };

        }

    });


    //DOWNLOAD

    res.setHeader(

        "Content-Type",

        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

    );

    res.setHeader(

        "Content-Disposition",

        "attachment; filename=WarehouseInventoryReport.xlsx"

    );

    await workbook.xlsx.write(res);

    res.end();

};