// app/policies/late-fee-policy/page.tsx
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Late Fee Policy | VASTRAHIRE",
  description:
    "Understand VASTRAHIRE's late return policy: rental period, return deadlines, late fees, non-return charges, communication, and dispute resolution.",
  alternates: {
    canonical: "/policies/late-fee-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function LateFeePolicyPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <div className="flex justify-center">
        <Image src="/vastrahire2.png" alt="logo" width={300} height={300} />
      </div>
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">

        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-neutral-600">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:underline">Home</Link>
            </li>
            <li aria-hidden className="select-none">/</li>
            <li className="text-neutral-900 font-medium">Terms and conditions</li>
          </ol>
        </nav>
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
            VASTRAHIRE Rental Agreement
          </h1>
          <p className="mt-3 text-neutral-600">
            This Rental Agreement outlines the terms and conditions governing your use of VASTRAHIRE’s products. By renting an item through our platform, you agree to follow these rules, ensuring a smooth and fair experience for all.
          </p>
        </header>

        {/* Agreement Content */}
        <div className="prose prose-neutral max-w-none text-neutral-600">
          <h2 id="rental-period" className="scroll-mt-24">1. Rental Period</h2>
          <p>
            The rental period begins on the date you receive the product and ends on the agreed return date. Extensions must be requested in advance and may incur additional charges.
          </p>

          <h2 id="care-use" className="scroll-mt-24">2. Care & Proper Use</h2>
          <p>
            You agree to treat all rented items with the utmost care, as outlined in our <Link href="/policies/wear-and-care" className="underline">Wear & Care Policy</Link>.
          </p>

          <h2 id="damage-loss" className="scroll-mt-24">3. Damage, Loss, or Theft</h2>
          <p>
            Minor wear and tear is covered under our Damage Waiver. However, significant damage, loss, or theft will make you liable for the product’s full current retail value.
          </p>

          <h2 id="returns" className="scroll-mt-24">4. Returns</h2>
          <p>
            Items must be returned on or before the due date. Late returns will incur charges as per our <Link href="/policies/late-fee" className="underline">Late Fee Policy</Link>.
          </p>

          <h2 id="prohibited" className="scroll-mt-24">5. Prohibited Actions</h2>
          <ul>
            <li>Do not attempt to clean, repair, or alter rented items yourself.</li>
            <li>Do not sub-rent or lend the product to another person.</li>
            <li>Do not use items in hazardous or inappropriate environments.</li>
          </ul>

          <h2 id="liability" className="scroll-mt-24">6. Liability</h2>
          <p>
            You are fully responsible for the item from the time of delivery until its return. VASTRAHIRE is not liable for any injuries, accidents, or damages resulting from misuse of the product.
          </p>

          <h2 id="agreement" className="scroll-mt-24">7. Agreement to Terms</h2>
          <p>
            By renting from VASTRAHIRE, you acknowledge and agree to these terms. This agreement is legally binding.
          </p>

          <p className="mt-8">
            Thank you for respecting our policies and helping us maintain a seamless rental experience for all VASTRAHIRE users.
          </p>
        </div>



      </section>
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-5">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
            The VASTRAHIRE Cleaning & Hygiene Policy: Our Commitment to You
          </h1>
          <p className="mt-3 text-neutral-600">
            Your safety and peace of mind are our top priorities. In a community built on sharing, hygiene is not just a policy—it is our most important promise.
            Every item you receive has been meticulously cleaned, sanitized, and prepared by our expert team.
          </p>
          <p className="mt-3 text-neutral-600 italic">
            You will never have to worry about cleaning or sanitizing a VASTRAHIRE item. We handle it all.
          </p>
        </header>

        {/* Policy Content */}
        <div className="prose prose-neutral max-w-none text-neutral-600">
          <h2 id="protocol" className="scroll-mt-24">Our Multi-Step Professional Cleaning Protocol</h2>
          <p>
            After every single rental, each item undergoes a rigorous, multi-step cleaning process tailored to its specific category and material.
          </p>

          <h3>1. Immediate Inspection Upon Return</h3>
          <p>
            Upon return, every garment is immediately sent to our dedicated care facility. Our team inspects each piece under bright light to identify repairs or specialized cleaning needs.
          </p>

          <h3>For Clothing (Women’s, Men’s & Kids’)</h3>
          <ul>
            <li><strong>Professional Dry Cleaning:</strong> Eco-friendly solvents used for delicate fabrics.</li>
            <li><strong>Steam Sanitization:</strong> Kills 99.9% of bacteria and germs.</li>
            <li><strong>Odor Neutralization:</strong> Specialized equipment removes all lingering odors.</li>
            <li><strong>Special Note for Kids:</strong> Hypoallergenic agents safe for sensitive skin.</li>
          </ul>

          <h3>For Shoes</h3>
          <ul>
            <li><strong>Interior Sanitization:</strong> Anti-bacterial and deodorizing treatment.</li>
            <li><strong>Sole & Surface Cleaning:</strong> Thorough cleaning, polishing, and conditioning.</li>
          </ul>

          <h3>For Bags</h3>
          <ul>
            <li><strong>Interior & Exterior Detailing:</strong> Vacuumed, wiped, and conditioned.</li>
            <li><strong>High-Touch Point Sanitization:</strong> Handles, zippers, and clasps sanitized with safe, alcohol-free spray.</li>
          </ul>

          <h3>For Watches & Jewelry</h3>
          <ul>
            <li><strong>Jewelry:</strong> Cleaned using professional ultrasonic cleaners, then polished.</li>
            <li><strong>Watches:</strong> Bands, clasps, and cases sanitized and polished with care.</li>
          </ul>

          <h2 id="renter-role" className="scroll-mt-24">Your Role as a Renter</h2>
          <ul>
            <li><strong>Do Not Attempt to Clean:</strong> Never wash, dry clean, or repair items yourself.</li>
            <li><strong>Handle with Care:</strong> Be mindful of spills and stains. Minor wear is covered, but significant damage is not.</li>
          </ul>

          <p className="mt-8">
            Our commitment is to your health and the longevity of our collection. VASTRAHIRE provides endless style while upholding the highest standards of cleanliness and care.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
            VASTRAHIRE Late Fee Policy
          </h1>
          <p className="mt-3 text-neutral-600">
            At VASTRAHIRE, our mission is to provide an endless wardrobe for everyone's defining moments. The timely
            return of each product is crucial to ensuring we can deliver on this promise for every customer in our
            community. This policy outlines the fees associated with late returns.
          </p>
          <p className="mt-3 text-neutral-600">
            By renting a product from our platform, you agree to the terms of this policy.
          </p>
        </header>

        {/* Policy Content */}
        <div className="prose prose-neutral max-w-none text-gray-700">
          <h2 id="rental-period" className="scroll-mt-24">1. Defining Your Rental Period & Return Date</h2>
          <p>
            Your VASTRAHIRE rental is based on full days, not hours. The day your item arrives is the first day of your
            rental period, regardless of the time of delivery.
          </p>
          <p>
            Your <strong>Return Date</strong> is the day after your selected rental period ends. To ensure a timely return, the
            product must be packaged in the provided return bag and handed over to our courier partner for shipment by
            <strong> 5:00 PM</strong> on your Return Date.
          </p>
          <p>
            We consider an item "returned" once it is scanned into the courier's tracking system. It is your
            responsibility to retain the courier receipt as proof of shipment.
          </p>

          <h2 id="late-fee-structure" className="scroll-mt-24">2. Late Fee Structure</h2>
          <p>
            If a product is not shipped back by the specified time on your Return Date, a late fee will be charged.
          </p>
          <ul>
            <li>
              A late fee of <strong>15% of your rental amount per day</strong> will be applied for each day the item is late. This fee
              has a <strong>minimum of ₹200</strong> and a <strong>maximum of ₹1,000 per day</strong>.
            </li>
            <li>
              This fee will be automatically deducted from your security deposit. If the late fees exceed the amount of
              your security deposit, you authorize VASTRAHIRE to charge the outstanding balance to your payment method on
              file. This will occur on the <strong>7th day after your Return Date</strong>.
            </li>
          </ul>

          {/* Example Callout */}
          <div className="not-prose my-6 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 sm:p-5">
            <h3 className="text-base font-semibold text-neutral-900">Example</h3>
            <p className="mt-1 text-sm text-neutral-700">
              If your rental amount is <strong>₹2,000</strong> and your rental period ends on a Wednesday, your Return Date is Thursday.
              If you ship the item back on Saturday (<em>two days late</em>), a late fee of <strong>₹300 per day</strong> (15% of ₹2,000)
              will be charged. The total late fee will be <strong>₹600</strong> (<em>2 days × ₹300/day</em>).
            </p>
          </div>

          <h2 id="non-return" className="scroll-mt-24">3. Non-Return and Maximum Charges</h2>
          <p>
            We understand that unforeseen circumstances can happen, but proactive communication is key.
          </p>
          <ul>
            <li>
              An item that has not been shipped back within <strong>7 days</strong> of the original Return Date will be considered a
              <strong> "Non-Return"</strong>.
            </li>
            <li>
              In the case of a Non-Return, you will be charged the <strong>full Manufacturer's Suggested Retail Price (MSRP)</strong> of
              the product, in addition to any rental fees already paid. The charge will be calculated as:
              <em> Full MSRP − Security Deposit Held − Any Late Fees Already Paid</em>.
            </li>
          </ul>

          <h2 id="communication" className="scroll-mt-24">4. Communication</h2>
          <ul>
            <li>
              We will notify you via email and SMS as soon as our system marks your return as late. This notification will
              be sent at <strong>9:00 PM</strong> on your Return Date.
            </li>
            <li>
              If you anticipate any issues or delays in returning your product, please contact our customer support team at
              <a className="mx-1 underline" href="mailto:vastrahire@gmail.com">vastrahire@gmail.com</a>
              and <a className="mx-1 underline" href="tel:+917723881896">7723881896</a> as soon as possible. We believe in being
              reasonable and will work with you when possible, but proactive communication is essential.
            </li>
          </ul>

          <h2 id="dispute-resolution" className="scroll-mt-24">5. Dispute Resolution</h2>
          <p>
            If you believe a late fee has been charged in error, you must contact our customer support team within
            <strong> 48 hours</strong> of receiving the charge notification. You will need to provide your courier receipt or any other
            relevant information to support your claim. All disputes will be handled on a case-by-case basis.
          </p>

          <p className="mt-8">
            Thank you for your cooperation and for being a respectful member of the VASTRAHIRE community. Your timeliness
            ensures that another person gets to experience the joy of a beautiful product for their own special day.
          </p>
        </div>
        {/* Helpful Links */}
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            href="/earn-through-us"
            className="rounded-2xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
          >
            Okay
          </Link>
        </div>

        {/* Small Footer Note */}
        <p className="mt-8 text-xs text-neutral-500">
          Last updated: {new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
        </p>
      </section>
    </main>
  )
}
