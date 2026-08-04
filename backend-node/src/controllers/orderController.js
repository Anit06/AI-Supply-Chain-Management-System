const orderService = require("../services/orderService");

/*
==================================
GET ALL ORDERS
==================================
*/

exports.getOrders = async (req, res) => {

    try {

        const orders = await orderService.getOrdersByUser(

            req.user.id

        );

        res.json({

            success: true,
            orders

        });

    }

    catch (error) {

        res.status(400).json({

            success: false,
            message: error.message

        });

    }

};

/*
==================================
GET SINGLE ORDER
==================================
*/

exports.getOrder = async (req, res) => {

    try {

        const order = await orderService.getOrderById(

            req.user.id,
            req.params.id

        );

        res.json({

            success: true,
            order

        });

    }

    catch (error) {

        res.status(400).json({

            success: false,
            message: error.message

        });

    }

};

/*
==================================
ADMIN GET ALL ORDERS
==================================
*/

exports.getAllOrders = async (req,res)=>{

    try{

        const orders = await orderService.getAllOrders();

        return res.json({

            success:true,

            orders

        });

    }

    catch(error){

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

};

/*
==================================
UPDATE STATUS
==================================
*/

exports.updateStatus = async(req,res)=>{

    try{

        const order = await orderService.updateOrderStatus(

            req.params.id,

            req.body.status,

            req.body.supplierId

        );

        return res.json({

            success:true,

            order

        });

    }

    catch(error){

        return res.status(400).json({

            success:false,

            message:error.message

        });

    }

};

/*
==================================
ADMIN ORDER DETAILS
==================================
*/

exports.getAdminOrder = async (req, res) => {

    try {

        const order = await orderService.getOrderById(

            null,

            req.params.id

        );

        res.json({

            success: true,

            order

        });

    }

    catch (error) {

        res.status(404).json({

            success: false,

            message: error.message

        });

    }

};

/*
==================================
ORDER ANALYTICS
==================================
*/

exports.analytics = async (req, res) => {

    try {

        const analytics =

            await orderService.getOrderAnalytics();

        res.json({

            success: true,

            analytics

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};