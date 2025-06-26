import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API_BASE_URL from "../config";
import { VideoModal } from "./VideoModel";
import BuyCourse from "../Payment_Service/BuyCourse";

export function ViewCourse() {
  const { courseid } = useParams();
  const [course, setCourse] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState("");

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/course/courses/${courseid}/`);
        
        setCourse(response.data);
        console.log(response.data)
      } catch (error) {
        console.log(error.response?.data);
      }
    };
    fetchCourseDetails();

  }, [courseid]);

  const openModal = (videoUrl) => {
    setSelectedVideoUrl(videoUrl);
    setIsOpen(true);
  };

  return (
    <>
      <div className="max-w-7xl mx-auto mt-10 p-5">
        {course ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left: Course Info & Videos */}
            <div className="md:col-span-2">
              <h1 className="text-3xl font-bold mb-4 text-gray-800">{course.title}</h1>

              <img
                src={course.thumbnail_url}
                alt={course.title}
                className="w-full h-auto object-cover rounded"
              />

              <p className="mt-4 text-gray-700">{course.description}</p>

              <div className="mt-10">
                <h2 className="text-2xl font-bold mb-4">Course Content</h2>
                {course.videos && course.videos.length > 0 ? (
                  <div className="space-y-4">
                    {course.videos.map((video) => (
                      <div key={video.id} className="bg-gray-100 rounded p-4">
                        <div className="text-gray-700 space-y-2">
                          {video.video_url ? (
                            <p
                              onClick={() => openModal(video.video_url)}
                              className="cursor-pointer font-medium text-lg text-blue-700"
                            >
                              ▶️ {video.title}
                            </p>
                          ) : (
                            <p className="text-sm text-red-500">Video not available</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No course videos available.</p>
                )}
              </div>
            </div>

            {/* Right: Price, Trainer, etc */}
            <div className="bg-gray-50 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Buy Course</h2>
              <p className="text-blue-600 text-2xl font-bold">
                ₹{course.price === "0.00" || !course.price ? "Free" : course.price}
              </p>
                {/* Calloing Bye Course model  */}
              <BuyCourse courseId={course.id} userId={course.trainer} amount={course.price} />


              <hr className="my-6" />

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Trainer Info</h3>
                

                <p><strong>Name: </strong>{course.trainer_info.username}</p>
                <p><strong>Experience:</strong></p>
                
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading course details...</p>
        )}

        {/* Video Modal */}
        <VideoModal isOpen={isOpen} setIsOpen={setIsOpen} videoUrl={selectedVideoUrl} />
      </div>
    </>
  );
}
