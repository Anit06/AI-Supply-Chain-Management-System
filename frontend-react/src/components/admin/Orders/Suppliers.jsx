import Sidebar from "../../common/Sidebar";
import Header from "../../common/Header";

function Suppliers() {
  return (
    <div className="dashboard-layout">

      <Sidebar />

      <div className="dashboard-main">

        <Header />

        <h1>Suppliers Page</h1>

      </div>

    </div>
  );
}

export default Suppliers;