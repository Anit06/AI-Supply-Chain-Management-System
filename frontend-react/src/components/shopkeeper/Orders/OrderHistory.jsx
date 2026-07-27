import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getOrders } from "../../../services/orderService";

import "../../../assets/css/orderHistory.css";

function OrderHistory() {

    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {

        try {

            const response = await getOrders();

            setOrders(response.orders || []);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }
    };

    if (loading) {

        return <h2>Loading...</h2>;

    }

    return (

        <div className="order-history">

            <h2>My Orders</h2>

            {

                orders.length === 0 ?

                    <div className="empty-orders">

                        <h3>No Orders Found</h3>

                        <p>

                            You haven't placed any order yet.

                        </p>

                    </div>

                    :

                    orders.map(order => (

                        <div
                            className="order-card"
                            key={order._id}
                        >

                            <div className="order-header">

                                <div>

                                    <h3>

                                        Order #

                                        {order._id.slice(-6)}

                                    </h3>

                                    <small>

                                        {new Date(order.createdAt).toLocaleString()}

                                    </small>

                                </div>

                                <span
                                    className={`status ${order.status.toLowerCase()}`}
                                >
                                    {order.status}
                                </span>

                            </div>

                            <hr />

                            <p>
                                <strong>Warehouse :</strong>{" "}
                                {order.warehouseId?.name}
                            </p>

                            <p>
                                <strong>Total Items :</strong>{" "}
                                {
                                    order.items.reduce(
                                        (sum, item) => sum + item.quantity,
                                        0
                                    )
                                }
                            </p>

                            {

                                order.items.map(item => (

                                    <div
                                        key={item._id}
                                        className="order-item"
                                    >

                                        <img
                                            src={`http://localhost:5000/${item.image}`}
                                            alt={item.productName}
                                        />

                                        <div className="item-details">

                                            <h4>

                                                {item.productName}

                                            </h4>

                                            <p>

                                                Qty :

                                                {" "}

                                                {item.quantity}

                                            </p>

                                            <p>

                                                Price :

                                                ₹{item.price}

                                            </p>

                                        </div>

                                        <div>

                                            ₹{item.subtotal}

                                        </div>

                                    </div>

                                ))

                            }

                            <hr />

                            <div className="order-footer">

                                <h3>

                                    Total ₹{order.totalAmount}

                                </h3>

                                <button

                                    className="track-order-btn"

                                    onClick={() =>
                                        navigate(`/shopkeeper/order/${order._id}/track`)
                                    }

                                >

                                    Track Order

                                </button>

                            </div>

                        </div>

                    ))

            }

        </div>

    );

}

export default OrderHistory;