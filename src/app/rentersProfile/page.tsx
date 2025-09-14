"use client"

import React, { useMemo, useState, useEffect } from "react"
import { MapPin, Crown, Gem, Search } from "lucide-react"
import { Header } from "../components/Header"
import Image from "next/image"
import { motion } from "framer-motion"

type Product = {
  id: number
  image: string
  name: string
  dailyRate: number
  details: string
  category: string
  rentedCount?: number
  qualityScore?: number
  createdAt?: string
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    image: "/vintage-camera-still-life.png",
    name: "Canon EOS R6",
    dailyRate: 30,
    details: "24MP, 4K60, RF 24-105mm",
    category: "Photography",
    rentedCount: 120,
    qualityScore: 4.7,
    createdAt: "2024-08-01",
  },
  {
    id: 2,
    image: "/modern-laptop-workspace.png",
    name: "MacBook Pro 16”",
    dailyRate: 55,
    details: "M2 Pro, 16GB, 512GB",
    category: "Electronics",
    rentedCount: 200,
    qualityScore: 4.9,
    createdAt: "2024-09-15",
  },
  {
    id: 3,
    image: "/mountain-bike-trail.png",
    name: "Trek Fuel EX",
    dailyRate: 22,
    details: "Full-suspension, size M",
    category: "Sports",
    rentedCount: 85,
    qualityScore: 4.4,
    createdAt: "2024-07-10",
  },
  {
    id: 4,
    image: "/dji-mavic-3-drone.png",
    name: "DJI Mavic 3",
    dailyRate: 45,
    details: "4/3 CMOS, 46min flight",
    category: "Drones",
    rentedCount: 150,
    qualityScore: 4.8,
    createdAt: "2024-08-20",
  },
  {
    id: 5,
    image: "/gopro-hero-12.png",
    name: "GoPro Hero 12",
    dailyRate: 18,
    details: "5.3K60, HyperSmooth 6.0",
    category: "Action Cams",
    rentedCount: 60,
    qualityScore: 4.5,
    createdAt: "2024-09-25",
  },
  {
    id: 6,
    image: "/sony-a7-iv-lens.png",
    name: "Sony A7 IV + 24-70",
    dailyRate: 38,
    details: "33MP, 10-bit 4:2:2",
    category: "Photography",
    rentedCount: 95,
    qualityScore: 4.6,
    createdAt: "2024-08-30",
  },
]

// Mocked lender stats (replace with API later)
const MOCK_STATS = {
  rentalsCompleted: 20,
  totalValue: 180000,
}

type Tier = "Golden" | "Platinum" | "Diamond" | null

function getLenderTier(): Tier {
  const { rentalsCompleted, totalValue } = MOCK_STATS
  if (rentalsCompleted >= 30 && totalValue >= 300000) return "Diamond"
  if (rentalsCompleted >= 15 && totalValue >= 150000) return "Platinum"
  if (rentalsCompleted >= 5 && totalValue >= 50000) return "Golden"
  return null
}

const TIER_STYLES: Record<
  Exclude<Tier, null>,
  { label: string; color: string; gradient: string; icon: React.JSX.Element }
> = {
  Golden: {
    label: "Golden Lender",
    color: "text-yellow-800",
    gradient: "bg-gradient-to-r from-yellow-300 to-yellow-500",
    icon: <Crown className="w-4 h-4 text-yellow-800" />,
  },
  Platinum: {
    label: "Platinum Lender",
    color: "text-gray-700",
    gradient: "bg-gradient-to-r from-gray-200 to-gray-400",
    icon: <Crown className="w-4 h-4 text-gray-600" />,
  },
  Diamond: {
    label: "Diamond Lender",
    color: "text-sky-800",
    gradient: "bg-gradient-to-r from-sky-200 to-sky-400",
    icon: <Gem className="w-4 h-4 text-sky-700" />,
  },
}

const DEFAULT_TIER_STYLE = {
  label: "",
  color: "",
  gradient: "",
  icon: <></>,
}

