"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { Clock, Share2, ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { useTheme } from "@/context/ThemeContext"; // 1. Import the Theme Hook

export default function ArticlePage() {
  const { id } = useParams();
  const { theme } = useTheme(); // 2. Get current theme
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/news/${id}`);
        setArticle(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchArticle();
  }, [id]);

  const handleShare = async () => {
    const shareData = {
      title: article.title,
      text: "Read this on Lotus Post",
      url: window.location.href,
    };

    if (navigator.share) {
      try { await navigator.share(shareData); } catch (err) {}
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // 3. Dynamic Styles based on Theme
  const isDark = theme === "dark";
  const bgClass = isDark ? "bg-[#0a0a0a]" : "bg-white";
  const textClass = isDark ? "text-white" : "text-gray-900";
  const subText = isDark ? "text-gray-400" : "text-gray-500";
  const borderClass = isDark ? "border-white/10" : "border-gray-200";
  const buttonClass = isDark ? "bg-white/5 hover:bg-white/10" : "bg-gray-100 hover:bg-gray-200";
  const proseClass = isDark ? "prose-invert" : ""; // 'prose-invert' makes text white for dark mode

  if (loading) return <div className={`text-center py-20 ${textClass}`}>Loading story...</div>;
  if (!article) return <div className={`text-center py-20 ${textClass}`}>Article not found.</div>;

  return (
    <div className={`min-h-screen py-12 px-6 transition-colors duration-300 ${bgClass} ${textClass}`}>
      <div className="max-w-3xl mx-auto">
        
        {/* Back Button */}
        <Link href="/" className={`inline-flex items-center gap-2 mb-8 transition-colors ${subText} hover:${textClass}`}>
          <ArrowLeft size={20} /> Back to News
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-blue-600/10 text-blue-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {article.category}
            </span>
            <div className={`flex items-center gap-1 text-xs ${subText}`}>
              <Clock size={12} />
              <span>{formatDistanceToNow(new Date(article.publishedAt))} ago</span>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">{article.title}</h1>
          
          {/* Action Bar */}
          <div className={`flex items-center justify-between border-y py-4 ${borderClass}`}>
            <div className={`text-sm ${subText}`}>
              Source: <span className={`font-semibold ${textClass}`}>{article.source || "Lotus AI"}</span>
            </div>
            
            <button 
              onClick={handleShare}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-medium ${buttonClass}`}
            >
              {copied ? <Check size={16} className="text-green-500" /> : <Share2 size={16} />}
              {copied ? "Link Copied!" : "Share Story"}
            </button>
          </div>
        </div>

        {/* Image */}
        {article.image && (
          <img 
            src={article.image} 
            alt={article.title} 
            className={`w-full h-64 md:h-96 object-cover rounded-2xl mb-10 border ${borderClass}`}
          />
        )}

        {/* Content Body */}
        <div className={`prose prose-lg max-w-none leading-relaxed ${proseClass} ${isDark ? "text-gray-300" : "text-gray-700"}`}>
          {(article.content || article.description).split('\n').map((paragraph, index) => (
            paragraph && <p key={index} className="mb-6">{paragraph}</p>
          ))}
        </div>

      </div>
    </div>
  );
}