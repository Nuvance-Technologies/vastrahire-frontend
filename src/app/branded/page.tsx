"use client"

import { useMemo, useState } from "react"
import { Header } from "../components/Header"
import { AnnouncementBar } from "../components/Announcement-bar"
import { Search, Filter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

type Product = {
    id: string | number
    name: string
    brand: string
    imageSrc?: string
    pricePerDay?: string
    rating?: number
    reviewsCount?: number
    location?: string
    href?: string
}

const BRANDS = [
    { name: "Apple" },
    { name: "Canon" },
    { name: "DJI" },
    { name: "GoPro" },
    { name: "Sony" },
    { name: "Trek" },
]

const DEMO_PRODUCTS: Product[] = [
    {
        id: 1,
        name: "Canon EOS R6 Mirrorless",
        brand: "Canon",
        imageSrc: "/canon-eos-r6-camera.png",
        pricePerDay: "$22/day",
        rating: 4.8,
        reviewsCount: 124,
        location: "San Jose, CA",
        href: "/product/1",
    },
    {
        id: 2,
        name: "DJI Mavic 3 Pro",
        brand: "DJI",
        imageSrc: "/dji-mavic-3-drone.png",
        pricePerDay: "$35/day",
        rating: 4.9,
        reviewsCount: 211,
        location: "Austin, TX",
        href: "/product/2",
    },
    {
        id: 3,
        name: "GoPro Hero 12 Black",
        brand: "GoPro",
        imageSrc: "/gopro-hero-12.png",
        pricePerDay: "$12/day",
        rating: 4.7,
        reviewsCount: 98,
        location: "Portland, OR",
        href: "/product/3",
    },
    {
        id: 4,
        name: "Sony A7 IV + 24-70mm",
        brand: "Sony",
        imageSrc: "/sony-a7-iv-lens.png",
        pricePerDay: "$28/day",
        rating: 4.8,
        reviewsCount: 175,
        location: "Los Angeles, CA",
        href: "/product/4",
    },
    {
        id: 5,
        name: 'Apple MacBook Pro 16" M3',
        brand: "Apple",
        imageSrc: "/apple-macbook-pro-16.png",
        pricePerDay: "$40/day",
        rating: 4.9,
        reviewsCount: 245,
        location: "New York, NY",
        href: "/product/5",
    },
    {
        id: 6,
        name: "Trek Fuel EX 8 (M)",
        brand: "Trek",
        imageSrc: "/trek-fuel-ex-mtb.png",
        pricePerDay: "$18/day",
        rating: 4.6,
        reviewsCount: 64,
        location: "Boulder, CO",
        href: "/product/6",
    },
]

function SectionHeader() {
    return (
        <>
            <header className="mb-6 md:mb-8">
                <h1 className="text-2xl md:text-3xl text-gray-800 font-semibold tracking-tight">Branded Items</h1>
                <p className="mt-2 text-sm md:text-base text-gray-600 max-w-prose">
                    Explore rentals from top brands. Filter by brand to find the exact gear you need—cameras, drones, laptops,
                    bikes, and more.
                </p>
            </header>
        </>
    )
}

function BrandChip({
    label,
    active,
    onClick,
}: {
    label: string
    active: boolean
    onClick: () => void
}) {
    return (
        <button
            type="button"
            aria-pressed={active}
            onClick={onClick}
            className={[
                "whitespace-nowrap rounded-full px-3 py-1.5 text-sm transition-colors border",
                active ? "bg-[#3d000c] text-white border-[#3d000c]" : "bg-white hover:bg-gray-100 border-gray-300 text-gray-700",
            ].join(" ")}
        >
            {label}
        </button>
    )
}

function BrandFilter({
    brands,
    value,
    onChange,
}: {
    brands: { name: string }[]
    value: string | "All"
    onChange: (brand: string | "All") => void
}) {
    return (
        <div className="relative">
            <div className="flex items-center justify-between">
                <h2 className="text-sm font-medium text-gray-800">Brands</h2>
            </div>
            <div className="mt-3 overflow-x-auto">
                <div className="flex gap-2 min-w-max">
                    <BrandChip label="All" active={value === "All"} onClick={() => onChange("All")} />
                    {brands.map((b) => (
                        <BrandChip key={b.name} label={b.name} active={value === b.name} onClick={() => onChange(b.name)} />
                    ))}
                </div>
            </div>
        </div>
    )
}

function ProductCard({ item }: { item: Product }) {
    const src = item.imageSrc || "/branded-product-image.png"
    return (
        <Link
            href={item.href || "#"}
            className="group block overflow-hidden rounded-lg border bg-white text-gray-900 hover:shadow-md transition-shadow"
        >
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <Image
                    src={src || "/placeholder.svg"}
                    alt={`${item.name}`}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    width={400}
                    height={300}
                />
                <div className="absolute left-0 top-0 m-2 rounded bg-white/80 px-2 py-1 text-xs font-medium border text-gray-700">
                    {item.brand}
                </div>
            </div>
            <div className="p-3">
                <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-medium leading-5">{item.name}</h3>
                    {item.pricePerDay && (
                        <span className="shrink-0 text-xs font-semibold text-gray-800">{item.pricePerDay}</span>
                    )}
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                    {typeof item.rating === "number" && (
                        <span className="inline-flex items-center gap-1">
                            {"★".repeat(Math.round(item.rating))}
                            <span className="sr-only">Rating</span>
                            <span>{item.rating.toFixed(1)}</span>
                        </span>
                    )}
                    {typeof item.reviewsCount === "number" && <span>• {item.reviewsCount} reviews</span>}
                    {item.location && <span className="truncate">• {item.location}</span>}
                </div>
            </div>
        </Link>
    )
}

function ProductGrid({ items }: { items: Product[] }) {
    if (!items.length) {
        return (
            <div className="rounded-lg border bg-gray-100 p-8 text-center text-sm text-gray-500">
                No items found for this brand. Try another filter.
            </div>
        )
    }
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {items.map((p) => (
                <ProductCard key={p.id} item={p} />
            ))}
        </div>
    )
}

