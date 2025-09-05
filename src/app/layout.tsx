import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ContactWidget from "./components/Contact-widget";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/context/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vastrahire",
  description: "Rent your dream outfit",
  icons: {
    icon: "/vastrahire.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Toaster position="bottom-right" reverseOrder={false} />
          {children}
          <ContactWidget />
        </body>
      </AuthProvider>
    </html>
  );
}
