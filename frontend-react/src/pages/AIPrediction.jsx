import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";

function AIPrediction() {
  return (
    <div className="dashboard-layout">

      <Sidebar />

      <div className="dashboard-main">

        <Header />

        <h1>AI Prediction Page</h1>

      </div>

    </div>
  );
}

export default AIPrediction;