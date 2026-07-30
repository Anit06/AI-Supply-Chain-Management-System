import "../../../assets/css/shopkeeper.css";

function ShopkeeperHome() {
  return (
    <div className="shopkeeper-home">
      <div className="dashboard-banner">
        <div className="banner-content">
          <div>
            <p className="eyebrow">Welcome back</p>
            <h1>Shopkeeper Dashboard</h1>
            <p className="banner-copy">
              Monitor orders, track recent activity and manage your store with ease.
            </p>
          </div>
          <div className="banner-stats">
            <div>
              <strong>24</strong>
              <span>New Orders</span>
            </div>
            <div>
              <strong>₹12.4K</strong>
              <span>Sales today</span>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-grid top-panel">
        <div className="card stats-card">
          <span className="card-label">Total Orders</span>
          <strong>132</strong>
          <p>All time order volume</p>
        </div>
        <div className="card stats-card gradient-purple">
          <span className="card-label">Pending Orders</span>
          <strong>18</strong>
          <p>Orders in delivery queue</p>
        </div>
        <div className="card stats-card gradient-cyan">
          <span className="card-label">Completed</span>
          <strong>94</strong>
          <p>Delivered this month</p>
        </div>
        <div className="card stats-card gradient-orange">
          <span className="card-label">Total Spent</span>
          <strong>₹48,650</strong>
          <p>Inventory and supplies</p>
        </div>
      </div>

      <div className="dashboard-grid middle-panel">
        <div className="card overview-card">
          <div className="card-title-row">
            <div>
              <h2>Recent Orders</h2>
              <p>Latest activity from your shop</p>
            </div>
            <button type="button">View All</button>
          </div>
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#ORD-3456</td>
                  <td>Jul 27</td>
                  <td>₹3,420</td>
                  <td><span className="badge badge-pending">Pending</span></td>
                </tr>
                <tr>
                  <td>#ORD-3442</td>
                  <td>Jul 25</td>
                  <td>₹1,980</td>
                  <td><span className="badge badge-shipped">Shipped</span></td>
                </tr>
                <tr>
                  <td>#ORD-3420</td>
                  <td>Jul 24</td>
                  <td>₹2,750</td>
                  <td><span className="badge badge-delivered">Delivered</span></td>
                </tr>
                <tr>
                  <td>#ORD-3395</td>
                  <td>Jul 22</td>
                  <td>₹4,100</td>
                  <td><span className="badge badge-delivered">Delivered</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="card latest-order-card">
          <div className="card-title-row">
            <h2>Latest Order Details</h2>
            <button type="button">View Details</button>
          </div>
          <div className="latest-order-content">
            <p><strong>Order ID:</strong> #ORD-3456</p>
            <p><strong>Order Date:</strong> Jul 27, 2026</p>
            <p><strong>Delivery:</strong> Aug 1, 2026</p>
            <p><strong>Payment:</strong> Cash On Delivery</p>
            <p><strong>Total:</strong> ₹3,420</p>
            <p><strong>Status:</strong> <span className="badge badge-pending">Pending</span></p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid bottom-panel">
        <div className="card category-card">
          <div className="card-title-row">
            <h2>Category Overview</h2>
            <button type="button">Catalog</button>
          </div>
          <ul className="category-list">
            <li><span>Beverages</span><strong>32 orders</strong></li>
            <li><span>Snacks</span><strong>28 orders</strong></li>
            <li><span>Personal Care</span><strong>18 orders</strong></li>
            <li><span>Household</span><strong>15 orders</strong></li>
          </ul>
        </div>

        <div className="card action-card">
          <h2>Quick Actions</h2>
          <div className="action-grid">
            <button type="button">Place Order</button>
            <button type="button">Product Catalog</button>
            <button type="button">Order History</button>
            <button type="button">Notifications</button>
          </div>
        </div>

        <div className="card notification-card">
          <div className="card-title-row">
            <h2>Notifications</h2>
            <button type="button">See All</button>
          </div>
          <ul className="notification-list">
            <li>Order #ORD-3456 has been placed.</li>
            <li>Stock levels are low for Beverages.</li>
            <li>New product catalogue available.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ShopkeeperHome;