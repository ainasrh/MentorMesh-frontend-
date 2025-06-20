import axios from "axios";
import React, { useState } from "react";
import API_BASE_URL from "../config";
import { toast } from "react-toastify";

export function ResetPassword() {
  const [resetForm, setResetForm] = useState({
    otp: "",
    new_password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    setResetForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (resetForm.new_password !== resetForm.confirm_password) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/user/reset-password/`,
        {
          otp: resetForm.otp,
          new_password: resetForm.new_password,
        },
        {
            headers: {
              "Content-Type": "application/json",
            },
        }
      );
      toast.success(response.data.message || "Password changed successfully");
    } catch (error) {
      toast.error(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Reset password</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={resetForm.otp}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="new_password"
            placeholder="New Password"
            value={resetForm.new_password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="confirm_password"
            placeholder="Re-enter Password"
            value={resetForm.confirm_password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-gray-600 text-white py-2 rounded-xl hover:bg-gray-700 transition"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
