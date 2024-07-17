import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Layout/Dashboard";
import Profile from "../Pages/Profile";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import PrivateRoute from "./PrivateRoute";
import LoginNumber from "../Pages/LoginNumber";
import SendMoney from './../Pages/Users/SendMoney';
import CashIn from "../Pages/Users/CashIn";
import CashOut from "../Pages/Users/CashOut";
import UserTransaction from "../Pages/Users/UserTransaction";
import AdminProfile from "../Pages/Admin/AdminProfile";
import UserManagement from "../Pages/Admin/UserManagement";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path:"/user-profile",
        element: <Profile />,
      },
      {
        path:"/send-money",
        element: <SendMoney />,
      },
      {
        path:"/cash-in",
        element: <CashIn />,
      },
      {
        path:"/cash-out",
        element: <CashOut />,
      },
      {
        path:"/user-transactions",
        element: <UserTransaction />,
      },

      // Admin:
      {
        path:"/admin-profile",
        element: <AdminProfile />,
      },
      {
        path:"/user-management",
        element: <UserManagement />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/login-number", element: <LoginNumber /> },
  { path: "/register", element: <Register /> },
]);
