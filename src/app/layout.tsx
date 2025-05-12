"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useQuizConfig } from "./store";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
  quiz,
}: Readonly<{
  children: React.ReactNode;
  quiz: React.ReactNode;

}>) {
  const config=useQuizConfig(state=>state.config);
  // eslint-disable-next-line prefer-const
  let render = config.status === 'start'?quiz:children
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {render}
      </body>
    </html>
  );
}
