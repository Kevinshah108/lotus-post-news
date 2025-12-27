"use client";
import { useTheme } from "@/context/ThemeContext";

export default function TermsPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen py-20 px-6 ${isDark ? "bg-[#0a0a0a] text-white" : "bg-white text-gray-900"}`}>
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="border-b pb-8 mb-8 border-gray-700">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className={isDark ? "text-gray-400" : "text-gray-600"}>Last Updated: December 2025</p>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">1. Agreement to Terms</h2>
          <p className={isDark ? "text-gray-300" : "text-gray-700"}>
            By accessing Lotus Post, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">2. Intellectual Property</h2>
          <p className={isDark ? "text-gray-300" : "text-gray-700"}>
            The content, features, and functionality of this website are owned by Lotus Post and are protected by international copyright, trademark, and other intellectual property laws.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">3. Limitation of Liability</h2>
          <p className={isDark ? "text-gray-300" : "text-gray-700"}>
            Lotus Post shall not be liable for any indirect, incidental, or consequential damages resulting from your use of the website or any content therein.
          </p>
        </section>
      </div>
    </div>
  );
}