"use client";
import { useState, useEffect } from "react";
import { Flower2 } from "lucide-react";

export default function TypewriterLoader({ onFinish }) {
  const text = "LOTUS POST.";
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    let currentIndex = 0;

    // 1. Typing Animation Loop
    const typingInterval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        // Stop typing when done
        clearInterval(typingInterval);

        // 2. Wait a bit, then fade out
        setTimeout(() => {
          setIsFading(true);
          // 3. Tell parent component we are done after fade completes
          setTimeout(onFinish, 500);
        }, 800);
      }
    }, 100); // Speed of typing (100ms per letter)

    // Blinking Cursor Logic
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, [onFinish]);

  if (!displayedText && !isFading) return null;

  return (
    <div
      className={`fixed inset-0 z-9999 flex flex-col items-center justify-center bg-[#0a0a0a] transition-opacity duration-500 ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex items-center gap-3">
        {/* Typing Text */}
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white font-mono">
          {displayedText}
          <span
            className={`${
              showCursor ? "opacity-100" : "opacity-0"
            } text-blue-600`}
          >
            _
          </span>
        </h1>
      </div>
    </div>
  );
}
