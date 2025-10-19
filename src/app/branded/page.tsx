"use client"

import { useMemo, useState } from "react"
import { Header } from "../components/Header"
import { AnnouncementBar } from "../components/Announcement-bar"
import { Search, Filter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

type Product = {
  id: string | number
  name: string
  category: string
  subCategory: string
  imageSrc?: string
  pricePerDay?: string
  rating?: number
  reviewsCount?: number
  location?: string
  href?: string
}

const CATEGORIES = [
  { name: "Men" },
  { name: "Women" },
  { name: "Kids" },
]

const SUBCATEGORIES: Record<string, string[]> = {
  Men: ["Suits", "Sherwanis", "Blazers", "Casual Wear"],
  Women: ["Sarees", "Gowns", "Lehengas", "Western Wear"],
  Kids: ["Party Wear", "Traditional", "Casual"],
}

const DEMO_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Navy Blue Tuxedo Suit",
    category: "Men",
    subCategory: "Suits",
    imageSrc: "/clothing/men-tuxedo.jpg",
    pricePerDay: "₹400/day",
    rating: 4.8,
    reviewsCount: 112,
    location: "Indore, MP",
    href: "/product/1",
  },
  {
    id: 2,
    name: "Beige Sherwani with Dupatta",
    category: "Men",
    subCategory: "Sherwanis",
    imageSrc: "/clothing/men-sherwani.jpg",
    pricePerDay: "₹500/day",
    rating: 4.9,
    reviewsCount: 76,
    location: "Bhopal, MP",
    href: "/product/2",
  },
  {
    id: 3,
    name: "Designer Red Lehenga",
    category: "Women",
    subCategory: "Lehengas",
    imageSrc: "/clothing/women-lehenga.jpg",
    pricePerDay: "₹650/day",
    rating: 4.9,
    reviewsCount: 201,
    location: "Mumbai, MH",
    href: "/product/3",
  },
  {
    id: 4,
    name: "Elegant Silk Saree",
    category: "Women",
    subCategory: "Sarees",
    imageSrc: "/clothing/women-saree.jpg",
    pricePerDay: "₹350/day",
    rating: 4.7,
    reviewsCount: 89,
    location: "Pune, MH",
    href: "/product/4",
  },
  {
    id: 5,
    name: "Girls’ Party Gown",
    category: "Kids",
    subCategory: "Party Wear",
    imageSrc: "/clothing/kids-gown.jpg",
    pricePerDay: "₹250/day",
    rating: 4.6,
    reviewsCount: 54,
    location: "Delhi, DL",
    href: "/product/5",
  },
  {
    id: 6,
    name: "Boys’ Kurta Set",
    category: "Kids",
    subCategory: "Traditional",
    imageSrc: "/clothing/kids-kurta.jpg",
    pricePerDay: "₹200/day",
    rating: 4.5,
    reviewsCount: 48,
    location: "Indore, MP",
    href: "/product/6",
  },
]

function SectionHeader() {
  return (
    <header className="mb-6 md:mb-8">
      <h1 className="text-2xl md:text-3xl text-gray-800 font-semibold tracking-tight">Clothing Rentals</h1>
      <p className="mt-2 text-sm md:text-base text-gray-600 max-w-prose">
        Rent premium outfits for any occasion — weddings, parties, photoshoots, or daily wear. Explore by category and style.
      </p>
    </header>
  )
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={[
        "whitespace-nowrap rounded-full px-3 py-1.5 text-sm transition-colors border",
        active ? "bg-[#3d000c] text-white border-[#3d000c]" : "bg-white hover:bg-gray-100 border-gray-300 text-gray-700",
      ].join(" ")}
    >
      {label}
    </button>
  )
}

