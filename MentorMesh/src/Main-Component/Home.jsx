import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import API_BASE_URL from '../config';
import { Link, useNavigate } from 'react-router-dom';
import CourseCard from '../CourseService/CourseCard';

const Home = () => {
  const aboutRef = useRef(null);
  const navigate = useNavigate();
  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const [trendCourse, setTrendCourse] = useState([]);

  useEffect(() => {
    const fetchTrendCourse = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/course/trending-course/`);
        setTrendCourse(response.data);
      } catch (error) {
        console.error(error.response?.data);
      }
    };
    fetchTrendCourse();
  }, []);

  return (
    <>
      <div className="w-full overflow-x-hidden">
        {/* Home Landing Section */}
        <div className=" md:relative flex flex-col md:flex-row items-center justify-between bg-purple-200 px-6 md:px-16 py-16 md:h-[600px]">
          {/* Left text */}
          <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Develop Your Skills In A New And Unique Way
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Unleash your full potential with cutting-edge resources and real-world skill development.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              <Link to="/courses">
                <button className="bg-purple-500 py-2 px-6 font-semibold text-white rounded-lg hover:bg-violet-700">
                  Explore
                </button>
              </Link>
              <button
                onClick={scrollToAbout}
                className="bg-purple-500 py-2 px-6 font-semibold text-white rounded-lg hover:bg-violet-700"
              >
                About
              </button>
            </div>
          </div>

          {/* Right image */}
          <div className=" md:absolute md:right-0  md:w-1/2 flex justify-center">
            <img
              className="rounded-lg w-72 h-72 md:w-[400px] md:h-[600px] object-cover"
              src="images/smiling-face-2.png"
              alt="home"
            />
          </div>
        </div>

        {/* Search and Trending Courses */}
        <div className="bg-gradient-to-b from-white to-purple-200 py-16 px-6 md:px-20">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Our Popular Courses</h2>

          <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
            <input
              type="text"
              className="bg-gray-100 text-black rounded-md w-full sm:w-80 py-2 px-4"
              placeholder="e.g. Web Development, Python..."
            />
            <button className="bg-purple-500 text-white px-5 py-2 rounded-lg hover:bg-purple-600">
              Search
            </button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trendCourse?.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>

        {/* About Section */}
        <div ref={aboutRef} className="bg-gradient-to-b from-purple-200 to-white py-16 px-6 md:px-20">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="flex justify-center">
              <img
                src="images/about-image.png"
                alt="About MentorMesh"
                className="rounded-lg w-72 md:w-[400px] h-auto"
              />
            </div>

            {/* Text */}
            <div>
              <h2 className="text-4xl font-bold text-purple-800 mb-4">About MentorMesh</h2>
              <p className="text-lg text-gray-700 mb-4">
                MentorMesh is your personalized learning hub built for both learners and trainers. We bring together
                interactive content, real-world skill-building, and a supportive learning community.
              </p>
              <p className="text-md text-gray-700 mb-4">
                Whether you're a student aiming to master a new skill or a certified trainer looking to share your
                knowledge and earn, MentorMesh offers the perfect platform.
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                <li>Flexible Learning Paths</li>
                <li>Quality Video Courses</li>
                <li>Earn by Teaching</li>
                <li>Community-Driven Platform</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Join as Trainer */}
        <div className="bg-white py-16 px-6 md:px-20">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <h2 className="text-4xl font-bold text-purple-700 mb-4">
                If You Are A Certified Teacher, Then Become An Instructor
              </h2>
              <p className="text-gray-700 text-lg mb-4">
                Share your knowledge with thousands of learners. Enjoy complete control over your courses, schedule,
                and earnings. Inspire minds while building your personal teaching brand.
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                <li>Earn income for each enrollment</li>
                <li>Set your own course pricing and schedule</li>
                <li>Access to easy course creation tools</li>
                <li>Build your reputation and followers</li>
              </ul>
              <button
                onClick={() => navigate('/join-as-trainer')}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700"
              >
                Join as Trainer
              </button>
            </div>

            {/* Image */}
            <div className="flex justify-center">
              <img
                src="images/male-mentor-photo.png"
                alt="Trainer"
                className="rounded-lg w-72 md:w-[400px] h-auto"
              />
            </div>
          </div>
        </div>

        {/* Review Section */}
        <div className="bg-purple-100 py-16 px-6 md:px-20 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Arjun P.", quote: "The best platform to upskill yourself! Highly recommended." },
              { name: "Meera K.", quote: "Great courses and excellent instructors! Learned so much." },
              { name: "Ravi S.", quote: "User-friendly interface and great value for money." },
            ].map((review, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow">
                <p className="text-gray-700 italic">"{review.quote}"</p>
                <div className="mt-4 font-bold text-purple-700">- {review.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
