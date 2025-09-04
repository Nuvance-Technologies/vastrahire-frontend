// app/about/page.tsx
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
    title: "About Us | VASTRAHIRE",
    description:
        "Discover the story behind VASTRAHIRE – a smarter way to experience luxury fashion with partner boutiques, community closets, and sustainable style.",
    alternates: {
        canonical: "/about",
    },
    robots: {
        index: true,
        follow: true,
    },
}

export default function AboutPage() {
    return (
        <main className="min-h-screen w-full bg-white">\
            <div className="flex justify-center">
              <Link href="/">
                <Image
                    src="/vastrahire2.png"
                    alt="About VASTRAHIRE"
                    width={200}
                    height={200}
                    className="object-cover"
                />
              </Link>
            </div>
            <section className="relative isolate overflow-hidden bg-[#3d000c] py-20 text-center text-white">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                        About VASTRAHIRE: A Smarter Way to Experience Luxury
                    </h1>
                    <p className="mt-4 text-lg text-neutral-200">
                        Life is a collection of unforgettable moments—weddings, celebrations, and milestones that deserve elegance.
                    </p>
                </div>
            </section>

            {/* Story Section */}
            <section className="mx-auto max-w-4xl text-gray-700 px-4 sm:px-6 lg:px-8 py-12 prose prose-neutral">
                <p>
                    We founded VASTRAHIRE on a simple, powerful belief: that the breathtaking look that makes these moments magical
                    should be within reach for everyone, without the burden of a single-use purchase.
                </p>
                <p>
                    Our journey began with a vision to make luxury accessible. Today, we have expanded our vision to curate a
                    complete universe of style, giving you the freedom to express yourself for every occasion.
                </p>
            </section>

            {/* Collections Section */}
            <section className="bg-neutral-50 py-16">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-8 text-center">
                        Our Distinct, Yet Complementary Collections
                    </h2>
                    <div className="grid gap-8 md:grid-cols-2">
                        <div className="rounded-2xl bg-white p-6 shadow-sm hover:shadow-md transition">
                            <Image
                                src="/images/partner-boutique.jpg"
                                alt="Partner boutiques"
                                width={600}
                                height={400}
                                className="rounded-xl mb-4 object-cover"
                            />
                            <h3 className="text-xl font-semibold mb-2 text-neutral-800">Our Partner Boutiques</h3>
                            <p className="text-neutral-700">
                                We collaborate with a network of esteemed fashion boutiques to bring you the latest designer garments,
                                elegant shoes, jewelry, watches, and stylish bags.
                            </p>
                        </div>

                        {/* Community Closets */}
                        <div className="rounded-2xl bg-white p-6 shadow-sm hover:shadow-md transition">
                            <Image
                                src="/images/community-closet.jpg"
                                alt="Community closet"
                                width={600}
                                height={400}
                                className="rounded-xl mb-4 object-cover"
                            />
                            <h3 className="text-xl font-semibold mb-2 text-neutral-800">Community Closets</h3>
                            <p className="text-neutral-700">
                                At the heart of our mission, we empower a vibrant community of fashion lovers to share their personal
                                collections. This promotes a sustainable and stylish cycle by giving new life to cherished, pre-loved
                                garments, shoes, jewelry, and watches.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Commitment Section */}
            <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 prose prose-neutral text-neutral-700">
                <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900">
                    Our Promise: Trust & Transformation
                </h2>
                <p>
                    We are more than just a platform; we are your partners in style. Every single item on our platform—whether it
                    comes from a partner boutique or an individual's closet—is meticulously inspected and professionally cared for
                    to ensure it arrives in pristine condition.
                </p>
                <p>
                    From the moment you browse our collection of women's, men's, and kids' clothing, shoes, bags, jewelry, and
                    watches to the moment you own the room, we are dedicated to providing a seamless and delightful experience.
                </p>
            </section>

            {/* Call to Action */}
            <section className="bg-[#3d000c] py-16 text-center text-white">
                <h2 className="text-2xl sm:text-3xl font-bold">Welcome to VASTRAHIRE</h2>
                <p className="mt-4 max-w-2xl mx-auto text-neutral-200">
                    Welcome to a smarter, more sustainable way to experience luxury.
                </p>
                <div className="mt-6 flex justify-center">
                    <Link
                        href="/products"
                        className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-neutral-900 shadow hover:bg-neutral-100"
                    >
                        Explore Our Collection
                    </Link>
                </div>
            </section>
        </main>
    )
}
