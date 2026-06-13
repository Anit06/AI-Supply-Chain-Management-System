import AdminHome from "../components/admin/Dashboard/AdminHome";
import ShopkeeperHome from "../components/shopkeeper/Dashboard/ShopkeeperHome";

function Dashboard() {

  const role = localStorage.getItem("role");

  return role === "admin"
    ? <AdminHome />
    : <ShopkeeperHome />;
}

export default Dashboard;