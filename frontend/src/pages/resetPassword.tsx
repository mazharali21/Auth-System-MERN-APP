import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passStrength, setPassStrength] = useState("");
  const [rules, setRules] = useState({
    length: false,
    upper: false,
    lower: false,
    number: false,
    special: false,
  });
  const { token } = useParams();
  const naviagte = useNavigate();

  const checkPasswordStrength = (pwd: string) => {
    let newRules = {
      length: pwd.length >= 8,
      upper: /[A-Z]/.test(pwd),
      lower: /[a-z]/.test(pwd),
      number: /[0-9]/.test(pwd),
      special: /[^A-Za-z0-9]/.test(pwd),
    };

    const score = Object.values(newRules).filter(Boolean).length;

    setRules(newRules);

    if (score <= 2) return "Weak";
    if (score <= 4) return "Medium";

    return "Strong";
  };

  const handleResetPassword = async () => {
    if (!password || !confirmPassword) {
      toast.error("Password must be entered");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Password Not Matched");
      return;
    }

    if (passStrength == "Weak" || passStrength == "Medium") {
      toast.error("Password Must Be Strong");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/user/reset-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        },
      );

      if (!response.ok) {
        toast.error("Response Failed");
        return;
      }

      const data = await response.json();

      toast.success("Password Changed Successfully");

      setTimeout(() => {
        naviagte("/login")
      }, 1500);

    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleChangePassword = (e: any) => {
    setPassword(e.target.value);
    const pwd = checkPasswordStrength(e.target.value);
    setPassStrength(pwd);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {/* CARD */}
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        {/* HEADING */}
        <h2 className="text-3xl font-semibold text-center mb-2">
          Reset Password
        </h2>

        <p className="text-sm text-gray-500 text-center mb-6">
          Enter your new password below.
        </p>

        {/* FORM */}
        <div className="space-y-4">
          {/* NEW PASSWORD */}
          <div className="relative">
            <input
              placeholder="New Password"
              value={password}
              type={showPassword == true ? "text" : "password"}
              onChange={handleChangePassword}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="button"
              className=" absolute right-2 top-4.5 cursor-pointer size-5"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoIosEyeOff /> : <IoIosEye />}
            </button>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="relative ">
            <div>
              <input
                type={showConfirmPassword == true ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button
                type="button"
                className=" absolute right-2 top-4.5 cursor-pointer size-5"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <IoIosEyeOff /> : <IoIosEye />}
              </button>
            </div>
            {password.length > 0 && (
              <div className="mt-3">
                {/* Strength Bar */}
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      passStrength === "Weak"
                        ? "bg-red-500 w-1/3"
                        : passStrength === "Medium"
                          ? "bg-yellow-500 w-2/3"
                          : "bg-green-500 w-full"
                    }`}
                  />
                </div>

                <div className="mt-3 space-y-1 text-sm">
                  <p
                    className={`${rules.length ? "text-green-600" : "text-gray-400"}`}
                  >
                    {rules.length ? "✓" : "•"} At least 8 characters
                  </p>

                  <p
                    className={`${rules.upper ? "text-green-600" : "text-gray-400"}`}
                  >
                    {rules.upper ? "✓" : "•"} One uppercase letter
                  </p>

                  <p
                    className={`${rules.lower ? "text-green-600" : "text-gray-400"}`}
                  >
                    {rules.lower ? "✓" : "•"} One lowercase letter
                  </p>

                  <p
                    className={`${rules.number ? "text-green-600" : "text-gray-400"}`}
                  >
                    {rules.number ? "✓" : "•"} One number
                  </p>

                  <p
                    className={`${rules.special ? "text-green-600" : "text-gray-400"}`}
                  >
                    {rules.special ? "✓" : "•"} One special character
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* RESET BUTTON */}
          <button
            type="button"
            onClick={handleResetPassword}
            className="w-full py-3 rounded-lg bg-black text-white hover:bg-gray-800 transition cursor-pointer"
          >
            Reset Password
          </button>
        </div>

        {/* BACK TO LOGIN */}
        <p className="text-sm text-center text-gray-500 mt-6">
          Remember your password?{" "}
          <span className="text-black font-medium cursor-pointer hover:underline">
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
