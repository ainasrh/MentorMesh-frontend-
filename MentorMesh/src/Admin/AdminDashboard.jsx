import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";
import { FaUser, FaChalkboardTeacher, FaBook, FaUserGraduate } from "react-icons/fa";
import { toast } from "react-toastify";

export const AdminDashboard = () => {
  const [stats, setStats] = useState({
    trainers_count: 0,
    learners_count: 0,
    courses_count: 0,
  });

  const access_token = localStorage.getItem("access_token");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/admin-dashboard/`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      setStats(response.data);
      console.log("response",response.data);
      
    } catch (err) {
      toast.error("Failed to load dashboard stats");
    }
  };

  const cards = [
    {
      label: "Total Users",
      value: stats.learners_count,
      icon: <FaUser />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "Total Trainers",
      value: stats.trainers_count,
      icon: <FaChalkboardTeacher />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      label: "Total Courses",
      value: stats.courses_count,
      icon: <FaBook />,
      color: "bg-green-100 text-green-600",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
  <h1 className="text-2xl font-bold mb-6 text-purple-700">Admin Dashboard</h1>
  
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6 w-full">
    {cards.map((card, idx) => (
      <div
        key={idx}
        className={`p-6 rounded-xl shadow-md ${card.color} flex flex-col justify-between h-full w-full`}
      >
        <div>
          <p className="text-sm font-medium">{card.label}</p>
          <h2 className="text-2xl font-bold">{card.value}</h2>
        </div>
        <div className="text-4xl self-end">{card.icon}</div>
      </div>
    ))}
  </div>
</div>

  );
};
