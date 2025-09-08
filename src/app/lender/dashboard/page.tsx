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

export default function LenderDashboard() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    dailyRate: "",
    description: "",
    location: "",
  });

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
                  <input
                    type="text"
                    placeholder="Product Name"
                    value={newProduct.name}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, name: e.target.value })
                    }
                    className="border rounded-lg p-2"
                  />
                  <input
                    type="text"
                    placeholder="Category"
                    value={newProduct.category}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, category: e.target.value })
                    }
                    className="border rounded-lg p-2 "
                  />
                  <input
                    type="number"
                    placeholder="Daily Rate ($)"
                    value={newProduct.dailyRate}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        dailyRate: e.target.value,
                      })
                    }
                    className="border rounded-lg p-2 "
                  />
                  <input
                    type="text"
                    placeholder="Pickup Location"
                    value={newProduct.location}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, location: e.target.value })
                    }
                    className="border rounded-lg p-2 "
                  />
                  <textarea
                    placeholder="Description"
                    value={newProduct.description}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        description: e.target.value,
                      })
                    }
                    className="border rounded-lg p-2 col-span-2 "
                  />
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
          </div>
        </div>
      </div>
    </div>
  );
}