export default function BrandedItemsPage() {
    const [selectedBrand, setSelectedBrand] = useState<string | "All">("All")

    const items = useMemo(() => {
        const onlyBranded = DEMO_PRODUCTS.filter((p) => !!p.brand)
        if (selectedBrand === "All") return onlyBranded
        return onlyBranded.filter((p) => p.brand === selectedBrand)
    }, [selectedBrand])

    return (
        <main className="min-h-screen bg-gray-50">
            <AnnouncementBar />
            <Header />
            <div className="container mx-auto px-4 py-8">
                {/* Filters and Search */}
                <div className="bg-white rounded-xl shadow mb-6 p-6">
                    <div className="flex flex-col md:flex-row gap-4 text-gray-700">
                        {/* Search bar */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Filters */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:flex gap-2 w-full md:w-auto">
                            <select className="w-full sm:w-auto border rounded-lg px-3 py-2">
                                <option>All Categories</option>
                                <option>Electronics</option>
                                <option>Photography</option>
                                <option>Sports</option>
                            </select>

                            <select className="w-full sm:w-auto border rounded-lg px-3 py-2">
                                <option>All Status</option>
                                <option>Available</option>
                                <option>Rented</option>
                                <option>Maintenance</option>
                            </select>

                            <button className="flex items-center justify-center border rounded-lg px-4 py-2 bg-[#3d000c] text-white w-full sm:w-auto">
                                <Filter className="h-4 w-4 mr-2" />
                                Filter
                            </button>
                        </div>
                    </div>
                </div>
                <SectionHeader />
                <div className="flex flex-col gap-6 md:gap-8">
                    <BrandFilter brands={BRANDS} value={selectedBrand} onChange={setSelectedBrand} />
                    <ProductGrid items={items} />
                </div>
            </div>
        </main>
    )
}
