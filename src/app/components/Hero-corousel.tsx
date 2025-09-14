"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const slides = [
  {
    id: 1,
    image: "/images/elegant-woman-designer-dress.png",
    title: "Rent Designer Fashion",
    subtitle: "Access luxury brands at a fraction of the cost",
    cta: "Start Renting",
  },
  {
    id: 2,
    image: "/images/stylish-man-formal-wear.png",
    title: "Lend Your Wardrobe",
    subtitle: "Turn your closet into a source of income",
    cta: "Become a Lender",
  },
  {
    id: 3,
    image: "/images/fashion-accessories-jewelry-shoes-lifestyle.png",
    title: "Complete Your Look",
    subtitle: "Find the perfect accessories for any occasion",
    cta: "Browse Accessories",
  },
  {
    id: 4,
    image: "/images/slide3.png",
    title: "Complete Your Look",
    subtitle: "Find the perfect accessories for any occasion",
    cta: "Browse Accessories",
  },
  {
    id: 5,
    image: "/images/slide4.png",
    title: "Complete Your Look",
    subtitle: "Find the perfect accessories for any occasion",
    cta: "Browse Accessories",
  },
  {
    id: 6,
    image: "/images/slide5.png",
    title: "Complete Your Look",
    subtitle: "Find the perfect accessories for any occasion",
    cta: "Browse Accessories",
  },
  {
    id: 7,
    image: "/images/slide6.png",
    title: "Complete Your Look",
    subtitle: "Find the perfect accessories for any occasion",
    cta: "Browse Accessories",
  },
  {
    id: 8,
    image: "/images/slide8.png",
    title: "Complete Your Look",
    subtitle: "Find the perfect accessories for any occasion",
    cta: "Browse Accessories",
  },
  {
    id: 9,
    image: "/images/slide9.jpg",
    title: "Complete Your Look",
    subtitle: "Find the perfect accessories for any occasion",
    cta: "Browse Accessories",
  },
  {
    id: 10,
    image: "/images/slide10.jpg",
    title: "Complete Your Look",
    subtitle: "Find the perfect accessories for any occasion",
    cta: "Browse Accessories",
  },

]

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative h-[600px] overflow-hidden bg-gray-50">
      {slides.map((slide, index) => {
        let position = "translate-x-full"; // default: off to the right
        if (index === currentSlide) {
          position = "translate-x-0"; // active slide
        } else if (index === (currentSlide - 1 + slides.length) % slides.length) {
          position = "-translate-x-full"; // previous slide (off to the left)
        }

        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-transform duration-500 ease-in-out ${position}`}
          >
            <div className="relative h-full">
              <Image
                src={slide.image || "/placeholder.svg"}
                alt={slide.title}
                className="w-full h-full object-cover"
                width={384}
                height={384}
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white max-w-2xl px-4">
                  <h2 className="text-5xl font-bold mb-4">{slide.title}</h2>
                  <p className="text-xl mb-8">{slide.subtitle}</p>
                  <button className="bg-[#3b000c] hover:bg-[#680015] px-3 py-2 rounded-xl">
                    {slide.cta}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}


      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
          />
        ))}
      </div>
    </div>

  )
}
