"use client"

import { Info, Crown, Gem, Star } from "lucide-react"
import { motion } from "framer-motion"

export default function MembershipInfo() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            {/* Page Header */}
            <div className="bg-[#3d000c] text-white py-12 px-6 text-center">
                <h1 className="text-4xl font-bold mb-2">VASTRAHIRE Membership Tiers</h1>
                <p className="text-lg max-w-3xl mx-auto">
                    Explore the exclusive benefits for Lenders and Renters. Unlock perks as you grow with us.
                </p>
            </div>

            <div className="max-w-6xl mx-auto py-12 px-6 space-y-16">
                {/* Lender Section */}
                <section>
                    <h2 className="text-3xl font-bold text-neutral-800 flex items-center gap-2 mb-6">
                        <Info className="w-7 h-7 text-neutral-600" /> For Lenders
                    </h2>

                    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
                        <h3 className="text-xl font-semibold">Core Benefits for Every Lender</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li>Effortless Earnings with zero hassle</li>
                            <li>Guaranteed Protection with full-value insurance</li>
                            <li>Zero-Cost Operation (cleaning + maintenance included)</li>
                            <li>Global Exposure to a vast fashion community</li>
                            <li>Be part of the Circular Fashion Movement</li>
                        </ul>
                    </div>

                    {/* Lender Tiers */}
                    <div className="grid md:grid-cols-3 gap-8 mt-8">
                        <motion.div whileHover={{ scale: 1.03 }} className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 shadow">
                            <h4 className="text-2xl font-bold flex items-center gap-2 text-yellow-600">
                                <Star className="w-6 h-6" /> Golden Lender
                            </h4>
                            <p className="mt-2 text-gray-600 text-sm">
                                For lenders starting their journey with 5 rentals or ₹50,000 listed value.
                            </p>
                            <ul className="mt-4 list-disc list-inside space-y-2 text-gray-700">
                                <li>+2% Commission for 12 months</li>
                                <li>Featured Listing for 1 week</li>
                                <li>Early Payouts (24h faster)</li>
                                <li>Enhanced Referral Bonus</li>
                            </ul>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.03 }} className="bg-gray-50 border border-gray-300 rounded-2xl p-6 shadow">
                            <h4 className="text-2xl font-bold flex items-center gap-2 text-gray-700">
                                <Crown className="w-6 h-6 text-gray-500" /> Platinum Lender
                            </h4>
                            <p className="mt-2 text-gray-600 text-sm">
                                For fashion entrepreneurs with 15 rentals or ₹150,000 listed.
                            </p>
                            <ul className="mt-4 list-disc list-inside space-y-2 text-gray-700">
                                <li>+5% Commission</li>
                                <li>Dedicated Support Specialist</li>
                                <li>Priority Marketing Campaigns</li>
                                <li>Lender Spotlight Features</li>
                            </ul>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.03 }} className="bg-purple-50 border border-purple-200 rounded-2xl p-6 shadow">
                            <h4 className="text-2xl font-bold flex items-center gap-2 text-purple-700">
                                <Gem className="w-6 h-6 text-purple-600" /> Diamond Lender
                            </h4>
                            <p className="mt-2 text-gray-600 text-sm">
                                The pinnacle tier with 30 rentals or ₹300,000+ listed.
                            </p>
                            <ul className="mt-4 list-disc list-inside space-y-2 text-gray-700">
                                <li>+8% Commission</li>
                                <li>Premium Category Placement</li>
                                <li>Annual Free Service for 1 item</li>
                                <li>₹5,000 Annual Bonus</li>
                                <li>Exclusive Feature Previews</li>
                            </ul>
                        </motion.div>
                    </div>
                </section>

                {/* Renter Section */}
                <section>
                    <h2 className="text-3xl font-bold text-neutral-800 flex items-center gap-2 mb-6">
                        <Info className="w-7 h-7 text-neutral-600" /> For Renters
                    </h2>

                    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
                        <h3 className="text-xl font-semibold">Core Benefits for Every Renter</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li>Limitless Wardrobe access</li>
                            <li>Affordable Luxury at a fraction of retail price</li>
                            <li>Hassle-Free Experience (delivery & cleaning included)</li>
                            <li>Sustainable Style for a greener planet</li>
                            <li>Never Wear the Same Thing Twice</li>
                        </ul>
                    </div>

                    {/* Renter Tiers */}
                    <div className="grid md:grid-cols-3 gap-8 mt-8">
                        <motion.div whileHover={{ scale: 1.03 }} className="bg-pink-50 border border-pink-200 rounded-2xl p-6 shadow">
                            <h4 className="text-2xl font-bold flex items-center gap-2 text-pink-600">
                                <Star className="w-6 h-6" /> The Style Savvy
                            </h4>
                            <p className="mt-2 text-gray-600 text-sm">
                                Entry tier with 5 rentals or ₹20,000 spend in a year.
                            </p>
                            <ul className="mt-4 list-disc list-inside space-y-2 text-gray-700">
                                <li>5% Bonus Discount</li>
                                <li>24h Early Access</li>
                                <li>Birthday Reward</li>
                            </ul>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.03 }} className="bg-blue-50 border border-blue-200 rounded-2xl p-6 shadow">
                            <h4 className="text-2xl font-bold flex items-center gap-2 text-blue-600">
                                <Crown className="w-6 h-6" /> The Fashion Enthusiast
                            </h4>
                            <p className="mt-2 text-gray-600 text-sm">
                                Mid tier with 10 rentals or ₹50,000 spend in a year.
                            </p>
                            <ul className="mt-4 list-disc list-inside space-y-2 text-gray-700">
                                <li>10% Bonus Discount</li>
                                <li>Complimentary Shipping</li>
                                <li>Priority Customer Service</li>
                            </ul>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.03 }} className="bg-green-50 border border-green-200 rounded-2xl p-6 shadow">
                            <h4 className="text-2xl font-bold flex items-center gap-2 text-green-700">
                                <Gem className="w-6 h-6" /> The Connoisseur
                            </h4>
                            <p className="mt-2 text-gray-600 text-sm">
                                Exclusive tier with 20 rentals or ₹100,000+ spend.
                            </p>
                            <ul className="mt-4 list-disc list-inside space-y-2 text-gray-700">
                                <li>15% Bonus Discount</li>
                                <li>48h VIP Early Access</li>
                                <li>Annual Luxury Box</li>
                            </ul>
                        </motion.div>
                    </div>
                </section>
            </div>
        </div>
    )
}
