import React, { useEffect, useState } from "react";
import "./OrderHistory.css";

function OrderHistory() {

   const [orders, setOrders] = useState([
  {
    _id: "ORD-1001",
    createdAt: "2026-07-03T10:30:00",
    status: "Pending",
    totalAmount: 4850,
    deliveryAddress: "Sector 62, Noida",
    notes: "Urgent delivery before 6 PM",
    items: [
      {
        product: {
          _id: "P101",
          name: "Basmati Rice 25 Kg"
        },
        quantity: 2,
        price: 1800
      },
      {
        product: {
          _id: "P102",
          name: "Sugar 10 Kg"
        },
        quantity: 1,
        price: 450
      }
    ]
  },
  {
    _id: "ORD-1002",
    createdAt: "2026-07-02T09:15:00",
    status: "Delivered",
    totalAmount: 7350,
    deliveryAddress: "Bangalore",
    notes: "Packed Carefully",
    items: [
      {
        product: {
          _id: "P103",
          name: "Fortune Oil 15 L"
        },
        quantity: 3,
        price: 2450
      }
    ]
  }
]);

  
  const [loading, setLoading] = useState(false);
    const [expanded, setExpanded] = useState(null);

    const loadOrders = async () => {

        try {

            const data = await getOrderHistory();

            setOrders(data.orders);

        }

        catch (err) {

            console.log(err);

            alert("Unable to load orders.");

        }

        finally {

            setLoading(false);

        }

    };

   
    if (loading) {

        return (

            <div className="loading">

                Loading Orders...

            </div>

        );

    }

    return (

        <div className="history-container">

            <h1>

                My Orders

            </h1>

            {

                orders.length === 0 ?

                    (

                        <div className="empty">

                            No Orders Found

                        </div>

                    )

                    :

                    (

                        orders.map(order => (

                            <div
                                className="order-card"
                                key={order._id}
                            >

                                <div className="order-header">

                                    <div>

                                        <h3>

                                            Order ID

                                        </h3>

                                        <p>

                                            {order._id}

                                        </p>

                                    </div>

                                    <div>

                                        <h3>

                                            Date

                                        </h3>

                                        <p>

                                            {new Date(
                                                order.createdAt
                                            ).toLocaleDateString()}

                                        </p>

                                    </div>

                                    <div>

                                        <h3>

                                            Status

                                        </h3>

                                        <span
                                            className={`status ${order.status.toLowerCase()}`}
                                        >

                                            {order.status}

                                        </span>

                                    </div>

                                    <div>

                                        <h3>

                                            Total

                                        </h3>

                                        <p>

                                            ₹{order.totalAmount}

                                        </p>

                                    </div>

                                </div>

                                <button
                                    className="view-btn"
                                    onClick={() =>
                                        setExpanded(
                                            expanded === order._id
                                                ? null
                                                : order._id
                                        )
                                    }
                                >

                                    {

                                        expanded === order._id

                                            ? "Hide Details"

                                            : "View Details"

                                    }

                                </button>

                                {

                                    expanded === order._id &&

                                    (

                                        <div className="details">

                                            <table>

                                                <thead>

                                                    <tr>

                                                        <th>

                                                            Product

                                                        </th>

                                                        <th>

                                                            Price

                                                        </th>

                                                        <th>

                                                            Qty

                                                        </th>

                                                        <th>

                                                            Total

                                                        </th>

                                                    </tr>

                                                </thead>

                                                <tbody>

                                                    {

                                                        order.items.map(item => (

                                                            <tr
                                                                key={
                                                                    item.product._id
                                                                }
                                                            >

                                                                <td>

                                                                    {

                                                                        item.product.name

                                                                    }

                                                                </td>

                                                                <td>

                                                                    ₹{

                                                                        item.price

                                                                    }

                                                                </td>

                                                                <td>

                                                                    {

                                                                        item.quantity

                                                                    }

                                                                </td>

                                                                <td>

                                                                    ₹{

                                                                        item.price *
                                                                        item.quantity

                                                                    }

                                                                </td>

                                                            </tr>

                                                        ))

                                                    }

                                                </tbody>

                                            </table>

                                            <div className="address">

                                                <h4>

                                                    Delivery Address

                                                </h4>

                                                <p>

                                                    {

                                                        order.deliveryAddress

                                                    }

                                                </p>

                                            </div>

                                            <div className="notes">

                                                <h4>

                                                    Notes

                                                </h4>

                                                <p>

                                                    {

                                                        order.notes

                                                    }

                                                </p>

                                            </div>

                                          

                                        </div>

                                    )

                                }

                            </div>

                        ))

                    )

            }

        </div>

    );

}

export default OrderHistory;