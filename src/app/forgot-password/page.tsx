"use client";

import { useState } from "react";
import api from "../../lib/api";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    try {
      await api.post("/auth/forgot-password", { email });
      toast.success("Reset link sent (check console)");
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-white/5 p-8 rounded-xl w-96 text-white">
        <h2 className="text-2xl font-bold mb-6">Forgot Password</h2>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full mb-4 px-4 py-3 bg-black border border-white/10 rounded"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-white text-black py-3 rounded"
        >
          Send Reset Link
        </button>
      </div>
    </div>
  );
}
