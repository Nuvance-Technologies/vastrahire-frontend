"use client"

import Image from "next/image"
import Link from "next/link"

export default function HowItWorksPage() {
    return (
        <div className="bg-white text-neutral-800">
            <div className="flex justify-center">
                <Image
                    src="/vastrahire2.png"
                    alt="Wear & Care Policy"
                    width={300}
                    height={300}
                    className="object-cover"
                />
            </div>
            <section className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center py-12 px-6">
                <div className="space-y-6">
                    <h1 className="text-4xl md:text-5xl font-semibold text-pretty text-primary">
                        How VASTRAHIRE Works: <br /> Your Path to a Curated Wardrobe & A Profitable Closet
                    </h1>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        At VASTRAHIRE, we’ve created a seamless, two-sided platform that makes luxury accessible for everyone,
                        while empowering individuals to earn from their valuable items. Whether you're a renter or a lender, our
                        process is designed to be simple, safe, and sophisticated.
                    </p>
                </div>

                <div className="order-first md:order-last">
                    <Image
                        src="/modern-urban-fashion-store.png"
                        alt="Illustration of curated fashion and renting process"
                        className="w-full h-auto rounded-xl border border-border shadow-sm bg-card"
                        width={400}
                        height={300}
                    />
                </div>
            </section>

            {/* Renter Section */}
            <section className="mx-auto max-w-5xl py-12 px-6">
                <h2 className="text-3xl font-semibold text-primary mb-6 text-center md:text-left">
                    For the Renter: Experience Luxury, Hassle-Free
                </h2>
                <ul className="space-y-6 text-lg text-gray-700 leading-relaxed list-disc list-inside">
                    <li>
                        <strong>Discover & Choose:</strong> Browse our extensive and ever-growing collection of high-end clothing,
                        shoes, jewelry, bags, and watches. Our platform features both professionally curated items from partner
                        boutiques and unique pieces from individual community closets.
                    </li>
                    <li>
                        <strong>Rent with Confidence:</strong> Once you’ve found the perfect item, select your rental period. Your
                        rental includes:
                        <ul className="list-disc list-inside ml-6 mt-2 space-y-2">
                            <li>
                                <strong>Included in the price:</strong> The rental fee, professional cleaning and sanitation, and
                                standard delivery to your doorstep. For orders above ₹2,000, standard delivery is free.
                            </li>
                            <li>
                                <strong>Peace of mind:</strong> A refundable security deposit and a small damage waiver fee are added
                                to your total, ensuring coverage for minor wear and tear.
                            </li>
                        </ul>
                    </li>
                    <li>
                        <strong>Wear & Enjoy:</strong> The item will be delivered in pristine condition. Wear it for your special
                        occasion and create unforgettable memories. The rental period begins the day the item is delivered.
                    </li>
                    <li>
                        <strong>Return with Ease:</strong> Use the pre-paid label and provided return bag to send the item back to
                        us. Hand it over to our courier partner between 9:00 AM and 5:00 PM on your designated return date (the day
                        after your rental period ends).
                    </li>
                </ul>
            </section>

            {/* Lender Section */}
            <section className="mx-auto max-w-5xl py-12 px-6 bg-gray-50 rounded-lg">
                <h2 className="text-3xl font-semibold text-primary mb-6 text-center md:text-left">
                    For the Lender: Turn Your Closet into a Business
                </h2>
                <ul className="space-y-6 text-lg text-gray-700 leading-relaxed list-disc list-inside">
                    <li>
                        <strong>Submit Your Items:</strong> Got a designer bag or a beautiful piece of jewelry that you're not
                        wearing? Submit photos and a description for review. We verify authenticity and condition.
                    </li>
                    <li>
                        <strong>We Handle Everything:</strong> Once approved, we manage the entire rental process:
                        <ul className="list-disc list-inside ml-6 mt-2 space-y-2">
                            <li>
                                <strong>Marketing & Listing:</strong> We create a professional listing with high-quality photos and
                                actively promote it.
                            </li>
                            <li>
                                <strong>Shipping & Logistics:</strong> All shipping to and from renters is handled by us.
                            </li>
                            <li>
                                <strong>Professional Care:</strong> After every rental, we professionally clean and sanitize your item.
                            </li>
                        </ul>
                    </li>
                    <li>
                        <strong>Start Earning:</strong> Receive a healthy percentage of the rental fee every time your item is
                        rented. Payments are made directly to you, hassle-free.
                    </li>
                    <li>
                        <strong>Guaranteed Protection:</strong> In the rare event of significant damage, loss, or theft, you are
                        fully compensated for the item's current retail value.
                    </li>
                </ul>
            </section>

            {/* Closing Note */}
            <section className="mx-auto max-w-4xl text-center py-16 px-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                    At VASTRAHIRE, we are more than just a service—we are a community built on a shared passion for style,
                    sustainability, and smart living.
                </p>
                <div className="mt-8">
                    <Link href="/lender/signup/individual">
                        <button className="bg-[#3d000c] text-gray-200 py-2 px-6 rounded-xl shadow-md hover:opacity-90 transition">
                            Become a Lender Today
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    )
}
