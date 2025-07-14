import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Bell, Menu, X } from "lucide-react";
import { useSelector } from "react-redux";

export function Navbar() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) setLoggedIn(!!token);
  }, [token]);

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
        {/* Brand */}
        <div className="text-xl sm:text-l md:text-2xl font-bold text-black">MentorMesh</div>


        {/* Mobile Menu Button */}
        <div className="md:hidden mr-[50px]">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-purple-800">
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex gap-4 items-center text-md font-medium text-black">
          <Link to="/" className="hover:text-white hover:bg-purple-500 rounded-lg px-3 py-2">Home</Link>
          <Link to="/courses" className="hover:text-white hover:bg-purple-500 rounded-lg px-3 py-2">All Courses</Link>
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="hover:text-white hover:bg-purple-500 rounded-lg px-3 py-2"
            >
              Explore
            </button>
            {showDropdown && (
              <div className="absolute bg-white shadow-lg mt-2 rounded-md w-48 text-black z-50">
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
        </div>

        {/* Icons & Profile */}
        <div className="flex items-center gap-4">
          <Link to="/chat" className="text-purple-600 hover:bg-purple-500 hover:text-white p-2 rounded-lg">
            <MessageCircle size={24} />
          </Link>
          <Link to="#" className="text-purple-600 hover:bg-purple-500 hover:text-white p-2 rounded-lg">
            <Bell size={24} />
          </Link>
          {isLoggedIn ? (
            <Link to="/profile">
              <img
                src="/images/person-circle.svg"
                alt="Profile"
                className="w-8 h-8 rounded-full border border-gray-300"
              />
            </Link>
          ) : (
            <Link to="/login" className="hover:text-white hover:bg-purple-500 rounded-lg px-4 py-2">
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu Links */}
      {mobileMenuOpen && (
  <div className="md:hidden px-4 py-2 flex flex-col gap-2 bg-purple-100 text-black">
    {/* Home & All Courses visible directly */}
    <Link to="/" className="hover:bg-purple-300 rounded px-3 py-2" onClick={() => setMobileMenuOpen(false)}>
      Home
    </Link>
    <Link to="/courses" className="hover:bg-purple-300 rounded px-3 py-2" onClick={() => setMobileMenuOpen(false)}>
      All Courses
    </Link>

    {/* Explore button with dropdown */}
    <div>
      <button
        className="w-full text-left px-3 py-2 hover:bg-purple-300 rounded"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        Explore
      </button>
      {showDropdown && (
        <div className="ml-4 mt-1">
          {categories.map((category) => (
            <Link
              key={category.key}
              to={`/courses/category/${category.key}`}
              className="block px-3 py-2 hover:bg-purple-200 rounded"
              onClick={() => {
                setMobileMenuOpen(false);
                setShowDropdown(false);
              }}
            >
              {category.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  </div>
)}

    </nav>
  );
}
