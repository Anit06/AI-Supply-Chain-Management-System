import "../../../assets/css/orderAnalytics.css";

function AnalyticsCards({ analytics }) {

    if (!analytics) return null;

    return (

        <div className="analytics-grid">

            <div className="analytics-card">

                <h3>Total Orders</h3>

                <h1>{analytics.totalOrders}</h1>

            </div>

            <div className="analytics-card">

                <h3>Total Revenue</h3>

                <h1>₹{analytics.totalRevenue}</h1>

            </div>

            <div className="analytics-card">

                <h3>Placed</h3>

                <h1>{analytics.placed}</h1>

            </div>

            <div className="analytics-card">

                <h3>Confirmed</h3>

                <h1>{analytics.confirmed}</h1>

            </div>

            <div className="analytics-card">

                <h3>Packed</h3>

                <h1>{analytics.packed}</h1>

            </div>

            <div className="analytics-card">

                <h3>Shipped</h3>

                <h1>{analytics.shipped}</h1>

            </div>

            <div className="analytics-card">

                <h3>Delivered</h3>

                <h1>{analytics.delivered}</h1>

            </div>

            <div className="analytics-card">

                <h3>Cancelled</h3>

                <h1>{analytics.cancelled}</h1>

            </div>

        </div>

    );

}

export default AnalyticsCards;