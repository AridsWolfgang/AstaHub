import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import { themeInitScript } from "@/lib/theme";

export const metadata: Metadata = {
  metadataBase: new URL("https://asta100.dev"),
  title: "AstaHub — Free Technical Education, Forever",
  description:
    "World-class technical education for every person on Earth. Hands-on tracks in C, x86-64 Assembly, Python, and C++ — from your first print to the bare metal. Free, forever.",
  applicationName: "AstaHub",
  manifest: "/manifest.json",
  keywords: ["C", "Assembly", "Python", "C++", "x86-64", "systems programming", "learning", "free education", "AstaHub"],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    url: "https://asta100.dev",
    siteName: "AstaHub",
    title: "AstaHub — Free Technical Education, Forever",
    description:
      "World-class technical education for every person on Earth. Hands-on tracks in C, Assembly, Python, and C++ — free, forever.",
  },
  twitter: {
    card: "summary",
    title: "AstaHub — Free Technical Education, Forever",
    description:
      "World-class technical education for every person on Earth. Hands-on tracks in C, Assembly, Python, and C++ — free, forever.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <Providers>
          <Navbar />
          <main className="pt-16">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
