import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";

function Inventory() {
  return (
    <div className="dashboard-layout">

      <Sidebar />

      <div className="dashboard-main">

        <Header />

        <h1>Inventory Page</h1>

      </div>

    </div>
  );
}

export default Inventory;