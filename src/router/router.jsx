import { createBrowserRouter, Navigate } from "react-router";
import RootLayout from "../Layouts/RootLayout/RootLayout";
import Home from "../pages/Home";
import DashboardLayout from "../Layouts/DashboardLayout/DashboardLayout";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import ForgotPassword from "../pages/ForgetPassword";
import Profile from "../pages/dashboard/Profile";
import PrivateRoute from "./PrivateRoute";
import AssignedTours from "../pages/dashboard/Admin/AssignedTours";
import DashboardRedirectByRole from "../Layouts/DashboardLayout/DashboardRedirectByRole";
import AddPackages from "../pages/dashboard/Admin/AddPackages";
import MyBookings from "../pages/dashboard/Tourist/MyBookings";
import TouristProfile from "../pages/dashboard/Tourist/TouristProfile";
import ManageStories from "../pages/dashboard/Tourist/ManageStories";
import JoinAsGuide from "../pages/dashboard/Tourist/JoinAsGuide";
import AddStories from "../pages/dashboard/Tourist/AddStories";
import UpdateStory from "../pages/dashboard/Tourist/UpdateStory";
import ManageUsers from "../pages/dashboard/Admin/ManageUsers";
import ManageCandidates from "../pages/dashboard/Admin/ManageCandidates";
import ManageAdminProfile from "../pages/dashboard/Admin/ManageAdminProfile";
import ApplicationDetails from "../pages/dashboard/Admin/ApplicationDetails";
import GuideProfile from "../pages/dashboard/Guide/GuideProfile";
import PackageDetails from "../pages/PackageDetails";
import AllPackages from "../pages/AllPackages";
import GuideDetails from "../pages/GuideDetails";
import Payment from "../pages/dashboard/Payment/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import MyAssignedTours from "../pages/dashboard/Guide/MyAssignedTours";
import AllStories from "../pages/AllStories";
import AboutUs from "../pages/AboutUs";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

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
        path: "/package/:id",
        element: <PackageDetails />,
      },
      {
        path: "/guide/:id",
        element: <GuideDetails />,
      },
      {
        path: "/all-packages",
        element: <AllPackages />,
      },
      {
        path: "/all-stories",
        element: <AllStories/>,
      },
      {
        path: "/forgetPassword",
        element: <ForgotPassword />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
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
        path: "application-details",
        element: <ApplicationDetails />,
      },
      {
        path: "manage-admin-profile",
        element: <ManageAdminProfile />,
      },
      {
        path: "add-packages",
        element: <AddPackages />,
      },
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
      {
        path: "manage-candidates",
        element: <ManageCandidates />,
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
      {
        path: "update-story/:id",
        element: <UpdateStory />,
      },
      {
        path: "payment/:bookingId",
        element: (
          <Elements stripe={stripePromise}>
            <Payment />
          </Elements>
        ),
      },
      //Guide route
      {
        path: "my-assign-tour",
        element: <MyAssignedTours />,
      },
      {
        path: "guide-profile",
        element: <GuideProfile />,
      },
    ],
  },
]);

export default router;
