"use client";

import Link from "next/link";
import { Zap, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ErrorI } from "@/app/customer/signup/page";

export default function IndividualLenderSignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    role: "",
    email: "",
    phoneNumber: "",
    address: "",
    bankAccNo: "",
    ifscCode: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post("/api/signup", {
        firstname: formData.firstName,
        lastname: formData.lastName,
        email: formData.email,
        password: formData.confirmPassword,
        role: "business",
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        bankAccNo: formData.bankAccNo,
        ifscCode: formData.ifscCode,
      });
      if (res.status === 201) {
        const result = await signIn("credentials", {
          redirect: false,
          email: formData.email,
          password: formData.confirmPassword,
        });
        if (result?.ok) {
          toast.success("Signup successful! Please log in.");
          setFormData({
            firstName: "",
            lastName: "",
            role: "",
            email: "",
            phoneNumber: "",
            address: "",
            bankAccNo: "",
            ifscCode: "",
            password: "",
            confirmPassword: "",
          });
          router.push("/");
        }
      }
    } catch (err: unknown) {
      const error = err as ErrorI;
      // console.log(error);
      if (error?.status === 400) {
        toast.error(error?.response?.data.message || "User already exists!");
        return;
      }
      console.error("Signup failed:", error);
      toast.error("Signup failed. Please try again.");
    }
  };

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
            <Image
              src="/vastrahire2.png"
              alt="Vastrahire Logo"
              width={150}
              height={50}
              className="mx-auto"
            />
          </Link>
          <p className="text-gray-500 mt-2 text-lg">
            Start lending your items today
          </p>
          <div className="flex justify-center items-center gap-2 mt-3 text-[#3d000c]">
            <Zap className="w-5 h-5" />
            <span className="text-sm font-medium">Safe • Secure • Easy</span>
          </div>
        </div>

        <div className="shadow-2xl border rounded-2xl bg-white/80 backdrop-blur-sm p-6">
          <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-[#3d000c] to-[#9f0020] bg-clip-text text-transparent">
            Individual Lender Signup
          </h2>

          <form onSubmit={handleSignup} className="space-y-4 text-neutral-800">
            <div className="grid grid-cols-2 gap-3">
              <input
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                className="w-full h-12 px-3 border-2 border-neutral-400 rounded-md"
              />
              <input
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                className="w-full h-12 px-3 border-2 border-neutral-400 rounded-md"
              />
            </div>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Email"
              className="w-full h-12 px-3 border-2 border-neutral-400 rounded-md"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
              className="w-full h-12 px-3 border-2 border-neutral-400 rounded-md"
            />
            <textarea
              rows={2}
              placeholder="Residential Address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="w-full px-3 py-2 border-2 border-neutral-400 rounded-md"
            ></textarea>
            <div className="grid grid-cols-2 gap-3">
              <input
                placeholder="Account Number"
                value={formData.bankAccNo}
                onChange={(e) =>
                  setFormData({ ...formData, bankAccNo: e.target.value })
                }
                className="w-full h-12 px-3 border-2 border-neutral-400 rounded-md"
              />
              <input
                placeholder="IFSC Code"
                value={formData.ifscCode}
                onChange={(e) =>
                  setFormData({ ...formData, ifscCode: e.target.value })
                }
                className="w-full h-12 px-3 border-2 border-neutral-400 rounded-md"
              />
            </div>
            {/* Password Field */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full h-12 px-3 pr-10 border-2 border-neutral-400 rounded-md"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Confirm Password Field */}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className="w-full h-12 px-3 pr-10 border-2 border-neutral-400 rounded-md"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-[#3d000c] to-[#720017] text-white font-semibold rounded-md shadow-lg"
            >
              Sign Up as Individual
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already a lender?{" "}
            <Link
              href="/login"
              className="text-[#3d000c] hover:text-[#9f0020] font-semibold"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
