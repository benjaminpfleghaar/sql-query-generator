import "./globals.css";
import React from "react";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Toaster } from "@/app/components/ui/sonner";
import { ThemeProvider } from "@/app/components/theme-provider";

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} bg-muted antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
