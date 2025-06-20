import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import API_BASE_URL from '../config';
import { toast } from 'react-toastify';

const Home = () => {
  const aboutRef = useRef(null)
  const scroolToAbout = ()=>{
    aboutRef.current?.scrollIntoView({behavior: 'smooth'})
  }
  const [trendCourse,setTrendCourse] = useState()

  useEffect(()=>{
    const fetchTrendCourse=async ()=> {
      try{
        const response = await axios.get(`${API_BASE_URL}/course/trending-course/`)
        console.log('response',response.data)
        setTrendCourse(response.data)
      }catch(error){
        console.log(error.response?.data)
      }
    }
    fetchTrendCourse()
  },[])
  return (
    <>
    <div className='w-screen'>
      {/* Home Landing Section  */}
      <div className="flex justify-center w-300 bg-purple-200 w-screen">
        <div>
      <h1 className='font-black text-6xl w-150 mt-40' > Develop Your Skills In A New And Unique Way </h1>
        <p className="text-lg text-gray-600 mt-4 w-3/4">
          Unleash your full potential with cutting-edge resources and real-world skill development.
        </p>

        <button  className='mt-10 bg-purple-500 py-2 px-5 mx-2 font-semibold text-white  rounded-lg hover:bg-violet-700  '>Explore</button>
        <button onClick={scroolToAbout} className='mt-10 bg-purple-500 py-2 px-5 mx-2 font-semibold text-white  rounded-lg hover:bg-violet-700'>About</button>
      </div>
      
        <div><img className='rounded-lg w-150 h-150' src="images/smiling-face-2.png" alt="home-image" /></div>

      </div>





        {/* Search Courses Section */}
          {/* Our Popular Courses Section */}
        <div className="bg-gradient-to-b from-white-100 to-purple-200 py-16 px-8 md:px-20">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Our Popular Courses</h2>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Search Course</h2>
          <input type="text" className="bg-gray-100 text-black rounded-md w-80 py-2 px-4" placeholder="e.g. Web Development, Python..." />
          <button className="ml-4 bg-purple-500 text-white px-5 py-2 rounded-lg hover:bg-purple-600">Search</button>
       

        
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-5">
        {trendCourse?.map((course) => (
          <div key={course.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img
              src={course.thumbnail_url}
              alt={`${course.title} Thumbnail`}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-800">{course.title}</h3>
              <p className="text-gray-600 mt-2 text-sm">{course.description.slice(0, 100)}...</p>
              <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                <span>🎓 Beginner</span>
                <span>📘 20 Lessons</span>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-blue-600">${course.price || "Free"}</span>
                <button className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-600 text-sm">Enroll Now →</button>
              </div>
            </div>
          </div>
        ))}
      </div>
        </div>

                {/* ABOUT */}
<div ref={aboutRef} className="bg-gradient-to-b b from-purple-200 to-white py-16 px-4 sm:px-6 lg:px-20">
  <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

    {/* Left - Image */}
    <div className="flex justify-center">
      <img
        src="images/about-image.png"
        alt="About illustration"
        className="rounded-lg w-150 h-auto"
      />
    </div>

    {/* Right - Text Content */}
    <div>
      <h2 className="text-4xl font-bold text-purple-800 mb-4">About MentorMesh</h2>
      <p className="text-lg text-gray-700 mb-6">
        MentorMesh is your personalized learning hub built for both learners and trainers. 
        We bring together interactive content, real-world skill-building, and a supportive learning community.
      </p>
      <p className="text-gray-700 text-md mb-4">
        Whether you're a student aiming to master a new skill, or a certified trainer looking to share your knowledge and earn, MentorMesh offers the perfect platform.
      </p>
      <ul className="list-disc list-inside text-gray-700 mb-6">
        <li>Flexible Learning Paths</li>
        <li>Quality Video Courses</li>
        <li>Earn by Teaching</li>
        <li>Community-Driven Platform</li>
      </ul>
      <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition">
        Learn More
      </button>
    </div>

  </div>
</div>

        
       {/* Trainer Section */}
<div className="bg-white py-16 px-4 sm:px-6 lg:px-20">
  <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
    
    {/* Left  Content */}
    <div>
      <h2 className="text-4xl font-bold text-purple-700 mb-4">
        If You Are A Certified Teacher, Then Become An Instructor
      </h2>
      <p className="text-gray-700 text-lg mb-6">
        Share your knowledge with thousands of learners. Enjoy complete control over your courses, schedule, and earnings.
        Inspire minds while building your personal teaching brand.
      </p>
      <ul className="list-disc list-inside text-gray-700 mb-6">
        <li>Earn income for each enrollment</li>
        <li>Set your own course pricing and schedule</li>
        <li>Access to easy course creation tools</li>
        <li>Build your reputation and followers</li>
      </ul>
      <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition">
        Join as Trainer
      </button>
    </div>

    {/* Right - Image */}
    <div className="flex justify-center">
      <img
        src="images/male-mentor-photo.png"
        alt="Trainer illustration"
        className="rounded-lg w-150  h-auto"
      />
    </div>
  </div>
</div>


        {/*  review  Section */}
        <div className="bg-purple-100 py-16 px-8 md:px-20 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-12"> Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-700 italic">"The best platform to upskill yourself! Highly recommended."</p>
              <div className="mt-4 font-bold text-purple-700">- Arjun P.</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-700 italic">"Great courses and excellent instructors! Learned so much."</p>
              <div className="mt-4 font-bold text-purple-700">- Meera K.</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-700 italic">"User-friendly interface and great value for money."</p>
              <div className="mt-4 font-bold text-purple-700">- Ravi S.</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
