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
import Image from "next/image"
import { useEffect, useState } from "react"
import { ProductI } from "@/app/category/women/page"
import { useSession } from "next-auth/react"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

export default function ProductManagement() {
    // Mock data for products with more detailed information
    const [products, setLenderProducts] = useState<ProductI[]>([]);
    const { data: session } = useSession();
    const router = useRouter()

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

  useEffect(() => {
    if (session?.user?.id) {
      fetchProducts();
    }
  }, [session?.user?.id]);

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
                {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
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
                                    {products.filter((p) => p.availability === "active").length}
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
                                    {products.filter((p) => p.availability === "active").length}
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
                                    ${products.reduce((sum, p) => sum + p., 0).toLocaleString()}
                                </p>
                            </div>
                            <DollarSign className="h-8 w-8 text-indigo-600" />
                        </div>
                    </div>
                </div> */}

                {/* Filters and Search */}
                <div className="bg-white rounded-xl shadow mb-6 p-6">
                    <div className="flex flex-col md:flex-row gap-4 text-gray-700">
                        {/* Search bar */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Filters */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:flex gap-2 w-full md:w-auto">
                            <select className="w-full sm:w-auto border rounded-lg px-3 py-2">
                                <option>All Categories</option>
                                <option>Electronics</option>
                                <option>Photography</option>
                                <option>Sports</option>
                            </select>

                            <select className="w-full sm:w-auto border rounded-lg px-3 py-2">
                                <option>All Status</option>
                                <option>Available</option>
                                <option>Rented</option>
                                <option>Maintenance</option>
                            </select>

                            <button className="flex items-center justify-center border rounded-lg px-4 py-2 bg-[#3d000c] text-white w-full sm:w-auto">
                                <Filter className="h-4 w-4 mr-2" />
                                Filter
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 text-gray-800 p-10">
                {products.map((product) => (
                    <div key={product._id} onClick={() => router.push(`/product/${product._id}`)} className="bg-white rounded-xl shadow overflow-hidden">
                        <div className="relative">
                            <Image
                                src={product.pImages[0] || "/placeholder.svg"}
                                alt={product.pName}
                                className="w-full h-48 object-cover"
                                width={400}
                                height={300}
                            />
                            <div className="absolute top-4 right-4">
                                <span
                                    className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(
                                        product.availability
                                    )}`}
                                >
                                    {product.availability}
                                </span>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h3 className="font-semibold text-gray-900 text-lg">{product.pName}</h3>
                                    <p className="text-sm text-gray-500">{product.subcategory}</p>
                                </div>
                                <button className="p-2 hover:bg-gray-100 rounded-full">
                                    <MoreHorizontal className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">Daily Rate</span>
                                    <span className="font-semibold text-indigo-600">₹{product.pPrice}</span>
                                </div>

                                {/* <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">Condition</span>
                                    <span className="px-2 py-1 border rounded text-xs capitalize">
                                        {product.condition}
                                    </span>
                                </div> */}

                                {/* {product.status === "rented" && product.currentRenter && (
                                    <div className="bg-blue-50 p-3 rounded-lg">
                                        <div className="flex items-center gap-2 mb-1">
                                            {getStatusIcon(product.status)}
                                            <span className="text-sm font-medium">Currently Rented</span>
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            By {product.currentRenter} until {product.rentedUntil}
                                        </p>
                                    </div>
                                )} */}

                                {/* <div className="grid grid-cols-2 gap-4 pt-3 border-t">
                                    <div className="text-center">
                                        <p className="text-sm text-gray-500">Total Earnings</p>
                                        <p className="font-semibold text-indigo-600">${product.totalEarnings}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm text-gray-500">Total Rentals</p>
                                        <p className="font-semibold">{product.totalRentals}</p>
                                    </div>
                                </div> */}

                                <div className="flex items-center justify-between pt-2">
                                    {/* <div className="flex items-center gap-1">
                                        <span className="text-sm text-gray-500">Rating:</span>
                                        <span className="font-medium">{product.rating}/5</span>
                                    </div> */}
                                    <div className="flex gap-2">
                                        <button className="border rounded-lg p-2 hover:bg-gray-100">
                                            <TrendingUp className="h-4 w-4" />
                                        </button>
                                        <button className="border rounded-lg p-2 hover:bg-gray-100">
                                            <Edit className="h-4 w-4" />
                                        </button>
                                        <button onClick={() => handleDelete(product._id)} className="border rounded-lg p-2 hover:bg-gray-100 text-red-600">
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
    )
}
