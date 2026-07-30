import { Outlet } from "react-router-dom";

import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";

function AdminLayout() {
  return (
    <div className="dashboard-layout">
      <div className="dashboard-main">
        <Outlet />
      </div>

    </div>
  );
}

export default AdminLayout;