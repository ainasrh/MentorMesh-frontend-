import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setToken,setLoggedUser } from "../store/authSlice";

export function Login() {
  const dispatch=useDispatch()


  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        `${API_BASE_URL}/user/login/`,
        formData
      );
      
    
      const { access_token, refresh_token, user } = response.data;

      console.log("user",user);

      dispatch(setToken(access_token))
      dispatch(setLoggedUser(user))
  

      localStorage.setItem("refresh_token", refresh_token);
      

      
      console.log("Login success", response.data);
      toast.success('login succesfull')
      if (user.role == "trainer"){
        navigate('/trainer/')

      }else if(user.role == "admin"){
        navigate('/admin/')

      }else{
        navigate("/")
      }
      
      
    
    } catch (error) {
      console.error(error);
      const errorMsg =
        error.response?.data?.error ||
        "Login failed. Please check your credentials.";
      setError(errorMsg);
    }
  };

  console.log(formData)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="p-4 rounded-md ml-2">
        <img
          src="/Images/Regitser_image.png"
          alt="Illustration"
          className="h-200 w-200 mr-10 mx-auto"
        />
      </div>

      <div
        className="p-8 rounded-lg ml-6 flex flex-col"
        style={{ width: "400px" }}
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-between h-full"
        >
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-5">
            Login with email
          </h1>

          {error && (
            <div className="text-red-500 text-sm mb-2 text-center">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-semibold py-2 rounded-md hover:bg-purple-700 mt-6"
          >
            Continue with email
          </button>

          <p className="text-center text-xs text-gray-500 mt-6">
            By signing up, you agree to our{" "}
            <a href="#" className="text-purple-600 hover:underline">
              Terms of Use
            </a>{" "}
            &{" "}
            <a href="#" className="text-purple-600 hover:underline">
              Privacy Policy
            </a>
          </p>

          <p className="text-center text-sm text-gray-600 mt-4">
            No Account?{" "}
            <Link to="/forgot-password/" className="text-purple-600 hover:underline">
              Forgot Password
            </Link>
          </p>

          <p className="text-center text-sm text-gray-600 mt-4">
            No Account?{" "}
            <Link to="/signup" className="text-purple-600 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
