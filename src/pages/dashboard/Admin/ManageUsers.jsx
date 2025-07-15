import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Select from "react-select";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const roleOptions = [
  { value: "", label: "All Roles" },
  { value: "tourist", label: "Tourist" },
  { value: "guide", label: "Guide" },
  { value: "admin", label: "Admin" },
];

const searchFieldOptions = [
  { value: "name", label: "Name" },
  { value: "email", label: "Email" },
  { value: "role", label: "Role" },
];

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState(searchFieldOptions[0]);
  const [selectedRole, setSelectedRole] = useState(roleOptions[1]);
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data = { users: [], total: 0 }, isFetching } = useQuery({
    queryKey: ["users", search, searchField.value, selectedRole.value, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users/admin?searchField=${searchField.value}&search=${search}&role=${selectedRole.value}&page=${page}&limit=${limit}`,
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const totalPages = Math.ceil(data.total / limit);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // Reset to first page
  };

  const nextPage = () => setPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h2 className="mb-6 text-2xl font-bold">Manage Users</h2>

      <form
        onSubmit={handleSearch}
        className="mb-6 flex flex-col gap-4 md:flex-row"
      >
        <Select
          options={searchFieldOptions}
          value={searchField}
          onChange={(val) => setSearchField(val)}
          className="md:w-1/5"
        />
        <input
          type="text"
          placeholder={`Search by ${searchField.label.toLowerCase()}`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded border px-3 py-2 md:w-1/3"
        />

        <Select
          options={roleOptions}
          value={selectedRole}
          onChange={(val) => setSelectedRole(val)}
          className="md:w-1/4"
        />
        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      <div className="overflow-x-auto rounded bg-white shadow">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Created At</th>
              <th className="px-4 py-2">Last Login</th>
            </tr>
          </thead>
          <tbody>
            {data.users.length > 0 ? (
              data.users.map((user) => (
                <tr key={user._id} className="border-t">
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2 capitalize">
                    {user.role || "tourist"}
                  </td>
                  <td className="px-4 py-2">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    {new Date(user.lastLoginAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-4 text-center text-gray-500">
                  {isFetching ? "Loading users..." : "No users found"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={prevPage}
          disabled={page === 1}
          className="rounded border px-4 py-2 text-sm text-gray-700 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2 text-sm text-gray-700">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={page >= totalPages}
          className="rounded border px-4 py-2 text-sm text-gray-700 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageUsers;
