import { AnnouncementBar } from "../../components/Announcement-bar"
import { Search, User, ShoppingCart} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const menProducts = [
  {
    id: 7,
    name: "Classic Tuxedo",
    price: "$55/day",
    image: "/classic-black-tuxedo-formal-wear.png",
    brand: "Armani",
    rating: 4.9,
    reviews: 87,
  },
  {
    id: 8,
    name: "Business Suit",
    price: "$40/day",
    image: "/business-suit-navy-blue.png",
    brand: "Hugo Boss",
    rating: 4.7,
    reviews: 134,
  },
  {
    id: 9,
    name: "Casual Blazer",
    price: "$25/day",
    image: "/casual-blazer-brown-tweed.png",
    brand: "Zara",
    rating: 4.5,
    reviews: 98,
  },
  {
    id: 10,
    name: "Wedding Suit",
    price: "$65/day",
    image: "/wedding-suit-light-gray.png",
    brand: "Tom Ford",
    rating: 5.0,
    reviews: 56,
  },
  {
    id: 11,
    name: "Casual Shirt Set",
    price: "$18/day",
    image: "/casual-shirt-and-pants-set.png",
    brand: "Ralph Lauren",
    rating: 4.6,
    reviews: 112,
  },
  {
    id: 12,
    name: "Designer Jacket",
    price: "$35/day",
    image: "/designer-leather-jacket-black.png",
    brand: "Versace",
    rating: 4.8,
    reviews: 73,
  },
]

export default function MenCategoryPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <AnnouncementBar />
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hidden md:flex items-center justify-between h-16">
          <div className="flex space-x-6">
            <a href="/category/women" className="text-gray-700 hover:text-[#3d000c] transition">Suits</a>
            <a href="/category/men" className="text-gray-700 hover:text-[#3d000c] transition">Sherwanis</a>
            <a href="/category/kids" className="text-gray-700 hover:text-[#3d000c] transition">Kurtas</a>
            <a href="/category/shoes" className="text-gray-700 hover:text-[#3d000c] transition">Blazers</a>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Men's Collection</h1>
          <p className="text-gray-600">
            Sharp suits, casual wear, and designer pieces for the modern gentleman
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
          <select className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-900">
            <option>All Sizes</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
            <option>XXL</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-900">
            <option>Price Range</option>
            <option>$15-35/day</option>
            <option>$35-55/day</option>
            <option>$55-80/day</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-900">
            <option>All Brands</option>
            <option>Armani</option>
            <option>Hugo Boss</option>
            <option>Tom Ford</option>
            <option>Ralph Lauren</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-900">
            <option>Sort By</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Most Popular</option>
            <option>Newest</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {menProducts.map((product) => (
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
