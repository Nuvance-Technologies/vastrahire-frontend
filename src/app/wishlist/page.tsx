"use client";

import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Header } from "@/app/components/Header";
import Link from "next/link";
import { AnnouncementBar } from "../components/Announcement-bar";

export default function WishlistPage() {
    const wishlist = [
        {
            id: "1",
            name: "Floral Summer Dress",
            price: 1499,
            image: "https://picsum.photos/400/300?random=1",
        },
        {
            id: "2",
            name: "Leather Handbag",
            price: 2999,
            image: "https://picsum.photos/400/300?random=2",
        },
        {
            id: "3",
            name: "Stylish Sneakers",
            price: 2499,
            image: "https://picsum.photos/400/300?random=3",
        },
    ];

    return (
        <>
            <AnnouncementBar />
            <Header />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Heart className="text-[#3d000c]" /> My Wishlist
                </h1>

                <div className="grid md:grid-cols-3 gap-6">
                    {wishlist.map((product) => (
                        <div
                            key={product.id}
                            className="border rounded-2xl p-4 shadow-sm flex flex-col"
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="rounded-xl mb-3 object-cover h-48 w-full"
                            />
                            <h2 className="text-lg font-semibold">{product.name}</h2>
                            <p className="text-gray-700 mb-2">₹{product.price}</p>

                            <div className="mt-auto flex gap-2">
                                <Link
                                    href={`/product/${product.id}`}
                                    className="flex-1 bg-[#3d000c] text-white px-3 py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-[#6d0217]"
                                >
                                    <ShoppingCart size={18} /> Move to Cart
                                </Link>
                                <button className="bg-neutral-800 text-white p-2 rounded-xl hover:bg-red-600">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
