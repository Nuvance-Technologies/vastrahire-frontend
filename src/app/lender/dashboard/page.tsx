"use client";

import * as React from "react";
import { useState } from "react";
import {
  Edit,
  Plus,
  Package,
  DollarSign,
  Eye,
  Trash2,
  Users,
  Star,
  Crown,
  Gem,
} from "lucide-react";
import { DashboardHeader } from "@/app/components/Dashboard-header";
import { DashboardNav } from "@/app/components/Dashboard-nav";
import { Header } from "@/app/components/Header";
import Image from "next/image";
import { motion } from "framer-motion";

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
    label: "Golden Lender",
    gradient: "bg-gradient-to-r from-yellow-300 to-yellow-500",
    color: "text-yellow-800",
    icon: <Crown className="w-4 h-4 text-yellow-800" />,
  },
  Platinum: {
    label: "Platinum Lender",
    gradient: "bg-gradient-to-r from-gray-200 to-gray-400",
    color: "text-gray-700",
    icon: <Crown className="w-4 h-4 text-gray-600" />,
  },
  Diamond: {
    label: "Diamond Lender",
    gradient: "bg-gradient-to-r from-sky-200 to-sky-400",
    color: "text-sky-700",
    icon: <Gem className="w-4 h-4 text-sky-600" />,
  },
  none: {
    label: "",
    gradient: "",
    color: "",
    icon: <></>,
  },
};
const lendersProfile = {
  name: "John Smith",
  email: "john.smith@email.com",
  phone: "+1 (555) 123-4567",
  address: "123 Main St, New York, NY 10001",
  memberSince: "January 2023",
  totalRentals: 15,
  totalSpent: "$2,450",
  avatar: "/abstract-profile.png",
}

