import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
const kanit = Kanit({
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-kanit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TodoFlow - แอปจัดการ Task และโปรเจกต์",
  description: "แอปจัดการ Task และโปรเจกต์สไตล์โมเดิร์น ใช้งานง่าย รวดเร็ว",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${kanit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-kanit">
        <Navbar />
        {children}</body>
    </html>
  );
}
