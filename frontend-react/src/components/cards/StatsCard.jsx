function StatsCard({ icon: Icon, label, value, growth, detail = "vs last month", tone = "blue" }) {
  const numericGrowth = Number(growth || 0);
  const isPositive = numericGrowth >= 0;

  return (
    <article className={`dashboard-stat-card dashboard-stat-card--${tone}`}>
      <div className={`dashboard-stat-card__icon dashboard-stat-card__icon--${tone}`}>
        <Icon />
      </div>
      <div className="dashboard-stat-card__content">
        <p>{label}</p>
        <h2>{value}</h2>
        <div className="dashboard-stat-card__meta">
          <span className={`dashboard-growth ${isPositive ? "dashboard-growth--positive" : "dashboard-growth--negative"}`}>
            <b>{isPositive ? "↗" : "↘"} {Math.abs(numericGrowth)}%</b>
          </span>
          <span>{detail}</span>
        </div>
      </div>
    </article>
  );
}

export default StatsCard;