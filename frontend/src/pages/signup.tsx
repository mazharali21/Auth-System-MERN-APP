import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { Link } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passStrength, setPassStrength] = useState("");
  const [rules, setRules] = useState({
    length: false,
    upper: false,
    lower: false,
    number: false,
    special: false,
  });

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

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

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "password") {
      const pwd = checkPasswordStrength(e.target.value);

      setPassStrength(pwd);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const submitForm = async (e: any) => {
    e.preventDefault();

    console.log(form);
    try {
      if (!form.username || !form.email || !form.password) {
        toast.error("All Fields are required");
        return;
      }

      if (passStrength == "Weak" || passStrength == "Medium") {
        toast.error("Password Must Be Strong");
        return;
      }

      const response = await fetch("http://localhost:8000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error("Registration Failed!");
        return ;
      }

      setForm({
        username: "",
        email: "",
        password: "",
      });
      toast.success("User Successfully Registered");

      setTimeout(() => {
        navigate("/verification");
      }, 1500);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="w-full max-w-7xl bg-white shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* LEFT SIDE - FORM */}
        <div className="p-8 lg:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Create account
          </h2>
          <p className="text-gray-500 mb-6">
            Join our 100% free creative network.
          </p>

          {/* Form */}
          <form className="space-y-4" onSubmit={submitForm}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name*
              </label>
              <input
                required
                name="username"
                value={form.username}
                onChange={handleChange}
                type="text"
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email*
              </label>
              <input
                required
                type="email"
                name="email"
                value={form.email}
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
                  required
                  value={form.password}
                  name="password"
                  type={showPassword == true ? "text" : "password"}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className={`w-full border  rounded-lg px-4 border-gray-300 py-3 focus:ring-2 focus:ring-black focus:outline-none `}
                />
                <button
                  type="button"
                  className=" absolute right-2 top-4.5 cursor-pointer size-5"
                  onClick={handleShowPassword}
                >
                  {showPassword ? <IoIosEyeOff /> : <IoIosEye />}
                </button>
              </div>
              {form.password.length > 0 && (
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

            <button
              type="submit"
              className="w-full cursor-pointer bg-black text-white rounded-lg py-3 font-medium hover:bg-gray-800 transition"
            >
              Sign up
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="font-medium text-black hover:underline"
            >
              Log in
            </Link>
          </p>

          <p className="text-xs text-gray-400 text-center mt-6">
            By creating an account, you agree to our{" "}
            <a href="#" className="underline">
              terms of use
            </a>
            .
          </p>
        </div>

        {/* RIGHT SIDE - IMAGE */}
        <div
          className="relative overflow-hidden m-4"
          style={{
            borderRadius: "120px 4px 120px 4px",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Creative Designer"
            className="w-full h-full object-cover"
          />

          {/* Overlay Text */}
          <div className="absolute bottom-10 left-10 text-white max-w-md">
            <h3 className="text-3xl font-light leading-snug">
              Join the world’s largest network{" "}
              <span className="italic font-medium">of designers</span> and
              digital creatives
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
