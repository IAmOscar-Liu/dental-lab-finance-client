import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function Layout() {
  return (
    <div className="App">
      <Sidebar />
      <main>
        <Header />
        <div className="page">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;
