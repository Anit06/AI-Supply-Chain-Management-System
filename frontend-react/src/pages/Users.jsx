import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";

function Users() {
  return (
    <div className="dashboard-layout">

      <Sidebar />

      <div className="dashboard-main">

        <Header />

        <h1>Users Page</h1>

      </div>

    </div>
  );
}

export default Users;