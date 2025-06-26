import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";

import axios from "axios";
import { toast } from "react-toastify";
import { FaBook, FaPlus, FaSignOutAlt, FaTachometerAlt, FaUserCircle } from "react-icons/fa";
import { FaHouseFloodWaterCircleArrowRight } from "react-icons/fa6";

export function AdminSideBar() {
  const location = useLocation();
  const navigate= useNavigate()
  const logout= async ()=>{
  const refresh_token=localStorage.getItem("refresh_token")
    try{
      await axios.post(`${API_BASE_URL}/user/logout/`,{refresh_token

      })

      localStorage.removeItem("access_token")
      localStorage.removeItem("refresh_token")

      toast.success("Logout succesfull")
      navigate("/login");
    }catch(err){
      console.log("Logout error:", err.response?.data || err.message);
      toast.error("Logout failed");
    }
    
  }

  const menuItems = [
  { name: "Dashboard", icon: <FaTachometerAlt />, path: "/admin/" },
  { name: "All Users", icon: <FaUserCircle />, path: "/admin/users" },
  { name: "Manage Courses", icon: <FaBook />, path: "/admin/courses" },
];


  return (
    <aside className="w-full md:w-64 bg-[#1f1f1f] text-white min-h-screen shadow-md">
      <div className="p-6 text-center border-b border-gray-700">
        <h2 className="text-2xl font-bold text-purple-400"> Admin Panel</h2>
      </div>

      <nav className="flex flex-col p-4 space-y-2">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-purple-700 transition ${
              location.pathname === item.path ? "bg-purple-600" : ""
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-sm font-medium">{item.name}</span>
          </Link>
        ))}

        {/* Logout Button   */}
         <button
          onClick={()=>logout()}
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-red-600 transition text-left"
        >
          <span className="text-lg">
            <FaSignOutAlt />
          </span>
          <span className="text-sm font-medium">Logout</span>
        </button>
      </nav>
    </aside>
  );
}
