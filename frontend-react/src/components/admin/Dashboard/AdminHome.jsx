import "../../../assets/css/dashboard.css";

import Sidebar from "../../common/Sidebar";
import Header from "../../common/Header";

import StatsCard from "../../cards/StatsCard";
import SalesChart from "../../charts/SalesChart";
import InventoryChart from "../../charts/InventoryChart";

import RecentOrders from "../../tables/RecentOrders";
import PredictionTable from "../../tables/PredictionTable";
import WarehouseTable from "../../tables/WarehouseTable";

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

    </div>
  );
}

export default AdminHome;