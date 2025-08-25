import { Search, User, ChevronDown, ShoppingCart, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Logo + Mobile Toggle */}
      <div className="flex items-center md:justify-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        <Link href="/">
          <Image
            src="/vastrahire2.png"
            alt="Vastrahire Logo"
            width={150}
            height={40}
            className="object-contain"
          />
        </Link>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="md:hidden p-2 text-gray-700"
        >
          {mobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="border-t border-gray-200">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hidden md:flex items-center justify-between h-16">
            {/* Categories */}
            <div className="flex space-x-6">
              <a href="#" className="text-gray-700 hover:text-[#3d000c] transition">Women</a>
              <a href="#" className="text-gray-700 hover:text-[#3d000c] transition">Men</a>
              <a href="#" className="text-gray-700 hover:text-[#3d000c] transition">Kids</a>
              <a href="#" className="text-gray-700 hover:text-[#3d000c] transition">Shoes</a>
              <a href="#" className="text-gray-700 hover:text-[#3d000c] transition">Jewellery</a>
              <a href="#" className="text-gray-200 px-3 py-1 rounded-xl bg-[#3d000c] hover:text-[#9f0020] transition">
                Unlock your earning
              </a>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              {/* Search */}
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

              {/* Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center px-3 py-2 bg-[#3d000c] text-white rounded-md hover:bg-[#87001b] transition gap-1"
                >
                  Login
                  <ChevronDown className="h-3 w-3" />
                </button>

                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50">
                    <Link href="/customer/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Customer Login</Link>
                    <Link href="/lender/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Lender Login</Link>
                    <div className="border-t border-gray-200 my-1"></div>
                    <Link href="/customer/signup" className="block px-4 py-2 text-gray-500 hover:bg-gray-100">New Customer? Sign Up</Link>
                    <Link href="/lender/signup" className="block px-4 py-2 text-gray-500 hover:bg-gray-100">Become a Lender</Link>
                  </div>
                )}
              </div>

              <button>
                <ShoppingCart className="text-gray-800 h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="md:hidden px-4 pb-4 space-y-3">
            <div className="flex flex-col space-y-2">
              <a href="#" className="text-gray-700 hover:text-[#3d000c]">Women</a>
              <a href="#" className="text-gray-700 hover:text-[#3d000c]">Men</a>
              <a href="#" className="text-gray-700 hover:text-[#3d000c]">Kids</a>
              <a href="#" className="text-gray-700 hover:text-[#3d000c]">Shoes</a>
              <a href="#" className="text-gray-700 hover:text-[#3d000c]">Jewellery</a>
              <a href="#" className="text-gray-200 px-3 py-2 rounded-xl bg-[#3d000c] hover:text-[#9f0020]">Unlock your earning</a>
            </div>

            {/* Search in mobile */}
            <div className="relative mt-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 w-full h-10 border rounded-md text-gray-700 border-gray-300 focus:ring-2 focus:ring-[#3d000c] focus:outline-none"
              />
            </div>
          </div>
        )}
      </nav>

      {/* Announcement Bar */}
      <div className="bg-[#3d000c59] border-t border-gray-200 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap py-2 flex">
          <span className="text-sm font-medium text-gray-700 mx-8">🎉 50% OFF on Designer Dresses - Limited Time!</span>
          <span className="text-sm font-medium text-gray-700 mx-8">✨ New Arrivals: Premium Jewelry Collection</span>
          <span className="text-sm font-medium text-gray-700 mx-8">👗 Rent 3 Items, Get 1 FREE - Use Code: RENT3GET1</span>
          <span className="text-sm font-medium text-gray-700 mx-8">🚚 Free Delivery on Orders Above $100</span>
          <span className="text-sm font-medium text-gray-700 mx-8">💎 Exclusive: Luxury Handbags Now Available</span>
        </div>
      </div>
    </header>
  )
}
