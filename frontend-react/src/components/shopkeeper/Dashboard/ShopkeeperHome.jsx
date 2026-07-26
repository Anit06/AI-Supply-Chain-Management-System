import "../../../assets/css/shopkeeper.css";

function ShopkeeperHome() {
  return (
    <div className="shopkeeper-home">

      {/* Top Row */}

      <div className="top-row">

        {/* Welcome + Stats */}

        <div className="welcome-section">

          <div className="welcome-card">

            <h1>Welcome back, Rajesh! 👋</h1>

            <p>
              Here's what's happening with your store today.
            </p>

          </div>

          <div className="stats-grid">

            <div className="stat-card">
              <h2>12</h2>
              <h4>Total Orders</h4>
              <p>All Time</p>
            </div>

            <div className="stat-card">
              <h2>5</h2>
              <h4>Pending Orders</h4>
              <p>To Be Delivered</p>
            </div>

            <div className="stat-card">
              <h2>7</h2>
              <h4>Completed Orders</h4>
              <p>This Month</p>
            </div>

            <div className="stat-card">
              <h2>₹48,650</h2>
              <h4>Total Spent</h4>
              <p>This Month</p>
            </div>

          </div>

        </div>

        {/* Profile */}

        <div className="profile-card">

          <h2>My Profile</h2>

          <div className="profile-image">
            👨
          </div>

          <h3>Rajesh Kumar</h3>

          <span className="role-badge">
            Shopkeeper
          </span>

          <p>rajesh.kumar@email.com</p>

          <p>+91 98765 43210</p>

          <p>Jaipur, Rajasthan</p>

          <button className="profile-btn">
            Edit Profile
          </button>

        </div>

      </div>

      {/* Middle Row */}

      <div className="middle-row">

        {/* Recent Orders */}

        <div className="recent-orders">

          <div className="section-header">

            <h2>Recent Orders</h2>

            <button>View All</button>

          </div>

          <table>

            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td>#ORD1234</td>
                <td>20 May 2025</td>
                <td>₹5,640</td>
                <td>
                  <span className="status pending">
                    Pending
                  </span>
                </td>
              </tr>

              <tr>
                <td>#ORD1233</td>
                <td>18 May 2025</td>
                <td>₹2,980</td>
                <td>
                  <span className="status shipped">
                    Shipped
                  </span>
                </td>
              </tr>

              <tr>
                <td>#ORD1232</td>
                <td>16 May 2025</td>
                <td>₹1,250</td>
                <td>
                  <span className="status delivered">
                    Delivered
                  </span>
                </td>
              </tr>

              <tr>
                <td>#ORD1231</td>
                <td>14 May 2025</td>
                <td>₹3,450</td>
                <td>
                  <span className="status delivered">
                    Delivered
                  </span>
                </td>
              </tr>

            </tbody>

          </table>

        </div>

        {/* Latest Order */}

        <div className="latest-order">

          <div className="section-header">

            <h2>Latest Order</h2>

            <button>View Details</button>

          </div>

          <h3>#ORD1234</h3>

          <p>
            <strong>Order Date:</strong> 20 May 2025
          </p>

          <p>
            <strong>Estimated Delivery:</strong> 24 May 2025
          </p>

          <p>
            <strong>Payment:</strong> Online Payment
          </p>

          <p>
            <strong>Total Amount:</strong> ₹5,640
          </p>

          <p>
            <strong>Status:</strong>
            <span className="status pending">
              Pending
            </span>
          </p>

        </div>

      </div>

      {/* Bottom Row */}

      <div className="bottom-row">

        {/* Categories */}

        <div className="categories-card">

          <div className="section-header">

            <h2>Top Categories</h2>

            <button>View Catalog</button>

          </div>

          <ul>

            <li>
              Beverages
              <span>32 Orders</span>
            </li>

            <li>
              Snacks & Packaged Food
              <span>28 Orders</span>
            </li>

            <li>
              Personal Care
              <span>18 Orders</span>
            </li>

            <li>
              Household Essentials
              <span>15 Orders</span>
            </li>

          </ul>

        </div>

        {/* Quick Actions */}

        <div className="quick-actions">

          <h2>Quick Actions</h2>

          <div className="action-grid">

            <button>Place Order</button>

            <button>Search Products</button>

            <button>Order History</button>

            <button>Track Order</button>

          </div>

        </div>

        {/* Notifications */}

        <div className="notifications-card">

          <div className="section-header">

            <h2>Notifications</h2>

            <button>View All</button>

          </div>

          <ul>

            <li>
              Order #ORD1233 has been shipped.
            </li>

            <li>
              Order #ORD1232 has been delivered.
            </li>

            <li>
              New products are available in your area.
            </li>

          </ul>

        </div>

      </div>

    </div>
  );
}

export default ShopkeeperHome;