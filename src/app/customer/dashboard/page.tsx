"use client";

import { useEffect, useState } from "react";
import {
  Calendar,
  CreditCard,
  Download,
  Edit,
  X,
  History,
  TrendingUp,
  Star,
} from "lucide-react";
import Image from "next/image";
import { DashboardHeader } from "@/app/components/Dashboard-header";
import { Header } from "@/app/components/Header";
import { DashboardNav } from "@/app/components/Dashboard-nav";
import { AuthorizedUser } from "@/types/AuthoririzedUser";
import { useSession } from "next-auth/react";
import axios from "axios";
import ThreeDotsLoader from "@/app/components/ThreeDotLoader";
import toast from "react-hot-toast";

export default function CustomerDashboard() {
  const [selectedRental, setSelectedRental] = useState<any | null>(null);
  const [userProfile, setUserProfile] = useState<AuthorizedUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const { data: session } = useSession();

  const fetchUserProfile = async () => {
    if (!session?.user?.id) {
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(
        `/api/get-user?userId=${session?.user?.id}`
      );
      if (response.status !== 200) {
        return;
      }

      const data = response.data as AuthorizedUser;
      setUserProfile(data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserDataUpdate = async () => {
    if (!userProfile) return;

    try {
      setLoading(true);
      const updatedData = {
        
          firstname: firstname,
          lastname: lastname,
        
        email: email,
      };
      console.log("Updating user data with:", updatedData);

      const response = await axios.put(
        `/api/update-user?userId=${session?.user?.id}`,
        {
          firstname: firstname,
          lastname: lastname,
          email: email,
        }
      );

      console.log("Update response:", response.data.user.name);

      if (response.status === 200) {
        toast.success("Profile updated successfully");
        setUserProfile(response.data.user);
        setIsEditable(false);
      } else {
        console.error("Failed to update user data");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUserProfile();
  }, [session?.user?.id]);

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

  const stats = [
    {
      label: "Active Rentals",
      value: "1",
      icon: TrendingUp,
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      {userProfile && (
        <DashboardHeader
          userType="customer"
          userName={userProfile?.name?.firstname}
          userAvatar={userProfile?.name?.firstname.charAt(0).toUpperCase()}
          title="Customer Dashboard"
          description="Manage your rentals and account settings"
        />
      )}

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
          <div className="lg:col-span-1">
            <div className="bg-[#3d000c8e] text-[#ffecd1] rounded-xl p-6 sticky top-4">
              <div className="flex flex-col items-center gap-3 mb-6">
                {/* <Image
                  src={userProfile?.name?.firstname.charAt(0).toUpperCase()}
                  alt={userProfile?.name?.firstname}
                  className="h-32 w-32 rounded-full border-2 border-white/20"
                  width={128}
                  height={128}
                /> */}
                <div className="h-32 w-32 rounded-full border-2 border-white/20 flex items-center justify-center">
                  <span className="text-2xl font-semibold text-white">
                    {userProfile?.name?.firstname.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h2 className="text-white font-semibold">
                    {userProfile?.name?.firstname}
                  </h2>
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
                    key={rental.id}
                    className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-md transition-all duration-300 group cursor-pointer"
                    onClick={() => setSelectedRental(rental)} // open details
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
                          className={`px-2 py-1 rounded text-xs ${rental.status === "active"
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

              {/* Details Modal */}
              {selectedRental && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
                  <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md relative transition-transform transform scale-100">
                    {/* Close Button */}
                    <button
                      className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
                      onClick={() => setSelectedRental(null)}
                    >
                      <X className="h-6 w-6" />
                    </button>

                    {/* Title */}
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
                      {selectedRental.item}
                    </h2>

                    {/* Image */}
                    <div className="overflow-hidden rounded-xl mb-5">
                      <Image
                        src={selectedRental.image}
                        alt={selectedRental.item}
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                        width={400}
                        height={300}
                      />
                    </div>

                    {/* Info Section */}
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

                    {/* Return Button */}
                    {selectedRental.status === "active" && (
                      <button className="w-full py-3 rounded-xl bg-[#3d000c] text-white font-semibold shadow-md hover:from-red-600 hover:to-red-700 transition-all duration-300">
                        Return Early
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

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
                <button className="px-4 py-2 rounded-md bg-[#3d000c] text-white hover:bg-[#710017] flex items-center gap-1" onClick={() => setIsEditable(true)}>
                  <Edit className="h-4 w-4" /> Edit Profile
                </button>
              </div>

              {loading ? (
                <>
                  <ThreeDotsLoader />
                </>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      {isEditable ? (
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
                      ) : (<>
                        <label className="text-sm font-medium text-gray-500">
                          Full Name
                        </label>
                        <p className="text-gray-900 font-medium">{userProfile?.name?.firstname}{" "}
                          {userProfile?.name?.lastname}</p></>)}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Email Address
                      </label>
                      {isEditable ? (<>
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your.email@example.com"
                          className="h-12 w-full px-3 text-gray-700 rounded-md border-2 border-gray-300 bg-white focus:border-[#3d000c] outline-none transition-colors"
                        />
                      </>) : (<p className="text-gray-900 font-medium">
                        {userProfile?.email}
                      </p>)}

                    </div>
                  </div>
                  {/* <div className="space-y-4">
                  {[
                    {
                      label: "Total Rentals",
                      value: `${userProfile.totalRentals} items`,
                    },
                  ].map((field, index) => (
                    <div key={index}>
                      <label className="text-sm font-medium text-gray-500">
                        {field.label}
                      </label>
                      <p className="text-gray-900 font-medium">{field.value}</p>
                    </div>
                  ))}
                </div> */}
                </div>
              )}

              {isEditable ? (<><hr className="my-6" />
              <div className="flex gap-3">
                <button className="px-4 py-2 rounded-md bg-[#3d000c] text-white hover:bg-[#710017]"
                onClick={() => handleUserDataUpdate()}
                >
                  Save Changes
                </button>
                <button className="px-4 py-2 rounded-md border text-[#3d000c] hover:bg-gray-100" 
                onClick={() => {
                  setIsEditable(false)
                  setFirstname(userProfile?.name?.firstname || "")
                  setLastname(userProfile?.name?.lastname || "")
                  setEmail(userProfile?.email || "")
                }}>
                  Cancel
                </button>
              </div></>):(<></>) }

              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
