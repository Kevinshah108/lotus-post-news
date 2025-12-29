"use client";
import { useState } from "react";
import Image from "next/image";

export default function NewsImage({ src, alt }) {
  // Use a placeholder if the news has no image
  const [imgSrc, setImgSrc] = useState(src || "/fallback-news.jpg");

  return (
    <div className="relative w-full h-48 bg-gray-900 overflow-hidden rounded-t-xl">
      <Image
        src={imgSrc}
        alt={alt || "News Image"}
        fill // Automatically fills the container
        className="object-cover transition-opacity duration-500 hover:opacity-90"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={false} // Lazy loads images to speed up page
        onError={() => setImgSrc("/fallback-news.jpg")} // If fails, switch to fallback
      />
    </div>
  );
}