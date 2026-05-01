import React, { useState, useEffect } from "react";
import { Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import axios from "axios";
import toast from "react-hot-toast";

const API = "http://localhost:5000/api";

const quotes = [
  "Small wins compound into massive success when you stay consistent over time.",
  "Success is built through daily habits, not occasional bursts of motivation.",
  "Consistency beats motivation when discipline becomes your habit.",
  "Great teams are built on trust, communication, and execution.",
  "Your future is created by what you do consistently, not occasionally."
];

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all fields ❌");
      return;
    }

    try {
      setLoading(true);

      await signInWithEmailAndPassword(auth, email, password);

      const res = await axios.get(`${API}/users/${email}`);

      localStorage.setItem("user", JSON.stringify(res.data));

      toast.success(`Welcome ${res.data.role} 🎉`);

      navigate("/dashboard");

    } catch {
      toast.error("Login failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center gap-6 px-10
    bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#7c3aed]">

      {/* 🔥 QUOTE CARD (RESTORED STYLE) */}
      <div className="hidden md:flex flex-col justify-between items-center 
      bg-[#0b1220]/80 backdrop-blur-xl border border-white/10 
      rounded-3xl px-10 py-8 w-[480px] h-[340px] shadow-xl
      hover:shadow-cyan-400/20 transition text-center">

        <div>
          <h1 className="text-3xl font-bold text-white mb-4">
            Task<span className="text-cyan-400">Flow</span> ⚡
          </h1>

          {/* ✨ ITALIC + BETTER LOOK */}
          <p className="text-gray-300 text-lg italic leading-relaxed min-h-[80px] font-light">
            “{quotes[currentQuote]}”
          </p>
        </div>

        {/* DOTS */}
        <div className="flex gap-2 mt-2">
          {quotes.map((_, i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-full ${
                i === currentQuote ? "bg-cyan-400" : "bg-gray-500"
              }`}
            />
          ))}
        </div>

        {/* CENTERED TEXT */}
        <p className="text-purple-300 text-base font-medium text-center">
          👥 Stay organized. Stay ahead.
        </p>
      </div>

      {/* 🔥 LOGIN CARD (YOUR STYLE BACK) */}
      <div className="bg-[#0b1220]/80 backdrop-blur-xl border border-white/10
      rounded-3xl p-10 w-full max-w-md shadow-xl
      hover:shadow-cyan-400/20 transition">

        <h2 className="text-2xl font-semibold text-white text-center">
          Welcome Back 👋
        </h2>

        {/* 🔥 UNDERLINE BACK */}
        <div className="w-16 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto mt-2 mb-6"></div>

        <form onSubmit={handleLogin} className="space-y-5">

          {/* EMAIL */}
          <div className="flex items-center bg-[#1f2937] px-3 py-3 rounded-lg
          border border-gray-600
          hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/20
          focus-within:border-cyan-400 transition">

            <Mail className="text-gray-400 mr-2" />

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-transparent outline-none text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* PASSWORD */}
          <div className="flex items-center bg-[#1f2937] px-3 py-3 rounded-lg
          border border-gray-600
          hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/20
          focus-within:border-cyan-400 transition">

            <Lock className="text-gray-400 mr-2" />

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full bg-transparent outline-none text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="text-right">
            <Link to="/forgot-password" className="text-cyan-300 text-sm">
              Forgot password?
            </Link>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-500
            py-3 rounded-lg text-white font-semibold
            hover:scale-105 transition duration-300 shadow-lg"
          >
            {loading ? "Logging in..." : "Login →"}
          </button>

          <p className="text-center text-gray-400 text-sm">
            New here?{" "}
            <Link to="/signup" className="text-cyan-300 hover:underline">
              Create account
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Login;