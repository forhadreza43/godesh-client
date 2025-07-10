import { Navigate } from "react-router";
import useRole from "../../hooks/useRole";
import Loading from "../../components/shared/Loading";

const DashboardRedirectByRole = () => {
  const [role, loading] = useRole();
  if (!role) return <Loading />;

  const roleRedirects = {
    admin: "/dashboard/manage-profile",
    guide: "/dashboard/assignments",
    tourist: "/dashboard/my-bookings",
  };
  if (loading) return <Loading />;
  return <Navigate to={roleRedirects[role] || "/"} replace />;
};

export default DashboardRedirectByRole;
