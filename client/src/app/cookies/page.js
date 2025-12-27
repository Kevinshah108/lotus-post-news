"use client";
import { useTheme } from "@/context/ThemeContext";

export default function CookiesPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen py-20 px-6 ${isDark ? "bg-[#0a0a0a] text-white" : "bg-white text-gray-900"}`}>
      <div className="max-w-3xl mx-auto space-y-8">
        
        <div className="border-b pb-8 mb-8 border-gray-700">
          <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
          <p className={isDark ? "text-gray-400" : "text-gray-600"}>Effective Date: December 2025</p>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">What Are Cookies?</h2>
          <p className={isDark ? "text-gray-300" : "text-gray-700"}>
            Cookies are small text files stored on your device when you load a website. They help us recognize your device and preferences (such as your "Day/Night" mode setting).
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Cookies We Use</h2>
          <div className={`p-6 rounded-xl border ${isDark ? "bg-white/5 border-gray-800" : "bg-gray-50 border-gray-200"}`}>
            <ul className={`space-y-4 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              <li className="flex gap-4">
                <span className="font-bold min-w-[100px]">Essential</span>
                <span>Required for the site to function (e.g., security, network management).</span>
              </li>
              <li className="flex gap-4">
                <span className="font-bold min-w-[100px]">Preference</span>
                <span>Used to remember your settings, such as your preferred theme or language.</span>
              </li>
              <li className="flex gap-4">
                <span className="font-bold min-w-[100px]">Analytics</span>
                <span>Help us understand how visitors interact with the website.</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Managing Cookies</h2>
          <p className={isDark ? "text-gray-300" : "text-gray-700"}>
            You can control or delete cookies through your browser settings. However, disabling cookies may affect your ability to use certain features of Lotus Post.
          </p>
        </section>

      </div>
    </div>
  );
}