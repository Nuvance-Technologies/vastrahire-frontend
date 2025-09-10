"use client";

import Link from "next/link";
import { Bell, Home, LogOut, Settings, User } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface DashboardHeaderProps {
  userType: "customer" | "lender";
  userName: string | undefined;
  userAvatar?: string;
  title: string;
  description?: string;
}

export function DashboardHeader({
  userType,
  userName,
  // userAvatar,
  title,
  description,
}: DashboardHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              <Home className="h-5 w-5" />
            </Link>
            <div className="h-6 w-px bg-gray-300" />
            <div>
              <h1 className="text-2xl font-serif font-bold text-gray-900">
                {title}
              </h1>
              {description && (
                <p className="text-sm text-gray-500">{description}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
