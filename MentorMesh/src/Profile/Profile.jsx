import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { User, Edit3, Lock, LogOut, Mail, Loader } from 'lucide-react';
import API_BASE_URL from "../config";


export function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return;
    }
    
    axios
      .get(`${API_BASE_URL}/user/users/me/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUserDetails(res.data);
        console.log('logger user details',userDetails)
        setIsLoading(false);
        console.log(res.data);
      })
      .catch((err) => {
        console.error("Failed to get user:", err.response?.data);
        setIsLoading(false);
      });
  }, [token]);

  const Logout = async () => {
    const refresh_token = localStorage.getItem("refresh_token");

    try {
      await axios.post(`${API_BASE_URL}/user/logout/`, {
        refresh_token,
      });

      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      toast.success("Logout successful");
      navigate("/login");
    } catch (err) {
      console.log("Logout error:", err.response?.data || err.message);
      toast.error("Logout failed");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 flex items-center justify-center">
        <div className="flex items-center space-x-2 text-purple-600">
          <Loader className="w-6 h-6 animate-spin" />
          <span className="text-lg">Loading...</span>
        </div>
      </div>
    );
  }

  if (!userDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-lg mb-4">User not found</div>
          <Link to="/login" className="text-purple-600 hover:text-purple-800 underline">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">

        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <User className="w-6 h-6 text-purple-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">{userDetails.username}</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Image and Status */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                {userDetails.avatar_url ? (
                  <img
                    src={userDetails.avatar_url}
                    alt="Avatar"
                    className="w-32 h-32 rounded-full object-cover border-4 border-purple-400 shadow-md"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-purple-500 text-white flex items-center justify-center text-4xl font-bold shadow-md border-4 border-purple-400">
                    {userDetails.username?.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white px-3 py-1 rounded-full text-sm capitalize">
                  {userDetails.role || 'Learner'}
                </div>
              </div>
              <div className="text-center">
                <div className={`text-sm font-medium ${userDetails.is_email_verified ? 'text-green-600' : 'text-red-600'}`}>
                  {userDetails.is_email_verified ? '✓ Email Verified' : '✗ Email Not Verified'}
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">UserName</label>
                    <div className="text-gray-800 font-medium">{userDetails.username}</div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <div className="text-gray-800">{userDetails.first_name || '—'}</div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <div className="text-gray-800">{userDetails.last_name || '—'}</div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Mail className="inline w-4 h-4 mr-1" />
                      Email
                    </label>
                    <div className="text-gray-800">{userDetails.email}</div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      📝 Bio
                    </label>
                    <div className="text-gray-800">{userDetails.bio || 'No bio added yet.'}</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mt-6">
                  <Link to="update/">
                    <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200 shadow-md">
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit Details
                    </button>
                  </Link>
                  
                  <Link to="/changepassword">
                    <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-md">
                      <Lock className="w-4 h-4 mr-2" />
                      Change Password
                    </button>
                  </Link>
                  
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to logout?')) {
                        Logout();
                      }
                    }}
                    className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 shadow-md"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enrolled Course Details */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Enrolled Course Details</h3>
          <div className="text-gray-600">
            {userDetails.courses && userDetails.courses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userDetails.courses.map((course, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 border">
                    <h4 className="font-medium text-gray-800">{course.title}</h4>
                    <p className="text-sm text-gray-600">{course.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-500 mb-2">No courses enrolled yet.</div>
                <Link to="/courses" className="text-purple-600 hover:text-purple-800 underline">
                  Explore our courses to get started!
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}