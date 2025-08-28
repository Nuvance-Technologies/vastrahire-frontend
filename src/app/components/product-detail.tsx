"use client"

import { useState, useRef, useEffect } from "react"
import { Star, Heart, Share2, ShoppingBag, Ruler, Truck, Shield, RotateCcw, X, ShoppingCart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Product {
  id: number
  name: string
  brand: string
  price: string
  originalPrice: string
  rating: number
  reviews: number
  images: string[]
  description: string
  details: {
    material: string
    embroidery: string
    care: string
    origin: string
    season: string
    occasion: string
  }
  sizes: string[]
  sizeChart: Record<string, { bust: string; waist: string; hips: string }>
  availability: string
  category: string
}

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
  const [showSizeChart, setShowSizeChart] = useState(false)
  const [rentalDays, setRentalDays] = useState(3)
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const [feedbackReason, setFeedbackReason] = useState("")
  const [swipeStartX, setSwipeStartX] = useState(0)
  const [swipeStartY, setSwipeStartY] = useState(0)
  const [isSwipeActive, setIsSwipeActive] = useState(false)
  const productRef = useRef<HTMLDivElement>(null)

  const totalPrice = Number.parseInt(product.price.replace(/[^0-9]/g, "")) * rentalDays

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      setSwipeStartX(e.touches[0].clientX)
      setSwipeStartY(e.touches[0].clientY)
      setIsSwipeActive(true)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isSwipeActive) return

      const currentX = e.touches[0].clientX
      const currentY = e.touches[0].clientY
      const diffX = swipeStartX - currentX
      const diffY = swipeStartY - currentY

      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        e.preventDefault()
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isSwipeActive) return

      const endX = e.changedTouches[0].clientX
      const endY = e.changedTouches[0].clientY
      const diffX = swipeStartX - endX
      const diffY = swipeStartY - endY

      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 100) {
        if (diffX > 0) {
          setShowFeedbackModal(true)
        }
      }

      setIsSwipeActive(false)
    }

    const handleMouseDown = (e: MouseEvent) => {
      setSwipeStartX(e.clientX)
      setSwipeStartY(e.clientY)
      setIsSwipeActive(true)
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isSwipeActive) return
    }

    const handleMouseUp = (e: MouseEvent) => {
      if (!isSwipeActive) return

      const diffX = swipeStartX - e.clientX
      const diffY = swipeStartY - e.clientY

      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 100) {
        if (diffX > 0) {
          setShowFeedbackModal(true)
        }
      }

      setIsSwipeActive(false)
    }

    const productElement = productRef.current
    if (productElement) {
      productElement.addEventListener("touchstart", handleTouchStart, { passive: false })
      productElement.addEventListener("touchmove", handleTouchMove, { passive: false })
      productElement.addEventListener("touchend", handleTouchEnd)

      productElement.addEventListener("mousedown", handleMouseDown)
      productElement.addEventListener("mousemove", handleMouseMove)
      productElement.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      if (productElement) {
        productElement.removeEventListener("touchstart", handleTouchStart)
        productElement.removeEventListener("touchmove", handleTouchMove)
        productElement.removeEventListener("touchend", handleTouchEnd)
        productElement.removeEventListener("mousedown", handleMouseDown)
        productElement.removeEventListener("mousemove", handleMouseMove)
        productElement.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [swipeStartX, swipeStartY, isSwipeActive])

  const handleFeedbackSubmit = () => {
    if (feedbackReason.trim()) {
      console.log("Feedback submitted:", {
        productId: product.id,
        reason: feedbackReason,
        timestamp: new Date().toISOString(),
      })

      setShowFeedbackModal(false)
      setFeedbackReason("")

      alert("Thank you for your feedback! We'll use this to improve our recommendations.")
    }
  }

  return (
    <>
      <main
        ref={productRef}
        className="mx-auto px-4 sm:px-6 lg:px-8 py-8 select-none bg-gray-50"
      >
        {/* Tip Banner */}
        <div className="mb-4 p-3 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-700 text-center">
            💡 <strong>Tip:</strong> Swipe left on the product if you're not
            satisfied to give us feedback
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="aspect-[4/5] overflow-hidden rounded-lg border border-gray-200">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
                width={400}
                height={500}
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-md border-2 ${selectedImage === index ? "border-indigo-500" : "border-gray-200"
                    }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                    width={100}
                    height={100}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(product.rating)
                        ? "fill-yellow-500 text-yellow-500"
                        : "text-gray-300"
                        }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500 ml-1">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold flex text-[#3d000c]">
                  <p className="text-gray-600">Rented Price:&nbsp;</p> {product.price}/day
                </span>
                <span className="text-lg text-gray-400 line-through">
                  {product.originalPrice}
                </span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  {product.availability}
                </span>
              </div>
              {/* Price */}
              <div className="flex items-center gap-4">
                <span className="text-xl flex font-bold text-[#3d000c]">
                  <p className="text-gray-600">Retail price:&nbsp;</p>{product.price}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed">{product.description}</p>

            {/* Size Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Size</h3>
                <button
                  onClick={() => setShowSizeChart(!showSizeChart)}
                  className="text-sm text-indigo-600 hover:text-indigo-500 flex items-center gap-1"
                >
                  <Ruler className="h-4 w-4" />
                  Size Chart
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md transition-colors ${selectedSize === size
                      ? "border-[#3d000c] bg-[#3d000c] text-white"
                      : "border-gray-200 hover:border-[#3d000c] text-black"
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Chart Modal */}
            {showSizeChart && (
              <div className="p-4 bg-white border border-gray-200 rounded-lg">
                <h4 className="font-semibold mb-3 text-gray-900">Size Chart</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 text-gray-700">
                        <th className="text-left py-2">Size</th>
                        <th className="text-left py-2">Bust</th>
                        <th className="text-left py-2">Waist</th>
                        <th className="text-left py-2">Hips</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(product.sizeChart).map(
                        ([size, measurements]) => (
                          <tr key={size} className="border-b border-gray-200 text-gray-800">
                            <td className="py-2 font-medium">{size}</td>
                            <td className="py-2">{measurements.bust}</td>
                            <td className="py-2">{measurements.waist}</td>
                            <td className="py-2">{measurements.hips}</td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Rental Duration */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Rental Duration</h3>
              <div className="flex items-center gap-4 text-gray-700">
                <button
                  onClick={() => setRentalDays(Math.max(1, rentalDays - 1))}
                  className="w-10 h-10 border border-gray-200 rounded-md flex items-center justify-center hover:bg-gray-100"
                >
                  -
                </button>
                <span className="text-lg font-medium">{rentalDays} days</span>
                <button
                  onClick={() => setRentalDays(rentalDays + 1)}
                  className="w-10 h-10 border border-gray-200 rounded-md flex items-center justify-center hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              <p className="text-sm text-gray-500">
                Total:{" "}
                <span className="font-semibold text-gray-900">${totalPrice}</span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                disabled={!selectedSize}
                className="w-full py-3 bg-[#3d000c] text-white rounded-lg font-semibold hover:bg-[#85021c] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <ShoppingBag className="h-5 w-5" />
                Rent Now
              </button>
              <div className="flex gap-3 text-gray-700">
                <button className="flex-1 py-3 border border-gray-200 rounded-lg font-semibold hover:bg-gray-100 flex items-center justify-center gap-2">
                  <Heart className="h-5 w-5" />
                  Add to Wishlist
                </button>
                <button className="flex-1 py-3 border border-gray-200 rounded-lg font-semibold hover:bg-gray-100 flex items-center justify-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200 text-gray-800">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-indigo-600" />
                <div>
                  <p className="font-medium text-sm">Free Delivery</p>
                  <p className="text-xs text-gray-500">On orders over $100</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="h-5 w-5 text-indigo-600" />
                <div>
                  <p className="font-medium text-sm">Easy Returns</p>
                  <p className="text-xs text-gray-500">Hassle-free process</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Ruler className="h-5 w-5 text-indigo-600" />
                <div>
                  <p className="font-medium text-sm">Perfect Fit</p>
                  <p className="text-xs text-gray-500">Size guarantee</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8">
              <button className="py-4 px-1 border-b-2 border-indigo-600 text-indigo-600 font-medium">
                Details
              </button>
              <button className="py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-900">
                Reviews ({product.reviews})
              </button>
              <button className="py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-900">
                Care Instructions
              </button>
            </div>
          </div>

          <div className="py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">
                  Product Details
                </h3>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Material</dt>
                    <dd className="text-sm text-gray-900">
                      {product.details.material}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Embroidery
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {product.details.embroidery}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Care Instructions
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {product.details.care}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Origin</dt>
                    <dd className="text-sm text-gray-900">
                      {product.details.origin}
                    </dd>
                  </div>
                </dl>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">
                  Styling Information
                </h3>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Season</dt>
                    <dd className="text-sm text-gray-900">
                      {product.details.season}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Best For</dt>
                    <dd className="text-sm text-gray-900">
                      {product.details.occasion}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Link key={i} href={`/product/${i + 10}`}>
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-[4/5] overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=300&width=250"
                      alt="Related product"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      width={400}
                      height={500}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Related Product {i}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">Brand Name</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-indigo-600">
                        $30/day
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm text-gray-500">4.7 (89)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg border border-gray-200 max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Help Us Improve
              </h3>
              <button
                onClick={() => setShowFeedbackModal(false)}
                className="text-gray-500 hover:text-gray-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-sm text-gray-500 mb-4">
              We noticed you're not satisfied with this product. Could you tell us
              why?
            </p>

            <div className="space-y-3 mb-6">
              {[
                "Not my style",
                "Poor quality",
                "Wrong size information",
                "Too expensive",
                "Better options available",
                "Misleading photos",
              ].map((reason) => (
                <button
                  key={reason}
                  onClick={() => setFeedbackReason(reason)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${feedbackReason === reason
                    ? "border-indigo-500 bg-indigo-50 text-indigo-600"
                    : "border-gray-200 hover:border-indigo-300"
                    }`}
                >
                  {reason}
                </button>
              ))}
            </div>

            <textarea
              placeholder="Additional comments (optional)"
              value={
                feedbackReason.includes("Not my style") ? feedbackReason : ""
              }
              onChange={(e) => setFeedbackReason(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 resize-none"
              rows={3}
            />

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowFeedbackModal(false)}
                className="flex-1 py-2 px-4 border border-gray-200 rounded-lg text-gray-900 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleFeedbackSubmit}
                disabled={!feedbackReason.trim()}
                className="flex-1 py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </>

  )
}
