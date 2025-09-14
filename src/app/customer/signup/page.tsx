"use client";

import Link from "next/link";
import { Sparkles, Gift, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import SpinnerLoader from "@/app/components/Loader";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { isValidEmail } from "@/util/emailValidator";

export default function CustomerSignupPage() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const emptyFields = () => {
    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setTermsAccepted(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!termsAccepted) {
      toast.error("You must accept the terms and conditions");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/signup", {
        firstname,
        lastname,
        email,
        password: confirmPassword,
        role: "customer",
      });

      if (res.status === 201) {
        const result = await signIn("credentials", {
          redirect: false,
          email: email,
          password: password,
        });
        if (result?.ok) {
          toast.success("Signup and login successful!");
          router.push("/");
          emptyFields();
          return;
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

    const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-32 right-20 w-24 h-24 bg-pink-200 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-20 w-28 h-28 bg-indigo-200 rounded-full blur-xl"></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-yellow-200 rounded-full blur-lg"></div>
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
            Join the style revolution
          </p>
          <div className="flex justify-center items-center gap-2 mt-3 text-[#3d000c]">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-medium">
              Unlimited Style • Zero Commitment
            </span>
          </div>
        </div>

        {/* Card */}
        <div className="shadow-2xl bg-white/90 backdrop-blur-sm rounded-2xl p-8 space-y-6 border border-gray-200">
          <div className="space-y-1 pb-6 text-center">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-[#3d000c] to-[#dd022e] bg-clip-text text-transparent">
              Start Your Style Journey
            </h2>
            <p className="text-center text-base text-gray-500">
              Create your account and unlock endless fashion possibilities
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignup}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label
                    htmlFor="firstName"
                    className="text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    placeholder="John"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    className="h-12 w-full px-3 text-gray-700 rounded-md border-2 border-gray-300 bg-white focus:border-[#3d000c] outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="lastName"
                    className="text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    placeholder="Doe"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    className="h-12 w-full px-3 text-gray-700 rounded-md border-2 border-gray-300 bg-white focus:border-[#3d000c] outline-none transition-colors"
                  />
                </div>
              </div>
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
                  className="h-12 w-full px-3 text-gray-700 rounded-md border-2 border-gray-300 bg-white focus:border-[#3d000c] outline-none transition-colors"
                />
              </div>
              {/* Password */}
              <div className="space-y-2 relative">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Create Password
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

              {/* Confirm Password */}
              <div className="space-y-2 relative">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="h-12 w-full px-3 pr-10 text-gray-700 rounded-md border-2 border-gray-300 bg-white focus:border-[#3d000c] outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 bottom-5 text-gray-500"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start space-x-2 py-5">
              <input
                type="checkbox"
                id="terms"
                value={termsAccepted ? "accepted" : ""}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="rounded border-gray-300 w-4 h-4 mt-1"
              />
              <label
                htmlFor="terms"
                className="text-sm leading-relaxed text-gray-600"
              >
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="text-[#3d000c] hover:text-[#9f0020] font-medium"
                >
                  Terms & conditions
                </Link>
              </label>
            </div>

            {/* Signup button */}
            <button
              type="submit"
              className="w-full h-12 rounded-md bg-gradient-to-r from-[#3d000c] to-[#740118] hover:from-[#9f0020] hover:to-[#3d000c] text-white font-semibold text-base shadow-lg transition-colors"
            >
              Create Account & Start Exploring
            </button>
          </form>


          {/* Welcome offer */}
          <div className="bg-gradient-to-r from-[#fbcfe8] to-[#e0f2fe] rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#3d000c]">
              <Gift className="w-4 h-4" />
              <span>Welcome Bonus!</span>
            </div>
            <p className="text-sm text-gray-500">
              Get 20% off your first rental when you sign up today
            </p>
          </div>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#3d000c] hover:text-[#9f0020] font-semibold"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
