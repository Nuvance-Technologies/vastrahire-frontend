"use client";

import Link from "next/link";
import { ShoppingBag, Heart, Star, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import SpinnerLoader from "@/app/components/Loader";
import { useRouter } from "next/navigation";
import { isValidEmail } from "@/util/emailValidator";

export default function CustomerLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const router = useRouter();
  useEffect(() => {
    if (session?.user) {
      if (session?.user?.role == "customer") {
        router.push("/");
      } else {
        router.push("/");
      }
    }
  }, [session?.user?.role, router]);

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.ok) {
        toast.success("User signed in successfully!");
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      toast.error("Error signing in user");
      console.error("Signin error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <SpinnerLoader />;
  }

  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-indigo-200 rounded-full blur-xl"></div>
        <div className="absolute bottom-32 right-16 w-32 h-32 bg-pink-200 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-200 rounded-full blur-lg"></div>
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
          <p className="text-gray-500 mt-2 text-lg">
            Discover your perfect style
          </p>
          <div className="flex justify-center items-center gap-2 mt-3 text-[#3d000c]">
            <ShoppingBag className="w-5 h-5" />
            <span className="text-sm font-medium">Browse • Rent • Flaunt</span>
          </div>
        </div>

        {/* Card */}
        <div className="shadow-2xl bg-white/90 backdrop-blur-sm rounded-2xl p-8 space-y-6 border border-gray-200">
          <div className="space-y-1 pb-6 text-center">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-[#3d000c] to-[#dd022e] bg-clip-text text-transparent">
              Welcome Back, Trendsetter!
            </h2>
            <p className="text-base text-gray-500">
              Ready to explore amazing fashion pieces?
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignin}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="h-12 w-full text-gray-700 px-3 rounded-md border-2 border-gray-300 bg-white focus:border-indigo-600 outline-none transition-colors"
                />
              </div>
              <div className="space-y-2 relative">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                 Password
                </label>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  className="h-12 w-full px-3 pr-10 text-gray-700 rounded-md border-2 border-gray-300 bg-white focus:border-[#3d000c] outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 bottom-5 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="rounded border-gray-300 w-4 h-4"
                />
                <label htmlFor="remember" className="text-sm text-gray-600 py-5">
                  Keep me signed in
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-12 rounded-md bg-gradient-to-r from-[#3d000c] to-[#650014] hover:from-[#9f0020] hover:to-[#3d000c] text-white font-semibold text-base shadow-lg transition-colors"
            >
              Sign In & Start Browsing
            </button>
          </form>

          {/* Customer benefits */}
          <div className="bg-indigo-50 rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Heart className="w-4 h-4 text-[#3d000c]" />
              <span>Access thousands of premium fashion items</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Star className="w-4 h-4 text-[#3d000c]" />
              <span>Try before you buy with flexible rentals</span>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500">
            New to RentStyle?{" "}
            <Link
              href="/customer/signup"
              className="text-[#3d000c] hover:text-[#9f0020] font-semibold"
            >
              Create your account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
