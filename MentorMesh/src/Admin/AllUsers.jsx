// ✅ AllUsers.jsx (Updated with filters, edit, and action buttons)
import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";
import { toast } from "react-toastify";
import { FaTrash, FaEdit } from "react-icons/fa";

export function AllUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const access_token = localStorage.getItem("access_token");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/user/users/`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      setUsers(response.data);
    } catch (err) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/user/delete/${id}/`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      toast.success("User deleted");
      fetchUsers();
    } catch (err) {
      toast.error("Failed to delete user");
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      await axios.patch(
        `${API_BASE_URL}/user/update-user/`,
        { user_id: id, role: newRole },
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );
      toast.success("Role updated");
      fetchUsers();
    } catch (err) {
      toast.error("Failed to update role");
    }
  };

  const filteredUsers =
    filter === "all" ? users : users.filter((user) => user.role === filter);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold text-purple-700">All Users</h1>
          <div className="space-x-2">
            <button
              onClick={() => setFilter("all")}
              className="px-3 py-1 rounded bg-purple-200 hover:bg-purple-300"
            >
              All
            </button>
            <button
              onClick={() => setFilter("admin")}
              className="px-3 py-1 rounded bg-purple-200 hover:bg-purple-300"
            >
              Admins
            </button>
            <button
              onClick={() => setFilter("trainer")}
              className="px-3 py-1 rounded bg-purple-200 hover:bg-purple-300"
            >
              Trainers
            </button>
            <button
              onClick={() => setFilter("learner")}
              className="px-3 py-1 rounded bg-purple-200 hover:bg-purple-300"
            >
              Leaners
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-50 uppercase text-gray-500 text-xs">
                <tr>
                  <th className="px-6 py-3">#</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Role</th>
                  <th className="px-6 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user, index) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        className="px-2 py-1 border rounded text-sm focus:outline-none"
                      >
                        <option value="learner">Learner</option>
                        <option value="trainer">Trainer</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-center space-x-2">
                      <button
                        title="Edit user"
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => toast.info("Edit feature coming soon")}
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete user"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
