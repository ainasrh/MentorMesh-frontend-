import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

export function TrainerProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/user/gettrainerprofile/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setProfile(res.data);
        setLoading(false);
        console.log(res.data)
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading profile...</p>;
  if (!profile) return <p className="text-center text-red-500">Failed to load profile.</p>;

  return (
    <div className="min-h-screen bg-[#f4f6fa] flex items-center justify-center px-4 py-8">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-lg overflow-hidden">
        {/* Top banner */}
        <div className="h-40 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative">
          <img
            src={profile.user.avatar || "/default-avatar.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-white absolute -bottom-12 left-8 object-cover shadow-md"
          />
        </div>

        {/* Profile content */}
        <div className="pt-16 pb-8 px-8">
          <h2 className="text-2xl font-bold text-gray-800">
            {profile.user.first_name} {profile.user.last_name}
          </h2>
          <p className="text-sm text-gray-500">@{profile.user.username}</p>

          <div className="mt-6 space-y-4">
            <p className="text-gray-700">
              <span className="font-medium">Email:</span> {profile.user.email}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Bio:</span> {profile.user.bio || "No bio available."}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Experience:</span> {profile.experience || "N/A"}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Skills:</span> {profile.skills || "N/A"}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Qualification:</span> {profile.qualification || "N/A"}
            </p>
          </div>
            <button className="p-2 bg-violet-200 rounded-lg">Edit Profile</button>
        </div>
      </div>
    </div>
  );
}
