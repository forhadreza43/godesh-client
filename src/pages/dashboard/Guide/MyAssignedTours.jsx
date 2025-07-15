import { useQuery, useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useUser } from "../../../hooks/useUser";
import Modal from "../../../components/Modal/Modal";
import Loading from "../../../components/shared/Loading";

const MyAssignedTours = () => {
  const axiosSecure = useAxiosSecure();
  const { data: userData, isLoading: userLoading } = useUser();
  const [packageMap, setPackageMap] = useState({});
  const [touristMap, setTouristMap] = useState({});
  const [selectedRejectId, setSelectedRejectId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const {
    data: result = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["assigned-tours", userData?._id, statusFilter, page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/guide/${userData?._id}`, {
        params: { status: statusFilter, page, limit },
      });
      return res.data;
    },
    enabled: !!userData?._id,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const bookings = result.data || [];
  const totalPages = result.totalPages || 1;

  const acceptMutation = useMutation({
    mutationFn: async (id) => {
      return axiosSecure.patch(`/bookings/${id}/status`, {
        status: "accepted",
      });
    },
    onSuccess: () => {
      toast.success("Tour accepted");
      refetch();
    },
    onError: () => toast.error("Failed to accept tour"),
  });

  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      return axiosSecure.patch(`/bookings/${id}/status`, {
        status: "rejected",
      });
    },
    onSuccess: () => {
      toast.success("Tour rejected");
      refetch();
      setSelectedRejectId(null);
    },
    onError: () => toast.error("Failed to reject tour"),
  });

  useEffect(() => {
    const fetchDetails = async () => {
      const packageIds = [...new Set(bookings.map((b) => b.packageId))];
      const touristIds = [...new Set(bookings.map((b) => b.touristId))];
      const newPkgMap = {};
      const newUserMap = {};

      await Promise.all([
        ...packageIds.map(async (id) => {
          const res = await axiosSecure.get(`/packages/${id}`);
          newPkgMap[id] = res.data;
        }),
        ...touristIds.map(async (id) => {
          const res = await axiosSecure.get(`/users/${id}`);
          newUserMap[id] = res.data;
        }),
      ]);

      setPackageMap(newPkgMap);
      setTouristMap(newUserMap);
    };

    if (bookings.length) fetchDetails();
  }, [bookings, axiosSecure]);

  if (isLoading || userLoading) return <Loading />;
  return (
    <div className="mx-auto w-11/12 py-10">
      <h2 className="mb-6 text-2xl font-bold">My Assigned Tours</h2>

      <div className="mb-4">
        <label className="mr-2 font-medium">Filter by status:</label>
        <select
          className="input rounded border px-2 py-1"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="in review">In Review</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Package</th>
              <th className="px-4 py-2 text-left">Tourist</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {bookings.map((b) => {
              const pkg = packageMap[b.packageId];
              const tourist = touristMap[b.touristId];
              return (
                <tr key={b._id}>
                  <td className="px-4 py-2">
                    {pkg?.packageName || "Loading..."}
                  </td>
                  <td className="px-4 py-2">{tourist?.name || "Loading..."}</td>
                  <td className="px-4 py-2">
                    {new Date(b.tourDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">৳ {b.price}</td>
                  <td className="px-4 py-2 capitalize">{b.status}</td>
                  <td className="space-x-2 px-4 py-2">
                    <button
                      onClick={() => acceptMutation.mutate(b._id)}
                      disabled={b.status !== "in review"}
                      className="btn btn-sm btn-primary disabled:opacity-50"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => setSelectedRejectId(b._id)}
                      disabled={b.status !== "in review"}
                      className="btn btn-sm btn-error disabled:opacity-50"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="mt-6 flex justify-center gap-2">
          <button
            disabled={page === 1}
            className="btn btn-sm"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          >
            Prev
          </button>
          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num}
              onClick={() => setPage(num + 1)}
              className={`btn btn-sm ${page === num + 1 ? "btn-primary" : "btn-outline"}`}
            >
              {num + 1}
            </button>
          ))}
          <button
            disabled={page === totalPages}
            className="btn btn-sm"
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          >
            Next
          </button>
        </div>
      </div>

      <Modal
        isOpen={!!selectedRejectId}
        onClose={() => setSelectedRejectId(null)}
        title="Confirm Rejection"
        description="Are you sure you want to reject this tour?"
        confirmText="Yes, Reject"
        onConfirm={() => rejectMutation.mutate(selectedRejectId)}
      />
    </div>
  );
};

export default MyAssignedTours;
