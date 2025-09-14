"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import {
  Star,
  Heart,
  ShoppingCart,
  ShoppingBag,
  Ruler,
  Truck,
  RotateCcw,
  X,
} from "lucide-react";
import Link from "next/link";
import ReviewCard, {
  type Review as ReviewModel,
} from "../components/reviews/review-card";
import Image from "next/image";
import ReviewForm from "../components/reviews/review-form";
import { ProductI } from "../category/women/page";
import toast from "react-hot-toast";
import axios from "axios";
import { useSession } from "next-auth/react";

export function ProductDetail({ product }: { product: ProductI }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackReason, setFeedbackReason] = useState("");
  const [feedbackComments, setFeedbackComments] = useState("");
  const [swipeStartX, setSwipeStartX] = useState(0);
  const [swipeStartY, setSwipeStartY] = useState(0);
  const [isSwipeActive, setIsSwipeActive] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<"details" | "reviews" | "care">(
    "details"
  );
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const productRef = useRef<HTMLDivElement>(null);
  const [slides, setSlides] = useState<ProductI[]>([]);

  const { data: session, status } = useSession();

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`/api/product/${session?.user?.id}`);
      if (res.status === 200) {
        setSlides(res.data.products);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      fetchProducts();
    }
  }, [status, session?.user?.id]);

  // --- Swipe-to-feedback listeners ---
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      setSwipeStartX(e.touches[0].clientX);
      setSwipeStartY(e.touches[0].clientY);
      setIsSwipeActive(true);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!isSwipeActive) return;
      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const diffX = swipeStartX - currentX;
      const diffY = swipeStartY - currentY;
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        e.preventDefault();
      }
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (!isSwipeActive) return;
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const diffX = swipeStartX - endX;
      const diffY = swipeStartY - endY;
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 100) {
        if (diffX < 0) setShowFeedbackModal(true);
      }
      setIsSwipeActive(false);
    };
    const handleMouseDown = (e: MouseEvent) => {
      setSwipeStartX(e.clientX);
      setSwipeStartY(e.clientY);
      setIsSwipeActive(true);
    };
    const handleMouseMove = () => {
      if (!isSwipeActive) return;
    };
    const handleMouseUp = (e: MouseEvent) => {
      if (!isSwipeActive) return;
      const diffX = swipeStartX - e.clientX;
      const diffY = swipeStartY - e.clientY;
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 100) {
        if (diffX < 0) setShowFeedbackModal(true);
      }
      setIsSwipeActive(false);
    };

    const el = productRef.current;
    if (el) {
      el.addEventListener("touchstart", handleTouchStart, { passive: false });
      el.addEventListener("touchmove", handleTouchMove, { passive: false });
      el.addEventListener("touchend", handleTouchEnd);
      el.addEventListener("mousedown", handleMouseDown);
      el.addEventListener("mousemove", handleMouseMove);
      el.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      if (el) {
        el.removeEventListener("touchstart", handleTouchStart);
        el.removeEventListener("touchmove", handleTouchMove);
        el.removeEventListener("touchend", handleTouchEnd);
        el.removeEventListener("mousedown", handleMouseDown);
        el.removeEventListener("mousemove", handleMouseMove);
        el.removeEventListener("mouseup", handleMouseUp);
      }
    };
  }, [swipeStartX, swipeStartY, isSwipeActive]);

  // Reviews localStorage persistence
  useEffect(() => {
    try {
      const raw =
        typeof window !== "undefined"
          ? window.localStorage.getItem(`reviews:product:${product._id}`)
          : null;
      if (raw) setReviews(JSON.parse(raw) as ReviewModel[]);
    } catch { }
  }, [product._id]);

  useEffect(() => {
    if (reviews.length === 0) setActiveTab("reviews");
  }, [reviews.length]);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          `reviews:product:${product._id}`,
          JSON.stringify(reviews)
        );
      }
    } catch { }
  }, [reviews, product._id]);

  const handleFeedbackSubmit = () => {
    if ((feedbackReason || feedbackComments).trim()) {
      setShowFeedbackModal(false);
      setFeedbackReason("");
      setFeedbackComments("");
      alert(
        "Thank you for your feedback! We'll use this to improve our recommendations."
      );
    }
  };

  const handleRent = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!session?.user) {
      toast.error("Please sign in to proceed!");
      return;
    }
    e.preventDefault();
    try {
      const res = await axios.post("/api/rent-item", {
        quantity,
        from,
        to,
        userId: session?.user?.id,
        productId: product._id,
      });
      if (res.status === 200) {
        toast.success("Product rented successfully!");
      }
    } catch (error) {
      console.error("Error renting the item: ", error);
      toast.error("Error renting item!");
    }
  };

  return (
    <>
      <main
        ref={productRef}
        className="mx-auto px-4 sm:px-6 lg:px-8 py-8 select-none bg-gray-50"
      >
        {/* Tip Banner */}
        <div className="mb-4 md:hidden p-3 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-700 text-center">
            💡 <strong>Tip:</strong> Swipe right on the product if you&apos;re
            not satisfied to give us feedback
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="aspect-[4/5] overflow-hidden rounded-lg border border-gray-200">
              <Image
                src={product.pImages[0] || "/placeholder.svg"}
                alt={product.pName}
                className="w-full h-full object-cover"
                width={400}
                height={500}
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.pImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-md border-2 ${selectedImage === index
                    ? "border-indigo-500"
                    : "border-gray-200"
                    }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.pName} ${index + 1}`}
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.pName}
              </h1>

              {/* <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-500 text-yellow-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500 ml-1">
                  {product.rating} ({(reviews?.length ?? 0) || product.reviews}{" "}
                  reviews)
                </span>
              </div> */}

              {/* Price */}
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold flex text-[#3d000c]">
                  <p className="text-gray-600">Rented Price:&nbsp;</p> ₹
                  {product.pPrice}
                </span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  {product.availability}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed">{product.pDesc}</p>

            {/* Size Chart Modal */}
            {/* {showSizeChart && (
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
                          <tr
                            key={size}
                            className="border-b border-gray-200 text-gray-800"
                          >
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
            )} */}

            {/* Rental Duration - Date Range */}
            <div className="space-y-3">
              <form
                onSubmit={handleRent}
                className=" sm:flex-row items-center gap-4 text-gray-700"
              >
                {/* Size Selection */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Select Size</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.pSize.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border rounded-lg font-medium transition ${selectedSize === size
                          ? "border-indigo-600 bg-indigo-100 text-indigo-600"
                          : "border-gray-300 text-gray-700 hover:border-indigo-400"
                          }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* From Date */}
                <div>
                  <h3 className="font-semibold text-gray-900">Rental Duration</h3>
                  <label className="flex flex-col text-sm font-medium text-gray-700 mb-4">
                    From
                    <input
                      type="date"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      className="mt-1 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </label>

                  {/* To Date */}
                  <label className="flex flex-col text-sm font-medium text-gray-700">
                    To
                    <input
                      type="date"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      className="mt-1 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </label>
                  <label className="flex flex-col text-sm font-medium text-gray-700 mt-4">
                    Quantity
                    <input
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="mt-1 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      type="number"
                    />
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={!selectedSize}
                  className="w-full my-4 py-3 bg-[#3d000c] text-white rounded-lg font-semibold hover:bg-[#85021c] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="h-5 w-5" />
                  Rent Now
                </button>

              </form>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
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
                  <p className="text-xs text-gray-500">On orders over ₹100</p>
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
              <button
                onClick={() => setActiveTab("details")}
                className={`py-4 px-1 border-b-2 ${activeTab === "details"
                  ? "border-gray-900 text-gray-900"
                  : "border-transparent text-gray-500 hover:text-gray-900"
                  }`}
              >
                Details
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`py-4 px-1 border-b-2 ${
                  activeTab === "reviews"
                    ? "border-gray-900 text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
              >
                Reviews ({reviews.length})
              </button>
              <button
                onClick={() => setActiveTab("care")}
                className={`py-4 px-1 border-b-2 ${activeTab === "care"
                  ? "border-gray-900 text-gray-900"
                  : "border-transparent text-gray-500 hover:text-gray-900"
                  }`}
              >
                Care Instructions
              </button>
            </div>
          </div>

          <div className="py-8">
            {activeTab === "details" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Product Details
                  </h3>
                  <dl className="space-y-3">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Material
                      </dt>
                      <dd className="text-sm text-gray-900">
                        {product.pFabric}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Embroidery
                      </dt>
                      <dd className="text-sm text-gray-900">
                        {product.pPattern}
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
                      <dt className="text-sm font-medium text-gray-500">
                        Best For
                      </dt>
                      <dd className="text-sm text-gray-900">
                        {product.pOccasion}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="grid gap-8 md:grid-cols-2">
                <section
                  aria-label="Reviews"
                  className="order-2 md:order-1 grid gap-4"
                >
                  {reviews.length === 0 ? (
                    <div className="rounded-lg border border-dashed border-border bg-card p-6 text-center text-sm text-muted-foreground">
                      No reviews yet. Be the first to write one!
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {reviews.map((r) => (
                        <ReviewCard key={r.id} review={r} />
                      ))}
                    </div>
                  )}
                </section>
                <div className="order-1 md:order-2">
                  <ReviewForm
                    onAdd={(r) => {
                      setReviews((prev) => [r, ...prev]);
                    }}
                  />
                </div>
              </div>
            )}

            {activeTab === "care" && (
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg border border-gray-600 bg-card p-6">
                  <h3 className="font-semibold text-gray-800 mb-4">
                    Care Instructions
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                    {/* <li>{product.details.care}</li> */}
                    <li>
                      Store in a cool, dry place away from direct sunlight.
                    </li>
                    <li>
                      Avoid contact with sharp objects and abrasive surfaces.
                    </li>
                    <li>
                      Use a garment bag during transport to prevent damage.
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg border border-gray-600 bg-card p-6">
                  <h3 className="font-semibold text-gray-800 mb-4">
                    Rental Tips
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                    <li>
                      Try on your selected size as soon as you receive the item.
                    </li>
                    <li>
                      Contact support immediately if sizing isn’t right—we’ll
                      help.
                    </li>
                    <li>
                      Use included care instructions to keep the item pristine.
                    </li>
                    <li>
                      Return on time to avoid late fees and help the next
                      renter.
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {slides.map((p, i) => (
              <Link key={i} href={`/product/${p._id}`}>
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-[4/5] overflow-hidden">
                    <Image
                      src={p.pImages[0] || "/placeholder.svg"}
                      alt="Related product"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      width={400}
                      height={500}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {p.pName.length > 40
                        ? p.pName.slice(0, 37) + "..."
                        : p.pName}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-indigo-600">
                        ₹{p.pPrice}
                      </span>
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
              We noticed you&apos;re not satisfied with this product. Could you
              tell us why?
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
              value={feedbackComments}
              onChange={(e) => setFeedbackComments(e.target.value)}
              className="w-full p-3 border h-20 border-gray-200 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 resize-none"
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
  );
}
