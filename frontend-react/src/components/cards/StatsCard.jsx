function StatsCard({ icon: Icon, label, value, growth, tone = "blue" }) {
  return <article className="dashboard-stat-card"><div className={`dashboard-stat-card__icon dashboard-stat-card__icon--${tone}`}><Icon /></div><div className="dashboard-stat-card__content"><p>{label}</p><h2>{value}</h2><span className="dashboard-growth"><b>↗ {growth}%</b> vs last month</span></div></article>;
}

export default StatsCard;