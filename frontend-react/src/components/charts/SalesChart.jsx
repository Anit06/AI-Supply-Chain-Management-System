<<<<<<< HEAD
import "../../assets/css/charts.css";

function SalesChart() {
  return (
    <div className="chart-card">

      <h2>Sales Overview</h2>

      <div className="chart-placeholder">
        Sales Chart
      </div>

    </div>
  );
}

export default SalesChart;
=======
import { Line } from "react-chartjs-2";
import { CategoryScale, Chart as ChartJS, Filler, Legend, LineElement, LinearScale, PointElement, Tooltip } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

function SalesChart({ data }) {
  const hasData = data.some((item) => item.sales > 0);
  const chartData = { labels: data.map((item) => item.label), datasets: [{ label: "Sales", data: data.map((item) => item.sales), borderColor: "#5068f2", backgroundColor: "rgba(80, 104, 242, 0.12)", fill: true, tension: 0.42, borderWidth: 3, pointRadius: 0, pointHoverRadius: 5 }] };
  const options = { responsive: true, maintainAspectRatio: false, animation: { duration: 800 }, plugins: { legend: { display: false }, tooltip: { displayColors: false, callbacks: { label: (context) => `₹${context.parsed.y.toLocaleString("en-IN")}` } } }, scales: { x: { grid: { display: false }, border: { display: false }, ticks: { color: "#8d95a6" } }, y: { beginAtZero: true, border: { display: false }, grid: { color: "#eef0f6" }, ticks: { color: "#8d95a6", callback: (value) => `₹${Number(value) / 1000}k` } } } };
  return <section className="dashboard-card dashboard-chart-card"><div className="dashboard-card__heading"><div><p>Performance</p><h2>Sales Overview</h2></div><span className="dashboard-period">Last 6 months</span></div><div className="dashboard-chart-area">{hasData ? <Line data={chartData} options={options} /> : <div className="dashboard-empty-state">Sales data will appear once orders are recorded.</div>}</div></section>;
}

export default SalesChart;
>>>>>>> 8ebc819e3df109c552f8e25d6c537d085fc18a78
