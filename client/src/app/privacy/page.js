"use client";
import { useTheme } from "@/context/ThemeContext";

export default function PrivacyPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen py-20 px-6 ${isDark ? "bg-[#0a0a0a] text-white" : "bg-white text-gray-900"}`}>
      <div className="max-w-3xl mx-auto space-y-8">
        
        <div className="border-b pb-8 mb-8 border-gray-700">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className={isDark ? "text-gray-400" : "text-gray-600"}>Last updated: December 2025</p>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">1. Introduction</h2>
          <p className={isDark ? "text-gray-300" : "text-gray-700"}>
            Lotus Post ("we," "our," or "us") respects your privacy. This Privacy Policy explains how we collect, use, and protect your information when you visit our website.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">2. Information We Collect</h2>
          <ul className={`list-disc pl-5 space-y-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            <li><strong>Usage Data:</strong> Information on how you use the site, such as pages visited and time spent.</li>
            <li><strong>Device Data:</strong> IP address, browser type, and operating system.</li>
            <li><strong>Cookies:</strong> Data stored on your device to improve site functionality.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">3. How We Use Your Data</h2>
          <p className={isDark ? "text-gray-300" : "text-gray-700"}>
            We use your data to analyze traffic, improve our AI content curation, and provide a seamless reading experience. We do not sell your personal data to third parties.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">4. Contact Us</h2>
          <p className={isDark ? "text-gray-300" : "text-gray-700"}>
            If you have questions about this policy, please contact us at <span className="text-blue-500">privacy@lotuspost.com</span>.
          </p>
        </section>

      </div>
    </div>
  );
}