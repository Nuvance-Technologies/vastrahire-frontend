"use client";

import React, { useEffect, useState } from "react";
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
import { DashboardHeader } from "@/app/components/Dashboard-header";
import { Header } from "@/app/components/Header";
import { DashboardNav } from "@/app/components/Dashboard-nav";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSession } from "next-auth/react";
import axios from "axios";
import toast from "react-hot-toast";
import { formatDate } from "@/util/formatDate";
import { set } from "mongoose";
import { div, pre } from "framer-motion/client";

type Tier = "Golden" | "Platinum" | "Diamond";
type TierOrNone = Tier | "none";

// Mock stats (replace with API later)
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

export interface UserRentalI {
  rentalPeriod: {
    from: string;
    to: string;
  };
  _id: string;
  userID: string;
  productID: {
    _id: string;
    pName: string;
    pPrice: number;
    pDesc: string;
    pSize: string;
    pImages: string[];
    pColor: string;
    category: string;
    subcategory: string;
    pDiscount: string;
    pFabric: string;
    pPattern: string;
    pOccasion: string;
    availability: string;
    ownerID: {
      name: {
        firstname: string;
        lastname: string;
      };
      companyName: string;
      bankDetails: {
        accountNumber: string;
        ifscCode: string;
      };
      brnadBio: string;
      _id: string;
      email: string;
      password: string;
      role: "business";
      phoneNumber: string;
      address: string;
    };
    pLocation: string;
    quantity: number;
  };
  totalRentals: number;
  totalSpent: number;
}

