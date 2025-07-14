import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config";
import { toast } from "react-toastify";

export function Registration() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirm_password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match");
      return;
    }

    try {
      const { confirm_password, ...submitData } = formData;
      const response = await axios.post(`${API_BASE_URL}/user/register/`, submitData);

      toast.success(response.data.message || "Registration successful!");
      navigate("/login");
    } catch (error) {
      if (error.response?.data) { 
        const errData = error.response.data;
        const firstErrorKey = Object.keys(errData)[0];
        setError(errData[firstErrorKey] || "Something went wrong.");
      } else {
        setError("Something went wrong.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="p-4 rounded-md ml-2">
        <img src="/Images/Regitser_image.png" alt="Illustration" className="h-200 w-200 mr-10 mx-auto" />
      </div>

      <div className="p-8 rounded-lg ml-6 flex flex-col" style={{ width: "400px" }}>
        <form className="flex flex-col justify-between h-full" onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-5">Register with Email</h1>

          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
    
          <div className="space-y-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-400"
              required
            />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-400"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-400"
              required
            />
            <input
              type="password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full    font-semibold py-2 rounded-md hover:bg-purple-700 mt-6"
          >
            Continue with Email
          </button>

          <div className="mt-6">
            <p className="text-center text-sm text-gray-600 mb-4">Other sign up options</p>
            <div className="flex justify-center space-x-4">
              {["google.com", "facebook.com", "apple.com"].map((domain) => (
                <button key={domain} className="p-2 border border-gray-300 rounded-full hover:bg-gray-100">
                  <img src={`https://${domain}/favicon.ico`} alt={domain} className="h-6 w-6" />
                </button>
              ))}
            </div>
          </div>

          <p className="text-center text-xs text-gray-500 mt-6">
            By signing up, you agree to our{" "}
            <a href="#" className="text-purple-600 hover:underline">Terms of Use</a> &{" "}
            <a href="#" className="text-purple-600 hover:underline">Privacy Policy</a>
          </p>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link className="text-purple-600 hover:underline" to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
  