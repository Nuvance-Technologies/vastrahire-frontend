"use client"

import Image from "next/image"

type Brand = {
  name: string
  logo: string
}

type Item = {
  id: string
  name: string
  brand: string
  pricePerDay: string
  rating: number
  image: string
  tag?: string
}

const brands: Brand[] = [
  { name: "Canon", logo: "/canon-logo.png" },
  { name: "DJI", logo: "/dji-logo.png" },
  { name: "Apple", logo: "/apple-logo.png" },
  { name: "GoPro", logo: "/gopro-logo.png" },
  { name: "Sony", logo: "/sony-logo.png" },
  { name: "Trek", logo: "/trek-logo.png" },
]

const items: Item[] = [
  {
    id: "1",
    name: "EOS R6 Mark II",
    brand: "Canon",
    pricePerDay: "$28/day",
    rating: 4.8,
    image: "/canon-eos-r6-camera.png",
    tag: "Popular",
  },
  {
    id: "2",
    name: "Mavic 3 Pro",
    brand: "DJI",
    pricePerDay: "$45/day",
    rating: 4.9,
    image: "/dji-mavic-3-drone.png",
    tag: "Pro pick",
  },
  {
    id: "3",
    name: "MacBook Pro 16”",
    brand: "Apple",
    pricePerDay: "$55/day",
    rating: 4.7,
    image: "/apple-macbook-pro-16.png",
  },
  {
    id: "4",
    name: "HERO12 Black",
    brand: "GoPro",
    pricePerDay: "$20/day",
    rating: 4.6,
    image: "/gopro-hero-12-camera.png",
  },
  {
    id: "5",
    name: "Alpha A7 IV",
    brand: "Sony",
    pricePerDay: "$34/day",
    rating: 4.8,
    image: "/sony-a7-iv-camera.png",
  },
  {
    id: "6",
    name: "Domane SL 6",
    brand: "Trek",
    pricePerDay: "$18/day",
    rating: 4.5,
    image: "/trek-domane-road-bike.png",
  },
]

function StarRating({ value }: { value: number }) {
  const outOf = 5
  const full = Math.floor(value)
  const hasHalf = value - full >= 0.5
  const stars = Array.from({ length: outOf }, (_, i) => {
    if (i < full) return "full"
    if (i === full && hasHalf) return "half"
    return "empty"
  })
  return (
    <div className="flex items-center gap-1" aria-label={`Rating ${value} out of 5`}>
      {stars.map((t, i) => (
        <span
          key={i}
          className={`inline-block h-3 w-3 rounded-sm ${
            t === "full"
              ? "bg-[#3d000c]"
              : t === "half"
              ? "bg-[#84041d]"
              : "bg-[#e5e7eb]"
          }`}
        />
      ))}
      <span className="text-xs text-gray-500 ml-1">{value.toFixed(1)}</span>
    </div>
  )
}

export default function BrandedRentSection() {
  return (
    <section aria-labelledby="branded-rent-heading" className="py-12 px-3 bg-gray-50 md:py-16 flex justify-center">
      <div className="container max-w-6xl">
        <header className="mb-8 md:mb-10 text-gray-700">
          <h2 id="branded-rent-heading" className="text-2xl md:text-start text-center md:text-3xl font-semibold">
            Rent from Top Brands
          </h2>
          <p className="text-gray-500 mt-2 md:text-start text-center  max-w-prose">
            Curated picks from trusted brands. Quality gear, flexible terms.
          </p>
        </header>

        {/* Brand strip */}
        <div className="mb-8 text-gray-800">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-500">Featured Brands</h3>
          </div>
          <div
            className="flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none]"
            style={{ scrollSnapType: "x mandatory" }}
          >
            <style>{".no-scrollbar::-webkit-scrollbar{display:none}"}</style>
            {brands.map((b) => (
              <button
                key={b.name}
                className="group shrink-0 scroll-ml-4 scroll-mr-4"
                style={{ scrollSnapAlign: "start" }}
                aria-label={`Filter by ${b.name}`}
                type="button"
              >
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md">
                  <div className="p-3 md:p-4 flex items-center gap-3">
                    <div className="size-9 md:size-10 rounded-md bg-gray-100 border border-gray-200 flex items-center justify-center">
                      <Image
                        src={b.logo || "/placeholder.svg"}
                        alt={`${b.name} logo`}
                        width={40}
                        height={40}
                        className="opacity-80"
                      />
                    </div>
                    <span className="text-sm md:text-base">{b.name}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Items grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="group bg-white border border-gray-200 rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 focus-within:ring-2 focus-within:ring-emerald-400"
            >
              <div className="p-4 pb-0">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="inline-block bg-[#3d000c] text-white text-sm font-bold px-2 py-0.5 rounded">
                      {item.brand}
                    </span>
                    {item.tag && (
                      <span className="ml-2 text-xs text-gray-500 px-2 py-0.5 rounded-full border border-gray-200">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <StarRating value={item.rating} />
                </div>
              </div>
              <div className="p-4 pt-3">
                <div className="rounded-lg border border-gray-200 overflow-hidden">
                  <div className="relative w-full" style={{ paddingTop: `${(3 / 4) * 100}%` }}>
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={`${item.name} by ${item.brand}`}
                      fill
                      className="absolute inset-0 object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <h4 className="text-base md:text-lg font-bold text-gray-800">{item.name}</h4>
                  <div className="mt-1.5 flex items-center justify-between">
                    <span className="text-sm text-gray-500">{item.pricePerDay}</span>
                    <span className="text-xs text-gray-500">Free cancellation</span>
                  </div>
                </div>
              </div>
              <div className="p-4 pt-0 flex items-center w-full gap-2">
                <button className="flex-1 bg-[#3d000c] text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-[#6a0317]">
                  Rent now
                </button>
                <button className="hidden sm:inline-flex border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
