import Image from "next/image";


export function BecomeLender() {
    return (
        <section className="py-8 bg-gray-50">
            <div className="flex items-center justify-center my-10">
                <h1 className="md:text-5xl text-4xl font-bold text-gray-900">
                    Become a Lender
                </h1>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            Turn Your Closet Into Cash
                        </h2>
                        <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                            Have designer items sitting in your closet? Join thousands of lenders who are earning extra income by
                            renting out their fashion pieces. It's sustainable, profitable, and helps others access luxury fashion
                            affordably.
                        </p>

                        <ul className="space-y-3 mb-8">
                            <li className="flex items-center text-gray-800">
                                <div className="w-2 h-2 bg-[#3b000c] rounded-full mr-3"></div>
                                Earn up to 80% of retail value annually
                            </li>
                            <li className="flex items-center text-gray-800">
                                <div className="w-2 h-2 bg-[#3b000c] rounded-full mr-3"></div>
                                Insurance coverage included
                            </li>
                        </ul>
                    </div>


                    <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-lg shadow-sm overflow-hidden">
                            <Image
                                src="/images/stylish-man-formal-wear.png"
                                alt="Designer handbag"
                                className="w-full h-48 object-cover"
                                width={384}
                                height={384}
                            />
                        </div>
                        <div className="rounded-lg shadow-sm overflow-hidden mt-8">
                            <Image
                                src="/images/elegant-dress-designer-fashion.png"
                                alt="Designer dress"
                                className="w-full h-48 object-cover"
                                width={384}
                                height={384}
                            />
                        </div>
                        <div className="rounded-lg shadow-sm overflow-hidden -mt-4">
                            <Image
                                src="/images/elegant-woman-designer-dress.png"
                                alt="Luxury watch"
                                className="w-full h-48 object-cover"
                                width={384}
                                height={384}
                            />
                        </div>
                        <div className="rounded-lg shadow-sm overflow-hidden mt-4">
                            <Image
                                src="/images/designer-heels-fashion.png"
                                alt="Designer shoes"
                                className="w-full h-48 object-cover"
                                width={100} height={100}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
