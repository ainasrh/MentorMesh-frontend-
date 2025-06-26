import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";
import CourseCard from "../CourseService/CourseCard";
// import { useGetTrainerCourse } from "../hooks/useTrainerCourse";



export function CreatedCourse() {
  const [courseData, setcourseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("access_token");
//   const {data,isSuccess}=useGetTrainerCourse()
// console.log(data);


  useEffect(() => {
    axios.get(`${API_BASE_URL}/course/trainercourse/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setcourseData(res.data);
      setIsLoading(false);
    })
    .catch((err) => {
      console.error("Error fetching courses:", err);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <p className="text-center text-gray-600">Loading...</p>;

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
