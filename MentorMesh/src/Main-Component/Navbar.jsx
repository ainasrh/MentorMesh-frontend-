import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Navbar() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setLoggedIn(!!token);
  }, []);

  const categories = [
    { key: "programming", label: "Programming" },
    { key: "design", label: "Design" },
    { key: "marketing", label: "Marketing" },
    { key: "business", label: "Business" },
    { key: "data", label: "Data Science" },
    { key: "personal_dev", label: "Personal Development" },
  ];

  return (
    <nav className="bg-purple-200 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-bold text-black">MentorMesh</div>

        <div className="flex space-x-6 items-center text-md font-bold text-black text-xl relative">
          <Link to="/" className="hover:text-white hover:bg-purple-500 rounded-lg p-2">
            Home
          </Link>
          <Link to="/courses" className="hover:text-white hover:bg-purple-500 rounded-lg p-2">
            All Courses
          </Link>

          {/* Explore Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="hover:text-white hover:bg-purple-500 rounded-lg p-2 focus:outline-none"
            >
              Explore 
            </button>

            {showDropdown && (
              <div className="absolute bg-white shadow-md mt-2 rounded w-56 text-black z-10">
                {categories.map((category) => (
                  <Link
                    key={category.key}
                    to={`/courses/category/${category.key}`}
                    className="block px-4 py-2 hover:bg-purple-100"
                    onClick={() => setShowDropdown(false)}
                  >
                    {category.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {isLoggedIn ? (
            <Link to="/profile">
              <img src="/images/person-circle.svg" alt="Profile" className="w-8 h-8 rounded-full inline" />
            </Link>
          ) : (
            <Link to="/login" className="hover:text-white hover:bg-purple-500 rounded-lg p-2">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
