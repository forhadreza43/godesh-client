import { createBrowserRouter, Navigate } from "react-router";
import RootLayout from "../Layouts/RootLayout/RootLayout";
import Home from "../pages/Home";
import DashboardLayout from "../Layouts/DashboardLayout/DashboardLayout";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import ForgotPassword from "../pages/ForgetPassword";
import Profile from "../pages/dashboard/Profile";
import PrivateRoute from "./PrivateRoute";
import ManageProfile from "../pages/dashboard/Admin/ManageProfile";
import AssignedTours from "../pages/dashboard/Admin/AssignedTours";
import DashboardRedirectByRole from "../Layouts/DashboardLayout/DashboardRedirectByRole";
import AddPackages from "../pages/dashboard/Admin/AddPackages";
import MyBookings from "../pages/dashboard/Tourist/MyBookings";
import TouristProfile from "../pages/dashboard/Tourist/TouristProfile";
import ManageStories from "../pages/dashboard/Tourist/ManageStories";
import JoinAsGuide from "../pages/dashboard/Tourist/JoinAsGuide";
import AddStories from "../pages/dashboard/Tourist/AddStories";

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
        <DashboardLayout />,
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardRedirectByRole />,
      },
      // Admin routes
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "manage-profile",
        element: <ManageProfile />,
      },
      {
        path: "add-packages",
        element: <AddPackages />,
      },
      {
        path: "assigned-tours",
        element: <AssignedTours />,
      },
      // tourist Routes
      {
        path: "my-bookings",
        element: <MyBookings />,
      },
      {
        path: "manage-tourist-profile",
        element: <TouristProfile />,
      },
      {
        path: "manage-stories",
        element: <ManageStories />,
      },
      {
        path: "join-as-guide",
        element: <JoinAsGuide />,
      },
      {
        path: "add-story",
        element: <AddStories />,
      },
    ],
  },
]);

export default router;
