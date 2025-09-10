"use client";
import Link from "next/link";
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
                    <img
                        src="/qr_code.jpg"
                        alt="Payment QR Code"
                        className="w-48 h-48 border rounded-xl shadow"
                    />
                </div>

                {/* Confirm Button */}
                {!isConfirmed ? (
                    <button
                        onClick={() => setIsConfirmed(true)}
                        className="w-full bg-[#3d000c] text-white py-2 px-4 rounded-xl shadow hover:bg-[#5a0014] transition cursor-pointer"
                    >
                        I Have Made the Payment
                    </button>
                ) : (
                    <>
                        <div className="mt-4 bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-xl">
                            <h2 className="text-lg font-medium">Payment Under Verification</h2>
                            <p className="text-sm mt-2">
                                Your payment is currently under verification.
                                You can check your payment status anytime on your{" "}
                                <span className="font-semibold">Customer Dashboard</span>.
                            </p>
                        </div>
                        <Link href="/customer/dashboard" className="mt-6 inline-block w-full bg-[#3d000c] text-white py-2 px-4 rounded-xl shadow hover:bg-[#5a0014] transition">
                            Go to Dashboard
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}
