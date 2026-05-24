import { Outlet } from "react-router-dom";

import Sidebar from "../components/common/Sidebar";

function AdminLayout() {
  return (
    <div className="flex">
      <div className="flex-1 p-5">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;