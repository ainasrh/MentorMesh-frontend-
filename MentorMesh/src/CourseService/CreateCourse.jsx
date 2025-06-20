import axios from "axios";
import React, { useState } from "react";
import API_BASE_URL from "../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function CreateCourse() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    thumbnail: null,
  });

  const navigate = useNavigate()
  const access_token = localStorage.getItem("access_token");

  const handleChange = (e) => {
    const { value, name, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("thumbnail", formData.thumbnail);

    try {
      const response = await axios.post(`${API_BASE_URL}/course/create/`, data, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("✅ Course created successfully!");
      console.log(response.data);
      navigate('/courses/')
    } catch (error) {
      console.error("Error creating course:", error?.response?.data || error.message);
      toast.error("❌ Failed to create course");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-purple-700">Create New Course</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
              placeholder="Enter course title"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
              placeholder="Write course description"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Price (₹)</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
              placeholder="Course price"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Thumbnail</label>
            <input
              type="file"
              name="thumbnail"
              accept="image/*"
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-300"
          >
            Create Course
          </button>
        </form>
      </div>
    </div>
  );
}
