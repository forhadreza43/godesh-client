import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Modal from "../../../components/Modal/Modal";
import Loading from "../../../components/shared/Loading";
import { useUser } from "../../../hooks/useUser";
import Profile from "../../../components/Profile";

const ManageAdminProfile = () => {
  const axiosSecure = useAxiosSecure();
  // const { user, loading } = useAuth();
  const { data: user } = useUser();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name,
    image: user?.image,
  });

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/stats");
      return res.data;
    },
  });

  const handleEdit = async () => {
    await axiosSecure.patch(`/users/email/${user._id}`, {
      name: formData.name,
      image: formData.image,
    });
    setIsEditOpen(false);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="mx-auto space-y-8 p-6">
      <h2 className="text-3xl font-bold">Welcome, {user?.name}</h2>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard
          title="Total Payment"
          value={`$${stats.totalBookingPrice || 0}`}
        />
        <StatCard title="Total Tour Guides" value={stats.totalGuides} />
        <StatCard title="Total Tourist" value={stats.totalTourist} />
        <StatCard
          title="Total Users"
          value={stats.totalGuides + stats.totalTourist}
        />
        <StatCard title="Total Packages" value={stats.totalPackages} />
        <StatCard title="Total Stories" value={stats.totalStories} />
      </div>

      {/* Admin Info */}
      <div className="rounded-lg bg-green-100 py-20 shadow">
        <Profile />
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Edit Admin Info"
        description="You can only update name and image"
        confirmText="Save"
        cancelText="Cancel"
        onConfirm={handleEdit}
      >
        <div className="space-y-4">
          <div>
            <label className="mb-1 block">Name</label>
            <input
              type="text"
              className="w-full rounded border px-3 py-2"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div>
            <label className="mb-1 block">Photo URL</label>
            <input
              type="text"
              className="w-full rounded border px-3 py-2"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ManageAdminProfile;

const StatCard = ({ title, value }) => (
  <div className="rounded bg-green-100 p-4 text-center shadow">
    <p className="text-primary">{title}</p>
    <h4 className="mt-1 text-xl font-bold">{value}</h4>
  </div>
);
