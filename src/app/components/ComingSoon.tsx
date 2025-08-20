// app/page.tsx
"use client";

import Image from "next/image";
import { useState } from 'react';
import '../globals.css';
import { Dancing_Script } from "next/font/google";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400"], // normal
});


export default function ComingSoon() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) return;

        // ✅ Here you can later connect API call to save email
        console.log("User subscribed with email:", email);

        setSubmitted(true);
        setEmail("");
    };

    return (
        <div className="min-h-screen w-full bg-white relative flex flex-col items-center justify-center overflow-hidden">

            {/* Site Heading */}
            <div className="w-full text-center py-6 flex justify-center items-center relative z-10">
                <Image src="/vastrahire.jpg" alt="VASTRAHIRE Logo" width={150} height={100} className="object-contain shadow-2xl mx-5 rounded-full" />
                <div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-wide">
                        VASTRAHIRE
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-gray-600 font-medium mt-2">
                        Your Fashion Rental Destination
                    </p>
                </div>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 auto-rows-[150px] sm:auto-rows-[180px] md:auto-rows-[200px] gap-3 sm:gap-4 w-full h-full p-3 sm:p-4">
                <div className="relative w-full h-full col-span-2 row-span-2">
                    <Image src="/1.jpg" alt="Dress" fill className="object-cover rounded-xl shadow-md" />
                </div>
                <div className="relative w-full h-full">
                    <Image src="/kurta.jpg" alt="Kurta" fill className="object-cover rounded-xl shadow-md" />
                </div>
                <div className="relative w-full h-full row-span-2">
                    <Image src="/bridal.jpeg" alt="Bridal" fill className="object-cover rounded-xl shadow-md" />
                </div>
                <div className="relative w-full h-full col-span-2">
                    <Image src="/shoes.jpg" alt="Shoes" fill className="object-cover rounded-xl shadow-md" />
                </div>
                <div className="relative w-full h-full">
                    <Image src="/accessories.jpeg" alt="Accessories" fill className="object-cover rounded-xl shadow-md" />
                </div>
                <div className="relative w-full h-full col-span-2">
                    <Image src="/jewel.jpeg" alt="Jewelry" fill className="object-cover rounded-xl shadow-md" />
                </div>
                <div className="relative w-full h-full col-span-2">
                    <Image src="/jewel3.jpeg" alt="Shoes" fill className="object-cover rounded-xl shadow-md" />
                </div>
                <div className="relative w-full h-full">
                    <Image src="/blazer.jpeg" alt="Accessories" fill className="object-cover rounded-xl shadow-md" />
                </div>
                <div className="relative w-full h-full col-span-3 row-span-2">
                    <Image src="/blazer2.jpeg" alt="Jewelry" fill className="object-cover rounded-xl shadow-md" />
                </div>
                <div className="relative w-full h-full col-span-3 ">
                    <Image src="/watches.jpeg" alt="Jewelry" fill className="object-cover rounded-xl shadow-md" />
                </div>
            </div>

            {/* Fullscreen Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[5px] z-20">
                <div className="p-6 sm:p-8 md:p-12 md:py-24 rounded-3xl text-center
                   max-w-3xl animate-fadeIn">
                    <h1 className={`${dancingScript.className} text-3xl sm:text-4xl md:text-9xl font-extrabold text-white mb-4 md:mb-6 tracking-wide`}>
                        Coming <span className="text-amber-700">Soon</span>
                    </h1>

                    <p className="text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed">
                        Your dream fashion rental platform is almost here!
                        Rent <span className="font-semibold text-amber-700">wedding dresses</span>,
                        stylish <span className="font-semibold text-amber-700">shoes</span>,
                        and elegant <span className="font-semibold text-amber-700">jewelry</span> — all at your fingertips.
                    </p>

                    <p className="mt-4 md:mt-6 text-gray-300 font-medium text-lg md:text-xl">
                        Launching soon on <span className="font-bold text-amber-800">VASTRAHIRE</span> ✨
                    </p>

                    <div className="mt-6">
                        {!submitted ? (
                            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="flex-1 px-4 py-3 rounded-xl border border-gray-300 bg-white/90 
                             focus:ring-2 focus:ring-amber-400 outline-none text-gray-900"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="px-6 py-3 rounded-xl bg-amber-900 text-white font-semibold shadow-lg 
                             hover:bg-amber-700 transition-transform hover:scale-105"
                                >
                                    Notify Me
                                </button>
                            </form>
                        ) : (
                            <p className="text-green-400 font-semibold text-lg mt-4">
                                ✅ Thank you! We'll notify you when we launch.
                            </p>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
}
