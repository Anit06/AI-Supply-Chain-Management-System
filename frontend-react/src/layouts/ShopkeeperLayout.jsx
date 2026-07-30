import { Outlet } from "react-router-dom";
import ShopkeeperSidebar from "../components/common/ShopkeeperSidebar";

function ShopkeeperLayout() {
  return (
    <div className="shopkeeper-layout">

      <ShopkeeperSidebar />

      <main className="shopkeeper-main">
        <Outlet />
      </main>

    </div>
  );
}

export default ShopkeeperLayout;