function CategoryFilter({
  categories,
  value,
  onChange,
}: {
  categories: { name: string }[]
  value: string | "All"
  onChange: (category: string | "All") => void
}) {
  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-gray-800">Categories</h2>
      </div>
      <div className="mt-3 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          <FilterChip label="All" active={value === "All"} onClick={() => onChange("All")} />
          {categories.map((c) => (
            <FilterChip key={c.name} label={c.name} active={value === c.name} onClick={() => onChange(c.name)} />
          ))}
        </div>
      </div>
    </div>
  )
}

function SubCategoryFilter({
  subCategories,
  value,
  onChange,
}: {
  subCategories: string[]
  value: string | "All"
  onChange: (sub: string | "All") => void
}) {
  if (!subCategories?.length) return null
  return (
    <div className="mt-4">
      <h2 className="text-sm font-medium text-gray-800 mb-2">Subcategories</h2>
      <div className="flex gap-2 overflow-x-auto min-w-max">
        <FilterChip label="All" active={value === "All"} onClick={() => onChange("All")} />
        {subCategories.map((s) => (
          <FilterChip key={s} label={s} active={value === s} onClick={() => onChange(s)} />
        ))}
      </div>
    </div>
  )
}

function ProductCard({ item }: { item: Product }) {
  const src = item.imageSrc || "/placeholder.svg"
  return (
    <Link
      href={item.href || "#"}
      className="group block overflow-hidden rounded-lg border bg-white text-gray-900 hover:shadow-md transition-shadow"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <Image
          src={src}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          width={400}
          height={300}
        />
        <div className="absolute left-0 top-0 m-2 rounded bg-white/80 px-2 py-1 text-xs font-medium border text-gray-700">
          {item.category}
        </div>
      </div>
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-medium leading-5">{item.name}</h3>
          {item.pricePerDay && <span className="text-xs font-semibold text-gray-800">{item.pricePerDay}</span>}
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-gray-500">
          {typeof item.rating === "number" && <span>★ {item.rating.toFixed(1)}</span>}
          {typeof item.reviewsCount === "number" && <span>• {item.reviewsCount} reviews</span>}
          {item.location && <span>• {item.location}</span>}
        </div>
      </div>
    </Link>
  )
}

function ProductGrid({ items }: { items: Product[] }) {
  if (!items.length) {
    return (
      <div className="rounded-lg border bg-gray-100 p-8 text-center text-sm text-gray-500">
        No items found for this category.
      </div>
    )
  }
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
      {items.map((p) => (
        <ProductCard key={p.id} item={p} />
      ))}
    </div>
  )
}

export default function ClothingRentalsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | "All">("All")
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | "All">("All")

  const items = useMemo(() => {
    let filtered = DEMO_PRODUCTS
    if (selectedCategory !== "All") filtered = filtered.filter((p) => p.category === selectedCategory)
    if (selectedSubCategory !== "All") filtered = filtered.filter((p) => p.subCategory === selectedSubCategory)
    return filtered
  }, [selectedCategory, selectedSubCategory])

  const availableSubs = selectedCategory === "All" ? [] : SUBCATEGORIES[selectedCategory]

  return (
    <main className="min-h-screen bg-gray-50">
      <AnnouncementBar />
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow mb-6 p-6">
          <div className="flex flex-col md:flex-row gap-4 text-gray-700">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search outfits..."
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d000c]"
              />
            </div>
            <button className="flex items-center justify-center border rounded-lg px-4 py-2 bg-[#3d000c] text-white w-full md:w-auto">
              <Filter className="h-4 w-4 mr-2" />
              Apply Filters
            </button>
          </div>
        </div>

        <SectionHeader />
        <CategoryFilter categories={CATEGORIES} value={selectedCategory} onChange={(c) => { setSelectedCategory(c); setSelectedSubCategory("All") }} />
        <SubCategoryFilter subCategories={availableSubs} value={selectedSubCategory} onChange={setSelectedSubCategory} />
        <div className="mt-6 md:mt-8">
          <ProductGrid items={items} />
        </div>
      </div>
    </main>
  )
}
