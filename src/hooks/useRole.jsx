import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { useAuth } from "./useAuth";

const useRole = () => {
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    // console.log(user);

  useEffect(() => {
    if (!user?.email) return;

    const fetchRole = async () => {
      try {
        const res = await axiosSecure(`/users/role/${user.email}`);
        setRole(res.data.role);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch role", err);
      }
    };

    fetchRole();
  }, [axiosSecure, user?.email]);

  return [role, loading];
};

export default useRole;
