// app/policies/wear-and-care/page.tsx
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
    title: "Wear & Care Policy | VASTRAHIRE",
    description:
        "Understand VASTRAHIRE's Wear & Care Policy: our promise on normal wear & tear, your responsibilities, category-specific care, and handling of significant damage or loss.",
    alternates: {
        canonical: "/policies/wear-and-care",
    },
    robots: {
        index: true,
        follow: true,
    },
}

export default function WearAndCarePolicyPage() {
    return (
        <main className="min-h-screen w-full bg-white">
            <div className="flex justify-center">
                <Image
                    src="/vastrahire2.png"
                    alt="Wear & Care Policy"
                    width={300}
                    height={300}
                    className="object-cover"
                />
            </div>
            <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
                {/* Breadcrumb */}
                <nav aria-label="Breadcrumb" className="mb-6 text-sm text-neutral-600">
                    <ol className="flex items-center gap-2">
                        <li>
                            <Link href="/" className="hover:underline">Home</Link>
                        </li>
                        <li aria-hidden className="select-none">/</li>
                        <li className="text-neutral-900 font-medium">Wear & Care Policy</li>
                    </ol>
                </nav>

                {/* Header */}
                <header className="mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
                        The VASTRAHIRE Wear & Care Policy
                    </h1>
                    <p className="mt-3 text-neutral-600">
                        As the CEO of VASTRAHIRE, I want to assure you that our commitment extends far beyond providing beautiful
                        products. We are dedicated to ensuring every item in our collection is treated with the utmost care, from the
                        moment it leaves our hands until it is safely returned.
                    </p>
                    <p className="mt-3 text-neutral-600">
                        This policy is designed to give you peace of mind, so you can focus on enjoying your moment, knowing that we
                        have you covered for normal wear and tear, and that you understand the expectations for handling our
                        products.
                    </p>
                </header>

                {/* Policy Content */}
                <div className="prose prose-neutral max-w-none text-neutral-600">
                    <h2 id="care-promise" className="scroll-mt-24">1. The VASTRAHIRE Care Promise: Normal Wear & Tear</h2>
                    <p>
                        We understand that minor imperfections are a natural part of a product's life cycle. Our professional team
                        handles these small repairs and restoration tasks in-house, at no extra cost to you. You will never be
                        charged for normal, respectful use of an item.
                    </p>
                    <p>This includes:</p>
                    <ul>
                        <li>A loose thread or a single missing bead on a garment.</li>
                        <li>A minor, fixable scuff on the sole of a shoe.</li>
                        <li>A faint fingernail mark on leather.</li>
                        <li>A simple clasp repair on a piece of jewelry.</li>
                        <li>A hairline scratch on a watch's metal band.</li>
                    </ul>

                    <h2 id="responsibility" className="scroll-mt-24">2. Your Responsibility: Treat with Utmost Care</h2>
                    <p>
                        Every item on our platform is a cherished asset. You agree to treat all products with the same level of care
                        and respect you would give to your own most valuable possessions.
                    </p>
                    <p>General Guidelines:</p>
                    <ul>
                        <li>DO NOT attempt to clean, or alter the product in any way. All cleaning is handled by our professionals.</li>
                        <li>Avoid exposure to moisture, extreme heat, or direct sunlight for extended periods.</li>
                        <li>Do not lend the product to anyone else. You are solely responsible during the rental period.</li>
                    </ul>

                    <h2 id="category-care" className="scroll-mt-24">3. Category-Specific Care</h2>
                    <h3>For Clothing (Women's, Men's & Kids')</h3>
                    <ul>
                        <li>Be mindful of makeup, perfumes, and deodorants that can transfer and stain delicate fabrics.</li>
                        <li>Avoid situations where garments could snag or rip on sharp objects.</li>
                    </ul>

                    <h3>For Shoes</h3>
                    <ul>
                        <li>Wear shoes only on surfaces appropriate for their type (e.g., avoid stilettos on grass or gravel).</li>
                        <li>Avoid getting the shoes wet.</li>
                    </ul>

                    <h3>For Bags</h3>
                    <ul>
                        <li>Use the provided dust bag when not in use to protect from dust and scratches.</li>
                        <li>Avoid overstuffing, which can damage shape and seams.</li>
                        <li>Be cautious with pen ink, makeup, and liquids inside the bag.</li>
                    </ul>

                    <h3>For Jewelry & Watches</h3>
                    <ul>
                        <li>Avoid exposure to water, harsh chemicals, perfumes, or lotions.</li>
                        <li>Do not attempt to open, repair, or replace any part of the item yourself.</li>
                        <li>For watches, avoid extreme shocks or impacts.</li>
                    </ul>

                    <h2 id="damage-loss" className="scroll-mt-24">4. Significant Damage, Loss, or Theft</h2>
                    <p>
                        While our Damage Waiver covers small accidents, it does not cover significant damage, loss, or theft.
                    </p>
                    <p>
                        <strong>Significant Damage</strong> is defined as any damage that renders the item unrentable or requires
                        extensive, costly repair. This includes:
                    </p>
                    <ul>
                        <li>Large, non-removable stains (e.g., wine, dye transfer).</li>
                        <li>Major rips, tears, or burn marks.</li>
                        <li>A shattered watch face or a broken shoe heel.</li>
                        <li>Any unauthorized alterations to the product.</li>
                    </ul>
                    <p>
                        In the rare event of significant damage, loss, or theft, the renter will be held responsible for the full
                        current retail value of the product, as outlined in our Rental Agreement.
                    </p>

                    <p className="mt-8">
                        By adhering to this policy, you help us maintain the integrity of our collection for everyone to enjoy. Thank
                        you for being a responsible and valued member of the VASTRAHIRE community.
                    </p>
                </div>

                {/* Helpful Links */}
                <div className="mt-10 flex flex-wrap items-center gap-3">
                    <Link
                        href="/"
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