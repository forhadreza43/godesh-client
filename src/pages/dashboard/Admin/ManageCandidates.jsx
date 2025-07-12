import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Modal from "../../../components/Modal/Modal";
import Button from "../../../components/Button/Button";
import { useNavigate } from "react-router";

const ManageCandidates = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const limit = 10;

  const [selectedUser, setSelectedUser] = useState(null);
  const [modalAction, setModalAction] = useState(""); 

  const { data, isLoading } = useQuery({
    queryKey: ["guide-candidates", page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users/admin?requestStatus=pending&page=${page}&limit=${limit}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const approveMutation = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/users/approve/${id}`),
    onSuccess: () => {
      toast.success("Application approved");
      queryClient.invalidateQueries(["guide-candidates"]);
      setSelectedUser(null);
    },
    onError: () => toast.error("Failed to approve user"),
  });

  const rejectMutation = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/users/reject/${id}`),
    onSuccess: () => {
      toast.success("Application rejected");
      queryClient.invalidateQueries(["guide-candidates"]);
      setSelectedUser(null);
    },
    onError: () => toast.error("Failed to reject user"),
  });

  const handleActionClick = (user, action) => {
    setSelectedUser(user);
    setModalAction(action);
  };

  const handleModalConfirm = () => {
    if (!selectedUser || !modalAction) return;
    if (modalAction === "approve") approveMutation.mutate(selectedUser._id);
    if (modalAction === "reject") rejectMutation.mutate(selectedUser._id);
  };

  const handleApplicationDetails = (email) => {
    navigate(`/dashboard/application-details?email=${email}`);
  }

  const closeModal = () => {
    setSelectedUser(null);
    setModalAction("");
  };

  const totalPages = Math.ceil((data?.total || 0) / limit);

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h2 className="mb-6 text-2xl font-bold">Manage Guide Applications</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : data.users?.length === 0 ? (
        <p className="text-gray-500">No pending applications.</p>
      ) : (
        <>
          <div className="overflow-x-auto rounded bg-white shadow">
            <table className="min-w-full table-auto text-sm">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Role</th>
                  <th className="px-4 py-2">Requested Role</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.users.map((user) => (
                  <tr key={user._id} className="border-t">
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2 max-w-xs truncate">
                      {user.role}
                    </td>
                    <td className="px-4 py-2 max-w-xs truncate">
                      {user.requestedRole}
                    </td>
                    
                    <td className="px-4 py-2">
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleApplicationDetails(user.email)}
                          className="bg-blue-500  text-white hover:bg-blue-700"
                        >
                          View Application
                        </Button>
                        <button
                          onClick={() => handleActionClick(user, "approve")}
                          className="rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleActionClick(user, "reject")}
                          className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="rounded border px-4 py-2 text-sm text-gray-700 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-sm text-gray-700">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page === totalPages}
              className="rounded border px-4 py-2 text-sm text-gray-700 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Confirmation Modal */}
      <Modal
        isOpen={!!selectedUser}
        onClose={closeModal}
        title={`Confirm ${modalAction === "approve" ? "Approval" : "Rejection"}`}
        description={`Are you sure you want to ${
          modalAction === "approve" ? "approve" : "reject"
        } this application?`}
        confirmText={modalAction === "approve" ? "Approve" : "Reject"}
        cancelText="Cancel"
        onConfirm={handleModalConfirm}
      >
        <div className="space-y-2">
          <p>
            <strong>Name:</strong> {selectedUser?.name}
          </p>
          <p>
            <strong>Email:</strong> {selectedUser?.email}
          </p>
          <p>
            <strong>Bio:</strong> {selectedUser?.bio || "N/A"}
          </p>
          {selectedUser?.cvUrl && (
            <p>
              <strong>CV:</strong>{" "}
              <a
                href={selectedUser.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View CV
              </a>
            </p>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ManageCandidates;
