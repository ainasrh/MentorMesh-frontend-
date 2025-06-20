import axios from "axios";
import React, { useEffect, useState } from "react";
import API_BASE_URL from "../config";
import { useNavigate } from "react-router-dom";
import CourseCard from "./CourseCard";

export function Courses() {
  const [courseData, setCourseData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const navigate=useNavigate()


  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/course/courses/`);
        setCourseData(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);
  




  console.log(courseData)
  if (isLoading) return <p className="p-4 text-center text-lg">Loading Courses...</p>;

return (
    <div className="font-sans max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-10 text-gray-800 text-center">
        Available Courses
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courseData?.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
