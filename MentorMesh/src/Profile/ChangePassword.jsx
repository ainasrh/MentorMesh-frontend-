import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import API_BASE_URL from "../config";
import { useNavigate } from "react-router-dom";

export function ChangePassword() {
  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });
  const navigate=useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.new_password !== formData.confirm_password) {
      toast.error("New passwords do not match");
      return;
    }

    try {
      const token = localStorage.getItem("access_token");

      await axios.post(
        `${API_BASE_URL}/user/change-password/`,
        {
          old_password: formData.current_password,
          new_password: formData.new_password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Password changed successfully!");
      setFormData({ current_password: "", new_password: "", confirm_password: "" });
      navigate("/profile")
    } catch (err) {
      console.error(err.response?.data?.error);
      toast.error(err.response?.data?.error[0] || "Failed to change password");
    }
  };

  return (
    <div className="min-h-screen bg-purple-100  flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1f1f2e] text-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-violet-400">🔒 Change Password</h2>

        <div>
          <label className="block text-sm mb-1 text-purple-300">Current Password</label>
          <input
            type="password"
            name="current_password"
            value={formData.current_password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-[#2e2e3e] border border-purple-600 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-purple-300">New Password</label>
          <input
            type="password"
            name="new_password"
            value={formData.new_password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-[#2e2e3e] border border-purple-600 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-purple-300">Confirm New Password</label>
          <input
            type="password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-[#2e2e3e] border border-purple-600 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-violet-600 hover:bg-purple-700 transition duration-200 py-2 rounded-lg text-white font-semibold"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}
