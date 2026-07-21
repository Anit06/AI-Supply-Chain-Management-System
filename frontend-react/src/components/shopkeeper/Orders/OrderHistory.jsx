import { useEffect, useState } from "react";
import { getMyOrders } from "../../../services/orderService";

function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await getMyOrders();
        setOrders(response.data.orders || []);
      } catch (error) {
        console.error(error);
      }
    };

    loadOrders();
  }, []);

  return (
    <div className="catalog-container">
      <h2>Order History</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="cart-summary">
            <h3>{order.orderNumber}</h3>
            <p>Status: {order.status}</p>
            <p>Grand Total: ₹{order.grandTotal}</p>
            {order.items.map((item) => (
              <div key={item._id} className="cart-row">
                <span>{item.productName}</span>
                <span>{item.quantity} × ₹{item.price}</span>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default OrderHistory;