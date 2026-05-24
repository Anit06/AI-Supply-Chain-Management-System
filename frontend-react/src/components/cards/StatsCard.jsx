import "../../assets/css/cards.css";

function StatsCard() {
  return (
    <div className="stats-card">

      <div className="card-icon">
        📦
      </div>

      <div>

        <h3>Total Products</h3>

        <h1>1,245</h1>

        <p>vs last month</p>

      </div>
    </div>
  );
}

export default StatsCard;