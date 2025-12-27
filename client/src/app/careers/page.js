"use client";
import { useTheme } from "@/context/ThemeContext";
import { ArrowRight } from "lucide-react";

export default function CareersPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const cardClass = isDark ? "bg-neutral-900 border-neutral-800 hover:border-blue-600" : "bg-white border-gray-200 hover:border-blue-600 shadow-sm";

  const jobs = [
    { title: "Senior React Developer", type: "India", dept: "Engineering" },
    { title: "AI Model Trainer", type: "Remote", dept: "Data Science" },
    { title: "Global News Editor", type: "Remote", dept: "Editorial" },
  ];

  return (
    <div className={`min-h-screen py-20 px-6 ${isDark ? "bg-[#0a0a0a] text-white" : "bg-white text-gray-900"}`}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Join the Lotus Team</h1>
        <p className={`text-xl mb-12 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          Help us build the future of automated journalism.
        </p>

        <div className="grid gap-4">
          {jobs.map((job, index) => (
            <div key={index} className={`p-6 rounded-xl border transition-all cursor-pointer group flex justify-between items-center ${cardClass}`}>
              <div>
                <h3 className="text-xl font-bold mb-1 group-hover:text-blue-500 transition-colors">{job.title}</h3>
                <div className={`flex gap-3 text-sm ${isDark ? "text-gray-500" : "text-gray-500"}`}>
                  <span>{job.dept}</span>
                  <span>•</span>
                  <span>{job.type}</span>
                </div>
              </div>
              <ArrowRight className={`opacity-0 group-hover:opacity-100 transition-opacity ${isDark ? "text-white" : "text-black"}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}