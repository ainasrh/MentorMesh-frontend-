import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

export function TrainerDashboard() {
  const [dashboardData, setDashboardData] = useState({
    course_count: 0,
    enroll_count: 0,
    revenue: 0,
  });

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/user/trainer/dashboard/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDashboardData(res.data);
      })
      .catch((err) => {
        console.error("Dashboard fetch error:", err);
      });
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-purple-700">📊 Trainer Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Courses */}
        <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-purple-500">
          <h2 className="text-lg font-semibold text-gray-600">Total Courses</h2>
          <p className="text-3xl font-bold text-purple-700 mt-2">{dashboardData.course_count}</p>
        </div>

        {/* Total Learners */}
        <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-green-500">
          <h2 className="text-lg font-semibold text-gray-600">Learners Enrolled</h2>
          <p className="text-3xl font-bold text-green-600 mt-2">{dashboardData.enroll_count}</p>
        </div>

        {/* Total Revenue */}
        <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-blue-500">
          <h2 className="text-lg font-semibold text-gray-600">Total Revenue</h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">30</p>
        </div>
      </div>
    </div>
  );
}
