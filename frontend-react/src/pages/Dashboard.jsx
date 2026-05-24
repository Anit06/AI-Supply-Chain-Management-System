import "../assets/css/dashboard.css";
import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";
import StatsCard from "../components/cards/StatsCard";
import SalesChart from "../components/charts/SalesChart";
import InventoryChart from "../components/charts/InventoryChart";
import RecentOrders from "../components/tables/RecentOrders";
import PredictionTable from "../components/tables/PredictionTable";
import WarehouseTable from "../components/tables/WarehouseTable";


export default function Dashboard() {
  return (
    <div className="dashboard-layout">

      <Sidebar />

      <div className="dashboard-main">

        <Header />

        <div className="stats-grid">

          <StatsCard />
          <StatsCard />
          <StatsCard />
          <StatsCard />

        </div>

        <div className="chart-section">

          <SalesChart />

          <InventoryChart />

          <RecentOrders />

        </div>

        <div className="table-section">

          <PredictionTable />

          <WarehouseTable />

        </div>

      </div>
    </div>
  );
}