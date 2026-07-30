import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getCart,
    updateCart,
    removeCartItem,
    placeOrder
} from "../../../services/cartService";

import { getWarehouseById } from "../../../services/warehouseService";

import "../../../assets/css/placeOrder.css";

function Cart() {
    const navigate = useNavigate();

    const [warehouse, setWarehouse] = useState(null);
    const [cart, setCart] = useState({
        items: [],
        cartTotal: 0
    });
    const [loading, setLoading] = useState(true);
    const [placingOrder, setPlacingOrder] = useState(false);

    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = async () => {
        try {
            const warehouseId = localStorage.getItem("selectedWarehouse");

            if (!warehouseId) {
                navigate("/shopkeeper/product-catalog");
                return;
            }

            const warehouseResponse = await getWarehouseById(warehouseId);

            setWarehouse(
                warehouseResponse.warehouse || warehouseResponse
            );

            const cartResponse = await getCart(warehouseId);

            setCart(
                cartResponse.cart || {
                    items: [],
                    cartTotal: 0
                }
            );

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const increaseQuantity = async (item) => {
        await updateCart({
            warehouseId: localStorage.getItem("selectedWarehouse"),
            productId: item.productId,
            quantity: item.quantity + 1
        });

        loadCart();
    };

    const decreaseQuantity = async (item) => {
        if (item.quantity <= 1) return;

        await updateCart({
            warehouseId: localStorage.getItem("selectedWarehouse"),
            productId: item.productId,
            quantity: item.quantity - 1
        });

        loadCart();
    };

    const removeProduct = async (item) => {
        await removeCartItem(
            item.productId,
            localStorage.getItem("selectedWarehouse")
        );

        loadCart();
    };

    const handlePlaceOrder = async () => {
        try {
            setPlacingOrder(true);

            const response = await placeOrder(
                localStorage.getItem("selectedWarehouse")
            );

            alert(response.message);

            localStorage.removeItem("selectedWarehouse");

            navigate("/shopkeeper/order-history");

        } catch (error) {
            alert(
                error.response?.data?.message ||
                error.message
            );
        } finally {
            setPlacingOrder(false);
        }
    };

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="catalog-container">
            <h2 className="page-title">Checkout</h2>

            {warehouse && (
                <div className="warehouse-card">
                    <h3>Warehouse</h3>
                    <p><b>Name :</b> {warehouse.name}</p>
                    <p><b>Location :</b> {warehouse.location}</p>
                </div>
            )}

            {cart.items.length === 0 ? (
                <div className="empty-cart">
                    <h2>Your Cart is Empty</h2>
                </div>
            ) : (
                <>
                    {cart.items.map((item) => (
                        <div className="cart-card" key={item._id}>
                            <div className="cart-left">
                                <img
                                    className="cart-image"
                                    src={
                                        item.image
                                            ? `http://localhost:5000/${item.image}`
                                            : "https://placehold.co/200x200?text=No+Image"
                                    }
                                    alt={item.productName}
                                />
                                <div className="cart-info">
                                    <h3>{item.productName}</h3>
                                    <p>Category : {item.category}</p>
                                    <p>SKU : {item.sku}</p>
                                    <p>Unit : {item.unit}</p>
                                    <p>Price : ₹{item.price}</p>
                                    <div className="qty-box">
                                        <button
                                            className="qty-btn"
                                            onClick={() => decreaseQuantity(item)}
                                        >
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            className="qty-btn"
                                            onClick={() => increaseQuantity(item)}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        className="remove-btn"
                                        onClick={() => removeProduct(item)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                            <div className="cart-right">
                                <div className="subtotal">
                                    ₹{item.subtotal}
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="summary-card">
                        <div className="summary-row">
                            <span>Items</span>
                            <span>{cart.items.length}</span>
                        </div>
                        <div className="summary-row grand-total">
                            <span>Total</span>
                            <span>₹{cart.cartTotal}</span>
                        </div>
                        <button
                            className="checkout-btn"
                            onClick={handlePlaceOrder}
                            disabled={placingOrder}
                        >
                            {placingOrder ? "Placing Order..." : "Place Order"}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Cart;