import { useState, type ChangeEvent } from "react";
import toast from "react-hot-toast";

type ForgotPasswordProps = {
  onClose: () => void;
};

const ForgotPassword = ({ onClose } : ForgotPasswordProps ) => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const sentResetEmail = async () =>{
    try {
      
    if(!email){
        toast.error("Email Required!");
        return;
    }    

    setLoading(true);

    const response = await fetch("http://localhost:8000/user/forgot-password",{
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({email})
    })

    if (!response.ok) {
        toast.error("Response Failed!");
        return;
      }

    const data = await response.json();

    setEmail("");

    toast.success("Email Sent Successfully");

    } catch (error) {
        toast.error("Something Went Wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 relative">
      {/* CLOSE ICON */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl cursor-pointer"
      >
        ✕
      </button>

      {/* HEADING */}
      <h2 className="text-2xl font-semibold text-center mb-2">
        Reset Password
      </h2>

      <p className="text-sm text-gray-500 text-center mb-6">
        Enter your email and we’ll send you a reset link.
      </p>

      {/* FORM */}
      <div className="space-y-4">
        <input
          onChange={handleChange}
          value={email}
          name="email"
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        />

        {/* ACTION BUTTONS */}
        <div className="flex gap-3">
          {/* CANCEL */}
          <button
            type="button"
            onClick={onClose}
            className="w-1/2 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          {/* SUBMIT */}
          <button
            onClick={sentResetEmail}
            className="w-1/2 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition cursor-pointer"
          >
          {loading ? "Sending..." : "Send Link"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
