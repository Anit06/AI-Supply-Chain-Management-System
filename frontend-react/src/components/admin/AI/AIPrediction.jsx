import Sidebar from "../../common/Sidebar";
import DemandPrediction from "./DemandPrediction";

function AIPrediction() {
  return (
    <div className="dashboard-layout">

      <Sidebar />

      <div className="dashboard-main">

        <h1>AI Prediction Page</h1>
        <DemandPrediction />
      </div>

    </div>
  );
}

export default AIPrediction;