import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import toast from "react-hot-toast";
import ForgotPassword from "../components/forgotPassword";

const Login = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (!formData.email || !formData.password) {
        toast.error("All Fields Required");
        return;
      }

      const response = await fetch("http://localhost:8000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        toast.error("Response Failed!");
        return;
      }

      const data = await response.json();

      setFormData({
        email: "",
        password: "",
      });

      toast.success("User Successfully Logged In ");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="w-full max-w-7xl bg-white shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* LEFT SIDE - FORM */}
        <div className="p-8 lg:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back!
          </h2>
          <p className="text-gray-500 mb-6">
            Log in to continue your creative journey
          </p>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email*
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password*
              </label>
              <div className="flex relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:outline-none"
                />
                <button
                  type="button"
                  className="absolute right-2 top-4.5 size-4 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <IoIosEyeOff /> : <IoIosEye />}
                </button>
              </div>
              <div className="flex justify-end mt-2">
                <button
                  onClick={() => {
                    setShowPopUp(true);
                  }}
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-700 hover:underline transition cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer bg-black text-white rounded-lg py-3 font-medium hover:bg-gray-800 transition"
            >
              Log In
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{" "}
            <Link to={"/"} className="font-medium text-black hover:underline">
              Sign Up
            </Link>
          </p>
        </div>

        {/* RIGHT SIDE - IMAGE */}
        <div
          className="relative h-[130vh] overflow-hidden m-4"
          style={{ borderRadius: "120px 4px 120px 4px" }}
        >
          <img
            src="https://images.unsplash.com/photo-1594823274242-19036bf455e9?q=80&w=1974&auto=format&fit=crop"
            alt="Creative Designer"
            className="w-full h-full object-cover"
          />

          <div className="absolute bottom-10 left-10 text-white max-w-md">
            <h3 className="text-3xl font-light leading-snug">
              Join thousands of{" "}
              <span className="italic font-medium">
                designers and creatives
              </span>{" "}
              and using our platform to bring ideas to life.
            </h3>
          </div>
        </div>

        {/* Reset Password Pop Up */}

        {showPopUp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* BACKDROP */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowPopUp(false)}
            ></div>

            {/* MODAL */}
            <div className="relative z-10 w-full max-w-md mx-4 animate-fadeIn">
              <ForgotPassword onClose={() => setShowPopUp(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
