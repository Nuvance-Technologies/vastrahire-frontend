'use client'
import '../globals.css'

export default function MovingAnnouncement() {
    return (
        <div className="bg-[#6d00165e] border-t border-gray-200 overflow-hidden">
            <div className="animate-marquee whitespace-nowrap py-2 flex">
                <span className="text-sm font-medium text-gray-200 mx-8">🎉 50% OFF on Designer Dresses - Limited Time!</span>
                <span className="text-sm font-medium text-gray-200 mx-8">✨ New Arrivals: Premium Jewelry Collection</span>
                <span className="text-sm font-medium text-gray-200 mx-8">👗 Rent 3 Items, Get 1 FREE - Use Code: RENT3GET1</span>
                <span className="text-sm font-medium text-gray-200 mx-8">🚚 Free Delivery on Orders Above $100</span>
                <span className="text-sm font-medium text-gray-200 mx-8">💎 Exclusive: Luxury Handbags Now Available</span>
            </div>
        </div>
    )
}
