import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function CreateVideo() {
  const [formData, setFormData] = useState({
    title: "",
    course: "",
    video_url: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const access_token = localStorage.getItem("access_token");
  
  const handleChange = (e) => {
    const { value, name, files, type } = e.target;
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

  const handlesubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("course", formData.course);
    data.append("video", formData.video);

    try {
      const response = await axios.post(`${API_BASE_URL}/course/course-video/`, data, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("🎥 Video created successfully!");
      console.log(response.data);
      
    } catch (error) {
      console.error(error.response);
      if (error.response?.data?.permission_error) {
        toast.error(`🚫 ${error.response.data.permission_error}`);
      } else {
        toast.error(error?.response?.data?.message || "❌ Failed to create video");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white">
            <h1 className="text-2xl font-bold">Upload Course Video</h1>
            <p className="text-purple-100">Fill in the details below to add a new video</p>
          </div>
          
          <form onSubmit={handlesubmit} className="p-6 space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                name="title"
                value={formData.title}
                type="text"
                onChange={handleChange}
                placeholder="Enter video title"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Course ID</label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                name="course"
                value={formData.course}
                type="text"
                onChange={handleChange}
                placeholder="Enter course ID"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Video File</label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col w-full border-2 border-dashed border-gray-300 hover:border-purple-500 rounded-lg cursor-pointer transition-all">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4">
                    <svg className="w-10 h-10 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    <p className="text-sm text-gray-500">
                      {formData.video ? formData.video.name : "Click to upload video"}
                    </p>
                  </div>
                  <input 
                    name="video" 
                    type="file" 
                    className="hidden" 
                    onChange={handleChange} 
                    accept="video/*"
                    required 
                  />
                </label>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all ${isSubmitting ? 'bg-purple-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 shadow-md hover:shadow-lg'}`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </span>
              ) : 'Upload Video'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}