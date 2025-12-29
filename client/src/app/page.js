"use client";
import { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { Clock, ExternalLink, Flower2, Moon, Sun } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTheme } from "@/context/ThemeContext"; // 1. Use Global Theme

function NewsFeed() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category");
  const { theme, toggleTheme } = useTheme(); // 2. Get theme from Context

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("general");

  useEffect(() => {
    if (urlCategory) setCategory(urlCategory);
  }, [urlCategory]);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://lotus-post-api.onrender.com/api/news?category=${category}`);
        setNews(res.data);
      } catch (err) { console.error(err); } 
      finally { setLoading(false); }
    };
    fetchNews();
  }, [category]);

  // Dynamic Styles
  const isDark = theme === "dark";
  const bgClass = isDark ? "bg-[#0a0a0a]" : "bg-gray-50";
  const textClass = isDark ? "text-white" : "text-gray-900";
  const cardBg = isDark ? "bg-neutral-900 border-neutral-800" : "bg-white border-gray-200 shadow-sm hover:shadow-md";
  const navBg = isDark ? "bg-black/50 border-gray-800" : "bg-white/80 border-gray-200";

  return (
    <div className="font-sans">

      {/* 🟢 IMPROVED CATEGORY BAR (Fixed Scrollbar) */}
      <div className={`sticky top-16 z-40 backdrop-blur border-b transition-colors duration-300 ${isDark ? "bg-black/90 border-gray-800" : "bg-white/90 border-gray-200"}`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-4">
            {["India", "General", "Technology", "Business", "Sports", "Science"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat.toLowerCase())}
                className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-bold transition-all ${
                  category === cat.toLowerCase()
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 scale-105"
                    : isDark 
                      ? "bg-neutral-800 text-gray-400 hover:bg-neutral-700 hover:text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-12 border-l-4 border-blue-600 pl-6">
          <h2 className="text-5xl font-bold mb-4 tracking-tight">Top Stories</h2>
          <p className={`${isDark ? "text-gray-400" : "text-gray-600"} text-lg`}>Keep updated with the latest news.</p>
        </div>

        {loading ? (
          <div className="text-center py-20 animate-pulse text-gray-500">Loading world news...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((article) => (
              <div key={article.url || article._id} className={`group border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full ${cardBg}`}>
                <div className="h-48 overflow-hidden relative">
                  <img src={article.image || "https://via.placeholder.com/400x200?text=Lotus+Post"} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-400 border border-white/10">{article.source || "News"}</div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                   <div className="flex items-center gap-2 text-gray-500 text-xs mb-4">
                    <Clock size={12} />
                    <span>{article.publishedAt ? formatDistanceToNow(new Date(article.publishedAt)) : "Recent"} ago</span>
                   </div>
                   <h3 className={`text-xl font-bold leading-snug mb-3 transition-colors ${isDark ? "group-hover:text-blue-400" : "text-gray-900 group-hover:text-blue-600"}`}>{article.title}</h3>
                   <p className={`text-sm line-clamp-3 mb-6 flex-grow ${isDark ? "text-gray-400" : "text-gray-600"}`}>{article.description}</p>
                   <Link href={`/article/${article._id}`} className="inline-flex items-center gap-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors w-max">
                    Read on Lotus <ExternalLink size={14} />
                   </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="text-center pt-20">Loading...</div>}>
      <NewsFeed />
    </Suspense>
  );
}