"use client";

import Link from "next/link";
import { DollarSign, TrendingUp, Shield } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import SpinnerLoader from "@/app/components/Loader";

export default function LenderLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        toast.error("Invalid email or password!");
      } else {
        toast.success("Login successful! Redirecting...");
        router.push("/lender/dashboard");
      }
    } catch (error) {
      toast.error("Login failed! Please try again.");
      console.error("Login error:", error);
    }
  };

  if (loading) {
    return <SpinnerLoader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-16 right-12 w-32 h-32 bg-pink-200 rounded-full blur-xl"></div>
        <div className="absolute bottom-24 left-16 w-24 h-24 bg-purple-200 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-blue-200 rounded-full blur-lg"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo and Welcome */}
        <div className="text-center mb-8">
          <Link href="/">
            <Image
              src="/vastrahire2.png"
              alt="Vastrahire Logo"
              width={150}
              height={50}
              className="mx-auto"
            />
          </Link>
          <p className="text-gray-500 mt-2 text-lg">Your earning partner</p>
          <div className="flex justify-center items-center gap-2 mt-3 text-[#3d000c]">
            <DollarSign className="w-5 h-5" />
            <span className="text-sm font-medium">List • Earn • Grow</span>
          </div>
        </div>

        <div className="shadow-2xl border rounded-2xl bg-white/80 backdrop-blur-sm p-6">
          <div className="space-y-1 pb-6">
            <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-[#3d000c] to-[#9f0020] bg-clip-text text-transparent">
              Welcome Back, Partner!
            </h2>
            <p className="text-center text-gray-600 text-base">
              Ready to manage your listings and earnings?
            </p>
          </div>
          <div className="space-y-6">
            <form onSubmit={handleSignin}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-800 block"
                  >
                    Business Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.business@example.com"
                    className="w-full h-12 px-3 rounded-md text-gray-700 border-2 focus:border-[#3d000c] outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-800 block"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full h-12 px-3 rounded-md text-gray-700 border-2 focus:border-[#3d000c] outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember"
                    className="rounded border-gray-400 w-4 h-4"
                  />
                  <label htmlFor="remember" className="text-sm text-gray-700">
                    Keep me signed in
                  </label>
                </div>
                <Link
                  href="/lender/forgot-password"
                  className="text-sm text-[#3d000c] hover:text-[#9f0020] font-medium"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-[#3d000c] to-[#710117] hover:from-[#9f0020] hover:to-[#3d000c] text-white font-semibold text-base rounded-md shadow-lg transition"
              >
                Access Dashboard
              </button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 text-gray-500 font-medium">
                  Or continue with
                </span>
              </div>
            </div>

            <button className="w-full h-12 border-2 text-gray-800 border-gray-300 hover:bg-gray-50 rounded-md flex items-center justify-center transition">
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>

            {/* Lender benefits */}
            <div className="bg-[#f3e8ff] rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="w-4 h-4 text-[#3d000c]" />
                <span className="text-gray-700">
                  Track your earnings and performance
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="w-4 h-4 text-[#3d000c]" />
                <span className="text-gray-700">
                  Secure payments and item protection
                </span>
              </div>
            </div>

            <p className="text-center text-sm text-gray-500">
              New lender partner?{" "}
              <Link
                href="/lender/signup"
                className="text-[#3d000c] hover:text-[#9f0020] font-semibold"
              >
                Join our community
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
