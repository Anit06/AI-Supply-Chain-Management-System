import { Doughnut } from "react-chartjs-2";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function InventoryChart({ status, total }) {
  const segments = [{ label: "In Stock", value: status.inStock, color: "#5068f2" }, { label: "Low Stock", value: status.lowStock, color: "#f5aa40" }, { label: "Out Of Stock", value: status.outOfStock, color: "#f06878" }, { label: "Overstock", value: status.overstock, color: "#7c62e8" }];
  const hasData = segments.some((segment) => segment.value > 0);
  const data = { labels: segments.map((segment) => segment.label), datasets: [{ data: segments.map((segment) => segment.value), backgroundColor: segments.map((segment) => segment.color), borderWidth: 0, hoverOffset: 5 }] };
  return <section className="dashboard-card dashboard-inventory-card"><div className="dashboard-card__heading"><div><p>Availability</p><h2>Inventory Status</h2></div></div><div className="dashboard-donut-wrap"><div className="dashboard-donut">{hasData ? <Doughnut data={data} options={{ cutout: "76%", plugins: { legend: { display: false }, tooltip: { displayColors: false } } }} /> : <div className="dashboard-empty-ring" />}<div className="dashboard-donut__center"><strong>{total.toLocaleString()}</strong><span>Units</span></div></div><div className="dashboard-legend">{segments.map((segment) => <div key={segment.label}><span style={{ backgroundColor: segment.color }} />{segment.label}<b>{segment.value}</b></div>)}</div></div></section>;
}

export default InventoryChart;