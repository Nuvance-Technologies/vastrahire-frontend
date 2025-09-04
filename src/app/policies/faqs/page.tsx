"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"

type FAQItem = {
  question: string
  answer: string
}

type FAQSection = {
  title: string
  items: FAQItem[]
}

const faqData: FAQSection[] = [
  {
    title: "General Questions",
    items: [
      {
        question: "What is VASTRAHIRE?",
        answer:
          "VASTRAHIRE is a platform that allows you to rent a wide range of designer and high-end products, including clothing, shoes, jewelry, bags, and watches. Our mission is to make luxury accessible and to promote a sustainable, circular fashion economy.",
      },
      {
        question: "How does the rental process work?",
        answer:
          "Simply browse our collection, select your desired item, choose your rental period, and complete the booking. We will ship the item to you, and when you are done, you will use the provided return packaging to send it back.",
      },
    ],
  },
  {
    title: "Rental Period & Logistics",
    items: [
      {
        question: "How long can I rent an item for?",
        answer:
          "Our rental periods are based on full days. The length of the rental period will be specified for each item.",
      },
      {
        question: "How is the rental period calculated?",
        answer:
          "The day your item is delivered is considered the first day of your rental. For example, if you have a 3-day rental and it is delivered on a Monday, your rental period ends on Wednesday.",
      },
      {
        question: "How do I return my rental?",
        answer:
          "We provide a pre-paid return shipping label and a special return bag with every order. Simply place the item in the bag and hand it over to our courier partner by 5:00 PM on your designated return date.",
      },
      {
        question: "What is the return date?",
        answer:
          "Your return date is the day after your rental period ends. For example, for a 3-day rental that starts on a Monday, your rental period ends on Wednesday, and your return date is Thursday.",
      },
    ],
  },
  {
    title: "Fees, Deposits, & Policy",
    items: [
      {
        question: "What fees are included in my rental?",
        answer:
          "Your total cost includes the rental fee, a refundable security deposit, and a small, mandatory damage waiver fee. Standard delivery and dry-cleaning fees are included in the total rental cost displayed at checkout.",
      },
      {
        question: "What is the security deposit for?",
        answer:
          "The security deposit is a refundable amount held to cover potential issues such as late returns or significant damage. It will be fully refunded to you once the item is returned and passes our quality inspection.",
      },
      {
        question: "How much is the security deposit?",
        answer:
          "The security deposit is calculated as 10% of the item's current retail value, with a minimum of ₹500 and a maximum of ₹5,000.",
      },
      {
        question: "What if I return an item late?",
        answer:
          "A late fee of 15% of your rental amount per day will be charged for each day the item is late. Minimum ₹200 and maximum ₹1,000 per day.",
      },
      {
        question: "What is the Wear & Care Policy?",
        answer:
          "We cover minor, normal wear and tear such as a loose thread, a missing bead, or a minor scuff on a shoe. However, you are responsible for any significant damage, loss, or theft.",
      },
    ],
  },
  {
    title: "Specific Products",
    items: [
      {
        question: "Do you clean the items before sending them out?",
        answer:
          "Absolutely. Every single item undergoes a meticulous, multi-step professional cleaning and sanitization process after every rental.",
      },
      {
        question: "How are your bags, jewelry, and watches cared for?",
        answer:
          "We use specialized, professional techniques for each category. Bags are carefully cleaned and conditioned. Jewelry is cleaned with an ultrasonic cleaner. Watches are polished and sanitized.",
      },
      {
        question: "What if a product doesn't fit?",
        answer:
          "We provide detailed measurements and size guides for all our products. Please check these carefully, as we do not offer refunds or credits for sizing issues.",
      },
    ],
  },
  {
    title: "Lender Questions",
    items: [
      {
        question: "How can I become a lender?",
        answer:
          "Simply visit our 'Become a Lender' section and submit your items. We handle all the logistics, so you can earn passive income effortlessly.",
      },
      {
        question: "How will I be compensated if my item is damaged or stolen?",
        answer:
          "In the rare event of irreparable damage, loss, or theft, you will be fully compensated for the current retail value of your item.",
      },
    ],
  },
]

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <main className="min-h-screen w-full bg-white">
      <div className="flex justify-center">
        <Image
          src="/vastrahire2.png"
          alt="FAQs"
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
            <li className="text-neutral-900 font-medium">FAQs</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
            Frequently Asked Questions (FAQs)
          </h1>
          <p className="mt-3 text-neutral-600">
            Welcome to our FAQ section! We've compiled a list of common questions to make your VASTRAHIRE experience as smooth as possible.
          </p>
        </header>

        {/* FAQ Sections */}
        <div className="space-y-10">
          {faqData.map((section, sectionIdx) => (
            <div key={sectionIdx}>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">{section.title}</h2>
              <div className="space-y-3">
                {section.items.map((item, idx) => {
                  const id = sectionIdx * 100 + idx
                  const isOpen = open === id
                  return (
                    <div
                      key={idx}
                      className="border border-neutral-200 rounded-xl shadow-sm overflow-hidden"
                    >
                      <button
                        onClick={() => setOpen(isOpen ? null : id)}
                        className="w-full flex justify-between items-center px-4 py-3 bg-neutral-50 hover:bg-neutral-100 transition"
                      >
                        <span className="text-left font-medium text-neutral-900">{item.question}</span>
                        <ChevronDown
                          className={`w-5 h-5 text-neutral-600 transition-transform ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 py-3 bg-white text-neutral-700">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <p className="mt-12 text-xs text-neutral-500 text-center">
          Last updated: {new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
        </p>
      </section>
    </main>
  )
}
