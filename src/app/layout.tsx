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
    "World-class technical education for every person on Earth. Learn C and x86-64 Assembly hands-on — 100 days from your first printf to bare-metal syscall. Free, forever.",
  applicationName: "AstaHub",
  manifest: "/manifest.json",
  keywords: ["C", "Assembly", "x86-64", "systems programming", "learning", "free education", "AstaHub"],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    url: "https://asta100.dev",
    siteName: "AstaHub",
    title: "AstaHub — Free Technical Education, Forever",
    description:
      "World-class technical education for every person on Earth. Learn C and Assembly hands-on — free, forever.",
  },
  twitter: {
    card: "summary",
    title: "AstaHub — Free Technical Education, Forever",
    description:
      "World-class technical education for every person on Earth. Learn C and Assembly hands-on — free, forever.",
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
