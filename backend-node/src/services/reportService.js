const javaService = require("./javaService");
const Warehouse = require("../models/Warehouse");
const Order = require("../models/Order");
const mongoose = require("mongoose");

//Inventory Report
exports.getInventoryReport = async () => {
  const response = await javaService.getAllInventory();

  return response.data;
};
//Summary Report

exports.getSummaryReport = async () => {
  const response = await javaService.getAllInventory();

  const inventory = response.data;

  const warehouses = await Warehouse.find();

  // Total unique products
  const totalProducts = new Set(inventory.map((item) => item.productId)).size;

  // Total stock across all warehouses
  const totalStock = inventory.reduce((sum, item) => sum + item.stock, 0);

  // Low stock products
  const lowStock = inventory.filter(
    (item) => item.stock > 0 && item.stock <= 20,
  ).length;

  // Warehouse Information

  const totalWarehouses = warehouses.length;

  const totalCapacity = warehouses.reduce(
    (sum, warehouse) => sum + warehouse.capacity,
    0,
  );

  const usedCapacity = totalStock;

  const availableCapacity = totalCapacity - usedCapacity;

  const capacityPercentage =
    totalCapacity === 0
      ? 0
      : Number(((usedCapacity / totalCapacity) * 100).toFixed(1));

  return {
    totalProducts,

    totalStock,

    lowStock,

    totalWarehouses,

    totalCapacity,

    usedCapacity,

    availableCapacity,

    capacityPercentage,
  };
};

//Low Stock Report

exports.getLowStockReport = async () => {
  const response = await javaService.getAllInventory();

  return response.data.filter((item) => item.stock > 0 && item.stock <= 20);
};

//Warehouse Capacity Report

exports.getWarehouseCapacityReport = async () => {
  const response = await javaService.getAllInventory();

  const inventory = response.data;

  const warehouses = await Warehouse.find().lean();

  return warehouses.map((warehouse) => {
    const warehouseInventory = inventory.filter(
      (item) => item.warehouseId === warehouse._id.toString(),
    );

    const currentStock = warehouseInventory.reduce(
      (sum, item) => sum + item.stock,
      0,
    );

    const percentage =
      warehouse.capacity === 0
        ? 0
        : Number(((currentStock / warehouse.capacity) * 100).toFixed(1));

    return {
      warehouseId: warehouse._id.toString(),

      warehouseName: warehouse.name,

      capacity: warehouse.capacity,

      currentStock,

      availableCapacity: warehouse.capacity - currentStock,

      percentage,
    };
  });
};


// MONTHLY SALES REPORT


exports.getMonthlySalesReport = async (warehouseId, month, year) => {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 1);

  const warehouse = await Warehouse.findById(warehouseId).lean();

  const report = await Order.aggregate([
    {
      $match: {
        warehouseId: new mongoose.Types.ObjectId(warehouseId),
        status: "Delivered",
        createdAt: {
          $gte: startDate,
          $lt: endDate,
        },
      },
    },
    {
      $unwind: "$items",
    },
    {
      $group: {
        _id: "$items.productId",

        productName: {
          $first: "$items.productName",
        },

        unit: {
          $first: "$items.unit",
        },

        quantitySold: {
          $sum: "$items.quantity",
        },

        revenue: {
          $sum: "$items.subtotal",
        },
      },
    },
    {
      $sort: {
        revenue: -1,
      },
    },
  ]);

  const grandTotalRevenue = report.reduce(
    (sum, item) => sum + item.revenue,
    0
  );

  return {
    warehouseId,
    warehouseName: warehouse ? warehouse.name : "Unknown Warehouse",
    month,
    year,
    grandTotalRevenue,
    products: report,
  };
};

/*
====================================
YEARLY SALES REPORT
====================================
*/

exports.getYearlySalesReport = async (warehouseId, year) => {

    const startDate = new Date(year, 0, 1);

    const endDate = new Date(Number(year) + 1, 0, 1);

    const warehouse = await Warehouse.findById(warehouseId).lean();

    const report = await Order.aggregate([

        {
            $match: {

                warehouseId: new mongoose.Types.ObjectId(warehouseId),

                status: "Delivered",

                createdAt: {

                    $gte: startDate,

                    $lt: endDate

                }

            }
        },

        {
            $unwind: "$items"
        },

        {
            $group: {

                _id: "$items.productId",

                productName: {

                    $first: "$items.productName"

                },

                unit: {

                    $first: "$items.unit"

                },

                quantitySold: {

                    $sum: "$items.quantity"

                },

                revenue: {

                    $sum: "$items.subtotal"

                }

            }
        },

        {
            $sort: {

                revenue: -1

            }
        }

    ]);

    const grandTotalRevenue = report.reduce(

        (sum, item) => sum + item.revenue,

        0

    );

    return {

        warehouseId,

        warehouseName: warehouse ? warehouse.name : "Unknown Warehouse",

        year,

        grandTotalRevenue,

        products: report

    };

};