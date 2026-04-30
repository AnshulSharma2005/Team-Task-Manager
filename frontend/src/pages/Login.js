import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, ChevronLeft, ChevronRight, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [index, setIndex] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const quotes = [
    "Discipline turns goals into results when you show up consistently, even on days you don’t feel like it.",
    "Small wins lead to big victories when you focus on progress every single day instead of perfection.",
    "Success is built through daily habits, not occasional bursts of motivation or inspiration.",
    "Your future is created by what you do today, not what you plan to do tomorrow.",
    "Consistency is what separates those who dream from those who actually achieve.",
    "Great teams are built on trust, communication, and the discipline to execute together.",
    "The difference between success and failure often comes down to who keeps going when it gets hard.",
    "Focus on execution, because ideas without action are just distractions.",
    "Every completed task is a step closer to the bigger vision you are working towards.",
    "Stay organized, stay consistent, and success will follow naturally over time."
  ];

  // Auto slider
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const next = () => setIndex((index + 1) % quotes.length);
  const prev = () =>
    setIndex((index - 1 + quotes.length) % quotes.length);

  return (
    <div className="min-h-screen flex flex-wrap items-center justify-center md:justify-between gap-8 px-6 md:px-20 py-10
    bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#6d28d9]">

      {/* LEFT : QUOTE CARD */}
      <div className="w-full md:w-[45%] flex justify-center md:justify-start">
       <div className="bg-[#0b1220]/80 backdrop-blur-xl border border-white/10
rounded-3xl p-10 w-full max-w-lg h-[420px]
shadow-xl hover:shadow-blue-500/20 transition flex flex-col justify-between">

  {/* Title (added top spacing) */}
  <div className="text-center mt-2">
    <h1 className="text-3xl font-bold text-white">
      Task<span className="text-blue-400">Flow</span> ⚡
    </h1>
    <div className="w-12 h-[2px] bg-blue-400 mx-auto mt-2 rounded"></div>
  </div>

  {/* Quote (reduced gap below) */}
  <div className="text-center px-4 -mt-2">
    <p className="text-lg md:text-xl italic text-gray-200 leading-relaxed min-h-[100px]">
      “{quotes[index]}”
    </p>
  </div>

  {/* Controls (moved slightly up) */}
  <div className="flex items-center justify-between -mt-2">

    <button
      onClick={prev}
      className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10
      hover:bg-white/20 text-white transition">
      <ChevronLeft size={20} />
    </button>

    {/* Dots */}
    <div className="flex gap-2">
      {quotes.map((_, i) => (
        <div
          key={i}
          className={`w-2.5 h-2.5 rounded-full transition ${
            i === index ? "bg-blue-400 scale-125" : "bg-gray-500"
          }`}
        ></div>
      ))}
    </div>

    <button
      onClick={next}
      className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10
      hover:bg-white/20 text-white transition">
      <ChevronRight size={20} />
    </button>
  </div>

  {/* Footer (CENTERED FIX) */}
  <div className="flex justify-center items-center gap-2 text-gray-400 text-sm mt-2">
    <span className="text-blue-400">👥</span>
    Stay organized. Stay ahead.
  </div>
</div>
      </div>

      {/* RIGHT : LOGIN CARD */}
      <div className="w-full md:w-[45%] flex justify-center md:justify-end">
        <div className="bg-[#0b1220]/90 backdrop-blur-xl border border-white/10
        rounded-3xl p-8 md:p-10 w-full max-w-lg
        shadow-2xl hover:shadow-cyan-400/20 transition
        flex flex-col justify-between">

          {/* Top Section */}
          <div>
            {/* Icon */}
            <div className="flex justify-center mb-3">
              <div className="bg-cyan-500/10 p-3 rounded-full">
                <Lock className="text-cyan-400" />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-white text-center">
              Welcome Back 👋
            </h2>

            <div className="w-16 h-[2px] bg-cyan-400 mx-auto mt-2 mb-5 rounded"></div>

            {/* Email */}
            <div className="mb-4">
  <label className="text-gray-300 text-sm mb-2 block">
    Email Address
  </label>

  <div className="flex items-center bg-[#1f2937] rounded-lg border border-gray-600
  hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/20
  focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-400/30
  transition px-3">

    <Mail className="text-gray-400 mr-2" size={18} />

    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Enter your email"
      className="w-full py-3 bg-transparent text-white outline-none"
    />
  </div>
</div>

            {/* Password */}
           <div className="mb-3">
  <label className="text-gray-300 text-sm mb-2 block">
    Password
  </label>

  <div className="flex items-center bg-[#1f2937] rounded-lg border border-gray-600
  hover:border-purple-400 hover:shadow-lg hover:shadow-purple-400/20
  focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-400/30
  transition px-3">

    <Lock className="text-gray-400 mr-2" size={18} />

    <input
      type={showPassword ? "text" : "password"}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Enter your password"
      className="flex-1 py-3 bg-transparent text-white outline-none"
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="ml-2 text-gray-400 hover:text-cyan-400 transition flex items-center"
    >
      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>

  </div>
</div>

           {/* Forgot Password (RIGHT ALIGNED + SPACING FIX) */}
            <div className="flex justify-end mt-2 mb-4">
              <span
                onClick={() => navigate("/forgot-password")}
                className="text-cyan-400 text-sm cursor-pointer hover:underline transition"
              >
                Forgot password?
              </span>
            </div>

            {/* Button */}
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-500
              text-white py-3 rounded-lg font-semibold
              hover:scale-105 transition duration-300 shadow-lg">
              Login →
            </button>
          </div>

          {/* Bottom Section (INSIDE CARD FIXED) */}
          <p className="text-center text-sm text-gray-400 mt-6">
            New here?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-cyan-300 cursor-pointer hover:underline">
              Create account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}