import { useEffect, useMemo, useState } from "react";
import {
  FaBoxOpen,
  FaClipboardList,
  FaRupeeSign,
  FaWarehouse,
  FaChartLine,
  FaBoxes,
} from "react-icons/fa";

import "../../../assets/css/dashboard.css";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "../../common/Sidebar";
import StatsCard from "../../cards/StatsCard";
import SalesChart from "../../charts/SalesChart";
import InventoryChart from "../../charts/InventoryChart";
import RecentOrders from "../../tables/RecentOrders";
import PredictionTable from "../../tables/PredictionTable";
import WarehouseTable from "../../tables/WarehouseTable";

import { getProducts } from "../../../services/productService";
import { getAllOrders } from "../../../services/orderService";
import { getWarehouses } from "../../../services/warehouseService";
import { getStoredPredictions } from "../../../services/aiService";

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

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
      const value = (index, key) => {
        const response = results[index].status === "fulfilled" ? results[index].value : null;
        return Array.isArray(response) ? response : response?.[key] || [];
      };
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
    const { products, orders, warehouses } = dashboard;

    const totalStock = products.reduce(
      (sum, product) => sum + Number(product.quantity ?? product.stock ?? 0),
      0
    );

    const inventoryValue = products.reduce(
      (sum, product) =>
        sum + Number(product.quantity ?? product.stock ?? 0) * Number(product.price || 0),
      0
    );

    const inventory = products.reduce(
      (totals, product) => {
        const stock = Number(product.quantity ?? product.stock ?? 0);
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
        const date = new Date(order.createdAt || order.updatedAt || Date.now());
        const month = months.find(
          (item) => item.month === date.getMonth() && item.year === date.getFullYear()
        );
        if (month) month.sales += Number(order.totalAmount || order.finalAmount || 0);
      });

    const latestOrders = [...orders]
      .sort(
        (left, right) =>
          new Date(right.createdAt || right.updatedAt || 0) -
          new Date(left.createdAt || left.updatedAt || 0)
      )
      .slice(0, 5);

    const warehouseOrderCounts = orders.reduce((counts, order) => {
      if (order.warehouseId) {
        counts[order.warehouseId] = (counts[order.warehouseId] || 0) + 1;
      }
      return counts;
    }, {});

    const maxWarehouseOrders = Math.max(1, ...Object.values(warehouseOrderCounts));

    const warehouseSummary = warehouses.map((warehouse) => {
      const warehouseId = warehouse._id || warehouse.id;
      const usageCount = warehouseId ? warehouseOrderCounts[warehouseId] || 0 : 0;
      const utilization = Math.min(
        100,
        Math.max(12, Math.round((usageCount / maxWarehouseOrders) * 100))
      );
      return {
        ...warehouse,
        utilization,
      };
    });

    const monthRange = (dateValue, targetMonthIndex) => {
      const date = new Date(dateValue);
      if (Number.isNaN(date.getTime())) return false;
      const current = new Date();
      const target = new Date(current);
      target.setMonth(current.getMonth() - targetMonthIndex);
      target.setDate(1);
      target.setHours(0, 0, 0, 0);
      const end = new Date(target);
      end.setMonth(end.getMonth() + 1);
      return date >= target && date < end;
    };

    const currentMonthProducts = products.filter((product) =>
      monthRange(product.createdAt, 0)
    ).length;
    const previousMonthProducts = products.filter((product) =>
      monthRange(product.createdAt, 1)
    ).length;
    const currentMonthOrders = orders.filter((order) => monthRange(order.createdAt, 0)).length;
    const previousMonthOrders = orders.filter((order) => monthRange(order.createdAt, 1)).length;
    const currentMonthWarehouses = warehouses.filter((warehouse) =>
      monthRange(warehouse.createdAt, 0)
    ).length;
    const previousMonthWarehouses = warehouses.filter((warehouse) =>
      monthRange(warehouse.createdAt, 1)
    ).length;
    const currentMonthInventoryValue = products
      .filter((product) => monthRange(product.createdAt, 0))
      .reduce(
        (sum, product) =>
          sum + Number(product.quantity ?? product.stock ?? 0) * Number(product.price || 0),
        0
      );
    const previousMonthInventoryValue = products
      .filter((product) => monthRange(product.createdAt, 1))
      .reduce(
        (sum, product) =>
          sum + Number(product.quantity ?? product.stock ?? 0) * Number(product.price || 0),
        0
      );

    const calculateGrowth = (current, previous) => {
      if (!previous) return current > 0 ? 100 : 0;
      return Number((((current - previous) / previous) * 100).toFixed(1));
    };

    return {
      totalStock,
      inventoryValue,
      inventory,
      months,
      latestOrders,
      warehouseSummary,
      metrics: [
        {
          label: "Total Products",
          value: products.length.toLocaleString(),
          growth: calculateGrowth(currentMonthProducts, previousMonthProducts),
          detail: "vs last month",
          icon: FaBoxOpen,
          tone: "blue",
        },
        {
          label: "Total Warehouses",
          value: warehouses.length.toLocaleString(),
          growth: calculateGrowth(currentMonthWarehouses, previousMonthWarehouses),
          detail: "vs last month",
          icon: FaWarehouse,
          tone: "purple",
        },
        {
          label: "Total Orders",
          value: orders.length.toLocaleString(),
          growth: calculateGrowth(currentMonthOrders, previousMonthOrders),
          detail: "vs last month",
          icon: FaClipboardList,
          tone: "orange",
        },
        {
          label: "Inventory Value",
          value: currencyFormatter.format(inventoryValue),
          growth: calculateGrowth(
            currentMonthInventoryValue,
            previousMonthInventoryValue
          ),
          detail: "vs last month",
          icon: FaRupeeSign,
          tone: "green",
        },
      ],
    };
  }, [dashboard]);

  return (
    <div className="dashboard-shell">
      <Sidebar />

      <div className="dashboard-content">
        <div className="dashboard-page">
          <DashboardHeader
            title="Admin Dashboard"
            subtitle="Operations overview"
          />

          <div className="dashboard-hero">
            <div className="dashboard-hero__copy">
              <p className="dashboard-eyebrow">Live overview</p>
              <h2>Supply chain visibility at a glance</h2>
              <p>
                Monitor inventory, orders, warehouse health, and AI demand
                signals from one place.
              </p>
            </div>
            <div className="dashboard-hero__meta">
              <span className="dashboard-pill">
                <FaChartLine /> Live insights
              </span>
              <span className="dashboard-pill dashboard-pill--soft">
                <FaBoxes /> {dashboard.products.length} products tracked
              </span>
            </div>
          </div>

          {loading && (
            <div className="dashboard-loading">
              Loading live dashboard data…
            </div>
          )}

          <div className="stats-grid">
            {computed.metrics.map((metric) => (
              <StatsCard
                key={metric.label}
                icon={metric.icon}
                label={metric.label}
                value={metric.value}
                growth={metric.growth}
                detail={metric.detail}
                tone={metric.tone}
              />
            ))}
          </div>

          <div className="chart-section">
            <SalesChart data={computed.months} />
            <InventoryChart
              status={computed.inventory}
              total={computed.totalStock}
            />
            <RecentOrders
              orders={computed.latestOrders}
              warehouses={dashboard.warehouses}
            />
          </div>

          <div className="table-section">
            <PredictionTable
              predictions={dashboard.predictions.slice(0, 6)}
              products={dashboard.products}
            />
            <WarehouseTable warehouses={computed.warehouseSummary} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;