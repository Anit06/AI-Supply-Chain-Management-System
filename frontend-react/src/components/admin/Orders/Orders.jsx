import { useEffect, useState } from "react";
import Sidebar from "../../common/Sidebar";
import { getAllOrders, getOrderAnalytics } from "../../../services/orderService";
import AnalyticsCards from "./AnalyticsCards";
import OrderList from "./OrderList";

import "../../../assets/css/order.css";

function Orders() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [analytics, setAnalytics] = useState(null);

    useEffect(() => {

        loadOrders();

    }, []);

    const loadOrders = async () => {

        try {

            const [

                orderResponse,

                analyticsResponse

            ] = await Promise.all([

                getAllOrders(),

                getOrderAnalytics()

            ]);

            setOrders(

                orderResponse.orders || []

            );

            setAnalytics(

                analyticsResponse.analytics

            );

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return <h2>Loading...</h2>;

    }

    return (
    <div className="order-layout">

        <Sidebar />

        <div className="catalog-container">

            <h2>Order Dashboard</h2>

            <AnalyticsCards analytics={analytics} />

            <OrderList

                orders={orders}

                reload={loadOrders}

            />

        </div>
      </div>

    );

}

export default Orders;