import axios from "axios";
import React, { useState } from "react";
import API_BASE_URL from "../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export function ForgotPassword() {
  const [resetEmail, setResetEmail] = useState({
    email: ""
  });
  
  const navigate=useNavigate()

  const handleChange = (e) => {
    setResetEmail({
      ...resetEmail,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/user/request-otp/`, resetEmail);
      toast.success(response?.data?.message);
      navigate('/reset-password/')
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#c4b5fd_1px,transparent_1px)] [background-size:32px_32px] opacity-20 z-0"></div>

      <div className="relative z-10 bg-white border border-purple-300 rounded-lg p-8 shadow-lg w-full max-w-md text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-purple-100 p-4 rounded-full">
            <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a4 4 0 00-4 4v1H5a2 2 0 00-2 2v9a2 2 0 002 2h10a2 2 0 002-2v-9a2 2 0 00-2-2h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-5 6a1 1 0 012 0v1a1 1 0 11-2 0v-1zm4 0a1 1 0 112 0v1a1 1 0 11-2 0v-1z" />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Forget password?</h2>
        <p className="text-sm text-gray-500 mb-6">we’ll send you the updated instructions shortly.</p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={resetEmail.email}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors"
          >
            Reset password
          </button>
        </form>
      </div>
    </div>
  );
}
