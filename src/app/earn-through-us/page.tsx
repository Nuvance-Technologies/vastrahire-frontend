'use client';

import Image from "next/image";
import { useState } from "react";
import { Header } from "../components/Header";
import { UserPlus, ShieldCheck, Upload, IndianRupee } from "lucide-react"
import Link from "next/link";

const steps = [
    {
        icon: UserPlus,
        title: "Register yourself as a lender",
        desc: "Create your account in minutes with your basic details.",
    },
    {
        icon: ShieldCheck,
        title: "Verify your identity",
        desc: "We keep the marketplace safe with quick, secure verification.",
    },
    {
        icon: Upload,
        title: "Upload pictures of your product",
        desc: "Add clear photos, details, and availability to attract renters.",
    },
    {
        icon: IndianRupee,
        title: "Start lending & earning",
        desc: "Approve requests, hand off items, and earn with confidence.",
    },
]

const details = [
    {
        title: "Register in 2 minutes",
        desc: "Sign up quickly using your email and phone number. We only ask for what’s essential.",
    },
    {
        title: "Set your own price",
        desc: "Choose a competitive rental price and availability that works for you.",
    },
    {
        title: "Showcase your product",
        desc: "Upload clear photos and descriptions to help renters understand the value.",
    },
    {
        title: "Secure and trusted",
        desc: "Your safety is our priority with identity checks and secure communication.",
    },
]



export default function EarnThroughUs() {
    const [isChecked, setIsChecked] = useState(false)
    return (
        <>
            <main className="min-h-screen w-full bg-white">
                <Header />
                {/* Hero Section */}
                <section className="px-4 py-12 md:py-16">
                    <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center py-12">
                        {/* Left Text Section */}
                        <div className="space-y-6 text-neutral-800">
                            <h1 className="text-4xl md:text-5xl font-semibold text-pretty text-primary">
                                Unlock Your Earning Through Us
                            </h1>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                Turn your unused products into a steady income by renting them out. Safe. Secure. Trusted by thousands of
                                users.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Link href="/lender/signup/individual">
                                    <button className="w-full sm:w-auto bg-[#3d000c] text-gray-200 py-2 px-4 rounded-xl shadow-md hover:opacity-90 transition">
                                        Become a Lender
                                    </button>
                                </Link>
                                <Link href="#steps">
                                    <button className="w-full sm:w-auto bg-[#3d000c] text-gray-200 py-2 px-4 rounded-xl shadow-md hover:opacity-90 transition">
                                        See How It Works
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Right Image Section */}
                        <div className="order-first md:order-last">
                            <Image
                                src="/modern-urban-fashion-store.png"
                                width={560}
                                height={400}
                                alt="Illustration of people renting and exchanging products"
                                className="w-full h-auto rounded-xl border border-border shadow-sm bg-card"
                            />
                        </div>
                    </div>

                    {/* Welcome Section */}
                    <div className="mx-auto max-w-6xl text-center md:text-left py-12 ">
                        <h2 className="text-3xl font-semibold text-neutral-800 mb-4">
                            Welcome, Future VASTRAHIRE Partner!
                        </h2>
                        <p className="text-lg text-gray-700 leading-relaxed mb-4">
                            Your closet is more than just a collection of beautiful items—it's a valuable asset waiting to be unlocked. We
                            believe that the outfits, shoes, jewelry, bags, and watches you love and cherish shouldn't just sit idle. They
                            should be celebrated and, better yet, earn you money.
                        </p>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            At VASTRAHIRE, we’ve created a seamless, risk-free way for you to turn your closet into a source of income. We
                            handle everything from professional cleaning and logistics to marketing and customer care. You simply share your
                            item with our community, and we take care of the rest.
                        </p>
                    </div>


                </section>
                {/* Steps Section */}
                <section id="steps" className="px-4 py-12">
                    <div className="mx-auto max-w-6xl">
                        <h2 className="text-2xl md:text-3xl font-semibold text-pretty text-neutral-800 mb-8">How It Works</h2>

                        <ol className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 text-neutral-800">
                            {steps.map((s, idx) => {
                                const Icon = s.icon
                                return (
                                    <li
                                        key={s.title}
                                        className="flex md:flex-col items-start md:items-center gap-4 p-4 rounded-lg border border-border bg-card"
                                    >
                                        <div className="flex-shrink-0 rounded-lg p-3 bg-primary/10 text-primary">
                                            <Icon aria-hidden="true" className="h-6 w-6 text-[#3d000c] font-bold" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm text-muted-foreground">Step {idx + 1}</p>
                                            <h3 className="font-medium text-card-foreground">{s.title}</h3>
                                            <p className="text-sm text-neutral-600">{s.desc}</p>
                                        </div>
                                    </li>
                                )
                            })}
                        </ol>
                    </div>
                </section>

                <section className="px-4 py-12 md:py-16">
                    <div className="mx-auto max-w-6xl">
                        <h2 className="text-2xl md:text-3xl font-semibold text-pretty text-black mb-8">
                            Everything You Need To Get Started
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6">
                            {details.map((d) => (
                                <div
                                    key={d.title}
                                    className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
                                >
                                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">{d.title}</h3>
                                    <p className="text-sm text-neutral-600 leading-relaxed">{d.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <section className="px-4 py-12 md:py-20">
                    <div className="mx-auto max-w-5xl rounded-2xl p-8 md:p-12 text-center text-neutral-800 border border-border bg-card shadow-sm">
                        <h3 className="text-2xl md:text-3xl font-semibold text-balance mb-4">
                            Start Earning with Just a Few Clicks!
                        </h3>
                        <p className="text-primary-foreground/90 mb-6">
                            List your product today and turn it into a reliable source of income.
                        </p>

                        {/* Checkbox for Terms & Conditions */}
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <input
                                type="checkbox"
                                id="terms"
                                checked={isChecked}
                                onChange={(e) => setIsChecked(e.target.checked)}
                                className="w-4 h-4 cursor-pointer"
                            />
                            <label htmlFor="terms" className="text-sm cursor-pointer">
                                I agree to the{" "}
                                <Link href="/policies/terms-and-conditions" className="text-[#3d000c] underline">
                                    Terms & Conditions
                                </Link>
                            </label>
                        </div>

                        {/* Button */}
                        <Link href={isChecked ? "/lender/signup/individual" : "#"}>
                            <button
                                disabled={!isChecked}
                                className={`font-medium py-2 px-3 rounded-xl transition ${isChecked
                                    ? "bg-[#3d000c] text-gray-200 hover:bg-[#5a0013]"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    }`}
                            >
                                Become a Lender
                            </button>
                        </Link>
                    </div>
                </section>
            </main>
        </>
    )
}