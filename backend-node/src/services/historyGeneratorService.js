const Order = require("../models/Order");

const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const path = require("path");

const generateMonthlyHistory = async () => {

    const orders = await Order.find({

        status: {

            $ne: "Cancelled"

        }

    }).populate("warehouseId", "name");

    const monthlyMap = {};

    for (const order of orders) {

        const date = new Date(order.createdAt);

        const year = date.getFullYear();

        const month = date.getMonth() + 1;

        for (const item of order.items) {

            const warehouse = order.warehouseId?.name || "";

            const key =

                warehouse + "_" +

                item.productName + "_" +

                year + "_" +

                month;

            if (!monthlyMap[key]) {

                monthlyMap[key] = {

                    warehouseName: warehouse,

                    productName: item.productName,

                    category: item.category,

                    year,

                    month,

                    monthlyDemand: 0

                };

            }

            monthlyMap[key].monthlyDemand += item.quantity;

        }

    }

    const rows = Object.values(monthlyMap);

    const monthNames = [

        "January",

        "February",

        "March",

        "April",

        "May",

        "June",

        "July",

        "August",

        "September",

        "October",

        "November",

        "December"

    ];

    const seasonMap = {

        12: "Winter",

        1: "Winter",

        2: "Winter",

        3: "Summer",

        4: "Summer",

        5: "Summer",

        6: "Summer",

        7: "Monsoon",

        8: "Monsoon",

        9: "Monsoon",

        10: "Autumn",

        11: "Autumn"

    };

    const csvData = rows.map(r => ({

        warehouseName: r.warehouseName,

        productName: r.productName,

        category: r.category,

        year: r.year,

        month: r.month,

        monthName: monthNames[r.month - 1],

        season: seasonMap[r.month],

        monthlyDemand: r.monthlyDemand

    }));

    csvData.sort((a, b) => {

        if (a.warehouseName !== b.warehouseName)

            return a.warehouseName.localeCompare(b.warehouseName);

        if (a.productName !== b.productName)

            return a.productName.localeCompare(b.productName);

        if (a.year !== b.year)

            return a.year - b.year;

        return a.month - b.month;

    });

    const csvWriter = createCsvWriter({

        path: path.join(

            __dirname,

            "../../../python-ai-service/data/monthly_sales_history.csv"

        ),

        header: [

            { id: "warehouseName", title: "warehouseName" },

            { id: "productName", title: "productName" },

            { id: "category", title: "category" },

            { id: "year", title: "year" },

            { id: "month", title: "month" },

            { id: "monthName", title: "monthName" },

            { id: "season", title: "season" },

            { id: "monthlyDemand", title: "monthlyDemand" }

        ]

    });

    await csvWriter.writeRecords(csvData);

    return {

        success: true,

        rows: csvData.length,

        file:

            "python-ai-service/data/monthly_sales_history.csv"

    };

};

module.exports = {

    generateMonthlyHistory

};