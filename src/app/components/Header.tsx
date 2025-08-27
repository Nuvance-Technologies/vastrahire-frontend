'use client'
import { Search, User, ChevronDown, ShoppingCart, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpen1, setIsOpen1] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)

  // refs for dropdowns
  const loginRef = useRef<HTMLDivElement>(null)
  const signupRef = useRef<HTMLDivElement>(null)

  // click outside logic
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        loginRef.current && !loginRef.current.contains(event.target as Node) &&
        signupRef.current && !signupRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
        setIsOpen1(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center justify-between md:justify-center px-4 sm:px-6 lg:px-8 py-4">
        <Link href="/">
          <Image
            src="/vastrahire2.png"
            alt="Vastrahire Logo"
            width={150}
            height={40}
            className="object-contain"
          />
        </Link>
        <div className="md:flex hidden absolute right-5 gap-3">
          <div className="relative" ref={loginRef}>
            <button
              onClick={() => {
                setIsOpen(!isOpen)
                setIsOpen1(false) // close Sign Up if open
              }}
              className="flex items-center px-3 py-2 bg-[#3d000c] text-white rounded-md hover:bg-[#87001b] gap-1"
            >
              Login
              <ChevronDown className="h-3 w-3" />
            </button>
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50">
                <Link href="/customer/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Customer Login</Link>
                <Link href="/lender/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Lender Login</Link>
              </div>
            )}
          </div>

          <div className="relative" ref={signupRef}>
            <button
              onClick={() => {
                setIsOpen1(!isOpen1)
                setIsOpen(false) // close Login if open
              }}
              className="flex items-center px-3 py-2 bg-[#3d000c] text-white rounded-md hover:bg-[#87001b] gap-1"
            >
              Sign Up
              <ChevronDown className="h-3 w-3" />
            </button>
            {isOpen1 && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50">
                <Link href="/customer/signup" className="block px-4 py-2 text-gray-500 hover:bg-gray-100">New Customer? Sign Up</Link>
                <Link href="/lender/signup" className="block px-4 py-2 text-gray-500 hover:bg-gray-100">Become a Lender</Link>
              </div>
            )}
          </div>
        </div>
        <div className="flex">
          <div className="relative md:hidden ">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center px-3 py-2 bg-[#3d000c] text-white rounded-md hover:bg-[#87001b]"
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

          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="md:hidden p-2 text-gray-700"
          >
            {mobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="border-t border-gray-200">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hidden md:flex items-center justify-between h-16">
            <div className="flex space-x-6">
              <a href="/category/women" className="text-gray-700 hover:text-[#3d000c] transition">Women</a>
              <a href="/category/men" className="text-gray-700 hover:text-[#3d000c] transition">Men</a>
              <a href="/category/kids" className="text-gray-700 hover:text-[#3d000c] transition">Kids</a>
              <a href="/category/shoes" className="text-gray-700 hover:text-[#3d000c] transition">Shoes</a>
              <a href="/category/jewellery" className="text-gray-700 hover:text-[#3d000c] transition">Jewellery</a>
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

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="md:hidden px-4 pb-4 space-y-3">
            <div className="flex flex-col space-y-2">
              <a href="/category/women" className="text-gray-700 hover:text-[#3d000c]">Women</a>
              <a href="/category/men" className="text-gray-700 hover:text-[#3d000c]">Men</a>
              <a href="/category/kids" className="text-gray-700 hover:text-[#3d000c]">Kids</a>
              <a href="/category/shoes" className="text-gray-700 hover:text-[#3d000c]">Shoes</a>
              <a href="/category/jewellery" className="text-gray-700 hover:text-[#3d000c]">Jewellery</a>
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
