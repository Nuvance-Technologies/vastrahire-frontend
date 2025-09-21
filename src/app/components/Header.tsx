"use client";
import axios from "axios";
import { Search, User, ChevronDown, ShoppingCart, Menu, X, Heart } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { ProductI } from "../category/women/page";

export function Header() {
  const [allProducts, setAllProducts] = useState<ProductI[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts: ProductI[] = searchQuery.trim()
    ? allProducts.filter(
      (p: ProductI) =>
        p.pName && p.pName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : allProducts;

  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoadingProducts(true);
      try {
        const response = await axios.get("/api/product/allProducts");
        setAllProducts(response.data.products || []);
      } catch (error) {
        console.error("Error fetching all products:", error);
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchAllProducts();
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);


  const loginRef = useRef<HTMLDivElement>(null);
  const signupRef = useRef<HTMLDivElement>(null);

  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Element;
      // Don't close if clicking on a link or button inside the dropdown
      if (target.className.includes("drop-down")) {
        return;
      }

      // Check if click is outside both login and signup elements
      const isOutsideLogin =
        loginRef.current && !loginRef.current.contains(target);
      const isOutsideSignup =
        signupRef.current && !signupRef.current.contains(target);

      // Only close if click is outside both elements
      if (isOutsideLogin && isOutsideSignup) {
        setIsOpen(false);
        setIsOpen1(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const [searchOpen, setSearchOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!overlayRef.current) return;

      const target = event.target as Node;

      // ✅ If click is inside overlay → do nothing
      if (overlayRef.current.contains(target)) {
        return;
      }

      // ✅ Otherwise close
      setSearchOpen(false);
    }

    // if (searchOpen) {
    //   // use capture phase so this runs before other handlers
    //   document.addEventListener("click", handleClickOutside, true);
    // }

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [searchOpen]);


  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
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
                <Link
                  href="/policies/wear-and-care"
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Wear & Care Policy
                </Link>
                <Link
                  href="/policies/faqs"
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  FAQs
                </Link>
                <Link
                  href="/about"
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  About us
                </Link>
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
        {session?.user ? (
          <div className="md:flex hidden absolute right-5 gap-3">
            <button
              onClick={() => {
                const conf = confirm("Are you sure you want to logout?");
                if (conf) {
                  signOut({ callbackUrl: "/" });
                }
              }}
              className="flex items-center px-3 py-2 bg-[#3d000c] text-white rounded-md hover:bg-[#87001b] gap-1"
            >
              Logout
              <ChevronDown className="h-3 w-3" />
            </button>
            <button
              onClick={() => {
                if (session?.user?.role === "customer") {
                  router.push("/customer/dashboard");
                } else if (
                  session?.user?.role === "business" ||
                  session?.user?.role === "individual"
                ) {
                  router.push("/lender/dashboard");
                }
              }}
              className="flex items-center px-3 py-2 bg-[#3d000c] text-white rounded-md hover:bg-[#87001b] gap-1"
            >
              Go to Dashboard
            </button>
          </div>
        ) : (
          <div className="md:flex hidden absolute right-5 gap-3">
            <div className="relative" ref={loginRef}>
              <button
                onClick={() => {
                  router.push("/login");
                }}
                className="flex items-center px-3 py-2 bg-[#3d000c] text-white rounded-md hover:bg-[#87001b] gap-1"
              >
                Login
              </button>
            </div>

            <div className="relative">
              <Link
                href="/customer/signup"
                className="flex items-center px-3 py-2 bg-[#3d000c] text-white rounded-md hover:bg-[#87001b] gap-1"
              >
                <button>Sign Up</button>
              </Link>
            </div>
            <div className="relative" ref={signupRef}>
              <button
                onClick={() => {
                  setIsOpen1(!isOpen1);
                  setIsOpen(false);
                }}
                className="flex items-center px-3 py-2 bg-[#3d000c] text-white rounded-md hover:bg-[#87001b] gap-1"
              >
                Register
                <ChevronDown className="h-3 w-3" />
              </button>
              {isOpen1 && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50">
                  <Link
                    href="/lender/signup/shop"
                    className="block px-4 py-2 text-gray-500 hover:bg-gray-100"
                  >
                    Register as a Shop
                  </Link>
                  <Link
                    href="/lender/signup/individual"
                    className="block px-4 py-2 text-gray-500 hover:bg-gray-100"
                  >
                    Register as an Individual Lender
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
        <div className="flex md:hidden">
          {/* ✅ Mobile Auth Menu */}
          <div className="relative">
            {session?.user ? (
              <>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center px-3 py-2 bg-[#3d000c] text-white rounded-md hover:bg-[#87001b]"
                >
                  Account
                  <ChevronDown className="h-3 w-3" />
                </button>

                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50">
                    <button
                      onClick={() => {
                        const conf = confirm(
                          "Are you sure you want to logout?"
                        );
                        if (conf) {
                          signOut({ callbackUrl: "/" });
                        }
                      }}
                      className="drop-down block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>

                    <div className="border-t border-gray-200 my-1"></div>

                    <button
                      onClick={() => {
                        if (session?.user?.role === "customer") {
                          router.push("/customer/dashboard");
                        } else if (
                          session?.user?.role === "business" ||
                          session?.user?.role === "individual"
                        ) {
                          router.push("/lender/dashboard");
                        }
                      }}
                      className="drop-down block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Go to Dashboard
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center px-3 py-2 font-bold bg-[#3d000c] text-white rounded-md hover:bg-[#87001b]"
                >
                  Login / Register
                  <ChevronDown className="h-3 w-3" />
                </button>

                {isOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50">
                    <Link
                      href="/login"
                      className="drop-down block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Login
                    </Link>
                    <div className="border-t border-gray-200 my-1"></div>
                    <Link
                      href="/customer/signup"
                      className="drop-down block px-4 py-2 text-gray-500 hover:bg-gray-100"
                    >
                      Signup as a Customer
                    </Link>
                    <Link
                      href="/lender/signup/shop"
                      className="drop-down block px-4 py-2 text-gray-500 hover:bg-gray-100"
                    >
                      Register as a Shop
                    </Link>
                    <Link
                      href="/lender/signup/individual"
                      className="drop-down block px-4 py-2 text-gray-500 hover:bg-gray-100"
                    >
                      Register as an Individual Lender
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>

          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="md:hidden p-2 text-gray-700"
          >
            {mobileMenu ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      <nav className="border-t border-gray-200">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hidden md:flex items-center justify-between h-16">
            <div className="flex space-x-6">
              <Link
                href="/category/women"
                className="text-gray-700 hover:text-[#3d000c] transition"
              >
                Women
              </Link>
              <Link
                href="/category/men"
                className="text-gray-700 hover:text-[#3d000c] transition"
              >
                Men
              </Link>
              <Link
                href="/category/kids"
                className="text-gray-700 hover:text-[#3d000c] transition"
              >
                Kids
              </Link>
              <Link
                href="/branded"
                className="text-[#3d000c] font-bold px-3 py-1 rounded-xl bg-[#faeed1] transition"
              >
                Explore branded collections
              </Link>
              <Link
                href="/earn-through-us"
                className="text-gray-200 px-3 py-1 rounded-xl bg-[#3d000c] transition"
              >
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchOpen(true)}
                />
                {searchOpen && (
                  <div
                    className="fixed top-1/4 w-full inset-0 bg-white z-[9999] flex flex-col p-6"
                    ref={overlayRef}
                  >
                    {/* Close button */}
                    <button
                      className="self-end p-2 text-gray-500 hover:text-gray-800"
                      onClick={() => setSearchOpen(false)}
                    >
                      <X className="h-6 w-6" />
                    </button>

                    <div className="mt-8 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6 max-w-8xl mx-auto">
                      {filteredProducts.map((item, i) => (
                        <div
                          key={item._id ?? i}
                          className="flex flex-col items-center text-center cursor-pointer"
                          onClick={() => {
                            console.log("hello");
                            router.push(`/product/${item._id}`);
                          }}
                        >
                          <Image
                            src={item.pImages[0] || "/placeholder.svg"}
                            alt={item.pName}
                            className="w-20 h-20 object-cover rounded-full border shadow-sm hover:scale-105 transition"
                            width={80}
                            height={80}
                          />
                          <p className="mt-2 text-sm font-medium text-gray-700">
                            {item.pName}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <Link href="/cart">
                <button>
                  <ShoppingCart className="text-gray-800 h-6 w-6" />
                </button>
              </Link>
              <Link href="/wishlist">
                <button>
                  <Heart className="text-gray-800 h-6 w-6" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="md:hidden px-4 pb-4 space-y-3">
            <div className="flex flex-col space-y-2">
              <Link
                href="/category/women"
                className="text-gray-700 hover:text-[#3d000c]"
              >
                Women
              </Link>
              <Link
                href="/category/men"
                className="text-gray-700 hover:text-[#3d000c]"
              >
                Men
              </Link>
              <Link
                href="/category/kids"
                className="text-gray-700 hover:text-[#3d000c]"
              >
                Kids
              </Link>
              <Link
                href="/branded"
                className="font-bold text-[#3d000c]"
              >
                Explore branded collections
              </Link>
              <Link
                href="/earn-through-us"
                className="font-bold text-[#3d000c]"
              >
                Unlock your earning through us
              </Link>
              <Link
                href="/cart"
                className="font-bold text-[#3d000c]"
              >
                Cart
                <ShoppingCart className="inline ml-1 mb-1" />
              </Link>
              <Link
                href="/wishlist"
                className="font-bold text-[#3d000c]"
              >
                Wishlist
                <Heart className="inline ml-1 mb-1" />
              </Link>

              {/* More Button for mobile */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center px-3 py-2 bg-[#3d000c] text-white rounded-md hover:bg-[#87001b]"
                >
                  More
                </button>
                {showDropdown && (
                  <div className="absolute mt- w-32 bg-white z-50 text-[#3d000c] shadow-lg rounded">
                    <div className="py-2 flex flex-col">
                      <Link
                        href="/policies/wear-and-care"
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        Wear & Care Policy
                      </Link>
                      <Link
                        href="/policies/faqs"
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        FAQs
                      </Link>
                      <Link
                        href="/about"
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        About us
                      </Link>
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
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setSearchOpen(true)} // 👈 opens overlay in mobile
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

            {/* Circular Suggestions - filtered products */}
            <div className="mt-8 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
              {filteredProducts.map((product, i) => (
                <div
                  key={product._id ?? i}
                  className="flex flex-col items-center text-center cursor-pointer"
                  onClick={() => {
                    console.log("hello");
                    router.push(`/product/${product._id}`);
                  }}
                >
                  <Image
                    src={product.pImages[0] || "/placeholder.svg"}
                    alt={product.pName}
                    className="w-20 h-20 object-cover rounded-full border shadow-sm hover:scale-105 transition"
                    width={80}
                    height={80}
                  />
                  <p className="mt-2 text-sm font-medium text-gray-700">
                    {product.pName}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
