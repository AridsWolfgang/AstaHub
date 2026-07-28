import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "ASTA.100 — 100 Days of C & Assembly",
  description:
    "Master C and x86-64 Assembly through 100 days of interactive theory, coding playgrounds, exercises, and assignments. From memory initiate to silicon master.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="grid-bg scanline min-h-screen">
        <Navbar />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
