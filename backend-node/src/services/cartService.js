const Cart = require("../models/Cart");
const Order = require("../models/Order");
const User = require("../models/User");
const ShopkeeperDetails = require("../models/ShopkeeperDetails");
const javaService = require("./javaService");

/*
=========================================
Calculate Cart Total
=========================================
*/

const calculateCartTotal = (items) => {

    let total = 0;

    items.forEach((item) => {

        item.subtotal = item.price * item.quantity;

        total += item.subtotal;

    });

    return total;

};

/*
=========================================
Add Product To Cart
=========================================
*/

const addItemToCart = async (data) => {

    let cart = await Cart.findOne({

        userId: data.userId,
        warehouseId: data.warehouseId

    });

    if (!cart) {

        cart = new Cart({

            userId: data.userId,
            warehouseId: data.warehouseId,
            items: []

        });

    }

    const existingItem = cart.items.find(

        item => item.productId.toString() === data.productId

    );

    if (existingItem) {

        existingItem.quantity += data.quantity;

        existingItem.subtotal =
            existingItem.quantity * existingItem.price;

    }

    else {

        cart.items.push({

            productId: data.productId,

            productName: data.productName,

            category: data.category,

            image: data.image,

            sku: data.sku,

            description: data.description,

            unit: data.unit,

            price: data.price,

            quantity: data.quantity,

            subtotal: data.price * data.quantity

        });

    }

    cart.cartTotal = calculateCartTotal(cart.items);

    await cart.save();

    return cart;

};

/*
=========================================
Get Cart
=========================================
*/

const getCart = async (userId, warehouseId) => {

    const cart = await Cart.findOne({

        userId,
        warehouseId

    });

    return cart;

};

/*
=========================================
Update Quantity
=========================================
*/

const updateQuantity = async (

    userId,
    warehouseId,
    productId,
    quantity

) => {

    const cart = await Cart.findOne({

        userId,
        warehouseId

    });

    if (!cart) {

        throw new Error("Cart not found");

    }

    const item = cart.items.find(

        item => item.productId.toString() === productId

    );

    if (!item) {

        throw new Error("Product not found in cart");

    }

    item.quantity = quantity;

    item.subtotal = item.quantity * item.price;

    cart.cartTotal = calculateCartTotal(cart.items);

    await cart.save();

    return cart;

};

/*
=========================================
Remove Product
=========================================
*/

const removeItem = async (

    userId,
    warehouseId,
    productId

) => {

    const cart = await Cart.findOne({

        userId,
        warehouseId

    });

    if (!cart) {

        throw new Error("Cart not found");

    }

    cart.items = cart.items.filter(

        item => item.productId.toString() !== productId

    );

    cart.cartTotal = calculateCartTotal(cart.items);

    await cart.save();

    return cart;

};

/*
=========================================
Clear Cart
=========================================
*/

const clearCart = async (

    userId,
    warehouseId

) => {

    await Cart.deleteOne({

        userId,
        warehouseId

    });

};

/*
=========================================
Place Order
=========================================
*/

const placeOrder = async (userId, warehouseId) => {

    const cart = await Cart.findOne({

        userId,
        warehouseId

    });

    if (!cart) {

        throw new Error("Cart not found");

    }

    if (cart.items.length === 0) {

        throw new Error("Cart is empty");

    }

    /*
    =========================================
    Reduce Inventory First
    =========================================
    */

    for (const item of cart.items) {

        try {

            await javaService.reduceInventory({

                warehouseId: cart.warehouseId.toString(),

                productId: item.productId.toString(),

                quantity: item.quantity

            });

        }

        catch (error) {

            console.error(

                "Inventory Error :",

                error.response?.data || error.message

            );

            throw new Error(

                "Unable to place order. Product stock is not available."

            );

        }

    }


    /*
    =========================================
    Generate Order Number
    =========================================
    */

    const orderNumber =
        "ORD-" + Date.now();

    /*
    =========================================
    Load User
    =========================================
    */

    const user = await User.findById(userId);

    /*
    =========================================
    Load Shopkeeper Profile
    =========================================
    */

    const profile = await ShopkeeperDetails.findOne({

        userId

    });

    /*
    =========================================
    Get Default Address
    =========================================
    */

    let defaultAddress = "";

    if (profile && profile.addresses.length > 0) {

        const address = profile.addresses.find(

            item => item.isDefault

        ) || profile.addresses[0];

        defaultAddress = [

            address.fullName,

            address.phone,

            address.addressLine1,

            address.addressLine2,

            address.landmark,

            address.city,

            address.state,

            address.country,

            address.pincode

        ]

        .filter(value => value && value.trim() !== "")

        .join(", ");

    }

    /*
    =========================================
    Create Order
    =========================================
    */

    const order = await Order.create({

        orderNumber,

        shopkeeperName:

            profile?.fullName ||

            user?.fullName ||

            "",

        shopkeeperPhone:

            profile?.phone ||

            user?.phone ||

            "",

        deliveryAddress:

            defaultAddress,

        userId: cart.userId,

        warehouseId: cart.warehouseId,

        items: cart.items,

        totalAmount: cart.cartTotal,

        status: "Placed"

    });

    /*
    =========================================
    Delete Cart
    =========================================
    */

    await Cart.deleteOne({

        _id: cart._id

    });

    return order;

};
 

/*
=========================================
Exports
=========================================
*/

module.exports = {

    addItemToCart,

    getCart,

    updateQuantity,

    removeItem,

    clearCart,

    placeOrder,

    calculateCartTotal
};