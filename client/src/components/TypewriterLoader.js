"use client";
import { useState, useEffect } from "react";

// Accept 'isLoading' prop to know when news is ready
export default function TypewriterLoader({ isLoading, onFinish }) {
  const text = "LOTUS POST.";
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [isTypingDone, setIsTypingDone] = useState(false); // New state
  const [isFading, setIsFading] = useState(false);

  // 1. Typing Logic
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTypingDone(true); // Mark typing as finished
      }
    }, 100);

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  // 2. The "Smart" Waiter
  // Only fade out if BOTH: Typing is done AND Data is loaded (isLoading is false)
  useEffect(() => {
    if (isTypingDone && !isLoading) {
      const timeout = setTimeout(() => {
        setIsFading(true);
        setTimeout(onFinish, 500); // Remove component after fade
      }, 800); // Small pause before fade for impact
      return () => clearTimeout(timeout);
    }
  }, [isTypingDone, isLoading, onFinish]);

  if (!displayedText && !isFading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a] transition-opacity duration-700 ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex items-center gap-3">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white font-mono">
          {displayedText}
          <span className={`${showCursor ? "opacity-100" : "opacity-0"} text-blue-600`}>
            _
          </span>
        </h1>
      </div>
    </div>
  );
}