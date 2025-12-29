"use client";

// 🔴 THIS LINE FIXES THE BUILD ERROR
// It tells Next.js: "Skip this page during build, render it live on the server."
export const dynamic = "force-dynamic";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

// 1. The Logic Component
function VerifyContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [message, setMessage] = useState("Verifying...");

  useEffect(() => {
    if (token) {
      // Ensure this URL is your RENDER Backend URL
      axios.post("https://lotus-post-api.onrender.com/api/verify", { token })
        .then(() => setMessage("✅ Email Verified! You are now subscribed."))
        .catch(() => setMessage("❌ Invalid or expired token."));
    } else {
      setMessage("⚠️ No token found.");
    }
  }, [token]);

  return <h1 className="text-2xl font-bold">{message}</h1>;
}

// 2. The Main Page Wrapper
export default function VerifyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <Suspense fallback={<h1 className="text-xl">Loading...</h1>}>
        <VerifyContent />
      </Suspense>
    </div>
  );
}