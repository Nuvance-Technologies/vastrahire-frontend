"use client";

import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Header } from "@/app/components/Header";
import Link from "next/link";
import { AnnouncementBar } from "../components/Announcement-bar";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useSession } from "next-auth/react";
import { CartItem } from "../cart/page";

export default function WishlistPage() {
    const [wishlist, setWishlist] = useState<CartItem[]>([]);
    const { data: session } = useSession();

    const fetchItems = async () => {
        try {
            const res = await axios.get(`/api/wishlist?userId=${session?.user.id}`);
            setWishlist(res.data.wishlist.items);
        } catch (error) {
            console.error("Error fetching wishlist items:", error);
            toast.error("Failed to load wishlist items");
        }
    }

    useEffect(() => {
        if (session?.user.id) {
            fetchItems();
        }
    }, [session?.user.id]);

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
                            key={product._id}
                            className="border rounded-2xl p-4 shadow-sm flex flex-col"
                        >
                            <img
                                src={product.productId.pImages[0]}
                                alt={product.productId.pName}
                                className="rounded-xl mb-3 object-cover h-48 w-full"
                            />
                            <h2 className="text-lg font-semibold">{product.productId.pName}</h2>
                            <p className="text-gray-700 mb-2">₹{product.productId.pPrice}</p>

                            <div className="mt-auto flex gap-2">
                                <Link
                                    href={`/product/${product.productId._id}`}
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
