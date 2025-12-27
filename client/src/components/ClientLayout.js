"use client";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TypewriterLoader from "@/components/TypewriterLoader";

export default function ClientLayout({ children }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bgClass = isDark
    ? "bg-[#0a0a0a] text-white"
    : "bg-gray-50 text-gray-900";
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingFinish = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <TypewriterLoader onFinish={handleLoadingFinish} />}

      {/* 🟢 Added 'pt-16' here to push content below the fixed navbar */}
      <div
        className={`min-h-screen pt-16 transition-colors duration-300 flex flex-col ${bgClass}`}
      >
        <div
          className={`transition-opacity duration-700 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
        >
          <Navbar />
        </div>

        <main
          className={`flex-grow transition-opacity duration-1000 ${
            isLoading ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          }`}
        >
          {children}
        </main>

        <div
          className={`transition-opacity duration-700 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
        >
          <Footer />
        </div>
      </div>
    </>
  );
}
