import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaBell,
  FaBoxOpen,
  FaCheckCircle,
  FaClipboardList,
  FaHistory,
  FaMapMarkerAlt,
  FaPlus,
  FaSearch,
  FaShoppingBag,
  FaTruck,
  FaUserEdit,
} from "react-icons/fa";
import { getOrders } from "../../../services/orderService";
import { getProfile } from "../../../services/shopkeeperService";
import "../../../assets/css/shopkeeper.css";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(amount || 0));

const formatDate = (date, options = { day: "numeric", month: "short", year: "numeric" }) => {
  if (!date) return "—";
  return new Intl.DateTimeFormat("en-IN", options).format(new Date(date));
};

const statusClass = (status = "") => `shopkeeper-dashboard__status--${status.toLowerCase()}`;

const formatAddress = (address) =>
  address
    ? [address.addressLine1, address.addressLine2, address.city, address.state, address.pincode]
      .filter(Boolean)
      .join(", ") || "—"
    : "—";

function ShopkeeperHome() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [profile, setProfile] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      setError("");

      const user = JSON.parse(localStorage.getItem("user") || "{}") || {};
      const requests = [getOrders()];
      if (user.id) requests.push(getProfile(user.id));

      const results = await Promise.allSettled(requests);
      const ordersResult = results[0];
      const profileResult = results[1];

      if (ordersResult.status === "fulfilled") {
        setOrders(ordersResult.value.orders || []);
      } else {
        setError("We could not load your order activity. Please refresh and try again.");
      }

      if (profileResult?.status === "fulfilled") {
        setProfile(profileResult.value.data.profile || null);
      }

      setLoading(false);
    };

    loadDashboard();
  }, []);

  const dashboard = useMemo(() => {
    const activeOrders = orders.filter((order) => order.status !== "Cancelled");
    const completedOrders = orders.filter((order) => order.status === "Delivered");
    const pendingOrders = orders.filter((order) =>
      ["Placed", "Confirmed", "Packed", "Shipped"].includes(order.status),
    );
    const totalSpending = activeOrders.reduce((total, order) => total + Number(order.totalAmount || 0), 0);
    const categoryCounts = activeOrders.reduce((summary, order) => {
      const seenCategories = new Set();
      (order.items || []).forEach((item) => {
        if (!item.category || seenCategories.has(item.category)) return;
        seenCategories.add(item.category);
        summary[item.category] = (summary[item.category] || 0) + 1;
      });
      return summary;
    }, {});
    const highestCategoryCount = Math.max(...Object.values(categoryCounts), 1);
    const categories = Object.entries(categoryCounts)
      .map(([name, count]) => ({
        name,
        count,
        percentage: Math.round((count / highestCategoryCount) * 100),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 4);

    return {
      totalSpending,
      pendingOrders,
      completedOrders,
      categories,
      latestOrder: orders[0] || null,
    };
  }, [orders]);

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return orders.slice(0, 5);
    return orders
      .filter((order) =>
        [order.orderNumber, order._id, order.status, ...(order.items || []).map((item) => item.productName)]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(query)),
      )
      .slice(0, 5);
  }, [orders, search]);

  const user = profile?.userId || JSON.parse(localStorage.getItem("user") || "{}") || {};
  const displayName = profile?.fullName || user.name || "Shopkeeper";
  const defaultAddress = profile?.addresses?.find((address) => address.isDefault) || profile?.addresses?.[0];
  const latestOrder = dashboard.latestOrder;
  const notifications = orders.slice(0, 4).map((order) => ({
    id: order._id,
    text: `Order ${order.orderNumber || `#${order._id?.slice(-6)}`} is ${order.status?.toLowerCase() || "updated"}.`,
    time: order.statusHistory?.at(-1)?.updatedAt || order.updatedAt || order.createdAt,
  }));

  return (
    <div className="shopkeeper-dashboard">
      <header className="shopkeeper-dashboard__header">
        <div>
          <p className="shopkeeper-dashboard__eyebrow">Overview</p>
          <h1>Dashboard</h1>
        </div>
        <div className="shopkeeper-dashboard__header-actions">
          <label className="shopkeeper-dashboard__search" aria-label="Search orders">
            <FaSearch aria-hidden="true" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search orders" />
          </label>
          <button className="shopkeeper-dashboard__icon-button" type="button" onClick={() => navigate("/shopkeeper/notifications")} aria-label="View notifications">
            <FaBell />
            {notifications.length > 0 && <span>{notifications.length}</span>}
          </button>
          <button className="shopkeeper-dashboard__user" type="button" onClick={() => navigate("/shopkeeper/profile")}>
            <span>{displayName.charAt(0).toUpperCase()}</span>
            <div><strong>{displayName}</strong><small>Shopkeeper</small></div>
          </button>
        </div>
      </header>

      {loading ? <div className="shopkeeper-dashboard__message">Loading your dashboard…</div> : error ? <div className="shopkeeper-dashboard__message shopkeeper-dashboard__message--error">{error}</div> : (
        <>
          <section className="shopkeeper-dashboard__welcome">
            <div>
              <p>Welcome back, {displayName}</p>
              <h2>Everything for your store, in one place.</h2>
              <span>Keep track of orders, spending, and recent store activity.</span>
            </div>
            <button type="button" onClick={() => navigate("/shopkeeper/place-order")}><FaPlus /> Place order</button>
          </section>

          <section className="shopkeeper-dashboard__stats" aria-label="Order statistics">
            <StatCard icon={<FaClipboardList />} tone="indigo" label="Total Orders" value={orders.length} detail="All orders placed" />
            <StatCard icon={<FaTruck />} tone="amber" label="Pending Orders" value={dashboard.pendingOrders.length} detail="Currently in progress" />
            <StatCard icon={<FaCheckCircle />} tone="green" label="Completed Orders" value={dashboard.completedOrders.length} detail="Delivered orders" />
            <StatCard icon={<FaShoppingBag />} tone="pink" label="Total Spending" value={formatCurrency(dashboard.totalSpending)} detail="Excluding cancelled orders" />
          </section>

          <section className="shopkeeper-dashboard__content-grid">
            <article className="shopkeeper-dashboard__card shopkeeper-dashboard__profile-card">
              <div className="shopkeeper-dashboard__card-heading"><div><p>Account</p><h2>My Profile</h2></div><button type="button" onClick={() => navigate("/shopkeeper/profile")}><FaUserEdit /> Edit profile</button></div>
              <div className="shopkeeper-dashboard__profile-summary"><div className="shopkeeper-dashboard__profile-avatar">{displayName.charAt(0).toUpperCase()}</div><div><h3>{displayName}</h3><span>Shopkeeper account</span></div></div>
              <dl className="shopkeeper-dashboard__details"><div><dt>Email</dt><dd>{user.email || "—"}</dd></div><div><dt>Phone</dt><dd>{profile?.phone || user.phone || "—"}</dd></div><div><dt>Address</dt><dd>{formatAddress(defaultAddress)}</dd></div></dl>
            </article>

            <article className="shopkeeper-dashboard__card shopkeeper-dashboard__latest-card">
              <div className="shopkeeper-dashboard__card-heading"><div><p>Most recent</p><h2>Latest Order Details</h2></div>{latestOrder && <button type="button" onClick={() => navigate(`/shopkeeper/order/${latestOrder._id}`)}>View details <FaArrowRight /></button>}</div>
              {latestOrder ? <div className="shopkeeper-dashboard__latest-details"><div><span>Order ID</span><strong>{latestOrder.orderNumber || `#${latestOrder._id.slice(-6)}`}</strong></div><div><span>Status</span><em className={`shopkeeper-dashboard__status ${statusClass(latestOrder.status)}`}>{latestOrder.status}</em></div><div><span>Order date</span><strong>{formatDate(latestOrder.createdAt)}</strong></div><div><span>Estimated delivery</span><strong>Not available</strong></div><div><span>Payment method</span><strong>{latestOrder.paymentMethod || "—"}</strong></div><div><span>Shipping address</span><strong>{latestOrder.deliveryAddress || formatAddress(defaultAddress)}</strong></div><div><span>Total amount</span><strong>{formatCurrency(latestOrder.totalAmount)}</strong></div></div> : <EmptyState text="No orders yet. Place your first order to see its details here." />}
            </article>
          </section>

          <section className="shopkeeper-dashboard__wide-grid">
            <article className="shopkeeper-dashboard__card shopkeeper-dashboard__orders-card"><div className="shopkeeper-dashboard__card-heading"><div><p>Order activity</p><h2>Recent Orders</h2></div><button type="button" onClick={() => navigate("/shopkeeper/order-history")}>View all <FaArrowRight /></button></div>{filteredOrders.length ? <div className="shopkeeper-dashboard__table-wrap"><table><thead><tr><th>Order ID</th><th>Date</th><th>Items</th><th>Amount</th><th>Status</th><th>Action</th></tr></thead><tbody>{filteredOrders.map((order) => <tr key={order._id}><td><strong>{order.orderNumber || `#${order._id.slice(-6)}`}</strong></td><td>{formatDate(order.createdAt, { day: "numeric", month: "short" })}</td><td>{(order.items || []).reduce((total, item) => total + Number(item.quantity || 0), 0)}</td><td>{formatCurrency(order.totalAmount)}</td><td><span className={`shopkeeper-dashboard__status ${statusClass(order.status)}`}>{order.status}</span></td><td><button type="button" onClick={() => navigate(`/shopkeeper/order/${order._id}`)}>View</button></td></tr>)}</tbody></table></div> : <EmptyState text={search ? "No orders match your search." : "No orders have been placed yet."} />}</article>
            <article className="shopkeeper-dashboard__card"><div className="shopkeeper-dashboard__card-heading"><div><p>Shopping insights</p><h2>Top Categories</h2></div><FaBoxOpen className="shopkeeper-dashboard__heading-icon" /></div>{dashboard.categories.length ? <div className="shopkeeper-dashboard__categories">{dashboard.categories.map((category) => <div key={category.name}><div><strong>{category.name}</strong><span>{category.count} {category.count === 1 ? "order" : "orders"}</span></div><i><b style={{ width: `${category.percentage}%` }} /></i></div>)}</div> : <EmptyState text="Category insights will appear once you place orders." />}</article>
          </section>

          <section className="shopkeeper-dashboard__lower-grid">
            <article className="shopkeeper-dashboard__card"><div className="shopkeeper-dashboard__card-heading"><div><p>Shortcuts</p><h2>Quick Actions</h2></div></div><div className="shopkeeper-dashboard__quick-actions"><button type="button" onClick={() => navigate("/shopkeeper/place-order")}><FaPlus />Place Order</button><button type="button" onClick={() => navigate("/shopkeeper/product-catalog")}><FaSearch />Search Products</button><button type="button" onClick={() => navigate("/shopkeeper/order-history")}><FaHistory />Order History</button><button type="button" onClick={() => latestOrder && navigate(`/shopkeeper/order/${latestOrder._id}/track`)} disabled={!latestOrder}><FaMapMarkerAlt />Track Order</button></div></article>
            <article className="shopkeeper-dashboard__card"><div className="shopkeeper-dashboard__card-heading"><div><p>Latest updates</p><h2>Notifications</h2></div><button type="button" onClick={() => navigate("/shopkeeper/notifications")}>See all <FaArrowRight /></button></div>{notifications.length ? <ul className="shopkeeper-dashboard__notifications">{notifications.map((notification) => <li key={notification.id}><span><FaBell /></span><div><strong>{notification.text}</strong><small>{formatDate(notification.time, { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" })}</small></div></li>)}</ul> : <EmptyState text="No order notifications yet." />}</article>
          </section>
        </>
      )}
    </div>
  );
}

function StatCard({ icon, tone, label, value, detail }) {
  return <article className="shopkeeper-dashboard__stat-card"><span className={`shopkeeper-dashboard__stat-icon shopkeeper-dashboard__stat-icon--${tone}`}>{icon}</span><div><p>{label}</p><strong>{value}</strong><small>{detail}</small></div></article>;
}

function EmptyState({ text }) { return <div className="shopkeeper-dashboard__empty">{text}</div>; }

export default ShopkeeperHome;
