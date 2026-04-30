import React, { useState } from "react";
import { Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email ❌");
      return;
    }

    try {
      setLoading(true);

      await sendPasswordResetEmail(auth, email);

      toast.success("Reset link sent to your email 📩");

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6
    bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#7c3aed]">

      <div className="bg-[#0b1220]/80 backdrop-blur-xl border border-white/10
      rounded-3xl p-10 w-full max-w-md shadow-xl hover:shadow-cyan-400/20 transition">

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-white tracking-wide">
            Reset Password
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Enter your email to receive a reset link
          </p>
          <div className="w-16 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto mt-2"></div>
        </div>

        <form onSubmit={handleReset} className="space-y-5">

          {/* Email */}
          <div>
            <label className="text-gray-300 text-sm">Email Address</label>

            <div className="flex items-center mt-1 bg-[#1f2937] rounded-lg px-3
            border border-gray-600
            hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/20
            focus-within:border-cyan-400 transition">

              <Mail size={18} className="text-gray-400 mr-2" />

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent outline-none py-3 text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-500
            py-3 rounded-lg text-white font-semibold
            hover:scale-105 transition duration-300 shadow-lg disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Reset Link →"}
          </button>

          {/* Bottom */}
          <p className="text-center text-gray-400 text-sm mt-4">
            Remember your password?{" "}
            <Link to="/" className="text-cyan-300 hover:underline">
              Back to Login
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;