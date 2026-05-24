import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";

function Reports() {
  return (
    <div className="dashboard-layout">

      <Sidebar />

      <div className="dashboard-main">

        <Header />

        <h1>Reports Page</h1>

      </div>

    </div>
  );
}

export default Reports;