"use client";
import { useTheme } from "@/context/ThemeContext";

export default function AccessibilityPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen py-20 px-6 ${isDark ? "bg-[#0a0a0a] text-white" : "bg-white text-gray-900"}`}>
      <div className="max-w-3xl mx-auto space-y-8">
        
        <div className="border-b pb-8 mb-8 border-gray-700">
          <h1 className="text-4xl font-bold mb-4">Accessibility Statement</h1>
          <p className={isDark ? "text-gray-400" : "text-gray-600"}>Commitment to Inclusivity</p>
        </div>

        <section className="space-y-4">
          <p className={`text-lg leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            Lotus Post is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Measures We Take</h2>
          <ul className={`list-disc pl-5 space-y-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            <li>Include accessibility as part of our mission statement.</li>
            <li>Ensure high color contrast (Day/Night modes) for readability.</li>
            <li>Provide text alternatives (alt text) for non-text content.</li>
            <li>Support keyboard navigation across the entire site.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Conformance Status</h2>
          <p className={isDark ? "text-gray-300" : "text-gray-700"}>
            The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. Lotus Post is partially conformant with WCAG 2.1 level AA.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Feedback</h2>
          <p className={isDark ? "text-gray-300" : "text-gray-700"}>
            We welcome your feedback on the accessibility of Lotus Post. Please let us know if you encounter accessibility barriers:
            <br /><br />
            <span className="font-bold">E-mail:</span> accessibility@lotuspost.com
          </p>
        </section>

      </div>
    </div>
  );
}