import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <BrowserRouter>

      {/* ✅ GLOBAL TOASTER (MANDATORY) */}
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: "#0b1220",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.1)"
          }
        }}
      />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

    </BrowserRouter>
  );
}