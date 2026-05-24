import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";

function Orders() {
  return (
    <div className="dashboard-layout">

      <Sidebar />

      <div className="dashboard-main">

        <Header />

        <h1>Orders Page</h1>

      </div>

    </div>
  );
}

export default Orders;