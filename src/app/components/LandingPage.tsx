// app/page.tsx
"use client";

import Image from "next/image";

export default function ComingSoon() {
    return (
        <div className="min-h-screen w-full bg-white relative flex flex-col items-center justify-center overflow-hidden">

            {/* Site Heading */}
            <div className="w-full text-center py-6 flex justify-center items-center">
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

                <div className="relative w-full h-full ">
                    <Image src="/accessories.jpeg" alt="Accessories" fill className="object-cover rounded-xl shadow-md" />
                </div>

                <div className="flex items-center justify-center col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-2 row-span-2">
                    <div className="bg-black/10 backdrop-blur-md p-6 sm:p-8 md:p-12 md:py-16 rounded-2xl text-center max-w-xl shadow-lg">
                        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-black mb-4 md:mb-6">
                            Coming <span className="text-blue-600">Soon</span>
                        </h1>
                        <p className="text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed">
                            Your dream fashion rental platform is on the way!
                            Rent <span className="font-semibold">wedding dresses</span>,
                            stunning <span className="font-semibold">shoes</span>,
                            and elegant <span className="font-semibold">jewelry</span> —
                            all at your fingertips.
                        </p>
                        <p className="mt-4 md:mt-6 text-gray-600 font-medium text-lg md:text-xl">
                            Launching soon on <span className="font-bold text-blue-900">VASTRAHIRE</span> 🎉
                        </p>
                    </div>
                </div>

                <div className="relative w-full h-full col-span-2">
                    <Image src="/jewel.jpeg" alt="Jewelry" fill className="object-cover rounded-xl shadow-md" />
                </div>

                <div className="relative w-full h-full col-span-2">
                    <Image src="/jewel2.jpeg" alt="Jewelry 2" fill className="object-cover rounded-xl shadow-md" />
                </div>
            </div>
        </div>
    );
}
