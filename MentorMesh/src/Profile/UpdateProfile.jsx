import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiUser, FiMail, FiEdit2, FiCheck, FiUpload } from "react-icons/fi";
import { useSelector } from "react-redux";
import API_BASE_URL from "../config";

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
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState("");
  const [avatarFile,setAvatarFile] =useState("")

  const {token} = useSelector((state)=>state.auth)


  useEffect(() => {
    axios.get(`${API_BASE_URL}/user/users/me/`,{
      headers:{
        Authorization:  `Bearer ${token}`
      }
    })
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

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file)
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData()
    data.append('first_name',formData.first_name);
    data.append('last_name',formData.last_name);
    data.append('email',formData.email);
    data.append('username',formData.username);
    data.append('bio',formData.bio);
    data.append('avatar',avatarFile)

    axios.patch(`${API_BASE_URL}/user/users/update/me/`, data,
      {
        headers :{
          Authorization : `Bearer ${token}`,
        }
      }
    )
      .then(res => {
        setMessage("✅ Profile updated successfully!");
        setTimeout(() => setMessage(""), 3000);
      })
      .catch(err => {
        setMessage("❌ Update failed. Check your input.");
        setTimeout(() => setMessage(""), 3000);
      });
  };

  const handleAvatarSubmit = () => {
    // Here you would typically upload the new avatar
    if (previewAvatar) {
      setAvatar(previewAvatar);
      setIsEditingAvatar(false);
      setMessage("✅ Avatar updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">

            {/* Main Content */}
            <div className="flex-1 p-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-6">Profile Information</h1>
              
              {/* Avatar Section */}
              <div className="flex items-center mb-8">
                <div className="relative group">
                  <img
                    src={avatar || "/default_avatar.jpg"} 
                    alt="User Avatar"
                    className="w-24 h-24 rounded-full object-cover border-4 border-indigo-100 shadow-md"
                  />
                  {isEditingAvatar ? (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                      <button 
                        onClick={handleAvatarSubmit}
                        className="p-2 bg-green-500 rounded-full text-white hover:bg-green-600 transition"
                      >
                        <FiCheck size={18} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsEditingAvatar(true)}
                      className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full text-white hover:bg-indigo-700 transition opacity-0 group-hover:opacity-100"
                    >
                      <FiEdit2 size={16} />
                    </button>
                  )}
                </div>
                <div className="ml-6">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {formData.first_name} {formData.last_name}
                  </h2>
                  <p className="text-gray-500">@{formData.username}</p>
                </div>
              </div>

              {isEditingAvatar && (
                <div className="mb-6 p-4 bg-indigo-50 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload new avatar</label>
                  <div className="flex items-center">
                    <label className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer hover:bg-gray-50">
                      <FiUpload className="mr-2" />
                      Choose File
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                      />
                    </label>
                    <button
                      onClick={() => {
                        setIsEditingAvatar(false);
                        setPreviewAvatar("");
                      }}
                      className="ml-4 px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        placeholder="Enter your first name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                      placeholder="Enter your last name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                      placeholder="Choose a username"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                      placeholder="your@gmail.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    placeholder="Tell us about yourself..."
                  ></textarea>
                  <p className="mt-1 text-sm text-gray-500">Brief description for your profile.</p>
                </div>

                {/* Message */}
                {message && (
                  <div className={`p-3 rounded-lg ${message.includes("✅") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {message}
                  </div>
                )}

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}