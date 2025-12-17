"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import api from "../../../lib/api";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const { token } = useParams();
  const router = useRouter();
  const [password, setPassword] = useState("");

  const handleReset = async () => {
    try {
      await api.post(`/auth/reset-password/${token}`, { password });
      toast.success("Password updated");
      router.push("/login");
    } catch {
      toast.error("Invalid or expired link");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-white/5 p-8 rounded-xl w-96 text-white">
        <h2 className="text-2xl font-bold mb-6">Reset Password</h2>

        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-3 bg-black border border-white/10 rounded"
        />

        <button
          onClick={handleReset}
          className="w-full bg-white text-black py-3 rounded"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}
