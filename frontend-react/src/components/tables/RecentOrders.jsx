<<<<<<< HEAD
import "../../assets/css/tables.css";

function RecentOrders() {
  return (
    <div className="table-card">

      <h2>Recent Orders</h2>

    </div>
  );
}

export default RecentOrders;
=======
function RecentOrders({ orders }) {
  return <section className="dashboard-card dashboard-orders-card"><div className="dashboard-card__heading"><div><p>Latest activity</p><h2>Recent Orders</h2></div><a href="/admin/orders">View all</a></div>{orders.length ? <div className="dashboard-order-list">{orders.map((order) => <div className="dashboard-order" key={order._id}><div><strong>#{order.orderNumber || order._id?.slice(-6)}</strong><span>{new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span></div><div><b>₹{Number(order.totalAmount || 0).toLocaleString("en-IN")}</b><em className={`dashboard-badge dashboard-badge--${order.status?.toLowerCase()}`}>{order.status === "Placed" ? "Pending" : order.status}</em></div></div>)}</div> : <div className="dashboard-empty-state">No recent orders to display.</div>}</section>;
}

export default RecentOrders;
>>>>>>> 8ebc819e3df109c552f8e25d6c537d085fc18a78
