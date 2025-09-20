"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

function PaymentContent() {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  const price = searchParams.get("price") || "0";
  const fromTime = searchParams.get("fromTime") || "10:00";
  const toTime = searchParams.get("toTime") || "10:00";

  const data = {
    userID: session?.user?.id,
    fromTime,
    toTime,
  };

  const handleConfirm = async () => {
    setLoading(true);
    setError("");
    try {
      if (session?.user?.id) {
        const [customerRes, ownerRes] = await Promise.all([
          fetch("/api/send-rental-mail", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          }),
          fetch("/api/send-owner-mail", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          }),
        ]);

        const customerResult = await customerRes.json();
        const ownerResult = await ownerRes.json();

        if (customerResult.success && ownerResult.success) {
          setIsConfirmed(true);
        } else {
          setError("Failed to send one or both emails.");
        }
      }
    } catch (err) {
      setError("Error sending emails.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-md w-full text-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Make Your Payment
        </h1>

        <p className="text-lg font-medium mb-4">
          Amount to Pay:{" "}
          <span className="text-indigo-600 font-bold">₹{price}</span>
        </p>

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

        {isConfirmed ? (
          <>
            <div className="mt-4 bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-xl">
              <h2 className="text-lg font-medium">Payment Under Verification</h2>
              <p className="text-sm mt-2">
                Your payment is currently under verification. You can check your
                payment status anytime on your{" "}
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
            <div className="mb-4 text-left">
              <label className="block text-sm font-medium text-gray-700">
                UPI ID
              </label>
              <p>abhinavpandey5716@okicici</p>
            </div>

            <div className="mb-6 text-left">
              <label className="block text-sm font-medium text-gray-700">
                Contact Number
              </label>
              <p>+91 77238 81896</p>
            </div>

            {error && (
              <div className="mb-4 text-red-600 text-sm">{error}</div>
            )}
            <button
              onClick={handleConfirm}
              className="w-full bg-[#3d000c] text-white py-2 px-4 rounded-xl shadow hover:bg-[#5a0014] transition cursor-pointer"
              disabled={loading}
            >
              {loading ? "Sending Confirmation..." : "I Have Made the Payment"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div>Loading Payment...</div>}>
      <PaymentContent />
    </Suspense>
  );
}
