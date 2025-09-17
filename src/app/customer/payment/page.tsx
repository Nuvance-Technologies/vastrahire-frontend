"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function PaymentPage() {
    const [isConfirmed, setIsConfirmed] = useState(false);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
            <div className="bg-white shadow-lg rounded-2xl p-6 max-w-md w-full text-center">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">
                    Make Your Payment
                </h1>

                {/* QR Code Section */}
                <div className="mb-6 flex justify-center">
                    <Image
                        src="/qr_code.jpg"
                        alt="Payment QR Code"
                        className="w-48 h-48 border rounded-xl shadow"
                        width={192}
                        height={192}
                        priority
                    />
                </div>

                {/* Conditional rendering */}
                {isConfirmed ? (
                    <>
                        <div className="mt-4 bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-xl">
                            <h2 className="text-lg font-medium">Payment Under Verification</h2>
                            <p className="text-sm mt-2">
                                Your payment is currently under verification.
                                You can check your payment status anytime on your{" "}
                                <span className="font-semibold">Customer Dashboard</span>.
                            </p>
                        </div>
                        <Link
                            href="/customer/dashboard"
                            className="mt-6 inline-block w-full bg-[#3d000c] text-white py-2 px-4 rounded-xl shadow hover:bg-[#5a0014] transition"
                        >
                            Go to Dashboard
                        </Link>
                    </>
                ) : (
                    <>
                        {/* UPI ID */}
                        <div className="mb-4 text-left">
                            <label className="block text-sm font-medium text-gray-700">
                                UPI ID
                            </label>
                            <p>abhinavpandey5716@okicici</p>
                        </div>

                        {/* Contact Number */}
                        <div className="mb-6 text-left">
                            <label className="block text-sm font-medium text-gray-700">
                                Contact Number
                            </label>
                            <p>+91 77238 81896</p>
                        </div>

                        {/* Confirm Button */}
                        <button
                            onClick={() => setIsConfirmed(true)}
                            className="w-full bg-[#3d000c] text-white py-2 px-4 rounded-xl shadow hover:bg-[#5a0014] transition cursor-pointer"
                        >
                            I Have Made the Payment
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
