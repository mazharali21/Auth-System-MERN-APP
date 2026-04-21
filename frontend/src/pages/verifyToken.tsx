import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const VerifyToken = () => {
  const { token } = useParams();

  const navigate = useNavigate();

  const handleVerifyToken = async () => {
    try {
      const response = await fetch("http://localhost:8000/user/verify", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (!response.ok) {
        toast.error("Verification Failed");
        return;
      }

      const data = await response.json();

      toast.success("Successfully Verified");

      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleVerifyToken();
  }, []);
  
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-10 w-96 text-center">
        {/* Spinner */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Verifying your email...
        </h2>

        <p className="text-gray-500 text-sm">
          Please wait while we confirm your account.
        </p>
      </div>
    </div>
  );
};

export default VerifyToken;
