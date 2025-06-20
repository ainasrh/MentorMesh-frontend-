import React, { useEffect, useState } from "react";
import axios from "axios";

export function UpdateProfile() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    bio: "",
  });
  const [avatar, setAvatar] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("/api/users/me/")
      .then(res => {
        const data = res.data;
        setFormData({
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          email: data.email || "",
          username: data.username || "",
          bio: data.bio || "",
        });
        setAvatar(data.avatar);
      })
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.patch("/api/users/update/me/", formData)
      .then(res => setMessage("✅ Profile updated successfully!"))
      .catch(err => setMessage("❌ Update failed. Check your input."));
  };

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-md p-6 md:p-10 max-w-4xl mx-auto mt-10 font-sans">
      
      {/* Sidebar */}
      <div className="w-full md:w-1/4 mb-6 md:mb-0 border-r pr-6">
        <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
        <ul className="space-y-3 text-sm text-gray-700">
          <li className="font-medium text-blue-600">Profile</li>
          <li>Account & Payment</li>
          <li>Security</li>
          <li>Legal Agreements</li>
          <li>Contact Us</li>
        </ul>
      </div>

      {/* Main Form */}
      <div className="w-full md:w-3/4 pl-0 md:pl-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <img
              src={avatar}
              alt="User Avatar"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <p className="font-medium">Update Profile</p>
              <p className="text-sm text-gray-500">Edit your personal details</p>
            </div>
          </div>

          {/* First & Last Name */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm mb-1">First Name</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg text-sm"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm mb-1">Last Name</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg text-sm"
              />
            </div>
          </div>

          {/* Username & Email */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg text-sm"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg text-sm"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm mb-1">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="3"
              className="w-full border px-3 py-2 rounded-lg text-sm"
              placeholder="Tell us about yourself..."
            ></textarea>
          </div>

          {/* Message */}
          {message && <div className="text-sm text-green-600">{message}</div>}

          {/* Save Button */}
          <div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