export default function LenderProfilePage() {
  const [showCategories, setShowCategories] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const [profile] = useState({
    name: "Lens & Gear Rentals",
    location: "Los Angeles, CA",
    description:
      "Trusted community shop offering cameras, lenses, drones and pro accessories. Flexible pickup and responsive support.",
    photo: "/abstract-profile.png",
  })

  const [filterOpen, setFilterOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string>("All")
  const [sortOption, setSortOption] = useState<string>("Default")

  const categories = useMemo(() => {
    const set = new Set(MOCK_PRODUCTS.map((p) => p.category))
    return ["All", ...Array.from(set)]
  }, [])

  const sortedAndFiltered = useMemo(() => {
    let list = [...MOCK_PRODUCTS]

    if (activeCategory !== "All") {
      list = list.filter((p) => p.category === activeCategory)
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.details.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
    }

    switch (sortOption) {
      case "Highly Rented":
        return list.sort((a, b) => (b.rentedCount ?? 0) - (a.rentedCount ?? 0))
      case "Cheapest":
        return list.sort((a, b) => a.dailyRate - b.dailyRate)
      case "Best Quality":
        return list.sort(
          (a, b) => (b.qualityScore ?? 0) - (a.qualityScore ?? 0)
        )
      case "New Arrivals":
        return list.sort(
          (a, b) =>
            new Date(b.createdAt ?? "").getTime() -
            new Date(a.createdAt ?? "").getTime()
        )
      default:
        return list
    }
  }, [activeCategory, sortOption, searchQuery])

  useEffect(() => {
    document.body.style.overflow = filterOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [filterOpen])

  const tier = getLenderTier()
  const tierStyle = tier ? TIER_STYLES[tier] : DEFAULT_TIER_STYLE

  return (
    <main className="min-h-screen bg-slate-50">
      <Header />

      {/* Profile Section */}
      <section className="container mx-auto px-4 pt-8">
        <div className="grid grid-cols-2 md:grid-cols-3 items-center gap-6">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
                {profile.name}
              </h1>
            </div>

            <div className="mt-2 flex items-center gap-2 text-slate-600">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              <span className="text-sm sm:text-base">{profile.location}</span>
            </div>
          </div>

          <div className="flex md:justify-end">
            <Image
              src={profile.photo}
              alt="Lender profile"
              className="h-32 w-32 sm:h-40 sm:w-40 rounded-xl object-cover shadow-sm ring-1 ring-slate-200"
              width={160}
              height={160}
            />
          </div>
        </div>
      </section>

      {/* 🔍 Desktop Search Bar */}
      <section className="container mx-auto px-4 mt-6 hidden md:block">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3d000c] focus:border-[#3d000c]"
          />
        </div>
      </section>

      {/* Sorting + Categories */}
      <section className="container mx-auto px-4">
        {/* sorting buttons (keep same) */}
        <div className="flex items-center gap-3 mt-4 overflow-x-auto no-scrollbar pb-4">
          {["Highly Rented", "Cheapest", "Best Quality", "New Arrivals"].map(
            (option) => {
              const active = sortOption === option
              return (
                <button
                  key={option}
                  onClick={() => setSortOption(option)}
                  className={[
                    "px-3 py-1.5 rounded-xl text-sm whitespace-nowrap border transition-colors font-bold ",
                    active
                      ? "bg-[#ffecd1] text-[#3d000c] border-[#3d000c]"
                      : "bg-white text-slate-700 border-slate-200 hover:border-slate-300",
                  ].join(" ")}
                >
                  {option}
                </button>
              )
            }
          )}
        </div>

        {/* desktop categories */}
        <div className="md:flex hidden items-center gap-3 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat) => {
            const active = activeCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={[
                  "px-3 py-1.5 rounded-full text-sm whitespace-nowrap border transition-colors",
                  active
                    ? "bg-[#3d000c] text-white border-[#3d000c]"
                    : "bg-white text-slate-700 border-slate-200 hover:border-slate-300",
                ].join(" ")}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </section>

      {/* Products */}
      <section className="container mx-auto px-4 mt-6 pb-28 md:pb-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {sortedAndFiltered.map((p) => (
            <article
              key={p.id}
              className="group rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-t-xl relative">
                <Image
                  src={p.image}
                  alt={p.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  width={400}
                  height={300}
                />
              </div>
              <div className="p-3 sm:p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm sm:text-base font-semibold text-slate-900">
                    {p.name}
                  </h3>
                  <span className="text-[#3d000c] font-semibold text-sm">
                    ${p.dailyRate}/day
                  </span>
                </div>
                <p className="mt-1 text-xs sm:text-sm text-slate-600">
                  {p.details}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-slate-100 text-slate-700">
                    {p.category}
                  </span>
                  <button className="text-sm text-[#3d000c] font-medium">
                    View
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 📱 Mobile Bottom Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-transparent shadow-md md:hidden z-50">
        <div className="flex justify-center items-center gap-4 py-2">
          <button
            onClick={() => setShowCategories(true)}
            className="px-6 py-2 bg-[#3d000c] text-white rounded-full font-medium shadow-md"
          >
            Categories
          </button>

          <button
            onClick={() => setShowSearch(true)}
            className="p-3 bg-white rounded-full shadow-md border"
          >
            <Search className="h-5 w-5 text-[#3d000c]" />
          </button>
        </div>
      </div>

      {/* 📱 Mobile Category Popup */}
      {showCategories && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-end z-50 md:hidden">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.3 }}
            className="bg-white w-full max-h-[60vh] rounded-t-2xl p-4 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-neutral-900">
                Categories
              </h2>
              <button
                onClick={() => setShowCategories(false)}
                className="text-slate-600 hover:text-slate-900"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {categories.map((cat) => {
                const active = activeCategory === cat
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat)
                      setShowCategories(false)
                    }}
                    className={[
                      "px-3 py-2 rounded-lg border text-sm font-medium transition-colors",
                      active
                        ? "bg-[#3d000c] text-white border-[#3d000c]"
                        : "bg-white text-slate-700 border-slate-200 hover:border-slate-300",
                    ].join(" ")}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>
          </motion.div>
        </div>
      )}

      {/* 📱 Mobile Search Popup */}
      {showSearch && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-end z-50 md:hidden">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.3 }}
            className="bg-white w-full rounded-t-2xl p-4"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold text-neutral-900">Search</h2>
              <button
                onClick={() => setShowSearch(false)}
                className="text-slate-600 hover:text-slate-900"
              >
                ✕
              </button>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3d000c] focus:border-[#3d000c]"
              />
            </div>
          </motion.div>
        </div>
      )}
    </main>
  )
}
