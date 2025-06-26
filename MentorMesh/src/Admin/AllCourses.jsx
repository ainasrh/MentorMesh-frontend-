import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";
import {
  FaUser,
  FaEnvelope,
  FaVideo,
  FaBookOpen,
  FaRupeeSign,
  FaTrash,
} from "react-icons/fa";
import { toast } from "react-toastify";

export function AllCourses() {
  const [courseData, setCourseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/course/courses/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCourseData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setIsLoading(false);
    }
  };

  const handleDelete = async (courseId) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/course/delete/${courseId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Course deleted successfully");
      fetchCourses(); // Refresh list
    } catch (error) {
      toast.error("Failed to delete course");
    }
  };

  if (isLoading) return <p className="text-center text-gray-600">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-10 text-gray-800 text-center">All Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courseData.map((course) => (
          <div key={course.id} className="bg-white p-6 rounded-lg shadow-lg">
            <img
                src={course.thumbnail_url}
                alt={course.title}
                className="w-full h-48 object-contain rounded mb-4 bg-white mx-auto"
              />

            <h3 className="text-xl font-bold mb-2">{course.title}</h3>
            <p className="text-gray-700 mb-2">{course.description}</p>
            <div className="text-sm text-gray-600 mb-2 flex items-center gap-2">
              <FaUser /> {course.trainer_info?.username}
              <FaEnvelope className="ml-4" /> {course.trainer_info?.email}
            </div>
            <div className="text-sm text-gray-600 mb-2 flex items-center gap-2">
              <FaVideo /> {course.videos?.length} videos
            </div>
            <div className="text-sm text-gray-600 mb-4 flex items-center gap-2">
              <FaRupeeSign /> {course.price}
            </div>
            <button
              onClick={() => handleDelete(course.id)}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded w-full flex items-center justify-center gap-2"
            >
              <FaTrash /> Delete Course
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
