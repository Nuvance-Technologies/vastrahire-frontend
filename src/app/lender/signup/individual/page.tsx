"use client"

import Link from "next/link"
import { Zap } from "lucide-react"
import Image from "next/image"

export default function IndividualLenderSignupPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-16 w-28 h-28 bg-purple-200 rounded-full blur-xl"></div>
        <div className="absolute bottom-32 right-12 w-32 h-32 bg-pink-200 rounded-full blur-xl"></div>
        <div className="absolute top-2/3 left-1/3 w-24 h-24 bg-blue-200 rounded-full blur-lg"></div>
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/">
            <Image src="/vastrahire2.png" alt="Vastrahire Logo" width={150} height={50} className="mx-auto" />
          </Link>
          <p className="text-gray-500 mt-2 text-lg">Start lending your items today</p>
          <div className="flex justify-center items-center gap-2 mt-3 text-[#3d000c]">
            <Zap className="w-5 h-5" />
            <span className="text-sm font-medium">Safe • Secure • Easy</span>
          </div>
        </div>

        <div className="shadow-2xl border rounded-2xl bg-white/80 backdrop-blur-sm p-6">
          <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-[#3d000c] to-[#9f0020] bg-clip-text text-transparent">
            Individual Lender Signup
          </h2>

          <div className="space-y-4 text-neutral-800">
            <input placeholder="Full Name" className="w-full h-12 px-3 border-2 border-neutral-400 rounded-md" />
            <input type="date" className="w-full h-12 px-3 text-neutral-500 border-2 border-neutral-400 rounded-md" />
            <input type="email" placeholder="Email" className="w-full h-12 px-3 border-2 border-neutral-400 rounded-md" />
            <input type="tel" placeholder="Phone Number" className="w-full h-12 px-3 border-2 border-neutral-400 rounded-md" />
            <textarea rows={2} placeholder="Residential Address" className="w-full px-3 py-2 border-2 border-neutral-400 rounded-md"></textarea>
            <input type="file" className="w-full h-12 px-3 border-2 border-neutral-400 rounded-md" />
            <div className="grid grid-cols-3 gap-3">
              <input placeholder="Account Holder Name" className="w-full h-12 px-3 border-2 border-neutral-400 rounded-md" />
              <input placeholder="Account Number" className="w-full h-12 px-3 border-2 border-neutral-400 rounded-md" />
              <input placeholder="IFSC Code" className="w-full h-12 px-3 border-2 border-neutral-400 rounded-md" />
            </div>
            <input type="password" placeholder="Create Password" className="w-full h-12 px-3 border-2 border-neutral-400 rounded-md" />
            <input type="password" placeholder="Confirm Password" className="w-full h-12 px-3 border-2 border-neutral-400 rounded-md" />

            <button className="w-full h-12 bg-gradient-to-r from-[#3d000c] to-[#720017] text-white font-semibold rounded-md shadow-lg">
              Sign Up as Individual
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already a lender?{" "}
            <Link href="/lender/login" className="text-[#3d000c] hover:text-[#9f0020] font-semibold">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