export default function CustomerDashboard() {
  const { data: session } = useSession();
  const [selectedRental, setSelectedRental] = useState<UserRentalI | null>(
    null
  );
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [rentalHistory, setRentalHistory] = useState<UserRentalI[]>([]);

  const tier = getLenderTier();
  const tierStyle = TIER_STYLES[tier];

  const [userProfile, setUserProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });
  const [totalSpentOnAllProducts, setTotalSpentOnAllProducts] = useState(0);
  const [totalRentedItems, setTotalRentedItems] = useState(0);

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get(
        `/api/get-user?userId=${session?.user?.id || ""}`
      );
      if (res.status === 200) {
        setUserProfile({
          firstName: res.data.name.firstname,
          lastName: res.data.name.lastname,
          email: res.data.email,
          phoneNumber: res.data.phoneNumber,
          address: res.data.address,
        });
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const fetchUserRentals = async () => {
    try {
      const res = await axios.get(`/api/user-rent?userId=${session?.user?.id}`);
      if (res.status === 200) {
        setRentalHistory(res.data.userRentals);
        console.log("res.data.userRentals: ", res.data.userRentals);
        setTotalSpentOnAllProducts(res.data.totalSpentOfAllProducts);
        setTotalRentedItems(res.data.totalRentedItems);
      }
    } catch (error) {
      console.error("Error fetching user rentals:", error);
    }
  };

  useEffect(() => {
    if (session?.user) {
      setUserProfile({
        firstName: session.user?.name?.firstname || "",
        lastName: session.user?.name?.lastname || "",
        email: session.user?.email || "",
        phoneNumber: session.user?.phoneNumber || "",
        address: session.user?.address || "",
      });
      fetchUserProfile();
      fetchUserRentals();
    }
  }, [session?.user]);

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        firstname: userProfile.firstName,
        lastname: userProfile.lastName,
        email: userProfile.email,
        phoneNumber: userProfile.phoneNumber,
        address: userProfile.address,
      };
      const res = await axios.put(
        `/api/update-user?userId=${session?.user?.id}`,
        data
      );
      if (res.status === 200) {
        setIsEditingProfile(false);
        setUserProfile({
          firstName: res.data.user.name.firstname,
          lastName: res.data.user.name.lastname,
          email: res.data.user.email,
          phoneNumber: res.data.user.phoneNumber,
          address: res.data.user.address,
        });
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      console.error("error: ", error);
    }
  };

  const handleReturn = async () => {
    console.log("Initiating return for rental: ", selectedRental?.productID.availability);
    try {
      const res = await axios.post(`/api/send-return-mail`, {
        userEmail: session?.user?.email,
        productName: selectedRental?.productID.pName
      });
      if (res.status === 200) {
        toast.success("Return process initiated. Please check your email for confirmation.");
        setSelectedRental(selectedRental?.productID.availability === "active" ? null : selectedRental);
        fetchUserRentals();
      }
      else {
        toast.error("Failed to return the product early. Please try again or contact our team.");
      }
    }
    catch (error) {
      toast.error("Failed to return the product early. Please try again.");
      console.error("Error returning the product early: ", error);
    }

  }

  // const rentalHistory = [
  //   {
  //     id: 1,
  //     item: "Canon EOS R5 Camera",
  //     category: "Photography",
  //     rentedFrom: "PhotoPro Rentals",
  //     startDate: "2024-01-15",
  //     endDate: "2024-01-20",
  //     status: "completed",
  //     amount: "₹150",
  //     image: "/vintage-camera-still-life.png",
  //     rating: 5,
  //   },
  //   {
  //     id: 2,
  //     item: "MacBook Pro 16-inch",
  //     category: "Electronics",
  //     rentedFrom: "TechRent Solutions",
  //     startDate: "2024-01-10",
  //     endDate: "2024-01-17",
  //     status: "completed",
  //     amount: "₹200",
  //     image: "/modern-laptop-workspace.png",
  //     rating: 4,
  //   },
  //   {
  //     id: 3,
  //     item: "Mountain Bike",
  //     category: "Sports",
  //     rentedFrom: "Adventure Gear Co",
  //     startDate: "2024-01-25",
  //     endDate: "2024-01-28",
  //     status: "active",
  //     amount: "₹80",
  //     image: "/mountain-bike-trail.png",
  //     rating: null,
  //   },
  // ];

  const stats = [
    {
      label: "Total Rentals",
      value: totalRentedItems,
      icon: History,
      color: "text-green-600",
    },
    {
      label: "Total Spent",
      value: `₹${totalSpentOnAllProducts}`,
      icon: CreditCard,
      color: "text-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      <DashboardHeader
        userType="customer"
        userName={session?.user?.name?.firstname}
        // userAvatar={session?.user}
        title="Customer Dashboard"
        description="Manage your rentals and account settings"
      />

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
            {/* Big Tier Badge */}
            {tier !== "none" && (
              <Link href="/tier-info">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-2xl shadow-lg p-6 py-12 flex flex-col items-center text-center mb-5 ${tierStyle.gradient}`}
                >
                  <InfoIcon className="h-5 w-5 text-black mb-2 mx-auto absolute right-3 top-2" />
                  <p className={`text-md ${tierStyle.color} font-bold`}>
                    View Vastrahire's membership program
                  </p>
                </motion.div>
              </Link>
            )}

            {/* Profile Card */}
            <div className="bg-[#3d000c8e] text-[#ffecd1] p-6 rounded-xl sticky top-4">
              <div className="flex flex-col items-center gap-3 mb-6">
                <div className="h-20 w-20 rounded-full bg-[#ffecd1] flex items-center justify-center text-3xl font-bold text-[#3d000c]">
                  {session?.user?.name?.firstname?.charAt(0).toUpperCase()}
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold">
                    {session?.user?.name?.firstname}{" "}
                    {session?.user?.name?.lastname}
                  </h3>
                </div>
              </div>
              <DashboardNav userType="customer" />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
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
                    key={rental._id}
                    className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-md transition-all duration-300 group cursor-pointer"
                    onClick={() => setSelectedRental(rental)}
                  >
                    <div className="relative overflow-hidden rounded-lg">
                      <Image
                        src={rental.productID.pImages[0] || "/placeholder.png"}
                        alt={rental.productID.pName}
                        className="h-16 w-16 object-cover group-hover:scale-110 transition-transform duration-300"
                        width={64}
                        height={64}
                      />
                      {rental.productID.availability === "active" && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {rental.productID.pName}
                        </h4>
                        <span
                          className={`px-2 py-1 rounded text-xs ${rental.productID.availability === "active"
                              ? "bg-blue-600 text-white"
                              : "bg-gray-200 text-gray-700"
                            }`}
                        >
                          {rental.productID.availability}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {rental.productID.subcategory} •{" "}
                        {rental.productID.ownerID.companyName
                          ? rental.productID.ownerID.companyName
                          : rental.productID.ownerID.name.firstname +
                          " " +
                          rental.productID.ownerID.name.lastname}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />{" "}
                          {formatDate(rental.rentalPeriod.from)} -{" "}
                          {formatDate(rental.rentalPeriod.to)}
                        </span>
                        <span className="flex items-center gap-1">
                          <CreditCard className="h-3 w-3" /> ₹
                          {rental.productID.pPrice}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Details Modal */}
              {selectedRental && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
                  <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md relative transition-transform transform scale-100">
                    <button
                      className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
                      onClick={() => setSelectedRental(null)}
                    >
                      <X className="h-6 w-6" />
                    </button>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
                      {selectedRental.productID.pName}
                    </h2>
                    <div className="overflow-hidden rounded-xl mb-5">
                      <Image
                        src={selectedRental.productID.pImages[0]}
                        alt={selectedRental.productID.pName}
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
                        {selectedRental.productID.subcategory}
                      </p>
                      <p className="flex justify-between">
                        <span className="font-medium text-gray-600">
                          Rented From:
                        </span>
                        {selectedRental.productID.ownerID.companyName
                          ? selectedRental.productID.ownerID.companyName
                          : selectedRental.productID.ownerID.name.firstname +
                          " " +
                          selectedRental.productID.ownerID.name.lastname}
                      </p>
                      <p className="flex justify-between">
                        <span className="font-medium text-gray-600">
                          Duration:
                        </span>
                        {formatDate(selectedRental.rentalPeriod.from)} -{" "}
                        {formatDate(selectedRental.rentalPeriod.to)}
                      </p>
                      <p className="flex justify-between mb-4">
                        <span className="font-medium text-gray-600">
                          Amount Paid:
                        </span>
                        ₹{selectedRental.productID.pPrice}
                      </p>
                    </div>
                    {selectedRental.productID.availability === "active" && (
                      <div className="flex gap-3 mt-6">
                        <button className="w-full py-3 rounded-xl bg-[#3d000c] text-white font-semibold shadow-md hover:bg-red-700 transition-all duration-300" onClick={() => handleReturn()}>
                          Return Early
                        </button>
                        <button className="w-full py-3 rounded-xl bg-[#ffecd0] text-[#3d000c] font-bold shadow-md hover:bg-[#f7ddb6] transition-all duration-300" onClick={() => handleReturn()}>
                          Cancel order
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Personal Details */}
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
                <button
                  className="px-4 py-2 rounded-md bg-[#3d000c] text-white hover:bg-[#710017] flex items-center gap-1"
                  onClick={() => setIsEditingProfile(true)}
                >
                  <Edit className="h-4 w-4" /> Edit Profile
                </button>
              </div>
              <form onSubmit={handleProfileSave}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        First Name
                      </label>
                      {isEditingProfile ? (
                        <input
                          id="firstName"
                          value={userProfile.firstName}
                          onChange={(e) =>
                            setUserProfile({
                              ...userProfile,
                              firstName: e.target.value,
                            })
                          }
                          className="h-12 w-full px-3 text-gray-700 rounded-md border-2 border-gray-300 bg-white focus:border-[#3d000c] outline-none transition-colors"
                        />
                      ) : (
                        <p className="text-gray-900 font-medium">
                          {userProfile.firstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Phone Number
                      </label>
                      {isEditingProfile ? (
                        <input
                          id="phoneNumber"
                          value={userProfile.phoneNumber}
                          onChange={(e) =>
                            setUserProfile({
                              ...userProfile,
                              phoneNumber: e.target.value,
                            })
                          }
                          className="h-12 w-full px-3 text-gray-700 rounded-md border-2 border-gray-300 bg-white focus:border-[#3d000c] outline-none transition-colors"
                        />
                      ) : (
                        <p className="text-gray-900 font-medium">
                          {userProfile.phoneNumber}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Address
                      </label>
                      {isEditingProfile ? (
                        <input
                          id="address"
                          value={userProfile.address}
                          onChange={(e) =>
                            setUserProfile({
                              ...userProfile,
                              address: e.target.value,
                            })
                          }
                          className="h-12 w-full px-3 text-gray-700 rounded-md border-2 border-gray-300 bg-white focus:border-[#3d000c] outline-none transition-colors"
                        />
                      ) : (
                        <p className="text-gray-900 font-medium">
                          {userProfile.address}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Last Name
                      </label>
                      {isEditingProfile ? (
                        <input
                          id="lastName"
                          value={userProfile.lastName}
                          onChange={(e) =>
                            setUserProfile({
                              ...userProfile,
                              lastName: e.target.value,
                            })
                          }
                          className="h-12 w-full px-3 text-gray-700 rounded-md border-2 border-gray-300 bg-white focus:border-[#3d000c] outline-none transition-colors"
                        />
                      ) : (
                        <p className="text-gray-900 font-medium">
                          {userProfile.lastName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Email Address
                      </label>
                      {isEditingProfile ? (
                        <input
                          id="email"
                          value={userProfile.email}
                          onChange={(e) =>
                            setUserProfile({
                              ...userProfile,
                              email: e.target.value,
                            })
                          }
                          className="h-12 w-full px-3 text-gray-700 rounded-md border-2 border-gray-300 bg-white focus:border-[#3d000c] outline-none transition-colors"
                        />
                      ) : (
                        <p className="text-gray-900 font-medium">
                          {userProfile.email}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <hr className="my-6" />
                {isEditingProfile && (
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-md bg-[#3d000c] text-white hover:bg-[#710017]"
                    >
                      Save Changes
                    </button>
                    <button
                      className="px-4 py-2 rounded-md border text-[#3d000c] hover:bg-gray-100"
                      onClick={() => setIsEditingProfile(false)}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
