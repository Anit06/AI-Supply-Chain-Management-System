const javaService = require("../services/javaService");

/*
==================================
GET INVENTORY
==================================
*/
exports.getInventory = async (req, res) => {
  try {
    const response = await javaService.getInventoryByWarehouse(
      req.params.warehouseId
    );

    return res.status(200).json(response.data);
  } catch (err) {
    const status = err.response?.status || 500;
    const message =
      err.response?.data?.message || err.response?.data || err.message;

    return res.status(status).json({
      success: false,
      message
    });
  }
};

/*
==================================
ADD INVENTORY
==================================
*/
exports.addInventory = async (req, res) => {

    console.log("Incoming Request:");
    console.log(req.body);

    try {

        const response = await javaService.addInventory(req.body);

        console.log("Java Response:");
        console.log(response.data);

        res.json(response.data);

    } catch (err) {

        console.log("Java Error:");

        console.log(err.response?.status);

        console.log(err.response?.data);

        console.log(err.message);

        res.status(500).json({
            message: err.response?.data || err.message
        });
    }
};

/*
==================================
UPDATE INVENTORY
==================================
*/
exports.updateInventory = async (req, res) => {
  try {
    const response = await javaService.updateInventory(
      req.params.inventoryId,
      req.body?.stock
    );

    return res.status(200).json(response.data);
  } catch (err) {
    const status = err.response?.status || 500;
    const message =
      err.response?.data?.message || err.response?.data || err.message;

    return res.status(status).json({
      success: false,
      message
    });
  }
};

/*
==================================
DELETE INVENTORY
==================================
*/
exports.deleteInventory = async (req, res) => {
  try {
    const response = await javaService.deleteInventory(req.params.inventoryId);

    return res.status(200).json(response.data);
  } catch (err) {
    const status = err.response?.status || 500;
    const message =
      err.response?.data?.message || err.response?.data || err.message;

    return res.status(status).json({
      success: false,
      message
    });
  }
};