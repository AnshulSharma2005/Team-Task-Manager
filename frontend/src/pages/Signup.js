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
    role: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const roles = ["Admin", "Member"];

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      return toast.error("Please fill all fields ❌");
    }

    if (!form.role) {
      return toast.error("Select a role ❌");
    }

    if (form.password !== form.confirmPassword) {
      return toast.error("Passwords do not match ❌");
    }

    try {
      setLoading(true);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const user = userCredential.user;

      await axios.post("http://localhost:5000/api/users", {
        name: form.name,
        email: user.email,
        role: form.role,
      });

      toast.success("Account created successfully 🎉");

      setTimeout(() => navigate("/"), 1500);

    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email already exists. Please login.");
      } else {
        toast.error("Signup failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-6
    bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#7c3aed]">

      <div className="bg-[#0b1220]/90 backdrop-blur-xl border border-white/10
      rounded-3xl p-10 w-full max-w-md shadow-xl hover:shadow-cyan-400/20">

        <h2 className="text-2xl text-white text-center font-semibold mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSignup} className="space-y-4">

          <Input icon={<User />} name="name" placeholder="Name" form={form} setForm={setForm} />
          <Input icon={<Mail />} name="email" placeholder="Email" form={form} setForm={setForm} />

          <PasswordInput
            label="Password"
            show={showPassword}
            toggle={() => setShowPassword(!showPassword)}
            name="password"
            form={form}
            setForm={setForm}
          />

          <PasswordInput
            label="Confirm Password"
            show={showConfirm}
            toggle={() => setShowConfirm(!showConfirm)}
            name="confirmPassword"
            form={form}
            setForm={setForm}
          />

          {/* Role */}
          <select
            className="w-full p-3 bg-[#1f2937] text-white rounded-lg border border-gray-600"
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="">Select role</option>
            {roles.map((r) => <option key={r}>{r}</option>)}
          </select>

          <button className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 py-3 rounded-lg text-white">
            {loading ? "Creating..." : "Sign Up →"}
          </button>

          <p className="text-center text-gray-400 text-sm">
            Already have an account?{" "}
            <Link to="/" className="text-cyan-300">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

const Input = ({ icon, name, placeholder, form, setForm }) => (
  <div className="flex items-center bg-[#1f2937] rounded-lg px-3">
    {icon}
    <input
      placeholder={placeholder}
      className="w-full bg-transparent p-3 text-white outline-none"
      onChange={(e) => setForm({ ...form, [name]: e.target.value })}
    />
  </div>
);

const PasswordInput = ({ label, show, toggle, name, form, setForm }) => (
  <div>
    <label className="text-gray-300 text-sm">{label}</label>
    <div className="flex items-center bg-[#1f2937] rounded-lg px-3">
      <Lock className="mr-2 text-gray-400" />
      <input
        type={show ? "text" : "password"}
        className="flex-1 bg-transparent p-3 text-white outline-none"
        onChange={(e) => setForm({ ...form, [name]: e.target.value })}
      />
      <span onClick={toggle} className="cursor-pointer">
        {show ? <EyeOff /> : <Eye />}
      </span>
    </div>
  </div>
);

export default Signup;