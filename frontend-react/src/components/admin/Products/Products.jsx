import Sidebar from "../../common/Sidebar";
import Header from "../../common/Header";

function Products() {
  return (
    <div className="dashboard-layout">

      <Sidebar />

      <div className="dashboard-main">

        <Header />

        <h1>Products Page</h1>

      </div>

    </div>
  );
}

export default Products;