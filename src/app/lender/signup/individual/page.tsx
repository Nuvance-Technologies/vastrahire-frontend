"use client";

import Link from "next/link";
import { DollarSign, Users, Award, Zap } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import SpinnerLoader from "@/app/components/Loader";
import { isValidEmail } from "@/util/emailValidator";


export default function LenderSignupPage() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!isValidEmail(email)){
      toast.error("Please enter a valid email address");
      return;
    }

    if (!agreeTerms) {
      toast.error("You must agree to the terms and privacy policy.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/signup", {
        firstname,
        lastname,
        email,
        phone,
        businessType,
        password,
        confirmPassword,
        role: "individual",
      });

      if (res.status === 201) {
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
        if (result?.ok) {
          toast.success("Signup successful! Redirecting...");
          router.push("/lender/dashboard");
        } else {
          toast.error("Signin after signup failed. Please try logging in.");
        }
      }
    } catch (error) {
      toast.error("Signup failed. Please try again.");
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <SpinnerLoader />;
  }
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-16 w-28 h-28 bg-purple-200 rounded-full blur-xl"></div>
        <div className="absolute bottom-32 right-12 w-32 h-32 bg-pink-200 rounded-full blur-xl"></div>
        <div className="absolute top-2/3 left-1/3 w-24 h-24 bg-blue-200 rounded-full blur-lg"></div>
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
          <p className="text-gray-500 mt-2 text-lg">Start earning today</p>
          <div className="flex justify-center items-center gap-2 mt-3 text-[#3d000c]">
            <Zap className="w-5 h-5" />
            <span className="text-sm font-medium">
              Easy Setup • Instant Earnings
            </span>
          </div>
        </div>

        <div className="shadow-2xl border rounded-2xl bg-white/80 backdrop-blur-sm p-6">
          <div className="space-y-1 pb-6">
            <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-[#3d000c] to-[#9f0020] bg-clip-text text-transparent">
              Become a Lender Partner
            </h2>
            <p className="text-center text-gray-600 text-base">
              Join thousands earning from their unused items
            </p>
          </div>

          <form className="mb-6" onSubmit={handleSignup}>
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label
                      htmlFor="firstName"
                      className="text-sm text-gray-700 font-medium block"
                    >
                      First Name
                    </label>
                    <input
                      id="firstName"
                      placeholder="John"
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                      className="w-full h-12 px-3 text-gray-700 rounded-md border-2 focus:border-[#3d000c] outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="lastName"
                      className="text-sm text-gray-700 font-medium block"
                    >
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      placeholder="Doe"
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                      className="w-full h-12 px-3 text-gray-700 rounded-md border-2 focus:border-[#3d000c] outline-none transition-colors"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="businessEmail"
                    className="text-sm text-gray-700 font-medium block"
                  >
                    Business Email
                  </label>
                  <input
                    id="businessEmail"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.business@example.com"
                    className="w-full h-12 px-3 text-gray-700 rounded-md border-2 focus:border-[#3d000c] outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="text-sm text-gray-700 font-medium block"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="w-full h-12 px-3 text-gray-700 rounded-md border-2 focus:border-[#3d000c] outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="businessType"
                    className="text-sm text-gray-700 font-medium block"
                  >
                    Business Type
                  </label>
                  <select
                    id="businessType"
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-full h-12 px-3 text-gray-700 rounded-md border-2 focus:border-[#3d000c] outline-none transition-colors bg-white"
                  >
                    <option value="" disabled>
                      Select your business type
                    </option>
                    <option value="individual_seller">Individual Seller</option>
                    <option value="boutique_store">Boutique/Store</option>
                    <option value="fashion_designer">Fashion Designer</option>
                    <option value="rental_business">Rental Business</option>
                    <option value="others">Others</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="text-sm text-gray-700 font-medium block"
                  >
                    Create Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-12 px-3 text-gray-700 rounded-md border-2 focus:border-[#3d000c] outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="confirmPassword"
                    className="text-sm text-gray-700 font-medium block"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="w-full h-12 px-3 text-gray-700 rounded-md border-2 focus:border-[#3d000c] outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  required
                  className="rounded border-gray-400 w-4 h-4 mt-1"
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-gray-700 leading-relaxed"
                >
                  I agree to the{" "}
                  <Link
                    href="/lender-terms"
                    className="text-[#3d000c] hover:text-[#9f0020] font-medium"
                  >
                    Lender Agreement
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-[#3d000c] hover:text-[#9f0020] font-medium"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-[#3d000c] to-[#720017] hover:from-[#9f0020] hover:to-[#3d000c] text-white font-semibold text-base rounded-md shadow-lg transition"
              >
                Start Earning Today
              </button>
            </div>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-gray-500 font-medium">
                Or sign up with
              </span>
            </div>
          </div>

          <button className="w-full h-12 border-2 text-gray-700 border-gray-300 hover:bg-gray-50 rounded-md flex items-center justify-center transition">
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
            Sign up with Google
          </button>

          {/* Earning potential showcase */}
          <div className="bg-gradient-to-r from-[#3d000cd7] to-[#ac022484] rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-200">
              <Award className="w-4 h-4" />
              <span>Lender Success Stories</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <DollarSign className="w-3 h-3 text-purple-600" />
                <span>Avg. $500/month</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-3 h-3 text-purple-600" />
                <span>10k+ active lenders</span>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500">
            Already a lender partner?{" "}
            <Link
              href="/login"
              className="text-[#3d000c] hover:text-[#9f0020] font-semibold"
            >
              Sign in to dashboard
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
