"use client";
import Link from 'next/link';
import { Flower2, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  // Dynamic Styles
//   const navBg = isDark ? "bg-black/50 border-gray-800" : "bg-white/80 border-gray-200";
const navBg = isDark ? "bg-[#0a0a0a]/90 border-gray-800" : "bg-white/80 border-gray-200";
  const textClass = isDark ? "text-white" : "text-gray-900";

  return (
    // <nav className={`border-b backdrop-blur-md sticky top-0 z-50 transition-colors duration-300 ${navBg}`}>
    <nav className={`border-b backdrop-blur-md fixed top-0 w-full z-50 transition-colors duration-300 ${navBg}`}>
      {/* <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between"> */}
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* 🟢 LOGO LINK (Clicks go to Home) */}
        <Link href="/" className="group">
          <h1 className={`text-2xl font-black tracking-tighter flex items-center gap-2 ${textClass}`}>
            LOTUS <span className="text-blue-600">POST</span>.
          </h1>
        </Link>

        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-all ${isDark ? "hover:bg-white/10 text-yellow-400" : "hover:bg-gray-200 text-purple-600"}`}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* YouTube Button */}
          <a 
            href="https://www.youtube.com/@LotusPost?sub_confirmation=1" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`hidden md:flex items-center gap-2 border px-4 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105 group ${
              isDark 
                ? "bg-white/5 hover:bg-white/10 border-white/10 text-white" 
                : "bg-red-50 hover:bg-red-100 border-red-200 text-red-700"
            }`}
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#FF0000"/>
              <path d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#FFFFFF"/>
            </svg>
            <span className="group-hover:text-red-600 transition-colors">Subscribe</span>
          </a>
        </div>
      </div>
    </nav>
  );
}