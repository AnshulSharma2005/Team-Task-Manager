import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
} from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [index, setIndex] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const quotes = [
    "Discipline turns goals into results when you show up consistently every single day.",
    "Small wins compound into massive success when you stay consistent over time.",
    "Success is not luck but the result of daily habits and disciplined execution.",
    "Your future is shaped by what you choose to do consistently today.",
    "Consistency separates those who succeed from those who only dream about it.",
    "Great teams succeed because they trust, communicate, and execute effectively together.",
    "Keep moving forward even when things feel slow or difficult.",
    "Ideas are nothing without execution and consistent effort behind them.",
    "Every completed task builds momentum and confidence for the next one.",
    "Stay organized, stay focused, and stay ahead of everything you do.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const next = () => setIndex((index + 1) % quotes.length);
  const prev = () =>
    setIndex((index - 1 + quotes.length) % quotes.length);

  const handleLogin = async () => {
    if (!email || !password) {
      return toast.error("Please fill all fields ❌");
    }

    try {
      setLoading(true);

      // 🔐 Firebase Login
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // 🗄️ Fetch user from backend
      let res;
      try {
        res = await axios.get(
          `http://localhost:5000/api/users/${user.email}`
        );
      } catch (err) {
        toast.error("Server error. Please try again.");
        return;
      }

      if (!res.data) {
        toast.error("User not registered. Please signup.");
        return;
      }

      // ✅ Store user
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userRole", res.data.role);

      toast.success(`Welcome ${res.data.role} 🚀`);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);

    } catch (error) {
      console.error(error);

      if (error.code === "auth/user-not-found") {
        toast.error("Email not registered. Please sign up.");
      } else if (error.code === "auth/wrong-password") {
        toast.error("Incorrect password ❌");
      } else {
        toast.error("Login failed. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-wrap items-center justify-center md:justify-between gap-8 px-6 md:px-20 py-10
    bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#6d28d9]">

      {/* LEFT PANEL */}
      <div className="w-full md:w-[45%] flex justify-center">
        <div className="bg-[#0b1220]/80 backdrop-blur-xl border border-white/10
        rounded-3xl p-10 w-full max-w-lg h-[420px]
        shadow-xl hover:shadow-blue-500/20 transition flex flex-col justify-between">

          <h1 className="text-3xl font-bold text-center text-white mt-4">
            Task<span className="text-blue-400">Flow</span> ⚡
          </h1>

          <p className="text-center text-lg italic text-gray-200 px-4">
            “{quotes[index]}”
          </p>

          <div className="flex justify-between">
            <button onClick={prev}><ChevronLeft /></button>
            <button onClick={next}><ChevronRight /></button>
          </div>
        </div>
      </div>

      {/* LOGIN CARD */}
      <div className="w-full md:w-[45%] flex justify-center">
        <div className="bg-[#0b1220]/90 backdrop-blur-xl border border-white/10
        rounded-3xl p-8 w-full max-w-lg shadow-2xl hover:shadow-cyan-400/20 transition">

          <h2 className="text-3xl font-bold text-white text-center mb-6">
            Welcome Back
          </h2>

          {/* Email */}
          <div className="flex items-center bg-[#1f2937] rounded-lg px-3 mb-4 border border-gray-600 focus-within:border-cyan-400">
            <Mail className="text-gray-400 mr-2" />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-transparent py-3 outline-none text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="relative flex items-center bg-[#1f2937] rounded-lg px-3 mb-2 border border-gray-600 focus-within:border-cyan-400">
            <Lock className="text-gray-400 mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              className="w-full bg-transparent py-3 outline-none text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 cursor-pointer text-gray-400"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </span>
          </div>

          {/* Forgot Password */}
          <div className="text-right mb-4">
            <span
              onClick={() => navigate("/forgot-password")}
              className="text-cyan-400 text-sm cursor-pointer hover:underline"
            >
              Forgot password?
            </span>
          </div>

          {/* Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-500
            py-3 rounded-lg text-white font-semibold hover:scale-105 transition"
          >
            {loading ? "Logging in..." : "Login →"}
          </button>

          {/* Bottom */}
          <p className="text-center text-sm text-gray-400 mt-6">
            New here?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-cyan-300 cursor-pointer hover:underline"
            >
              Create account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}