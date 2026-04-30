import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

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
  const [loading, setLoading] = useState(false);

  const categories = ["Admin", "Member"]; // 🔥 FIXED (case sensitive)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 SIGNUP FLOW (Firebase + MongoDB)
  const handleSignup = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      return toast.error("Please fill all fields ❌");
    }

    if (!form.category) {
      return toast.error("Please select a role ❌");
    }

    if (form.password !== form.confirmPassword) {
      return toast.error("Passwords do not match ❌");
    }

    try {
      setLoading(true);

      // 🔐 Firebase signup
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const user = userCredential.user;

      // 🗄️ Save user in backend (MongoDB)
      await axios.post("http://localhost:5000/api/users", {
        name: form.name,
        email: user.email,
        role: form.category
      });

      // 🔥 Store in localStorage
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userRole", form.category);

      toast.success("Account created successfully 🎉");

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (error) {
      console.error(error);

      if (error.code === "auth/email-already-in-use") {
        toast.error("Email already registered. Please login.");
      } else {
        toast.error(error.message);
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-wrap items-center justify-center gap-10 px-6 py-10
    bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#7c3aed]">

      <div className="bg-[#0b1220]/80 backdrop-blur-xl border border-white/10
      rounded-3xl p-10 w-full max-w-md shadow-xl hover:shadow-cyan-400/20 transition">

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-white tracking-wide">
            Create Account
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Join your team and start managing tasks efficiently
          </p>
          <div className="w-12 h-[2px] bg-cyan-400 mx-auto mt-2"></div>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">

          {/* Name */}
          <InputField icon={<User size={18} />} name="name" value={form.name}
            placeholder="Enter your name" onChange={handleChange} />

          {/* Email */}
          <InputField icon={<Mail size={18} />} name="email" value={form.email}
            placeholder="Enter your email" onChange={handleChange} />

          {/* Password */}
          <PasswordField
            label="Password"
            value={form.password}
            name="password"
            show={showPassword}
            toggle={() => setShowPassword(!showPassword)}
            onChange={handleChange}
          />

          {/* Confirm Password */}
          <PasswordField
            label="Confirm Password"
            value={form.confirmPassword}
            name="confirmPassword"
            show={showConfirm}
            toggle={() => setShowConfirm(!showConfirm)}
            onChange={handleChange}
          />

          {/* Category */}
          <div>
            <label className="text-gray-300 text-sm">Role</label>

            <div className="relative mt-1">
              <div
                onClick={() => setOpenDropdown(!openDropdown)}
                className="bg-[#1f2937] rounded-lg px-4 py-3 text-white cursor-pointer
                border border-gray-600 hover:border-cyan-400
                hover:shadow-lg hover:shadow-cyan-400/20
                transition flex justify-between items-center"
              >
                {form.category || "Select role"}
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
                      className="px-4 py-3 text-white hover:bg-cyan-500/20 cursor-pointer"
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
            disabled={loading}
            className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-purple-500
            py-3 rounded-lg text-white font-semibold
            hover:scale-105 transition duration-300 shadow-lg disabled:opacity-60"
          >
            {loading ? "Creating..." : "Sign Up →"}
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

// 🔥 Reusable components (clean UI)

const InputField = ({ icon, ...props }) => (
  <div>
    <div className="flex items-center mt-1 bg-[#1f2937] rounded-lg px-3
    border border-gray-600 hover:border-cyan-400
    hover:shadow-lg hover:shadow-cyan-400/20
    focus-within:border-cyan-400 transition">
      <span className="text-gray-400 mr-2">{icon}</span>
      <input {...props}
        className="w-full bg-transparent outline-none py-3 text-white" />
    </div>
  </div>
);

const PasswordField = ({ label, show, toggle, ...props }) => (
  <div>
    <label className="text-gray-300 text-sm">{label}</label>
    <div className="flex items-center mt-1 bg-[#1f2937] rounded-lg px-3
    border border-gray-600 hover:border-purple-400
    hover:shadow-lg hover:shadow-purple-400/20
    focus-within:border-purple-400 transition">

      <Lock size={18} className="text-gray-400 mr-2" />

      <input
        type={show ? "text" : "password"}
        {...props}
        className="flex-1 bg-transparent outline-none py-3 text-white"
      />

      <button type="button" onClick={toggle}
        className="text-gray-400 hover:text-cyan-400">
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  </div>
);

export default Signup;