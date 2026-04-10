import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IntelliHealth - Dashboard",
  description: "IntelliHealth Clinic Dashboard Mockup",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-gray-50 font-[family-name:var(--font-inter)]">
        <Sidebar />
        <div className="ml-[262px] min-h-screen">
          <main className="p-5">{children}</main>
        </div>
      </body>
    </html>
  );
}
