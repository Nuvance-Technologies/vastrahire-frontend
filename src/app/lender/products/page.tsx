"use client"

import {
    Search,
    Filter,
    Edit,
    Trash2,
    Eye,
    MoreHorizontal,
    DollarSign,
    TrendingUp,
    Package,
    AlertCircle,
    CheckCircle,
    Clock,
    Settings,
} from "lucide-react"
import { DashboardHeader } from "@/app/components/Dashboard-header"
import { Header } from "@/app/components/Header"

export default function ProductManagement() {
    // Mock data for products with more detailed information
    const products = [
        {
            id: 1,
            name: "Canon EOS R5 Camera",
            category: "Photography",
            dailyRate: 30,
            status: "rented",
            condition: "excellent",
            currentRenter: "John Smith",
            rentedUntil: "2024-01-20",
            totalEarnings: 450,
            totalRentals: 15,
            rating: 4.8,
            image: "/vintage-camera-still-life.png",
            description: "Professional mirrorless camera with 45MP sensor",
            location: "Downtown LA",
            availability: "weekends",
        },
        {
            id: 2,
            name: "MacBook Pro 16-inch",
            category: "Electronics",
            dailyRate: 50,
            status: "available",
            condition: "good",
            currentRenter: null,
            rentedUntil: null,
            totalEarnings: 800,
            totalRentals: 16,
            rating: 4.9,
            image: "/modern-laptop-workspace.png",
            description: "High-performance laptop for creative work",
            location: "West Hollywood",
            availability: "anytime",
        },
        {
            id: 3,
            name: "Mountain Bike",
            category: "Sports",
            dailyRate: 25,
            status: "rented",
            condition: "good",
            currentRenter: "Sarah Johnson",
            rentedUntil: "2024-01-28",
            totalEarnings: 300,
            totalRentals: 12,
            rating: 4.6,
            image: "/mountain-bike-trail.png",
            description: "All-terrain mountain bike for outdoor adventures",
            location: "Santa Monica",
            availability: "weekdays",
        },
        {
            id: 4,
            name: "Professional Drone",
            category: "Photography",
            dailyRate: 40,
            status: "maintenance",
            condition: "fair",
            currentRenter: null,
            rentedUntil: null,
            totalEarnings: 600,
            totalRentals: 15,
            rating: 4.7,
            image: "/professional-drone.png",
            description: "4K camera drone for aerial photography",
            location: "Beverly Hills",
            availability: "weekends",
        },
    ]

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "available":
                return <CheckCircle className="h-4 w-4 text-green-500" />
            case "rented":
                return <Clock className="h-4 w-4 text-blue-500" />
            case "maintenance":
                return <AlertCircle className="h-4 w-4 text-orange-500" />
            default:
                return <Package className="h-4 w-4 text-gray-500" />
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "available":
                return "bg-green-100 text-green-800"
            case "rented":
                return "bg-blue-100 text-blue-800"
            case "maintenance":
                return "bg-orange-100 text-orange-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <DashboardHeader
                userType="lender"
                userName="Mike Johnson"
                userAvatar="/abstract-profile.png"
                title="Product Management"
                description="Manage your rental inventory and track performance"
            />

            <div className="container mx-auto px-4 py-8">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-xl shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Total Products</p>
                                <p className="text-2xl font-bold text-gray-900">{products.length}</p>
                            </div>
                            <Package className="h-8 w-8 text-gray-400" />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Currently Rented</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {products.filter((p) => p.status === "rented").length}
                                </p>
                            </div>
                            <Clock className="h-8 w-8 text-blue-500" />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Available</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {products.filter((p) => p.status === "available").length}
                                </p>
                            </div>
                            <CheckCircle className="h-8 w-8 text-green-500" />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Total Earnings</p>
                                <p className="text-2xl font-bold text-indigo-600">
                                    ${products.reduce((sum, p) => sum + p.totalEarnings, 0).toLocaleString()}
                                </p>
                            </div>
                            <DollarSign className="h-8 w-8 text-indigo-600" />
                        </div>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="bg-white rounded-xl shadow mb-6 p-6">
                    <div className="flex flex-col md:flex-row gap-4 text-gray-700">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div className="flex gap-2">
                            <select className="w-40 border rounded-lg px-3 py-2">
                                <option>All Categories</option>
                                <option>Electronics</option>
                                <option>Photography</option>
                                <option>Sports</option>
                            </select>
                            <select className="w-32 border rounded-lg px-3 py-2">
                                <option>All Status</option>
                                <option>Available</option>
                                <option>Rented</option>
                                <option>Maintenance</option>
                            </select>
                            <button className="flex items-center border rounded-lg px-4 py-2 hover:bg-gray-100">
                                <Filter className="h-4 w-4 mr-2" />
                                Filter
                            </button>
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 text-gray-800">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white rounded-xl shadow overflow-hidden">
                            <div className="relative">
                                <img
                                    src={product.image || "/placeholder.svg"}
                                    alt={product.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="absolute top-4 right-4">
                                    <span
                                        className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(
                                            product.status
                                        )}`}
                                    >
                                        {product.status}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h3 className="font-semibold text-gray-900 text-lg">{product.name}</h3>
                                        <p className="text-sm text-gray-500">{product.category}</p>
                                    </div>
                                    <button className="p-2 hover:bg-gray-100 rounded-full">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">Daily Rate</span>
                                        <span className="font-semibold text-indigo-600">${product.dailyRate}</span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">Condition</span>
                                        <span className="px-2 py-1 border rounded text-xs capitalize">
                                            {product.condition}
                                        </span>
                                    </div>

                                    {product.status === "rented" && product.currentRenter && (
                                        <div className="bg-blue-50 p-3 rounded-lg">
                                            <div className="flex items-center gap-2 mb-1">
                                                {getStatusIcon(product.status)}
                                                <span className="text-sm font-medium">Currently Rented</span>
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                By {product.currentRenter} until {product.rentedUntil}
                                            </p>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-2 gap-4 pt-3 border-t">
                                        <div className="text-center">
                                            <p className="text-sm text-gray-500">Total Earnings</p>
                                            <p className="font-semibold text-indigo-600">${product.totalEarnings}</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm text-gray-500">Total Rentals</p>
                                            <p className="font-semibold">{product.totalRentals}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-2">
                                        <div className="flex items-center gap-1">
                                            <span className="text-sm text-gray-500">Rating:</span>
                                            <span className="font-medium">{product.rating}/5</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="border rounded-lg p-2 hover:bg-gray-100">
                                                <TrendingUp className="h-4 w-4" />
                                            </button>
                                            <button className="border rounded-lg p-2 hover:bg-gray-100">
                                                <Edit className="h-4 w-4" />
                                            </button>
                                            <button className="border rounded-lg p-2 hover:bg-gray-100 text-red-600">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
