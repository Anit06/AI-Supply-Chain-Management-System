<<<<<<< HEAD
import "../../../assets/css/dashboard.css";

import Sidebar from "../../common/Sidebar";
import Header from "../../common/Header";

import StatsCard from "../../cards/StatsCard";
import SalesChart from "../../charts/SalesChart";
import InventoryChart from "../../charts/InventoryChart";

=======
import { useEffect, useMemo, useState } from "react";
import {
  FaBoxOpen,
  FaClipboardList,
  FaRupeeSign,
  FaWarehouse,
} from "react-icons/fa";

import "../../../assets/css/dashboard.css";
import DashboardHeader from "./DashboardHeader";
import StatsCard from "../../cards/StatsCard";
import SalesChart from "../../charts/SalesChart";
import InventoryChart from "../../charts/InventoryChart";
>>>>>>> 8ebc819e3df109c552f8e25d6c537d085fc18a78
import RecentOrders from "../../tables/RecentOrders";
import PredictionTable from "../../tables/PredictionTable";
import WarehouseTable from "../../tables/WarehouseTable";

<<<<<<< HEAD
function AdminHome() {
  return (
    <div className="dashboard-layout">

      <Sidebar />

      <div className="dashboard-main">

        <Header />

        {/* Statistics Cards */}
        <div className="stats-grid">

          <StatsCard />
          <StatsCard />
          <StatsCard />
          <StatsCard />

        </div>

        {/* Charts */}
        <div className="chart-section">

          <SalesChart />

          <InventoryChart />

          <RecentOrders />

        </div>

        {/* Tables */}
        <div className="table-section">

          <PredictionTable />

          <WarehouseTable />

        </div>

      </div>

=======
import { getProducts } from "../../../services/productService";
import { getAllOrders } from "../../../services/orderService";
import { getWarehouses } from "../../../services/warehouseService";
import { getStoredPredictions } from "../../../services/aiService";

function AdminHome() {
  const [dashboard, setDashboard] = useState({
    products: [],
    orders: [],
    warehouses: [],
    predictions: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    Promise.allSettled([
      getProducts(),
      getAllOrders(),
      getWarehouses(),
      getStoredPredictions(),
    ]).then((results) => {
      if (!active) return;
      const value = (index, key) =>
        results[index].status === "fulfilled"
          ? results[index].value?.[key] || []
          : [];
      setDashboard({
        products: value(0, "products"),
        orders: value(1, "orders"),
        warehouses: value(2, "warehouses"),
        predictions: value(3, "predictions"),
      });
      setLoading(false);
    });

    return () => {
      active = false;
    };
  }, []);

  const computed = useMemo(() => {
    const { products, orders } = dashboard;

    const totalStock = products.reduce(
      (sum, product) => sum + Number(product.stock || 0),
      0
    );

    const inventoryValue = products.reduce(
      (sum, product) =>
        sum + Number(product.stock || 0) * Number(product.price || 0),
      0
    );

    const inventory = products.reduce(
      (totals, product) => {
        const stock = Number(product.stock || 0);
        if (stock === 0) totals.outOfStock += 1;
        else if (stock <= 20) totals.lowStock += 1;
        else if (stock > 100) totals.overstock += 1;
        else totals.inStock += 1;
        return totals;
      },
      { inStock: 0, lowStock: 0, outOfStock: 0, overstock: 0 }
    );

    const months = Array.from({ length: 6 }, (_, index) => {
      const date = new Date();
      date.setMonth(date.getMonth() - (5 - index));
      return {
        label: date.toLocaleDateString("en-US", { month: "short" }),
        month: date.getMonth(),
        year: date.getFullYear(),
        sales: 0,
      };
    });

    orders
      .filter((order) => order.status !== "Cancelled")
      .forEach((order) => {
        const date = new Date(order.createdAt);
        const month = months.find(
          (item) =>
            item.month === date.getMonth() && item.year === date.getFullYear()
        );
        if (month) month.sales += Number(order.totalAmount || 0);
      });

    return { totalStock, inventoryValue, inventory, months };
  }, [dashboard]);

  return (
    <div className="dashboard-layout">
      <div className="dashboard-main">
        <DashboardHeader />

        {loading && (
          <div className="dashboard-loading">
            Loading live dashboard data…
          </div>
        )}

        <div className="stats-grid">
          <StatsCard
            icon={FaBoxOpen}
            label="Total Products"
            value={dashboard.products.length.toLocaleString()}
            growth="12.5"
            tone="blue"
          />
          <StatsCard
            icon={FaWarehouse}
            label="Total Warehouses"
            value={dashboard.warehouses.length.toLocaleString()}
            growth="8.2"
            tone="purple"
          />
          <StatsCard
            icon={FaClipboardList}
            label="Total Orders"
            value={dashboard.orders.length.toLocaleString()}
            growth="16.8"
            tone="orange"
          />
          <StatsCard
            icon={FaRupeeSign}
            label="Inventory Value"
            value={`₹${computed.inventoryValue.toLocaleString("en-IN")}`}
            growth="10.4"
            tone="green"
          />
        </div>

        <div className="chart-section">
          <SalesChart data={computed.months} />
          <InventoryChart
            status={computed.inventory}
            total={computed.totalStock}
          />
          <RecentOrders orders={dashboard.orders.slice(0, 7)} />
        </div>

        <div className="table-section">
          <PredictionTable
            predictions={dashboard.predictions}
            products={dashboard.products}
          />
          <WarehouseTable warehouses={dashboard.warehouses} />
        </div>
      </div>
>>>>>>> 8ebc819e3df109c552f8e25d6c537d085fc18a78
    </div>
  );
}

export default AdminHome;