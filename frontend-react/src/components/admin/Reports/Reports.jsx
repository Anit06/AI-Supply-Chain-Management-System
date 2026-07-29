import Sidebar from "../../common/Sidebar";
import Header from "../../common/Header";
import ReportDashboard from "./ReportDashboard";

import "../../../assets/css/reports.css";

function Reports() {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        

        <div className="reports-container">
          <ReportDashboard />
        </div>
      </div>
    </div>
  );
}

export default Reports;
