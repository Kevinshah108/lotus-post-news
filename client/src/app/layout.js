import { ThemeProvider } from "@/context/ThemeContext";
import ClientLayout from "@/components/ClientLayout"; // Import the new wrapper
import "./globals.css";

export const metadata = {
  title: "Lotus Post | AI News",
  description: "Global intelligence curated by AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {/* ClientLayout now wraps everything to fix the background issue */}
          <ClientLayout>
            {children}
          </ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}