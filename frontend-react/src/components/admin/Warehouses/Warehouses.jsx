import Sidebar from "../../common/Sidebar";
import Header from "../../common/Header";

function Warehouses() {
  return (
    <div className="dashboard-layout">

      <Sidebar />

      <div className="dashboard-main">

        <Header />

        <h1>Warehouses Page</h1>

      </div>

    </div>
  );
}

export default Warehouses;