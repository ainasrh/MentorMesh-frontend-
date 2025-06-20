import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  

  useEffect(() => {
    const token = localStorage.getItem("access_token");

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
        setIsLoading(false);
        console.log(res.data);
      })
      .catch((err) => {
        console.error("Failed to get user:", err.response?.data);
        setIsLoading(false);
      });
  }, []);
  
  const Logout = async () => {

  const refresh_token = localStorage.getItem("refresh_token");

  try {
    await axios.post(`${API_BASE_URL}/user/logout/`, {
      refresh_token,
    });

    
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");

    toast.success("Logout successful");

  
    navigate("/login");
  } catch (err) {
    console.log("Logout error:", err.response?.data || err.message);
    toast.error("Logout failed");
  }
};
  if (isLoading) return <p className="text-center text-white">Loading...</p>;

  return (
    <div className="min-h-screen bg-[#121212] text-white py-10 px-6 bg-purple-100">
      <div className="max-w-5xl mx-auto bg-[#1f1f1f] rounded-lg shadow-lg p-8">
        <h1 className="text-3xl  font-semibold mb-8 border-b border-gray-700 pb-4">
          👤 Profile
        </h1>

        {userDetails ? (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left: Avatar and Basics */}
            <div className="flex flex-col items-center text-center ">
              <img
                src={userDetails.avatar}
                alt="Avatar"
                className="w-40 h-40 rounded-full object-cover border-4 border-purple-500 shadow-md"
              />
              <h2 className="text-2xl font-bold mt-4">{userDetails.username}</h2>
              <p className="text-purple-500 capitalize">{userDetails.role}</p>
              <p className="text-gray-500 mt-1 text-sm">
                {userDetails.is_email_verified ? " Email Verified" : " Email Not Verified"}
              </p>
            </div>

            {/* Right: All Details */}
            <div className="bg-[#2a2a2a] rounded-lg p-6 space-y-4 shadow-inner text-gray-100">
              <div>
                <h3 className="text-lg font-semibold text-gray-300">🆔 User ID</h3>
                <p>{userDetails.id}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-300"> First Name</h3>
                <p>{userDetails.first_name || "—"}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-300"> Last Name</h3>
                <p>{userDetails.last_name || "—"}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-300">📧 Email</h3>
                <p>{userDetails.email}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-300">📝 Bio</h3>
                <p>{userDetails.bio || "No bio added yet."}</p>
              </div>

              {/* Buttons Row */}
            <div className="flex flex-wrap gap-4 mt-6">
              <Link to="update/">
                <button className="bg-violet-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition duration-200 shadow-md">
                  ✏️ Edit Details
                </button>
              </Link>

              
                <button onClick={()=>Logout()} className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-200 shadow-md">
                  🚪 Logout
                </button>


              <Link to="/change-password"> 
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md">
                  🔒 Change Password
                </button>
              </Link>
            </div>


              
            </div>
            {/* Enrolled Course Details */}
            <div>
              <h1>Enrolled Course Details</h1>
            </div>
          </div>
        ) : (
          <p className="text-center text-red-400">User not found.</p>
        )}
      </div>
    </div>
  );
}
