"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { ProductI } from "../category/women/page";

export default function NewArrivals() {
  const [current, setCurrent] = useState(0);
  const [slides, setSlides] = useState<ProductI[]>([]);

  const { data: session, status } = useSession();

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`/api/product/allProducts`);
      if (res.status === 200) {
        setSlides(res.data.products);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="bg-gray-50 py-12">
      <div className="w-full max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          ✨ New Arrivals ✨
        </h2>

        {/* Carousel */}
        <div className="relative overflow-hidden rounded-2xl shadow-lg">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((slide) => (
              <div key={slide._id} className="w-full flex-shrink-0 relative">
                <Link href={`/product/${slide._id}`}>
                  <Image
                    src={slide.pImages[0] || "/placeholder.png"}
                    alt="New Arrival"
                    width={1000}
                    height={500}
                    className="w-full h-[400px] object-contain"
                  />
                </Link>
                {/* Center Button */}
                {/* <div className="absolute inset-0 flex items-center justify-center">
                  <Link href={slide.link}>
                    <button className="px-6 py-3 bg-[#3d000c] text-white rounded-xl hover:bg-[#87001b] transition">
                      Shop Now
                    </button>
                  </Link>
                </div> */}
              </div>
            ))}
          </div>

          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 -translate-y-1/2 left-3 bg-black/50 text-white p-2 rounded-full"
          >
            <ChevronLeft size={28} />
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute top-1/2 -translate-y-1/2 right-3 bg-black/50 text-white p-2 rounded-full"
          >
            <ChevronRight size={28} />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center mt-4 space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full ${current === index ? "bg-[#3d000c]" : "bg-gray-400"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
