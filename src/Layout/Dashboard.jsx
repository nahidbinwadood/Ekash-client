import { Outlet, ScrollRestoration } from "react-router-dom";
import Sidebar from "../Components/Sidebar";

const Dashboard = () => {
  return (
    <div className="relative min-h-screen md:flex">
      <ScrollRestoration />
      {/* <Sidebar /> */}
      <Sidebar />
      {/* Outlet --> Dynamic content */}
      <div className="flex-1 md:ml-64">
        <div className="">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
