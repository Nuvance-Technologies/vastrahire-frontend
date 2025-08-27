import { AnnouncementBar } from "../../components/Announcement-bar"
import { Search, User, ShoppingCart} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const shoesProducts = [
  {
    id: 19,
    name: "Designer Heels",
    price: "$30/day",
    image: "/placeholder.svg?height=300&width=250",
    brand: "Christian Louboutin",
    rating: 4.9,
    reviews: 145,
  },
  {
    id: 20,
    name: "Formal Oxford Shoes",
    price: "$25/day",
    image: "/placeholder.svg?height=300&width=250",
    brand: "Cole Haan",
    rating: 4.7,
    reviews: 98,
  },
  {
    id: 21,
    name: "Wedding Pumps",
    price: "$35/day",
    image: "/placeholder.svg?height=300&width=250",
    brand: "Jimmy Choo",
    rating: 4.8,
    reviews: 76,
  },
  {
    id: 22,
    name: "Casual Sneakers",
    price: "$15/day",
    image: "/placeholder.svg?height=300&width=250",
    brand: "Adidas",
    rating: 4.6,
    reviews: 234,
  },
  {
    id: 23,
    name: "Ankle Boots",
    price: "$28/day",
    image: "/placeholder.svg?height=300&width=250",
    brand: "Dr. Martens",
    rating: 4.7,
    reviews: 156,
  },
  {
    id: 24,
    name: "Evening Sandals",
    price: "$32/day",
    image: "/placeholder.svg?height=300&width=250",
    brand: "Stuart Weitzman",
    rating: 4.8,
    reviews: 89,
  },
]

export default function ShoesCategoryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AnnouncementBar />
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hidden md:flex items-center justify-between h-16">
          <div className="flex space-x-6">
            <a href="/category/women" className="text-gray-700 hover:text-[#3d000c] transition">Wedding shoes</a>
            <a href="/category/men" className="text-gray-700 hover:text-[#3d000c] transition">Formal shoes</a>
            <a href="/category/kids" className="text-gray-700 hover:text-[#3d000c] transition">Casual Shoes</a>
            <a href="/category/shoes" className="text-gray-700 hover:text-[#3d000c] transition">Sports</a>
            <a href="#" className="text-gray-200 px-3 py-1 rounded-xl bg-[#3d000c] hover:text-[#9f0020] transition">
              Unlock your earning
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search items..."
                className="pl-10 w-64 h-10 border rounded-md text-gray-700 border-gray-300 focus:ring-2 focus:ring-[#3d000c] focus:outline-none"
              />
            </div>

            {/* Profile */}
            <button className="flex items-center px-3 py-2 text-gray-700 hover:text-[#3d000c] rounded-md transition">
              <User className="h-4 w-4 mr-1" />
              Profile
            </button>

            <button>
              <ShoppingCart className="text-gray-800 h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shoes Collection</h1>
          <p className="text-gray-600">
            Step out in style with designer heels, formal shoes, and trendy footwear
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
          <select className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800">
            <option>All Sizes</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800">
            <option>Price Range</option>
            <option>$10-20/day</option>
            <option>$20-30/day</option>
            <option>$30-40/day</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800">
            <option>All Brands</option>
            <option>Christian Louboutin</option>
            <option>Jimmy Choo</option>
            <option>Cole Haan</option>
            <option>Dr. Martens</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800">
            <option>Sort By</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Most Popular</option>
            <option>Newest</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {shoesProducts.map((product) => (
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
                  <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-indigo-600">{product.price}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm text-gray-600">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            Load More Products
          </button>
        </div>
      </main>
    </div>
  )
}
