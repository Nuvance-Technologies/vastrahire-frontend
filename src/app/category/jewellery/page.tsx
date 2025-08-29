"use client"

import { Header } from "@/app/components/Header"
import { AnnouncementBar } from "../../components/Announcement-bar"
import { ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Reusable Dropdown Component
function AnimatedDropdown({
  id,
  label,
  options,
  activeDropdown,
  setActiveDropdown,
}: {
  id: string
  label: string
  options: string[]
  activeDropdown: string | null
  setActiveDropdown: (id: string | null) => void
}) {
  const open = activeDropdown === id
  const [selected, setSelected] = useState(label)

  return (
    <div className="relative">
      <button
        onClick={() => setActiveDropdown(open ? null : id)}
        className="flex items-center justify-between w-full border px-3 py-2 text-sm text-gray-700 rounded-md bg-white shadow-sm hover:bg-gray-50 transition"
      >
        <span>{selected}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="absolute mt-1 w-full bg-white border rounded-md shadow-md z-10 overflow-hidden"
          >
            {options.map((option) => (
              <li
                key={option}
                onClick={() => {
                  setSelected(option)
                  setActiveDropdown(null)
                }}
                className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                {option}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

// Product Data
const products = [
  { id: 1, name: "Pink & Orange Embroidered Suit", image: "/ethnic1.png", discount: "55% OFF" },
  { id: 2, name: "Lime Green Kurta Set", image: "/ethnic2.png", discount: "55% OFF" },
  { id: 3, name: "Lavender Saree with Lace", image: "/ethnic3.png", discount: "55% OFF" },
  { id: 3, name: "Lavender Saree with Lace", image: "/ethnic3.png", discount: "55% OFF" },
  { id: 3, name: "Lavender Saree with Lace", image: "/ethnic3.png", discount: "55% OFF" },
  { id: 3, name: "Lavender Saree with Lace", image: "/ethnic3.png", discount: "55% OFF" },
  { id: 3, name: "Lavender Saree with Lace", image: "/ethnic3.png", discount: "55% OFF" },
  { id: 3, name: "Lavender Saree with Lace", image: "/ethnic3.png", discount: "55% OFF" },
  { id: 3, name: "Lavender Saree with Lace", image: "/ethnic3.png", discount: "55% OFF" },
  { id: 3, name: "Lavender Saree with Lace", image: "/ethnic3.png", discount: "55% OFF" },
]

export default function ClothingPage() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [sortOpen, setSortOpen] = useState(false)
  const [selectedSort, setSelectedSort] = useState("Relevance")
  const [activeCategory, setActiveCategory] = useState("JEWELLERY COLLECTION")



  return (
    <div className="min-h-screen bg-white">
      {/* Announcement */}
      <AnnouncementBar />
      <Header />


      {/* Top Navigation */}
      <div className="border-b">
        <div className="max-w-8xl mx-auto px-6 bg-[#3d000c68] flex items-center space-x-6 overflow-x-auto h-12">
           <p className="text-sm bg-gray-800 font-bold text-gray-50 py-1 px-2 rounded-xl hover:text-black"> Categories </p>
          {[
            "School bags",
            "Wedding purses",
            "Micro Bags",
            "Pouches",
            "Saddle bags",
            "Shoulder bags",
          ].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)} // 👈 update heading
              className={`text-sm font-bold py-1 px-2 rounded-xl transition ${activeCategory === cat
                  ? "text-gray-700"
                  : "text-gray-700 hover:text-black"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex">
        {/* 👇 Dynamic h1 */}
        <div className="flex justify-center">
          <h1 className="text-xl relative top-10 left-5 text-gray-800 font-bold tracking-wide">
            {activeCategory}
          </h1>
        </div>
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8 font-bold">
            <AnimatedDropdown id="cat" label="Categories" options={["Sarees", "Lehengas", "Indo Western", "Salwar Kameez"]} activeDropdown={activeDropdown} setActiveDropdown={setActiveDropdown} />
            <AnimatedDropdown id="col" label="Colour" options={["Red", "Wine", "Peach", "Cream", "Dark"]} activeDropdown={activeDropdown} setActiveDropdown={setActiveDropdown} />
            <AnimatedDropdown id="dis" label="Discount" options={["0% and above", "10% and above", "20% and above", "30% and above", "40% and above"]} activeDropdown={activeDropdown} setActiveDropdown={setActiveDropdown} />
            <AnimatedDropdown id="fab" label="Fabric" options={["Silk", "Cotton", "Linen", "Georgette", "Chiffon"]} activeDropdown={activeDropdown} setActiveDropdown={setActiveDropdown} />
            <AnimatedDropdown id="pat" label="Pattern" options={["Embroidered", "Floral", "Geometric", "Abstract"]} activeDropdown={activeDropdown} setActiveDropdown={setActiveDropdown} />
            <AnimatedDropdown id="occ" label="Occasion" options={["Festival wear", "Party wear", "Casual wear", "Formal wear", "Ethnic wear"]} activeDropdown={activeDropdown} setActiveDropdown={setActiveDropdown} />
            <AnimatedDropdown id="siz" label="Size" options={["Small", "Medium", "Large", "X-Large", "XX-Large"]} activeDropdown={activeDropdown} setActiveDropdown={setActiveDropdown} />
            <AnimatedDropdown id="pri" label="Price" options={["0-500", "500-1000", "1000-1500", "1500-2000", "2000+"]} activeDropdown={activeDropdown} setActiveDropdown={setActiveDropdown} />
          </div>

          {/* Sub Heading with Sort Dropdown */}
          <div className="flex items-center justify-between border-b pb-3 mb-6">
            <p className="text-sm text-gray-700 font-medium">
              CLOTHING | 14192 STYLES FOUND | VIEW 201
            </p>

            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center space-x-1 text-sm font-medium text-gray-700 border px-3 py-2 rounded-md shadow-sm hover:bg-gray-50 transition"
              >
                <span>Sort By: {selectedSort}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${sortOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {sortOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10 overflow-hidden"
                  >
                    {["Newest", "Price: Low to High", "Price: High to Low"].map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setSelectedSort(option)
                          setSortOpen(false)
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                      >
                        {option}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="aspect-[4/5] overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      width={400}
                      height={500}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★★★★★</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-colors">
              Load More Products
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}
