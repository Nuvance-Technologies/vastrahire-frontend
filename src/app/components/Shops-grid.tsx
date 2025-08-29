"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import Image from "next/image"

const shops = [
  { id: 1, name: "Batra's Brother", image: "/luxury-boutique-storefront.png", items: 156, rating: 4.9, category: "Cloths" },
  { id: 2, name: "Ramesh Collection", image: "/modern-urban-fashion-store.png", items: 89, rating: 4.7, category: "Men" },
  { id: 3, name: "Vintage Treasures", image: "/vintage-clothing-store.png", items: 234, rating: 4.8, category: "Cloths" },
  { id: 4, name: "Vijay Cutpiece", image: "/elegant-formal-wear.png", items: 67, rating: 4.9, category: "Kids" },
  { id: 5, name: "Accessory Haven", image: "/placeholder.png", items: 312, rating: 4.6, category: "Bags" },
  { id: 6, name: "Eco Fashion", image: "/sustainable-eco-fashion.png", items: 98, rating: 4.8, category: "Shoes" },
]

const categories = ["All", "Cloths", "Bags", "Shoes", "Men", "Kids"]

export function ShopsGrid() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredShops =
    activeCategory === "All"
      ? shops
      : shops.filter((shop) => shop.category === activeCategory)

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Shops</h2>
            <p className="text-gray-600 text-lg">
              Discover curated collections from our top-rated partners
            </p>
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition">
            See All Shops
          </button>
        </div>

        {/* Category Filter Bar */}
        <div className="flex space-x-4 overflow-x-auto pb-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
                activeCategory === cat
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Shops Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredShops.map((shop) => (
            <div
              key={shop.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-200"
            >
              <div className="relative">
                <Image
                  src={shop.image || "/placeholder.svg"}
                  alt={shop.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                  width={100}
                  height={100}
                />
                <span className="absolute top-3 left-3 bg-white/90 text-gray-800 text-sm px-2 py-1 rounded">
                  {shop.category}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">{shop.name}</h3>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>{shop.items} items</span>
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    {shop.rating}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
