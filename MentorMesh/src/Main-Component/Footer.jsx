import React from "react";
import { FaFacebook, FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 px-4 mt-10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:flex-wrap sm:justify-between items-center gap-6">
        {/* Brand */}
        <div className="text-lg sm:text-xl font-bold text-center sm:text-left w-full sm:w-auto">
          MentorMesh
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm w-full sm:w-auto">
          <a href="/" className="hover:text-gray-300">Home</a>
          <a href="/about" className="hover:text-gray-300">About</a>
          <a href="/contact" className="hover:text-gray-300">Contact</a>
          <a href="/courses" className="hover:text-gray-300">Courses</a>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center sm:justify-end gap-4 text-xl w-full sm:w-auto">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <FaFacebook className="hover:text-blue-500" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <FaInstagram className="hover:text-pink-500" />
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer">
            <FaGithub className="hover:text-gray-400" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            <FaLinkedin className="hover:text-blue-300" />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-6 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} MentorMesh. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
