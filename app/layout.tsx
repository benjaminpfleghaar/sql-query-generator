// TODO create Readme

import "./globals.css";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Toaster } from "@/app/components/ui/sonner";

const geistSans = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SQL Query Generator",
  description: "Create SQL queries for translation databases",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} bg-muted antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
