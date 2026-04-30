import React, { useState } from "react";
import { Link } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    category: ""
  });

  const [openDropdown, setOpenDropdown] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const categories = ["ADMIN", "MEMBER"];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="min-h-screen flex flex-wrap items-center justify-center gap-10 px-6 py-10
    bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#7c3aed]">

      <div className="bg-[#0b1220]/80 backdrop-blur-xl border border-white/10
      rounded-3xl p-10 w-full max-w-md shadow-xl">

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-white tracking-wide">
            Create Account
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Join your team and start managing tasks efficiently
          </p>          <div className="w-12 h-[2px] bg-cyan-400 mx-auto mt-2"></div>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">

          {/* Name */}
          <div>
            <label className="text-gray-300 text-sm">Full Name</label>
            <div className="flex items-center mt-1 bg-white/10 rounded-lg px-3
            border border-transparent
            focus-within:border-cyan-400
            hover:shadow-lg hover:shadow-cyan-500/20 transition">

              <User size={18} className="text-gray-400 mr-2" />
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                className="w-full bg-transparent outline-none py-2 text-white"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-gray-300 text-sm">Email</label>
            <div className="flex items-center mt-1 bg-white/10 rounded-lg px-3
            border border-transparent
            focus-within:border-cyan-400
            hover:shadow-lg hover:shadow-cyan-500/20 transition">

              <Mail size={18} className="text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-transparent outline-none py-2 text-white"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-300 text-sm">Password</label>
            <div className="flex items-center mt-1 bg-white/10 rounded-lg px-3
            border border-transparent
            focus-within:border-purple-400
            hover:shadow-lg hover:shadow-purple-500/20 transition">

              <Lock size={18} className="text-gray-400 mr-2" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
                className="w-full bg-transparent outline-none py-2 text-white"
                required
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-gray-300 text-sm">Confirm Password</label>
            <div className="flex items-center mt-1 bg-white/10 rounded-lg px-3
            border border-transparent
            focus-within:border-purple-400
            hover:shadow-lg hover:shadow-purple-500/20 transition">

              <Lock size={18} className="text-gray-400 mr-2" />

              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full bg-transparent outline-none py-2 text-white"
                required
              />

              <span
                onClick={() => setShowConfirm(!showConfirm)}
                className="cursor-pointer text-gray-400"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
          </div>

          {/* Category (FIXED PROPERLY) */}
          <div>
            <label className="text-gray-300 text-sm">Category</label>

            <div className="relative mt-1">
              <div
                onClick={() => setOpenDropdown(!openDropdown)}
                className="bg-white/10 rounded-lg px-4 py-2 text-white cursor-pointer
                border border-transparent
                hover:shadow-lg hover:shadow-cyan-500/20
                focus:border-cyan-400 transition flex justify-between items-center"
              >
                {form.category || "Select category"}
                <span className="text-gray-400">▼</span>
              </div>

              {openDropdown && (
                <div className="absolute w-full mt-2 bg-[#0b1220]
                border border-white/10 rounded-lg shadow-lg z-10 overflow-hidden">

                  {categories.map((cat) => (
                    <div
                      key={cat}
                      onClick={() => {
                        setForm({ ...form, category: cat });
                        setOpenDropdown(false);
                      }}
                      className="px-4 py-2 text-white hover:bg-cyan-500/20 cursor-pointer transition"
                    >
                      {cat}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-purple-500
            py-3 rounded-lg text-white font-semibold
            hover:scale-105 transition duration-300 shadow-lg"
          >
            Sign Up →
          </button>

          {/* Bottom */}
          <p className="text-sm text-gray-400 text-center mt-3">
            Already have an account?{" "}
            <Link to="/" className="text-cyan-300 hover:underline">
              Login
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Signup;