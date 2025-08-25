import Link from "next/link"
import { ShoppingBag, Heart, Star } from "lucide-react"
import Image from "next/image"

export default function CustomerLoginPage() {
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
          <p className="text-gray-500 mt-2 text-lg">Discover your perfect style</p>
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
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                className="h-12 w-full text-gray-700 px-3 rounded-md border-2 border-gray-300 bg-white focus:border-indigo-600 outline-none transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="h-12 w-full text-gray-700 px-3 rounded-md border-2 border-gray-300 bg-white focus:border-indigo-600 outline-none transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="remember" className="rounded border-gray-300 w-4 h-4" />
              <label htmlFor="remember" className="text-sm text-gray-600">
                Keep me signed in
              </label>
            </div>
            <Link href="/forgot-password" className="text-sm text-[#3d000c] hover:text-[#9f0020] font-medium">
              Forgot password?
            </Link>
          </div>

          <button className="w-full h-12 rounded-md bg-gradient-to-r from-[#3d000c] to-[#650014] hover:from-[#9f0020] hover:to-[#3d000c] text-white font-semibold text-base shadow-lg transition-colors">
            Sign In & Start Browsing
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-gray-500 font-medium">Or continue with</span>
            </div>
          </div>

          {/* Google Button */}
          <button
            className="w-full h-12 rounded-md border-2 text-gray-700 border-gray-300 hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2 bg-transparent"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
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
            <Link href="/customer/signup" className="text-[#3d000c] hover:text-[#9f0020] font-semibold">
              Create your account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
