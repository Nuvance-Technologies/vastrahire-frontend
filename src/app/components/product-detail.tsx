"use client";

import { useState, useRef, useEffect, useMemo, use } from "react";
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
import { useRouter } from "next/navigation";

export function ProductDetail({ product }: { product: ProductI }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackReason, setFeedbackReason] = useState("");
  const [feedbackComments, setFeedbackComments] = useState("");
  const [swipeStartX, setSwipeStartX] = useState(0);
  const [swipeStartY, setSwipeStartY] = useState(0);
  const [isSwipeActive, setIsSwipeActive] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [singleDay, setSingleDay] = useState(false);
  const [singleDate, setSingleDate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  interface UserData {
    address: string;
    phoneNumber: string;
  }

  const [userdata, setUserData] = useState<UserData | null>(null);

  const [activeTab, setActiveTab] = useState<"details" | "reviews" | "care">(
    "details"
  );
  const [from, setFrom] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [to, setTo] = useState("");
  const [toTime, setToTime] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const productRef = useRef<HTMLDivElement>(null);
  const [slides, setSlides] = useState<ProductI[]>([]);
  const [ownerData, setOwnerData] = useState("");

  const { data: session, status } = useSession();
  const router = useRouter();

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`/api/product/${session?.user?.id}`);
      if (res.status === 200) {
        setSlides(res.data.products);
        console.log(res.data.products[0].ownerID)
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

  useEffect(() => {
    getOwner(product.ownerID)
  }, [product.ownerID])

  const getOwner = async (id: string) => {
    try {
      const response = await axios.get(`/api/get-user?userId=${id}`);
      console.log("Owner response:", response.data);

      const first = response.data.name?.firstname || "";
      const last = response.data.name?.lastname || "";
      setOwnerData(`${first} ${last}`.trim() || "Unknown User");
    } catch (error) {
      console.error("Error fetching owner:", error);
      setOwnerData("Unknown Owner");
    }
  };



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

  useEffect(() => {
    if (session?.user?.id) {
      getUser();
    }
  }, [session?.user?.id])

  const getUser = async () => {
    try {
      const response = await axios.get(`/api/get-user?userId=${session?.user?.id}`);
      setUserData(response.data)
      if (userdata) {
        console.log(userdata)
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

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
    e.preventDefault();
    if (!session?.user) {
      toast.error("Please sign in to proceed!");
      return;
    }

    if (!selectedSize) {
      toast.error("Please select a size!");
      return;
    }

    if (!fromTime) {
      toast.error("Please select from time!");
      return;
    }
    if (singleDay && !singleDate) {
      toast.error("Please select the date!");
      return;
    }

    if (!userdata || !userdata.address || !userdata.phoneNumber) {
      toast.error("Please fill out your address and phone number in your profile before proceeding.");
      router.push("/customer/dashboard"); // Change path if your profile page is different
      return;
    }

    // Combine date and time into ISO strings
    const fromDateTime = from && fromTime ? new Date(`${from}T${fromTime}`).toISOString() : null;
    const toDateTime = to && toTime ? new Date(`${to}T${toTime}`).toISOString() : null;

    // If user has address and phone, proceed with rent request
    try {
      const res = await axios.post("/api/rent-item", {
        userId: session.user.id,
        productId: product._id,
        quantity,
        size: selectedSize,
        from: fromDateTime,
        to: toDateTime,
      });

      if (res.status === 200) {
        const totalPrice = calculateTotalPrice();
        toast.success("Make the payment. We'll mail you your details!");
        router.push(`/customer/payment?price=${totalPrice}&fromTime=${fromTime}&toTime=${toTime}`);
      }
    } catch (error: any) {
      console.error("Rent Error:", error);
      const backendMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Something went wrong while processing your request.";

      toast.error(backendMessage);
    }
  };


  const handleAddToCart = async () => {
    if (!session?.user) {
      toast.error("Please sign in to proceed!");
      return;
    }

    try {
      const res = await axios.post("/api/cart", {
        userId: session.user.id,
        productId: product._id,
        quantity: quantity || 1,
      });

      if (res.status === 200) {
        toast.success("Product added to cart successfully!");
      }
    } catch (error) {
      console.error("Error adding to cart: ", error);
      toast.error("Error adding to cart!");
    }
  };

  const handleAddToWishList = async () => {
    if (!session?.user) {
      toast.error("Please sign in to proceed!");
      return;
    }

    try {
      const res = await axios.post("/api/wishlist", {
        userId: session.user.id,
        productId: product._id,
      });

      if (res.status === 200) {
        toast.success("Product added to wishlist successfully!");
        router.push("/wishlist");
      }
    } catch (error) {
      console.error("Error adding to wishlist: ", error);
      toast.error("Error adding to wishlist!");
    }
  };

  // Calculate total price based on rental duration and quantity
  function calculateTotalPrice() {
    if (singleDay) {
      return (product.pPrice || 0) * (quantity || 1);
    }
    if (!from || !to) return 0;
    const fromDate = new Date(from);
    const toDate = new Date(to);
    const diffTime = toDate.getTime() - fromDate.getTime();
    let diffDays = Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 1);
diffDays += 1;
    return diffDays * (product.pPrice || 0) * (quantity || 1);
  }

  // Define default size chart
  const defaultSizeChart: Record<string, { bust: string; waist: string; hips: string }> = {
    S: { bust: "34\"", waist: "26\"", hips: "36\"" },
    M: { bust: "36\"", waist: "28\"", hips: "38\"" },
    L: { bust: "38\"", waist: "30\"", hips: "40\"" },
    XL: { bust: "40\"", waist: "32\"", hips: "42\"" },
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
            💡 <strong>Tip:</strong> Swipe left on the product if you&apos;re
            not satisfied to give us feedback
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="aspect-[4/5] overflow-hidden rounded-lg border border-gray-200">
              <Image
                src={product.pImages[selectedImage] || "/placeholder.svg"}
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
              <h1 className="text-xl font-bold text-gray-900 opacity-70 mb-2">
                By: {ownerData}
              </h1>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(product.pRating ?? 0)
                        ? "fill-yellow-500 text-yellow-500"
                        : "text-gray-300"
                        }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500 ml-1">
                  {(product.pRating ?? 0).toFixed(1)} ({reviews.length} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4">
                <span className="flex flex-col">
                  <span className="text-2xl font-bold flex items-baseline text-[#3d000c]">
                    <p className="text-gray-600 mr-1">Rented Price:</p> ₹{product.pPrice}
                  </span>
                </span>

                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full h-fit">
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
                      {Object.entries(defaultSizeChart).map(([size, m]) => (
                        <tr key={size} className="border-b border-gray-200 text-gray-800">
                          <td className="py-2 font-medium">{size}</td>
                          <td className="py-2">{m.bust}</td>
                          <td className="py-2">{m.waist}</td>
                          <td className="py-2">{m.hips}</td>
                        </tr>
                      ))}
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
                  <div className="flex flex-wrap gap-2">
                    {product.pSize.map((size) => (
                      <button
                        key={size}
                        type="button"
                        className="px-3 py-2 border rounded-lg font-medium text-sm hover:bg-gray-100 transition"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* From Date */}
                <div>
                  <h3 className="font-semibold text-gray-900 py-2">Rental Duration</h3>
                  <div className="space-y-3 mb-4">
                    <div className="flex flex-col gap-2">
                      <label className="flex flex-col text-sm font-medium text-gray-700">
                        From
                        <input
                          type="date"
                          value={from}
                          onChange={(e) => setFrom(e.target.value)}
                          className="mt-1 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                      </label>
                      <label className="flex flex-col text-sm font-medium text-gray-700">
                        From Time
                        <input
                          type="time"
                          value={fromTime}
                          onChange={(e) => setFromTime(e.target.value)}
                          className="mt-1 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                      </label>

                      <label className="flex flex-col text-sm font-medium text-gray-700">
                        To
                        <input
                          type="date"
                          value={to}
                          onChange={(e) => setTo(e.target.value)}
                          className="mt-1 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                      </label>
                    </div>
                  </div>
                  <label className="flex flex-col text-sm font-medium text-gray-700 mt-4">
                    Quantity
                    <input
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="mt-1 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      type="number"
                    />
                  </label>
                  <label className="flex flex-col text-sm font-medium text-gray-700 mt-4">
                    Select Size from the available sizes
                    <select
                      value={selectedSize || ""}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      className="mt-1 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    >
                      <option value="">Select a size</option>
                      {product.pSize.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="mt-4 text-xl font-bold text-[#3d000c]">
                  Total Price: ₹{calculateTotalPrice()}
                </div>

                <button
                  type="submit"
                  disabled={
                    !selectedSize || (singleDay ? (!singleDate || !from || !to) : (!from || !to))
                  }
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
                <button onClick={handleAddToWishList} className="flex-1 py-3 border border-gray-200 rounded-lg font-semibold hover:bg-gray-100 flex items-center justify-center gap-2">
                  <Heart className="h-5 w-5" />
                  Add to Wishlist
                </button>
                <button onClick={handleAddToCart} className="flex-1 py-3 border border-gray-200 rounded-lg font-semibold hover:bg-gray-100 flex items-center justify-center gap-2">
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
                  <p className="font-medium text-sm">Free Shipping</p>
                  <p className="text-xs text-gray-500">On orders over ₹2000</p>
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
                className={`py-4 px-1 border-b-2 ${activeTab === "reviews"
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
