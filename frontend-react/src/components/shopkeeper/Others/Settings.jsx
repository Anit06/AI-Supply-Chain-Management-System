import Sidebar from "../../common/Sidebar";
import Header from "../../common/Header";

function Settings() {
  return (
    <div className="dashboard-layout">

      <Sidebar />

      <div className="dashboard-main">

        <Header />

        <h1>Settings Page</h1>

      </div>

    </div>
  );
}

export default Settings;