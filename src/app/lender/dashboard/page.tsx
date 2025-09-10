"use client";

import * as React from "react";
import { useState, useEffect } from "react";
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
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import axios from "axios";
import { ProductI } from "@/app/category/women/page";

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
    quantity: 0,
    category: "",
    ownerID: "",
    pImages: [] as (string | File)[],
  });
  // inside LenderDashboard component (state + handlers at the top)
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [lenderProducts, setLenderProducts] = useState<ProductI[]>([]);
  const [lenderProfile, setLenderProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  const { data: session } = useSession();

  const fetchLenderProfile = async () => {
    try {
      const res = await axios.get(
        `/api/get-user?userId=${session?.user?.id || ""}`
      );

      if (res.status === 200) {
        setLenderProfile({
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
  useEffect(() => {
    if (session?.user) {
      setLenderProfile({
        firstName: session.user?.name?.firstname || "",
        lastName: session.user?.name?.lastname || "",
        email: session.user?.email || "",
        phoneNumber: session.user?.phoneNumber || "",
        address: session.user?.address || "",
      });
      fetchLenderProfile();
    }
  }, [session?.user]);

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        firstname: lenderProfile.firstName,
        lastname: lenderProfile.lastName,
        email: lenderProfile.email,
        phoneNumber: lenderProfile.phoneNumber,
        address: lenderProfile.address,
      };
      const res = await axios.put(
        `/api/update-user?userId=${session?.user?.id}`,
        data
      );
      if (res.status === 200) {
        setIsEditingProfile(false);
        setLenderProfile({
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

  const handleCancel = () => {
    setIsEditingProfile(false);
    // Optionally: refetch original profile from API here to reset unsaved changes
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`/api/product/${session?.user?.id}`);
      if (res.status === 200) {
        toast.success("Products fetched successfully!");
        setLenderProducts(res.data.products);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
      toast.error("Failed to fetch products. Please try again.");
    }
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      Object.entries(newProduct).forEach(([key, value]) => {
        if (key === "pImages" && Array.isArray(value)) {
          value.forEach((file) => formData.append("pImages", file));
        } else {
          formData.append(key, value as string | Blob);
        }
      });

      formData.set("ownerID", session?.user?.id || "");

      const res = await axios.post("/api/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 201) {
        toast.success("Product added successfully!");
        setShowAddForm(false);
        setNewProduct({
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
          quantity: 0,
          category: "",
          ownerID: "",
          pImages: [""],
        });
        fetchProducts();
      }
    } catch (error) {
      console.error("Failed to add product:", error);
      toast.error("Failed to add product. Please try again.");
    }
  };

  const handleDelete = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await axios.delete(
        `/api/product?productId=${encodeURIComponent(productId)}`
      );
      if (res.status === 200) {
        toast.success("Product deleted successfully!");
        setLenderProducts((prev) =>
          prev.filter((product) => product._id !== productId)
        );
      }
    } catch (error) {
      console.error("Failed to delete product:", error);
      toast.error("Failed to delete product. Please try again.");
    }
  };

  useEffect(() => {
    if (session?.user?.id) {
      fetchProducts();
    }
  }, [session?.user?.id]);

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
        userName={lenderProfile.firstName}
        // userAvatar={lenderProfile.avatar}
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
                <div className="h-12 w-12 bg-[#ffecd1] text-[#3d000c] rounded-full flex items-center justify-center text-xl font-bold">
                  {session?.user?.name?.firstname.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    {lenderProfile.firstName} {lenderProfile.lastName}
                  </h3>
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
                <form
                  onSubmit={handleProductSubmit}
                  className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-black"
                >
                  <input
                    type="text"
                    placeholder="Product Name"
                    value={newProduct.pName}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, pName: e.target.value })
                    }
                    className="border rounded-lg p-2"
                  />
                  {/* Category ID by category name */}
                  <select
                    value={newProduct.category}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, category: e.target.value })
                    }
                    className="border rounded-lg p-2"
                  >
                    <option value="">Select Category</option>
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kids">Kids</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Daily Rate ($)"
                    value={newProduct.pPrice}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        pPrice: e.target.value,
                      })
                    }
                    className="border rounded-lg p-2"
                  />

                  {/* Available Sizes */}
                  <input
                    type="text"
                    placeholder="Available Sizes (e.g., S, M, L, XL)"
                    value={newProduct.pSize}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, pSize: e.target.value })
                    }
                    className="border rounded-lg p-2"
                  />

                  {/* Pickup Location */}
                  <input
                    type="text"
                    placeholder="Pickup Location"
                    value={newProduct.pLocation}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        pLocation: e.target.value,
                      })
                    }
                    className="border rounded-lg p-2 w-full col-span-2"
                  />
                  <textarea
                    placeholder="Description"
                    value={newProduct.pDesc}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        pDesc: e.target.value,
                      })
                    }
                    className="border rounded-lg p-2 col-span-2"
                  />
                  <input
                    type="text"
                    placeholder="Color"
                    value={newProduct.pColor}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, pColor: e.target.value })
                    }
                    className="border rounded-lg p-2"
                  />
                  <select
                    value={newProduct.subcategory}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        subcategory: e.target.value,
                      })
                    }
                    className="border rounded-lg p-2"
                  >
                    <option value="">Select Subcategory</option>
                    <option value="clothes">Clothes</option>
                    <option value="accessories">Accessories</option>
                    <option value="footwear">Footwear</option>
                    <option value="jewellery">Jewellery</option>
                    <option value="handbags">Hand Bags</option>
                    <option value="watches">Watches</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Discount (%)"
                    value={newProduct.pDiscount}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        pDiscount: e.target.value,
                      })
                    }
                    className="border rounded-lg p-2"
                  />
                  <input
                    type="text"
                    placeholder="Fabric"
                    value={newProduct.pFabric}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        pFabric: e.target.value,
                      })
                    }
                    className="border rounded-lg p-2"
                  />
                  <input
                    type="text"
                    placeholder="Pattern"
                    value={newProduct.pPattern}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        pPattern: e.target.value,
                      })
                    }
                    className="border rounded-lg p-2"
                  />
                  <input
                    type="text"
                    placeholder="Occasion"
                    value={newProduct.pOccasion}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        pOccasion: e.target.value,
                      })
                    }
                    className="border rounded-lg p-2"
                  />
                  <input
                    type="number"
                    placeholder="Quantity Available"
                    value={newProduct.quantity}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        quantity: parseInt(e.target.value, 10),
                      })
                    }
                    className="border rounded-lg p-2"
                  />
                  {/* Images upload can be added here */}
                  <input
                    type="file"
                    multiple
                    onChange={(e) => {
                      if (!e.target.files) return;
                      setNewProduct({
                        ...newProduct,
                        pImages: Array.from(e.target.files), // store File objects
                      });
                    }}
                    className="border rounded-lg p-2"
                  />
                  <button
                    type="submit"
                    className="col-span-2 px-4 py-2 bg-[#3d000c] hover:bg-[#570112] text-white rounded-lg"
                  >
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
                  key={p._id}
                  className="flex items-center gap-4 border rounded-lg p-4 mb-3 hover:shadow"
                >
                  <Image
                    src={p.pImages[0] || "/placeholder.png"}
                    alt={p.pName}
                    className="h-16 w-16 object-cover rounded-lg"
                    width={64}
                    height={64}
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{p.pName}</h3>
                    <p className="text-sm capitalize text-gray-500">
                      {p.subcategory} • ₹{p.pPrice}/day
                    </p>
                    {p.quantity === 0 ? (
                      <span className="text-xs text-red-600 font-medium">
                        Out of Stock
                      </span>
                    ) : (
                      <span className="text-xs text-green-600 font-medium">
                        In Stock: {p.quantity}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 border rounded hover:bg-gray-100">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-2 border rounded hover:bg-gray-100">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="p-2 border rounded text-red-600 hover:bg-red-50"
                    >
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
                  <h3 className="text-lg font-semibold text-gray-900">
                    Personal Details
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Your profile information
                  </p>
                </div>
                {!isEditingProfile && (
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="px-4 py-2 rounded-md bg-[#3d000c] text-white hover:bg-[#710017] flex items-center gap-1"
                  >
                    <Edit className="h-4 w-4" /> Edit Profile
                  </button>
                )}
              </div>

              <form onSubmit={handleProfileSave}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left column */}
                  <div className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        First Name
                      </label>
                      {isEditingProfile ? (
                        <input
                          id="firstName"
                          value={lenderProfile.firstName}
                          onChange={(e) => {
                            setLenderProfile({
                              ...lenderProfile,
                              firstName: e.target.value,
                            });
                          }}
                          className="h-12 w-full px-3 text-gray-700 rounded-md border-2 border-gray-300 focus:border-[#3d000c] outline-none"
                        />
                      ) : (
                        <p className="text-gray-900 font-medium">
                          {lenderProfile.firstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Last Name
                      </label>
                      {isEditingProfile ? (
                        <input
                          id="lastName"
                          value={lenderProfile.lastName}
                          onChange={(e) => {
                            setLenderProfile({
                              ...lenderProfile,
                              lastName: e.target.value,
                            });
                          }}
                          className="h-12 w-full px-3 text-gray-700 rounded-md border-2 border-gray-300 focus:border-[#3d000c] outline-none"
                        />
                      ) : (
                        <p className="text-gray-900 font-medium">
                          {lenderProfile.lastName}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Email Address
                      </label>
                      {isEditingProfile ? (
                        <input
                          id="email"
                          type="email"
                          value={lenderProfile.email}
                          onChange={(e) => {
                            setLenderProfile({
                              ...lenderProfile,
                              email: e.target.value,
                            });
                          }}
                          className="h-12 w-full px-3 text-gray-700 rounded-md border-2 border-gray-300 focus:border-[#3d000c] outline-none"
                        />
                      ) : (
                        <p className="text-gray-900 font-medium">
                          {lenderProfile.email}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Phone Number
                      </label>
                      {isEditingProfile ? (
                        <input
                          id="phoneNumber"
                          value={lenderProfile.phoneNumber}
                          onChange={(e) =>
                            setLenderProfile({
                              ...lenderProfile,
                              phoneNumber: e.target.value,
                            })
                          }
                          className="h-12 w-full px-3 text-gray-700 rounded-md border-2 border-gray-300 focus:border-[#3d000c] outline-none"
                        />
                      ) : (
                        <p className="text-gray-900 font-medium">
                          {lenderProfile.phoneNumber}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right column */}
                  <div className="space-y-4">
                    {/* Address */}
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Address
                      </label>
                      {isEditingProfile ? (
                        <input
                          id="address"
                          value={lenderProfile.address}
                          onChange={(e) => {
                            setLenderProfile({
                              ...lenderProfile,
                              address: e.target.value,
                            });
                          }}
                          className="h-12 w-full px-3 text-gray-700 rounded-md border-2 border-gray-300 focus:border-[#3d000c] outline-none"
                        />
                      ) : (
                        <p className="text-gray-900 font-medium">
                          {lenderProfile.address}
                        </p>
                      )}
                    </div>

                    {/* Total Rentals (read-only) */}
                    {/* <div>
                      <label className="text-sm font-medium text-gray-500">
                        Total Rentals
                      </label>
                      <p className="text-gray-900 font-medium">
                        {lenderProfile.totalRentals} items
                      </p>
                    </div> */}
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
                      type="button"
                      onClick={handleCancel}
                      className="px-4 py-2 rounded-md border text-[#3d000c] hover:bg-gray-100"
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