export default function LenderDashboard() {
  const [showAddForm, setShowAddForm] = useState(false);
  const lenderProducts = [
    {
      id: 1,
      name: "Canon EOS R5 Camera",
      category: "Photography",
      dailyRate: "$30",
      status: "rented",
      currentRenter: "John Smith",
      rentedUntil: "2024-01-20",
      totalEarnings: "$450",
      image: "/vintage-camera-still-life.png",
    },
    {
      id: 2,
      name: "MacBook Pro 16-inch",
      category: "Electronics",
      dailyRate: "$50",
      status: "available",
      currentRenter: null,
      rentedUntil: null,
      totalEarnings: "$800",
      image: "/modern-laptop-workspace.png",
    },
    {
      id: 3,
      name: "Mountain Bike",
      category: "Sports",
      dailyRate: "$25",
      status: "rented",
      currentRenter: "Sarah Johnson",
      rentedUntil: "2024-01-28",
      totalEarnings: "$300",
      image: "/mountain-bike-trail.png",
    },
  ];

  const lenderProfile = {
    name: "Mike Johnson",
    email: "mike.johnson@email.com",
    phone: "+1 (555) 987-6543",
    address: "456 Business Ave, Los Angeles, CA 90210",
    memberSince: "March 2022",
    totalProducts: 12,
    totalEarnings: "$3,450",
    activeRentals: 5,
    avatar: "/abstract-profile.png",
  };

  const stats = [
    {
      label: "Total Products",
      value: "12",
      icon: Package,
      color: "text-blue-600",
      trend: "+2 this month",
    },
    {
      label: "Active Rentals",
      value: "5",
      icon: Users,
      color: "text-green-600",
      trend: "+1 this week",
    },
    {
      label: "Total Earnings",
      value: "$3,450",
      icon: DollarSign,
      color: "text-purple-600",
      trend: "+$450 this month",
    },
    {
      label: "Avg Rating",
      value: "4.9",
      icon: Star,
      color: "text-yellow-600",
      trend: "Excellent",
    },
  ];

  const tier = getLenderTier();
  const tierStyle = TIER_STYLES[tier];
  const uploadedUrls: string[] = [];

  
  const [newProduct, setNewProduct] = useState({
    pName: "",
    pPrice: "",
    pSize: "",
    pDesc: "",
    pColor: "",
    subcategory: "",
    pDiscount: "",
    pFabric: "",
    pPattern: "",
    pOccasion: "",
    pLocation: "",
    quantity: 1,
    category: "",
    ownerID: "",
  });


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      <DashboardHeader
        userType="lender"
        userName={lenderProfile.name}
        userAvatar={lenderProfile.avatar}
        title="Lender Dashboard"
        description="Manage your products and track earnings"
      />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {stat.value}
                    </p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <p className="text-xs text-gray-500">{stat.trend}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {tier && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`rounded-xl shadow p-6 flex flex-col justify-center items-center ${tierStyle.gradient} ${tierStyle.color}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {tierStyle.icon}
                  <h3 className="text-lg font-semibold">{tierStyle.label}</h3>
                </div>
                <p className="text-sm opacity-80">
                  Your current membership tier
                </p>
              </motion.div>
            )}
            <div className="bg-[#3d000c8e] text-[#ffecd1] p-6 rounded-xl sticky top-4">
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src={lenderProfile.avatar}
                  alt={lenderProfile.name}
                  className="h-12 w-12 rounded-full border-2 border-white/20"
                  width={48}
                  height={48}
                />
                <div>
                  <h3 className="text-lg font-semibold">
                    {lenderProfile.name}
                  </h3>
                  <p className="text-sm text-gray-300">
                    Lender since {lenderProfile.memberSince}
                  </p>
                </div>
              </div>
              <DashboardNav userType="lender" />
            </div>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">
                  Add New Product
                </h2>
                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  <Plus className="inline h-4 w-4 mr-1" />
                  {showAddForm ? "Hide Form" : "Add Product"}
                </button>
              </div>

              {showAddForm && (
                <form className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
                  {/* Product Name */}
                  <input
                    type="text"
                    placeholder="Product Name"
                    value={newProduct.pName}
                    onChange={(e) => setNewProduct({ ...newProduct, pName: e.target.value })}
                    className="border rounded-lg p-2"
                  />

                  {/* Category */}
                  <input
                    type="text"
                    placeholder="Category"
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="border rounded-lg p-2"
                  />

                  {/* Subcategory */}
                  <input
                    type="text"
                    placeholder="Subcategory"
                    value={newProduct.subcategory}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, subcategory: e.target.value })
                    }
                    className="border rounded-lg p-2"
                  />

                  {/* Price */}
                  <input
                    type="number"
                    placeholder="Price ($)"
                    value={newProduct.pPrice}
                    onChange={(e) => setNewProduct({ ...newProduct, pPrice: e.target.value })}
                    className="border rounded-lg p-2"
                  />

                  {/* Discount */}
                  <input
                    type="number"
                    placeholder="Discount (%)"
                    value={newProduct.pDiscount}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, pDiscount: e.target.value })
                    }
                    className="border rounded-lg p-2"
                  />

                  {/* Available Sizes */}
                  <input
                    type="text"
                    placeholder="Available Sizes (e.g., S, M, L, XL)"
                    value={newProduct.pSize}
                    onChange={(e) => setNewProduct({ ...newProduct, pSize: e.target.value })}
                    className="border rounded-lg p-2"
                  />

                  {/* Color */}
                  <input
                    type="text"
                    placeholder="Color"
                    value={newProduct.pColor}
                    onChange={(e) => setNewProduct({ ...newProduct, pColor: e.target.value })}
                    className="border rounded-lg p-2"
                  />

                  {/* Fabric */}
                  <input
                    type="text"
                    placeholder="Fabric"
                    value={newProduct.pFabric}
                    onChange={(e) => setNewProduct({ ...newProduct, pFabric: e.target.value })}
                    className="border rounded-lg p-2"
                  />

                  {/* Pattern */}
                  <input
                    type="text"
                    placeholder="Pattern"
                    value={newProduct.pPattern}
                    onChange={(e) => setNewProduct({ ...newProduct, pPattern: e.target.value })}
                    className="border rounded-lg p-2"
                  />

                  {/* Occasion */}
                  <input
                    type="text"
                    placeholder="Occasion"
                    value={newProduct.pOccasion}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, pOccasion: e.target.value })
                    }
                    className="border rounded-lg p-2"
                  />

                  {/* Pickup Location */}
                  <input
                    type="text"
                    placeholder="Pickup Location"
                    value={newProduct.pLocation}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, pLocation: e.target.value })
                    }
                    className="border rounded-lg p-2"
                  />

                  {/* Quantity */}
                  <input
                    type="number"
                    placeholder="Quantity"
                    value={newProduct.quantity}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, quantity: Number(e.target.value) })
                    }
                    className="border rounded-lg p-2"
                  />

                  {/* Owner ID */}
                  <input
                    type="text"
                    placeholder="Owner ID"
                    value={newProduct.ownerID}
                    onChange={(e) => setNewProduct({ ...newProduct, ownerID: e.target.value })}
                    className="border rounded-lg p-2"
                  />

                  {/* Description */}
                  <textarea
                    placeholder="Description"
                    value={newProduct.pDesc}
                    onChange={(e) => setNewProduct({ ...newProduct, pDesc: e.target.value })}
                    className="border rounded-lg p-2 col-span-2"
                  />

                  {/* Submit */}
                  <button className="col-span-2 px-4 py-2 bg-[#3d000c] hover:bg-[#570112] text-white rounded-lg">
                    <Plus className="inline h-4 w-4 mr-1" /> List Product
                  </button>
                </form>

              )}
            </div>

            {/* My Products */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                My Products
              </h2>
              {lenderProducts.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-4 border rounded-lg p-4 mb-3 hover:shadow"
                >
                  <Image
                    src={p.image}
                    alt={p.name}
                    className="h-16 w-16 object-cover rounded-lg"
                    width={64}
                    height={64}
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{p.name}</h3>
                    <p className="text-sm text-gray-500">
                      {p.category} • {p.dailyRate}/day
                    </p>
                    {p.status === "rented" && (
                      <p className="text-xs text-gray-500">
                        Rented by {p.currentRenter} until {p.rentedUntil}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 border rounded hover:bg-gray-100">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-2 border rounded hover:bg-gray-100">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-2 border rounded text-red-600 hover:bg-red-50">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* Personal Details */}
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Personal Details</h3>
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
                    { label: "Full Name", value: lendersProfile.name },
                    { label: "Email Address", value: lendersProfile.email },
                    { label: "Phone Number", value: lendersProfile.phone },
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
                    { label: "Address", value: lendersProfile.address },
                    { label: "Total Rentals", value: `${lendersProfile.totalRentals} items` },
                    { label: "Member Since", value: lendersProfile.memberSince },
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
    </div>
  );
}

