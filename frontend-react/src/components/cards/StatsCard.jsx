<<<<<<< HEAD
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
=======
function StatsCard({ icon: Icon, label, value, growth, tone = "blue" }) {
  return <article className="dashboard-stat-card"><div className={`dashboard-stat-card__icon dashboard-stat-card__icon--${tone}`}><Icon /></div><div className="dashboard-stat-card__content"><p>{label}</p><h2>{value}</h2><span className="dashboard-growth"><b>↗ {growth}%</b> vs last month</span></div></article>;
}

export default StatsCard;
>>>>>>> 8ebc819e3df109c552f8e25d6c537d085fc18a78
