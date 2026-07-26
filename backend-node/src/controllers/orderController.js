// const Order = require("../models/Order");

// const getMyOrders = async (req, res) => {
//     try {
//         const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
//         return res.status(200).json({ success: true, orders });
//     } catch (error) {
//         return res.status(400).json({ success: false, message: error.message });
//     }
// };

// const getOrderById = async (req, res) => {
//     try {
//         const order = await Order.findOne({ _id: req.params.orderId, userId: req.user.id });
//         if (!order) {
//             return res.status(404).json({ success: false, message: "Order not found" });
//         }
//         return res.status(200).json({ success: true, order });
//     } catch (error) {
//         return res.status(400).json({ success: false, message: error.message });
//     }
// };

// module.exports = { getMyOrders, getOrderById };
const Order = require("../models/Order");
const Product = require("../models/Product");



// =========================
// Place Order
// =========================

exports.placeOrder = async (req,res)=>{

try{

const {items,deliveryAddress,notes,supplier}=req.body;

if(!items || items.length===0){

return res.status(400).json({
success:false,
message:"Order is empty"
});

}

let total=0;

for(const item of items){

const product=await Product.findById(item.product);

if(!product){

return res.status(404).json({
success:false,
message:"Product not found"
});

}

total+=product.price*item.quantity;

}

const order=await Order.create({

shopkeeper:req.user.id,

supplier,

items,

deliveryAddress,

notes,

totalAmount:total

});

res.status(201).json({

success:true,

message:"Order Placed Successfully",

order

});

}

catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};



// =========================
// Order History
// =========================

exports.getOrderHistory=async(req,res)=>{

try{

const orders=await Order.find({

shopkeeper:req.user.id

})

.populate("items.product")

.populate("supplier","name email")

.sort({

createdAt:-1

});

res.status(200).json({

success:true,

count:orders.length,

orders

});

}

catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};




// =========================
// Get Single Order
// =========================

exports.getOrder=async(req,res)=>{

try{

const order=await Order.findById(req.params.id)

.populate("items.product")

.populate("shopkeeper","name")

.populate("supplier","name");

if(!order){

return res.status(404).json({

success:false,

message:"Order not found"

});

}

res.json({

success:true,

order

});

}

catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};




// =========================
// Update Status
// =========================

exports.updateStatus=async(req,res)=>{

try{

const order=await Order.findById(req.params.id);

if(!order){

return res.status(404).json({

success:false,

message:"Order not found"

});

}

order.status=req.body.status;

await order.save();

res.json({

success:true,

message:"Status Updated",

order

});

}

catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};




// =========================
// Delete Order
// =========================

exports.deleteOrder=async(req,res)=>{

try{

const order=await Order.findById(req.params.id);

if(!order){

return res.status(404).json({

success:false,

message:"Order not found"

});

}

await order.deleteOne();

res.json({

success:true,

message:"Order Deleted"

});

}

catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};