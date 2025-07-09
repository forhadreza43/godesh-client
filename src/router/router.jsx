import { createBrowserRouter, Navigate } from "react-router";
import RootLayout from "../Layouts/RootLayout/RootLayout";
import Home from "../pages/Home";
import DashboardLayout from "../Layouts/DashboardLayout/DashboardLayout";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import DashboardHome from "../pages/dashboard/DashboardHome";
import ForgotPassword from "../pages/ForgetPassword";
import Profile from "../pages/dashboard/Profile";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <SignUp />,
      },
      {
        path: "/forgetPassword",
        element: <ForgotPassword />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        {" "}
        <DashboardLayout />,
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="home" replace />,
      },
      {
        path: "home",
        element: <DashboardHome />,
      },
      {
        path: "/dashboard/profile",
        element: <Profile />,
      },
    ],
  },
]);

export default router;
