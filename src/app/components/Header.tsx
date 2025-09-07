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
  const [searchOpen, setSearchOpen] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (overlayRef.current && !overlayRef.current.contains(event.target as Node)) {
        setSearchOpen(false)
      }
    }
    if (searchOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [searchOpen])

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center justify-between md:justify-center px-4 sm:px-6 lg:px-8 py-4">
        <div className="absolute left-5" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown((prev) => !prev)}
            className="px-4 py-2 md:flex hidden items-center bg-[#3d000c] text-white rounded-xl"
          >
            More
          </button>

          {showDropdown && (
            <div className="absolute md:inline hidden mt-2 w-32 bg-white text-[#3d000c] shadow-lg rounded">
              <div className="py-2 flex flex-col">
                <Link href="/policies/wear-and-care" className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Wear & Care Policy</Link>
                <Link href="/policies/faqs" className="px-4 py-2 hover:bg-gray-100 cursor-pointer">FAQs</Link>
                <Link href="/about" className="px-4 py-2 hover:bg-gray-100 cursor-pointer">About us</Link>
              </div>
            </div>
          )}
        </div>
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
                setIsOpen1(false)
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

          <div className="relative">
            <Link href="/customer/signup" className="flex items-center px-3 py-2 bg-[#3d000c] text-white rounded-md hover:bg-[#87001b] gap-1">
              <button>
                Sign Up
              </button>
            </Link>
          </div>
          <div className="relative" ref={signupRef}>
            <button
              onClick={() => {
                setIsOpen1(!isOpen1)
                setIsOpen(false)
              }}
              className="flex items-center px-3 py-2 bg-[#3d000c] text-white rounded-md hover:bg-[#87001b] gap-1"
            >
              Register
              <ChevronDown className="h-3 w-3" />
            </button>
            {isOpen1 && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50">
                <Link href="/lender/signup/shop" className="block px-4 py-2 text-gray-500 hover:bg-gray-100">Register as a Shop</Link>
                <Link href="/lender/signup/individual" className="block px-4 py-2 text-gray-500 hover:bg-gray-100">Register as an Individual Lender</Link>
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
                <Link href="/customer/signup" className="block px-4 py-2 text-gray-500 hover:bg-gray-100">Signup as a customer</Link>
                <Link href="/lender/signup" className="block px-4 py-2 text-gray-500 hover:bg-gray-100">Register as a Shop</Link>
                <Link href="/lender/signup" className="block px-4 py-2 text-gray-500 hover:bg-gray-100">Register as an Individual Lender</Link>
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

      <nav className="border-t border-gray-200">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hidden md:flex items-center justify-between h-16">
            <div className="flex space-x-6">
              <Link href="/category/women" className="text-gray-700 hover:text-[#3d000c] transition">Women</Link>
              <Link href="/category/men" className="text-gray-700 hover:text-[#3d000c] transition">Men</Link>
              <Link href="/category/kids" className="text-gray-700 hover:text-[#3d000c] transition">Kids</Link>
              <Link href="/category/shoes" className="text-gray-700 hover:text-[#3d000c] transition">Shoes</Link>
              <Link href="/category/jewellery" className="text-gray-700 hover:text-[#3d000c] transition">Jewellery</Link>
              <Link href="/category/bags" className="text-gray-700 hover:text-[#3d000c] transition">Bags</Link>
              <Link href="/category/accessories" className="text-gray-700 hover:text-[#3d000c] transition">Accessories</Link>
              <Link href="/branded" className="text-[#3d000c] font-semibold px-3 py-1 rounded-xl bg-[#ffecd1] transition">
                Explore Top Brands
              </Link>
              <Link href="/earn-through-us" className="text-gray-200 px-3 py-1 rounded-xl bg-[#3d000c] transition">
                Unlock your earning through us
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative hidden lg:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search items..."
                  className="pl-10 w-64 h-10 border rounded-md text-gray-700 border-gray-300 focus:ring-2 focus:ring-[#3d000c] focus:outline-none"
                  onFocus={() => setSearchOpen(true)}
                />
                {searchOpen && (
                  <div className="fixed top-1/4 w-full inset-0 bg-white z-[9999] flex flex-col p-6" ref={overlayRef}>
                    {/* Close button */}
                    <button
                      className="self-end p-2 text-gray-500 hover:text-gray-800"
                      onClick={() => setSearchOpen(false)}
                    >
                      <X className="h-6 w-6" />
                    </button>


                    <div className="mt-8 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6 max-w-8xl mx-auto">
                      {[
                        { name: "Gown", img: "/elegant-black-gown.png" },
                        { name: "Handbag", img: "/luxury-quilted-handbag.png" },
                        { name: "Shoes", img: "/shoes.png" },
                        { name: "Jewelry", img: "/jewelry.png" },
                        { name: "Saree", img: "/saree.png" },
                        { name: "Blazer", img: "/blazer.png" },
                        { name: "Watch", img: "/watch.png" },
                        { name: "Kids Wear", img: "/kids.png" },
                        { name: "Heels", img: "/heels.png" },
                        { name: "Accessories", img: "/accessories.png" },
                      ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center text-center">
                          <Image
                            src={item.img}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-full border shadow-sm hover:scale-105 transition"
                            width={80}
                            height={80}
                          />
                          <p className="mt-2 text-sm font-medium text-gray-700">{item.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Profile */}
              <button className="flex items-center px-3 py-2 text-gray-700 hover:text-[#3d000c] rounded-md transition">
                <User className="h-4 w-4 mr-1" />
                Profile
              </button>
              <Link href="/cart">
                <button>
                  <ShoppingCart className="text-gray-800 h-6 w-6" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="md:hidden px-4 pb-4 space-y-3">
            <div className="flex flex-col space-y-2">
              <Link href="/category/women" className="text-gray-700 hover:text-[#3d000c]">Women</Link>
              <Link href="/category/men" className="text-gray-700 hover:text-[#3d000c]">Men</Link>
              <Link href="/category/kids" className="text-gray-700 hover:text-[#3d000c]">Kids</Link>
              <Link href="/category/shoes" className="text-gray-700 hover:text-[#3d000c]">Shoes</Link>
              <Link href="/category/jewellery" className="text-gray-700 hover:text-[#3d000c]">Jewellery</Link>
              <Link href="/category/bags" className="text-gray-700 hover:text-[#3d000c]">Bags</Link>
              <Link href="/category/watches" className="text-gray-700 hover:text-[#3d000c]">Watches</Link>
              <Link href="/earn-through-us" className="text-gray-700 hover:text-[#3d000c]">Unlock Your earning through us</Link>
              <Link href="/category/branded" className="text-gray-700 hover:text-[#3d000c]">Explore top brands</Link>

              {/* More Button for mobile */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center px-3 py-2 bg-[#3d000c] text-white rounded-md hover:bg-[#87001b]"
                >
                  More
                </button>
                {showDropdown && (
                  <div className="absolute mt-2 w-32 bg-white text-[#3d000c] shadow-lg rounded">
                    <div className="py-2 flex flex-col">
                      <Link href="/policies/wear-and-care" className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Wear & Care Policy</Link>
                      <Link href="/policies/faqs" className="px-4 py-2 hover:bg-gray-100 cursor-pointer">FAQs</Link>
                      <Link href="/about" className="px-4 py-2 hover:bg-gray-100 cursor-pointer">About us</Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}


      </nav>

      {/* Search in mobile */}
      <div className="relative md:hidden">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          type="text"
          placeholder="Search..."
          className="pl-10 w-full h-10 border rounded-md text-gray-700 border-gray-300 focus:ring-2 focus:ring-[#3d000c] focus:outline-none"
          onFocus={() => setSearchOpen(true)}   // 👈 opens overlay in mobile
        />
        {searchOpen && (
          <div
            className="relative top-[26%] inset-0 bg-white z-[9999] flex flex-col p-6 overflow-y-auto"
            ref={overlayRef}
          >

            <button
              className="self-end p-2 text-gray-500 hover:text-gray-800"
              onClick={() => setSearchOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>

            {/* Circular Suggestions */}
            <div className="mt-8 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
              {[
                { name: "Gown", img: "/elegant-black-gown.png" },
                { name: "Handbag", img: "/luxury-quilted-handbag.png" },
                { name: "Shoes", img: "/shoes.png" },
                { name: "Jewelry", img: "/jewelry.png" },
                { name: "Saree", img: "/saree.png" },
                { name: "Blazer", img: "/blazer.png" },
                { name: "Watch", img: "/watch.png" },
                { name: "Kids Wear", img: "/kids.png" },
                { name: "Heels", img: "/heels.png" },
                { name: "Accessories", img: "/accessories.png" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <Image
                    src={item.img}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-full border shadow-sm hover:scale-105 transition"
                    width={80}
                    height={80}
                  />
                  <p className="mt-2 text-sm font-medium text-gray-700">{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </header>
  )
}
