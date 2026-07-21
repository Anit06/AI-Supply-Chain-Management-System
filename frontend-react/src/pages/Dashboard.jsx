import AdminHome from "../components/admin/Dashboard/AdminHome";
import ShopkeeperHome from "../components/shopkeeper/Dashboard/ShopkeeperHome";

function Dashboard() {

  const role = localStorage.getItem("role");

  const isAdmin =
    role === "admin" || role === "administrative_user";

  return isAdmin
    ? <AdminHome />
    : <ShopkeeperHome />;
}

export default Dashboard;