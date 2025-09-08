"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  CreditCard,
  Download,
  Edit,
  X,
  History,
  Star,
  Crown,
  Gem,
  InfoIcon,
} from "lucide-react";
import Image from "next/image";
import { DashboardNav } from "@/app/components/Dashboard-nav";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSession } from "next-auth/react";
import axios from "axios";

type Tier = "Golden" | "Platinum" | "Diamond";
type TierOrNone = Tier | "none";

interface AuthorizedUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar: string;
  memberSince: string;
  totalRentals: number;
}

const MOCK_STATS = {
  rentalsCompleted: 20,
  totalValue: 180000,
};

function getLenderTier(): TierOrNone {
  const { rentalsCompleted, totalValue } = MOCK_STATS;
  if (rentalsCompleted >= 30 && totalValue >= 300000) return "Diamond";
  if (rentalsCompleted >= 15 && totalValue >= 150000) return "Platinum";
  if (rentalsCompleted >= 5 && totalValue >= 50000) return "Golden";
  return "none";
}

const TIER_STYLES: Record<
  TierOrNone,
  { label: string; gradient: string; color: string; icon: React.ReactElement }
> = {
  Golden: {
    label: "Golden Renter",
    gradient: "bg-gradient-to-r from-yellow-300 to-yellow-500",
    color: "text-yellow-900",
    icon: <Crown className="w-6 h-6 text-yellow-900" />,
  },
  Platinum: {
    label: "Platinum Renter",
    gradient: "bg-gradient-to-r from-gray-200 to-gray-400",
    color: "text-gray-700",
    icon: <Crown className="w-6 h-6 text-gray-600" />,
  },
  Diamond: {
    label: "Diamond Renter",
    gradient: "bg-gradient-to-r from-sky-200 to-sky-400",
    color: "text-sky-800",
    icon: <Gem className="w-6 h-6 text-sky-700" />,
  },
  none: {
    label: "",
    gradient: "",
    color: "",
    icon: <></>,
  },
};

