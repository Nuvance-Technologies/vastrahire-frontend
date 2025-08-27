import { AnnouncementBar } from "../../components/Announcement-bar"
import { Search, User, ShoppingCart} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const kidsProducts = [
  {
    id: 13,
    name: "Princess Party Dress",
    price: "$15/day",
    image: "/princess-party-dress-pink-sparkly.png",
    brand: "Disney",
    rating: 4.9,
    reviews: 156,
  },
  {
    id: 14,
    name: "Little Gentleman Suit",
    price: "$20/day",
    image: "/little-boy-suit-navy-blue-formal.png",
    brand: "Ralph Lauren Kids",
    rating: 4.8,
    reviews: 89,
  },
  {
    id: 15,
    name: "Flower Girl Dress",
    price: "$18/day",
    image: "/flower-girl-dress-white-with-flowers.png",
    brand: "Bonpoint",
    rating: 4.7,
    reviews: 124,
  },
  {
    id: 16,
    name: "Birthday Outfit Set",
    price: "$12/day",
    image: "/kids-birthday-outfit-colorful.png",
    brand: "Gap Kids",
    rating: 4.6,
    reviews: 98,
  },
  {
    id: 17,
    name: "School Uniform",
    price: "$10/day",
    image: "/placeholder.svg?height=300&width=250",
    brand: "Lands' End",
    rating: 4.5,
    reviews: 67,
  },
  {
    id: 18,
    name: "Halloween Costume",
    price: "$25/day",
    image: "/placeholder.svg?height=300&width=250",
    brand: "Costume SuperCenter",
    rating: 4.8,
    reviews: 203,
  },
]

export default function KidsCategoryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AnnouncementBar />
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hidden md:flex items-center justify-between h-16">
          <div className="flex space-x-6">
            <a href="/category/women" className="text-gray-700 hover:text-[#3d000c] transition">New borns</a>
            <a href="/category/men" className="text-gray-700 hover:text-[#3d000c] transition">Sweaters</a>
            <a href="/category/kids" className="text-gray-700 hover:text-[#3d000c] transition">Shirts</a>
            <a href="/category/shoes" className="text-gray-700 hover:text-[#3d000c] transition">Pants</a>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Kids Collection</h1>
          <p className="text-gray-600">
            Adorable outfits for special occasions, parties, and everyday adventures
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 p-4 bg-white rounded-lg border border-gray-200">
          <select className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800">
            <option>All Ages</option>
            <option>0-2 years</option>
            <option>3-5 years</option>
            <option>6-8 years</option>
            <option>9-12 years</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800">
            <option>Price Range</option>
            <option>$8-15/day</option>
            <option>$15-25/day</option>
            <option>$25+/day</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800">
            <option>All Brands</option>
            <option>Disney</option>
            <option>Ralph Lauren Kids</option>
            <option>Gap Kids</option>
            <option>Bonpoint</option>
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
          {kidsProducts.map((product) => (
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
                  <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-indigo-600">{product.price}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm text-gray-500">
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
