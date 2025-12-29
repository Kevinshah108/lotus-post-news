"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [message, setMessage] = useState("Verifying...");

  useEffect(() => {
    if (token) {
      axios.post("https://lotus-post-api.onrender.com/api/verify", { token })
        .then(() => setMessage("✅ Email Verified! You are now subscribed."))
        .catch(() => setMessage("❌ Invalid or expired token."));
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <h1 className="text-2xl font-bold">{message}</h1>
    </div>
  );
}