export default function CustomerDashboard() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<AuthorizedUser | null>(null);
  const [selectedRental, setSelectedRental] = useState<any | null>(null);

  const tier = getLenderTier();
  const tierStyle = TIER_STYLES[tier];

  const stats = [
    {
      label: "Active Rentals",
      value: "1",
      icon: History,
      color: "text-blue-600",
    },
    {
      label: "Total Rentals",
      value: "15",
      icon: History,
      color: "text-green-600",
    },
    {
      label: "Total Spent",
      value: "$2,450",
      icon: CreditCard,
      color: "text-purple-600",
    },
    { label: "Avg Rating", value: "4.8", icon: Star, color: "text-yellow-600" },
  ];

  const rentalHistory = [
    {
      id: 1,
      item: "Canon EOS R5 Camera",
      category: "Photography",
      rentedFrom: "PhotoPro Rentals",
      startDate: "2024-01-15",
      endDate: "2024-01-20",
      status: "completed",
      amount: "$150",
      image: "/vintage-camera-still-life.png",
      rating: 5,
    },
    {
      id: 2,
      item: "MacBook Pro 16-inch",
      category: "Electronics",
      rentedFrom: "TechRent Solutions",
      startDate: "2024-01-10",
      endDate: "2024-01-17",
      status: "completed",
      amount: "$200",
      image: "/modern-laptop-workspace.png",
      rating: 4,
    },
    {
      id: 3,
      item: "Mountain Bike",
      category: "Sports",
      rentedFrom: "Adventure Gear Co",
      startDate: "2024-01-25",
      endDate: "2024-01-28",
      status: "active",
      amount: "$80",
      image: "/mountain-bike-trail.png",
      rating: null,
    },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      if (!session?.user?.id) return;
      setLoading(true);
      try {
        const response = await axios.get(
          `/api/get-user?userId=${session.user.id}`
        );
        if (response.status === 200) {
          setUserProfile(response.data);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [session]);

  if (loading || !userProfile) {
    return <p className="p-8 text-center">Loading...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 group-hover:scale-105 transition-transform duration-200">
                    {stat.value}
                  </p>
                </div>
                <Icon
                  className={`h-8 w-8 ${stat.color} group-hover:scale-110 transition-transform duration-200`}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-4 relative">
          {/* Tier Badge */}
          {tier !== "none" && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-2xl shadow-lg p-6 flex flex-col items-center text-center ${tierStyle.gradient}`}
            >
              <Link href="/tier-info">
                <InfoIcon className="h-5 w-5 text-black mb-2 mx-auto absolute right-3 top-2" />
              </Link>
              <div className="flex items-center gap-2 mb-2">
                {tierStyle.icon}
                <h3 className={`text-xl font-bold ${tierStyle.color}`}>
                  {tierStyle.label}
                </h3>
              </div>
              <p className={`text-sm ${tierStyle.color} opacity-80`}>
                Your current membership tier
              </p>
            </motion.div>
          )}

          {/* Profile */}
          <div className="bg-[#3d000c8e] text-[#ffecd1] p-6 rounded-xl sticky top-4">
            <div className="flex flex-col items-center gap-3 mb-6">
              <Image
                src={userProfile.avatar}
                alt={userProfile.name}
                className="h-32 w-32 rounded-full border-2 border-white/20"
                width={128}
                height={128}
              />
              <div className="text-center">
                <h3 className="text-lg font-semibold">{userProfile.name}</h3>
                <p className="text-sm text-gray-300">
                  Member since {userProfile.memberSince}
                </p>
              </div>
            </div>
            <DashboardNav userType="customer" />
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Rental History */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Recent Rentals
                </h3>
                <p className="text-gray-500 text-sm">
                  Your rental history and current bookings
                </p>
              </div>
              <button className="px-3 py-1 text-gray-700 border rounded-md text-sm hover:bg-gray-100 flex items-center gap-1">
                <History className="h-4 w-4" /> View All
              </button>
            </div>

            <div className="space-y-4">
              {rentalHistory.map((rental) => (
                <div
                  key={rental.id}
                  className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-md transition-all duration-300 group cursor-pointer"
                  onClick={() => setSelectedRental(rental)}
                >
                  <div className="relative overflow-hidden rounded-lg">
                    <Image
                      src={rental.image}
                      alt={rental.item}
                      className="h-16 w-16 object-cover group-hover:scale-110 transition-transform duration-300"
                      width={64}
                      height={64}
                    />
                    {rental.status === "active" && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {rental.item}
                      </h4>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          rental.status === "active"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {rental.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {rental.category} • {rental.rentedFrom}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {rental.startDate} -{" "}
                        {rental.endDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <CreditCard className="h-3 w-3" /> {rental.amount}
                      </span>
                      {rental.rating && (
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />{" "}
                          {rental.rating}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 opacity-50 text-gray-800 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 border rounded-md hover:bg-gray-100">
                      <Download className="h-4 w-4" />
                    </button>
                    {rental.status === "active" && (
                      <button className="p-2 border rounded-md hover:bg-gray-100">
                        <Edit className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Rental Modal */}
            {selectedRental && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
                <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md relative">
                  <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
                    onClick={() => setSelectedRental(null)}
                  >
                    <X className="h-6 w-6" />
                  </button>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
                    {selectedRental.item}
                  </h2>
                  <div className="overflow-hidden rounded-xl mb-5">
                    <Image
                      src={selectedRental.image}
                      alt={selectedRental.item}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                      width={400}
                      height={300}
                    />
                  </div>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <p className="flex justify-between">
                      <span className="font-medium text-gray-600">
                        Category:
                      </span>
                      {selectedRental.category}
                    </p>
                    <p className="flex justify-between">
                      <span className="font-medium text-gray-600">
                        Rented From:
                      </span>
                      {selectedRental.rentedFrom}
                    </p>
                    <p className="flex justify-between">
                      <span className="font-medium text-gray-600">
                        Duration:
                      </span>
                      {selectedRental.startDate} - {selectedRental.endDate}
                    </p>
                    <p className="flex justify-between mb-4">
                      <span className="font-medium text-gray-600">
                        Amount Paid:
                      </span>
                      ₹{selectedRental.amount}
                    </p>
                  </div>
                  {selectedRental.status === "active" && (
                    <button className="w-full py-3 rounded-xl bg-[#3d000c] text-white font-semibold shadow-md hover:bg-red-700 transition-all duration-300">
                      Return Early
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Profile Details */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Personal Details
                </h3>
                <p className="text-gray-500 text-sm">
                  Your profile information and preferences
                </p>
              </div>
              <button className="px-4 py-2 rounded-md bg-[#3d000c] text-white hover:bg-[#710017] flex items-center gap-1">
                <Edit className="h-4 w-4" /> Edit Profile
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {[
                  { label: "Full Name", value: userProfile.name },
                  { label: "Email Address", value: userProfile.email },
                  { label: "Phone Number", value: userProfile.phone },
                ].map((field, index) => (
                  <div key={index}>
                    <label className="text-sm font-medium text-gray-500">
                      {field.label}
                    </label>
                    <p className="text-gray-900 font-medium">{field.value}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                {[
                  { label: "Address", value: userProfile.address },
                  {
                    label: "Total Rentals",
                    value: `${userProfile.totalRentals} items`,
                  },
                  { label: "Member Since", value: userProfile.memberSince },
                ].map((field, index) => (
                  <div key={index}>
                    <label className="text-sm font-medium text-gray-500">
                      {field.label}
                    </label>
                    <p className="text-gray-900 font-medium">{field.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <hr className="my-6" />
            <div className="flex gap-3">
              <button className="px-4 py-2 rounded-md bg-[#3d000c] text-white hover:bg-[#710017]">
                Save Changes
              </button>
              <button className="px-4 py-2 rounded-md border text-[#3d000c] hover:bg-gray-100">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
