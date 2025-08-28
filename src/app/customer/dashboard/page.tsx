"use client"

import { useState } from "react"
import { Calendar, CreditCard, Download, Edit, History, MapPin, Settings, Bell, TrendingUp, Star } from "lucide-react"
import Image from "next/image"
import { DashboardHeader } from "@/app/components/Dashboard-header"
import { Header } from "@/app/components/Header"
import { DashboardNav } from "@/app/components/Dashboard-nav"

export default function CustomerDashboard() {

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
    ]

    const userProfile = {
        name: "John Smith",
        email: "john.smith@email.com",
        phone: "+1 (555) 123-4567",
        address: "123 Main St, New York, NY 10001",
        memberSince: "January 2023",
        totalRentals: 15,
        totalSpent: "$2,450",
        avatar: "/abstract-profile.png",
    }

    const stats = [
        { label: "Active Rentals", value: "1", icon: TrendingUp, color: "text-blue-600" },
        { label: "Total Rentals", value: "15", icon: History, color: "text-green-600" },
        { label: "Total Spent", value: "$2,450", icon: CreditCard, color: "text-purple-600" },
        { label: "Avg Rating", value: "4.8", icon: Star, color: "text-yellow-600" },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <Header />
            <DashboardHeader
                userType="customer"
                userName={userProfile.name}
                userAvatar={userProfile.avatar}
                title="Customer Dashboard"
                description="Manage your rentals and account settings"
            />

            <div className="container mx-auto px-4 py-8">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon
                        return (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                                        <p className="text-2xl font-bold text-gray-900 group-hover:scale-105 transition-transform duration-200">
                                            {stat.value}
                                        </p>
                                    </div>
                                    <Icon className={`h-8 w-8 ${stat.color} group-hover:scale-110 transition-transform duration-200`} />
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl p-6 sticky top-4">
                            <div className="flex flex-col items-center gap-3 mb-6">
                                <Image src={userProfile.avatar} alt={userProfile.name} className="h-32 w-32 rounded-full border-2 border-white/20" width={128} height={128} />
                                <div>
                                    <h2 className="text-white font-semibold">{userProfile.name}</h2>
                                    <p className="text-white/70 text-sm">Member since {userProfile.memberSince}</p>
                                </div>
                            </div>
                            <DashboardNav userType="customer" />
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Rentals */}
                        <div className="bg-white rounded-xl shadow p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Recent Rentals</h3>
                                    <p className="text-gray-500 text-sm">Your rental history and current bookings</p>
                                </div>
                                <button className="px-3 py-1 text-gray-700 border rounded-md text-sm hover:bg-gray-100 flex items-center gap-1">
                                    <History className="h-4 w-4" /> View All
                                </button>
                            </div>

                            <div className="space-y-4">
                                {rentalHistory.map((rental, index) => (
                                    <div
                                        key={rental.id}
                                        className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-md transition-all duration-300 group"
                                    >
                                        <div className="relative overflow-hidden rounded-lg">
                                            <img src={rental.image} alt={rental.item} className="h-16 w-16 object-cover group-hover:scale-110 transition-transform duration-300" />
                                            {rental.status === "active" && (
                                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{rental.item}</h4>
                                                <span className={`px-2 py-1 rounded text-xs ${rental.status === "active" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}>
                                                    {rental.status}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-500">{rental.category} • {rental.rentedFrom}</p>
                                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {rental.startDate} - {rental.endDate}</span>
                                                <span className="flex items-center gap-1"><CreditCard className="h-3 w-3" /> {rental.amount}</span>
                                                {rental.rating && (
                                                    <span className="flex items-center gap-1"><Star className="h-3 w-3 text-yellow-400 fill-yellow-400" /> {rental.rating}</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex gap-2 opacity-50 text-gray-800 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 border rounded-md hover:bg-gray-100"><Download className="h-4 w-4" /></button>
                                            {rental.status === "active" && (
                                                <button className="p-2 border rounded-md hover:bg-gray-100"><Edit className="h-4 w-4" /></button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Personal Details</h3>
                                    <p className="text-gray-500 text-sm">Your profile information and preferences</p>
                                </div>
                                <button className="px-4 py-2 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 flex items-center gap-1">
                                    <Edit className="h-4 w-4" /> Edit Profile
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    {[{ label: "Full Name", value: userProfile.name }, { label: "Email Address", value: userProfile.email }, { label: "Phone Number", value: userProfile.phone }].map((field, index) => (
                                        <div key={index}>
                                            <label className="text-sm font-medium text-gray-500">{field.label}</label>
                                            <p className="text-gray-900 font-medium">{field.value}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="space-y-4">
                                    {[{ label: "Address", value: userProfile.address }, { label: "Total Rentals", value: `${userProfile.totalRentals} items` }, { label: "Member Since", value: userProfile.memberSince }].map((field, index) => (
                                        <div key={index}>
                                            <label className="text-sm font-medium text-gray-500">{field.label}</label>
                                            <p className="text-gray-900 font-medium">{field.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <hr className="my-6" />
                            <div className="flex gap-3">
                                <button className="px-4 py-2 rounded-md bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700">Save Changes</button>
                                <button className="px-4 py-2 rounded-md border hover:bg-gray-100">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}