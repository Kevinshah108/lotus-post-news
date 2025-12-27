"use client";
import { Flower2, Twitter, Facebook, Instagram, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext'; // Import hook
import { useState } from 'react';
import axios from 'axios';

export default function Footer() {
  const { theme } = useTheme(); // Get global theme
  const isDark = theme === 'dark';

  // Dynamic Colors
  const bgClass = isDark ? "bg-black border-gray-800" : "bg-gray-100 border-gray-300";
  const textHead = isDark ? "text-white" : "text-gray-900";
  const textSub = isDark ? "text-gray-400" : "text-gray-600";
  const inputBg = isDark ? "bg-white/5 border-gray-800 text-white" : "bg-white border-gray-300 text-black";
  const borderClass = isDark ? "border-white/10" : "border-gray-300";

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(""); // "sending", "success", "error"

  const handleSubscribe = async () => {
    if (!email) return;
    setStatus("sending");

    try {
      await axios.post('http://localhost:5000/api/subscribe', { email });
      
      setStatus("success");
      alert("✅ Subscribed! Check your inbox for a welcome email.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      const msg = err.response?.data?.message || "Something went wrong";
      alert("⚠️ " + msg);
    }
  };

  return (
    <footer className={`border-t pt-16 pb-8 ${bgClass} ${borderClass}`}>
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className={`text-xl font-bold tracking-tight ${textHead}`}>
                LOTUS <span className="text-blue-500">POST</span>
              </span>
            </div>
            <p className={`${textSub} text-sm leading-relaxed`}>
              Get the latest news and current affairs of the world daily. 
              Delivering the world's most critical stories with speed and precision.
            </p>
          </div>

          {/* Sections Column */}
          <div>
            <h4 className={`font-bold mb-6 ${textHead}`}>Sections</h4>
            <ul className={`space-y-3 text-sm ${textSub}`}>
                <li><Link href="/?category=technology" className="hover:text-blue-500 transition-colors">Technology</Link></li>
                <li><Link href="/?category=business" className="hover:text-blue-500 transition-colors">Business</Link></li>
                <li><Link href="/?category=sports" className="hover:text-blue-500 transition-colors">Sports</Link></li>
                <li><Link href="/?category=science" className="hover:text-blue-500 transition-colors">Science</Link></li>
                <li><Link href="/?category=india" className="hover:text-blue-500 transition-colors">India</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className={`font-bold mb-6 ${textHead}`}>Company</h4>
            <ul className={`space-y-3 text-sm ${textSub}`}>
              <li><Link href="/about" className="hover:text-blue-500 transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-blue-500 transition-colors">Careers</Link></li>
              <li><Link href="/privacy" className="hover:text-blue-500 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-blue-500 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className={`font-bold mb-6 ${textHead}`}>Stay Updated</h4>
            
            <div className="flex gap-2 mb-2">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                className={`border rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:border-blue-500 ${inputBg} ${isDark ? "border-white/10" : "border-gray-300"}`}
              />
              <button 
                onClick={handleSubscribe}
                disabled={status === "sending"}
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
              >
                {status === "sending" ? "..." : <Mail size={18} />}
              </button>
            </div>
            
            {/* Status Message */}
            {status === "success" && <p className="text-green-500 text-xs">Check email to verify!</p>}
            {status === "error" && <p className="text-red-500 text-xs">Already subscribed or error.</p>}

            <a 
              href="https://www.youtube.com/@LotusPost?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center mt-2.5 justify-center gap-3 w-full border font-bold py-1 rounded-xl transition-all hover:scale-105 group mb-6 ${isDark ? "bg-white/5 hover:bg-white/10 border-white/10 text-white" : "bg-white hover:bg-gray-50 border-gray-300 text-gray-900"}`}
            >
              {/* Official YouTube SVG Logo */}
              <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
                 <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#FF0000"/>
                 <path d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#FFFFFF"/>
              </svg>
              <span>Subscribe on YouTube</span>
            </a>

            <div className="flex gap-4 mt-6">
              <a href="#" className={`${textSub} hover:text-blue-500 transition-colors`}><Twitter size={20} /></a>
              <a href="#" className={`${textSub} hover:text-blue-500 transition-colors`}><Facebook size={20} /></a>
              <a href="#" className={`${textSub} hover:text-blue-500 transition-colors`}><Instagram size={20} /></a>
              <a href="#" className={`${textSub} hover:text-blue-500 transition-colors`}><Linkedin size={20} /></a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs ${borderClass} ${textSub}`}>
          <p>© {new Date().getFullYear()} Lotus Post. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className={`hover:${isDark ? "text-white" : "text-black"} transition-colors`}>Privacy</Link>
            <Link href="/cookies" className={`hover:${isDark ? "text-white" : "text-black"} transition-colors`}>Cookies</Link>
            <Link href="/accessibility" className={`hover:${isDark ? "text-white" : "text-black"} transition-colors`}>Accessibility</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}