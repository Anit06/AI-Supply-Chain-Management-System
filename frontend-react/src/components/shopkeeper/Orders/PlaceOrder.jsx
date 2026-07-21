import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, placeOrder, removeCartItem, updateCart } from "../../../services/cartService";
import { getWarehouseById } from "../../../services/warehouseService";

function PlaceOrder() {
  const navigate = useNavigate();
  const [warehouse, setWarehouse] = useState(null);
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedWarehouse = localStorage.getItem("selectedWarehouse");
    if (!storedWarehouse) {
      navigate("/shopkeeper/product-catalog");
      return;
    }

    const loadData = async () => {
      try {
        const warehouseResponse = await getWarehouseById(storedWarehouse);
        setWarehouse(warehouseResponse.warehouse || warehouseResponse);
        const cartResponse = await getCart(storedWarehouse);
        setCart(cartResponse.data.cart || { items: [] });
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, [navigate]);

  const loadCart = async () => {
    const storedWarehouse = localStorage.getItem("selectedWarehouse");
    if (!storedWarehouse) {
      navigate("/shopkeeper/product-catalog");
      return;
    }

    try {
      const cartResponse = await getCart(storedWarehouse);
      setCart(cartResponse.data.cart || { items: [] });
    } catch (error) {
      console.error(error);
    }
  };

  const handleIncrease = async (item) => {
    try {
      await updateCart({ warehouseId: item.warehouseId || localStorage.getItem("selectedWarehouse"), productId: item.productId._id || item.productId, quantity: item.quantity + 1 });
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
      await updateCart({ warehouseId: item.warehouseId || localStorage.getItem("selectedWarehouse"), productId: item.productId._id || item.productId, quantity: item.quantity - 1 });
      await loadCart();
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  const handleRemove = async (item) => {
    try {
      await removeCartItem(item.productId._id || item.productId, localStorage.getItem("selectedWarehouse"));
      await loadCart();
    } catch (error) {
      console.error(error);
    }
  };

  const handlePlaceOrder = async () => {
    if (!cart?.items?.length) {
      alert("Cart is empty");
      return;
    }

    setLoading(true);
    try {
      await placeOrder(localStorage.getItem("selectedWarehouse"));
      alert("Order placed successfully");
      navigate("/shopkeeper/order-history");
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="catalog-container">
      <h2>Place Order</h2>
      {warehouse && <p><strong>Selected Warehouse:</strong> {warehouse.name}</p>}
      {cart?.items?.length ? (
        <div className="cart-summary">
          {cart.items.map((item) => (
            <div key={item._id || item.productId} className="cart-row">
              <div>
                <strong>{item.productName || item.productId?.name}</strong>
                <p>₹{item.price} × {item.quantity}</p>
              </div>
              <div className="quantity-box">
                <button type="button" onClick={() => handleDecrease(item)}>-</button>
                <span>{item.quantity}</span>
                <button type="button" onClick={() => handleIncrease(item)}>+</button>
              </div>
              <button type="button" className="remove-btn" onClick={() => handleRemove(item)}>Remove</button>
            </div>
          ))}
          <hr />
          <div className="cart-row"><strong>Total Items</strong><strong>{cart.items.reduce((sum, item) => sum + item.quantity, 0)}</strong></div>
          <div className="cart-row total"><strong>Grand Total</strong><strong>₹{cart.cartTotal || 0}</strong></div>
          <button type="button" className="checkout-btn" onClick={handlePlaceOrder} disabled={loading}>
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      ) : (
        <p>No items to place order.</p>
      )}
    </div>
  );
}

export default PlaceOrder;