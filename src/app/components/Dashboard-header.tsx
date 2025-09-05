"use client";

import Link from "next/link";
import { Bell, Home, LogOut, Settings, User } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface DashboardHeaderProps {
  userType: "customer" | "lender";
  userName: string;
  userAvatar?: string;
  title: string;
  description?: string;
}

export function DashboardHeader({
  userType,
  userName,
  userAvatar,
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

          {/* Right Section */}
          <div className="flex items-center gap-4 relative">
            <div className="relative">
              <button
                className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {userAvatar}
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-lg border border-gray-200 bg-white shadow-lg z-50">
                  <div className="flex items-center gap-2 p-3 border-b border-gray-100">
                    <div className="flex flex-col leading-tight">
                      <p className="font-medium text-gray-800">{userName}</p>
                      <p className="text-sm text-gray-500 truncate w-[200px]">
                        {userType === "customer"
                          ? "Customer Account"
                          : "Lender Account"}
                      </p>
                    </div>
                  </div>
                  <div className="py-1">
                    <Link
                      href={`/${userType}/profile`}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                    <Link
                      href={`/${userType}/settings`}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                    <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
