import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";

export function JoinAsTrainer() {
  const [formData, setFormData] = useState({
    experience: "",
    qualification: "",
    skills: "",
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API_BASE_URL}/user/trainerprofile/create/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Trainer profile created successfully!");
      navigate("/profile");
    } catch (error) {
      toast.error("Failed to create trainer profile");
      console.error(error.response?.data);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-purple-700">Create Trainer Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          name="experience"
          placeholder="Experience (in years)"
          value={formData.experience}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="qualification"
          placeholder="Qualification"
          value={formData.qualification}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="skills"
          placeholder="Skills"
          value={formData.skills}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-violet-700">
          Submit & Become Trainer
        </button>
      </form>
    </div>
  );
}
