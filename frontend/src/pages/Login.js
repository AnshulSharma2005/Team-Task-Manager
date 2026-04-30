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
    "Discipline turns goals into results when you show up consistently.",
    "Small wins lead to big victories when done consistently.",
    "Success is built through daily habits.",
    "Your future is created by what you do today.",
    "Consistency separates achievers from dreamers.",
    "Great teams are built on trust and execution.",
    "Keep going even when it gets hard.",
    "Execution matters more than ideas.",
    "Every task completed builds your future.",
    "Stay organized, stay ahead.",
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

  // 🔥 LOGIN FUNCTION (UPDATED)
  const handleLogin = async () => {
    if (!email || !password) {
      return toast.error("Please fill all fields ❌");
    }

    try {
      setLoading(true);

      // 🔐 Firebase login
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // 🗄️ Fetch user from backend
      const res = await axios.get(
        `http://localhost:5000/api/users/${user.email}`
      );

      // 🔥 Store in localStorage
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
        toast.error("Incorrect password");
      } else {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-wrap items-center justify-center md:justify-between gap-8 px-6 md:px-20 py-10
      bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#6d28d9]">

      {/* LEFT SIDE (unchanged UI) */}
      <div className="w-full md:w-[45%] flex justify-center md:justify-start">
        <div className="bg-[#0b1220]/80 backdrop-blur-xl border border-white/10
          rounded-3xl p-10 w-full max-w-lg h-[420px]
          shadow-xl hover:shadow-blue-500/20 transition flex flex-col justify-between">

          <div className="text-center mt-2">
            <h1 className="text-3xl font-bold text-white">
              Task<span className="text-blue-400">Flow</span> ⚡
            </h1>
          </div>

          <div className="text-center px-4">
            <p className="text-lg italic text-gray-200">
              “{quotes[index]}”
            </p>
          </div>

          <div className="flex justify-between">
            <button onClick={prev}>
              <ChevronLeft />
            </button>
            <button onClick={next}>
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE LOGIN */}
      <div className="w-full md:w-[45%] flex justify-center md:justify-end">
        <div className="bg-[#0b1220]/90 backdrop-blur-xl border border-white/10
          rounded-3xl p-8 w-full max-w-lg shadow-2xl">

          <h2 className="text-3xl font-bold text-white text-center mb-6">
            Welcome Back 👋
          </h2>

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 rounded bg-[#1f2937] text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 rounded bg-[#1f2937] text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer text-gray-400"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </span>
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-500
            text-white py-3 rounded-lg font-semibold"
          >
            {loading ? "Logging in..." : "Login →"}
          </button>

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