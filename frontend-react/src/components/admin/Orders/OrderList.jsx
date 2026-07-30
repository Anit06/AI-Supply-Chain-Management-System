import { useNavigate } from "react-router-dom";

function OrderList({ orders }) {

    const navigate = useNavigate();

    if (orders.length === 0) {

        return (

            <div className="empty-orders">

                <h2>No Orders Found</h2>

                <p>No shopkeeper has placed an order yet.</p>

            </div>

        );

    }

    const getStatusClass = (status) => {

        switch (status) {

            case "Placed":
                return "status placed";

            case "Confirmed":
                return "status confirmed";

            case "Packed":
                return "status packed";

            case "Shipped":
                return "status shipped";

            case "Delivered":
                return "status delivered";

            case "Cancelled":
                return "status cancelled";

            default:
                return "status";
        }

    };

    return (

        <div className="orders-table-card">

            <div className="table-header">

                <h3>All Shopkeeper Orders</h3>

                <span>{orders.length} Orders</span>

            </div>

            <div className="table-responsive">

                <table className="orders-table">

                    <thead>

                        <tr>

                            <th>Order</th>

                            <th>Shopkeeper</th>

                            <th>Phone</th>

                            <th>Delivery Address</th>

                            <th>Warehouse</th>

                            <th>Total</th>

                            <th>Status</th>

                            <th>Date</th>

                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            orders.map(order => (

                                <tr key={order._id}>

                                    <td>

                                        <div className="order-number">

                                            {order.orderNumber || order._id.slice(-6)}

                                        </div>

                                    </td>

                                    <td>

                                        <div className="customer">

                                            <strong>

                                                {order.shopkeeperName}

                                            </strong>

                                        </div>

                                    </td>

                                    <td>

                                        {order.shopkeeperPhone}

                                    </td>

                                    <td>

                                        <div className="address">

                                            {order.deliveryAddress}

                                        </div>

                                    </td>

                                    <td>

                                        {order.warehouseId?.name}

                                    </td>

                                    <td>

                                        <strong>

                                            ₹{order.totalAmount}

                                        </strong>

                                    </td>

                                    <td>

                                        <span className={getStatusClass(order.status)}>

                                            {order.status}

                                        </span>

                                    </td>

                                    <td>

                                        {

                                            new Date(order.createdAt)

                                                .toLocaleDateString()

                                        }

                                    </td>

                                    <td>

                                        <button

                                            className="view-btn"

                                            onClick={() =>

                                                navigate(

                                                    `/admin/orders/${order._id}`

                                                )

                                            }

                                        >

                                            View Details

                                        </button>

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default OrderList;