"use client";
import { useTheme } from "@/context/ThemeContext";

export default function AboutPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen py-20 px-6 ${isDark ? "bg-[#0a0a0a] text-white" : "bg-white text-gray-900"}`}>
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-black tracking-tight">Our Mission</h1>
          <p className={`text-xl ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Democratizing intelligence through AI.
          </p>
        </div>

        <div className={`p-8 rounded-2xl border ${isDark ? "bg-white/5 border-gray-800" : "bg-gray-50 border-gray-200"}`}>
          <p className="text-lg leading-relaxed mb-6">
            Lotus Post was born from a simple idea: the world is moving too fast for traditional news cycles. We combine cutting-edge Artificial Intelligence with rigorous journalistic standards to deliver news that is accurate, unbiased, and instantaneous.
          </p>
          <p className="text-lg leading-relaxed">
            Our algorithms scan thousands of global sources every minute, ensuring you never miss a critical update, whether it's a market shift in Tokyo or a scientific breakthrough in Boston.
          </p>
        </div>
      </div>
    </div>
  );
}