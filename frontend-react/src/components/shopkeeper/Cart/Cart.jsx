import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, updateCart, removeCartItem, clearCart, placeOrder } from "../../../services/cartService";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

function Cart({ warehouseId, onContinueShopping }) {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadCart = async () => {
        try {
            const response = await getCart(warehouseId);
            setItems(response.data.cart?.items || []);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (warehouseId) {
            loadCart();
        }
    }, [warehouseId]);

    const handleIncrease = async (item) => {
        const newQuantity = item.quantity + 1;
        try {
            await updateCart({ warehouseId, productId: item.productId._id || item.productId, quantity: newQuantity });
            await loadCart();
        } catch (error) {
            alert(error.response?.data?.message || error.message);
        }
    };

    const handleDecrease = async (item) => {
        if (item.quantity <= 1) {
            return;
        }
        try {
            await updateCart({ warehouseId, productId: item.productId._id || item.productId, quantity: item.quantity - 1 });
            await loadCart();
        } catch (error) {
            alert(error.response?.data?.message || error.message);
        }
    };

    const handleRemove = async (item) => {
        try {
            await removeCartItem(item.productId._id || item.productId, warehouseId);
            await loadCart();
        } catch (error) {
            console.error(error);
        }
    };

    const handleClear = async () => {
        try {
            await clearCart(warehouseId);
            await loadCart();
        } catch (error) {
            console.error(error);
        }
    };

    const handlePlaceOrder = async () => {
        if (!items.length) {
            alert("Cart is empty");
            return;
        }
        setLoading(true);
        try {
            await placeOrder(warehouseId);
            alert("Order placed successfully");
            await loadCart();
            navigate("/shopkeeper/order-history");
        } catch (error) {
            alert(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="catalog-container">
            <div className="catalog-header">
                <h2>Cart</h2>
                <button type="button" className="checkout-btn" onClick={handleClear}>Clear Cart</button>
            </div>
            <div className="catalog-grid">
                {items.map((item) => (
                    <CartItem key={item._id || item.productId._id || item.productId} item={item} onIncrease={handleIncrease} onDecrease={handleDecrease} onRemove={handleRemove} />
                ))}
            </div>
            <CartSummary items={items} onContinueShopping={onContinueShopping} onPlaceOrder={handlePlaceOrder} loading={loading} />
        </div>
    );
}

export default Cart;
