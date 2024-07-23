import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Calendar",
  description: "My Calendar app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="min-w-screen">
      <body className="min-w-screen">{children}</body>
      <div id="overlay"></div>
    <div id="backdrop"></div>
    <div id="root"></div>
    </html>
  );
}
