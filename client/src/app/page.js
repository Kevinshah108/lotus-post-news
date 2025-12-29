"use client";
import { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { Clock, ExternalLink } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import NewsImage from "../components/NewsImage"; 
import TypewriterLoader from "../components/TypewriterLoader"; // 🟢 Import your new loader

function NewsFeed() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category");
  const { theme } = useTheme();

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true); // Data loading state
  const [showSplash, setShowSplash] = useState(true); // Loader visibility state
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
      } catch (err) {
        console.error(err);
      } finally {
        // 🟢 Crucial: We stop "loading" so the splash screen knows it can fade out
        setLoading(false);
      }
    };
    fetchNews();
  }, [category]);

  const isDark = theme === "dark";
  const cardBg = isDark ? "bg-neutral-900 border-neutral-800" : "bg-white border-gray-200 shadow-sm hover:shadow-md";

  return (
    <div className="font-sans min-h-screen relative">
      
      {/* 🟢 THE SMART LOADER */}
      {/* It sits on top (z-index 9999). It waits until 'loading' is false to fade out. */}
      {showSplash && (
        <TypewriterLoader 
          isLoading={loading} 
          onFinish={() => setShowSplash(false)} 
        />
      )}

      {/* 🟢 THE CONTENT (Loads in background) */}
      <div className={`transition-opacity duration-1000 ${loading ? "opacity-0" : "opacity-100"}`}>
        
        {/* Category Bar */}
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
            <h2 className={`text-5xl font-bold mb-4 tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
              Top Stories
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((article) => (
              <div key={article._id || article.url} className={`group border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full ${cardBg}`}>
                
                <NewsImage src={article.image} alt={article.title} />

                <div className="p-6 flex flex-col flex-grow">
                   <div className="flex items-center gap-2 text-gray-500 text-xs mb-4">
                     <Clock size={12} />
                     <span>{article.publishedAt ? formatDistanceToNow(new Date(article.publishedAt)) : "Recent"} ago</span>
                   </div>
                   
                   <h3 className={`text-xl font-bold leading-snug mb-3 transition-colors ${isDark ? "group-hover:text-blue-400 text-white" : "text-gray-900 group-hover:text-blue-600"}`}>
                     {article.title}
                   </h3>
                   
                   <p className={`text-sm line-clamp-3 mb-6 flex-grow ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                     {article.description}
                   </p>
                   
                   <Link href={`/article/${article._id}`} className="inline-flex items-center gap-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors w-max">
                     Read on Lotus <ExternalLink size={14} />
                   </Link>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <NewsFeed />
    </Suspense>
  );
}