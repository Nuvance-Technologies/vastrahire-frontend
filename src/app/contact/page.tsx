"use client"

import type React from "react"
import Link from "next/link"
import { Mail, MessageSquare, Phone, ShieldCheck, Clock, CheckCircle2 } from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 900))
    setSubmitting(false)
    setSuccess(true)
    ;(e.currentTarget as HTMLFormElement).reset()
  }

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero */}
      <section className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold">
                We’re here to help you rent with confidence
              </h1>
              <p className="mt-4 text-gray-600">
                Questions about an order, product fit, or becoming a lender? Reach out. Our team replies fast and treats
                every request with care.
              </p>

              {/* Trust points */}
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                <li className="flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-[#3d000c] mt-0.5" />
                  <div>
                    <p className="font-medium">Safe & secure</p>
                    <p className="text-sm text-gray-500">
                      Your data is protected. We never sell personal info.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-[#3d000c] mt-0.5" />
                  <div>
                    <p className="font-medium">Fast responses</p>
                    <p className="text-sm text-gray-500">Typical reply time under 2 hours on business days.</p>
                  </div>
                </li>
              </ul>

              {/* Contact shortcuts */}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="mailto:support@rentstyle.example"
                  className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100 transition"
                >
                  <Mail className="h-4 w-4" />
                  Email support
                </Link>
                <Link
                  href="#contact-form"
                  className="inline-flex items-center gap-2 rounded-md bg-[#3d000c] px-4 py-2 text-sm text-white hover:bg-[#690216] transition"
                >
                  <MessageSquare className="h-4 w-4" />
                  Send a message
                </Link>
                <Link
                  href="tel:+11234567890"
                  className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100 transition"
                >
                  <Phone className="h-4 w-4" />
                  Call us
                </Link>
              </div>
            </div>

            {/* Guidance card */}
            <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold">How to get the fastest help</h2>
              <ol className="mt-4 space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#3d000c] mt-0.5" />
                  Include your order number or product link (if applicable).
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#3d000c] mt-0.5" />
                  Add sizing/fit details for apparel or availability dates for gear.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#3d000c] mt-0.5" />
                  Attach photos for any item condition questions.
                </li>
              </ol>

              <div className="mt-6 rounded-md border border-dashed border-gray-300 p-4 text-sm text-gray-600">
                We reply Monday–Friday 9am–6pm. Urgent rental issues? Call us and we’ll prioritize your case.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Contact form */}
          <div className="p-6 bg-gray-50 rounded-lg shadow-sm lg:col-span-2" id="contact-form">
            <h2 className="text-xl font-semibold">Send us a message</h2>
            <p className="mt-1 text-sm text-gray-600">
              We answer every request. Expect a reply in under 2 hours during business hours.
            </p>

            <form className="mt-6 space-y-4" onSubmit={onSubmit}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="text-sm font-medium">Full name</label>
                  <input id="name" name="name" placeholder="Alex Morgan" required className="mt-1.5 w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <input id="email" name="email" type="email" placeholder="you@example.com" required className="mt-1.5 w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                <input id="subject" name="subject" placeholder="Question about renting a camera" className="mt-1.5 w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
              </div>

              <div>
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <textarea id="message" name="message" placeholder="Tell us what you need help with..." required className="mt-1.5 w-full rounded-md border border-gray-300 px-3 py-2 text-sm min-h-[120px]" />
                <p className="mt-2 text-xs text-gray-500">
                  By submitting, you agree to our{" "}
                  <Link href="/terms" className="underline hover:text-[#690216]">Terms</Link> and{" "}
                  <Link href="/privacy" className="underline hover:text-[#690216]">Privacy Policy</Link>. We’ll never share your information.
                </p>
              </div>

              <div className="flex items-center justify-between gap-3">
                <div className="text-xs text-gray-500">
                  Attach photos or videos after we reply — we’ll send you a secure upload link.
                </div>
                <button type="submit" disabled={submitting} className="min-w-28 bg-[#3d000c] text-white px-4 py-2 rounded-md hover:bg-[#690216] transition">
                  {submitting ? "Sending..." : "Send message"}
                </button>
              </div>

              {success && (
                <div className="mt-3 rounded-md border border-gray-300 bg-green-50 px-3 py-2 text-sm flex items-center gap-2 text-green-700">
                  <CheckCircle2 className="h-4 w-4" />
                  Thanks! Your message has been sent. We’ll get back to you shortly.
                </div>
              )}
            </form>
          </div>

          {/* Assurance + quick options */}
          <div className="space-y-6">
            <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
              <h3 className="text-base font-semibold">Our assurance to you</h3>
              <ul className="mt-4 space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#3d000c] mt-0.5" />
                  End-to-end encrypted support threads
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-[#3d000c] mt-0.5" />
                  Priority for ongoing rentals and delivery issues
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#3d000c] mt-0.5" />
                  100% satisfaction guarantee on responses
                </li>
              </ul>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
              <h3 className="text-base font-semibold">Prefer a different channel?</h3>
              <div className="mt-4 space-y-3 text-sm">
                <Link href="mailto:support@rentstyle.example" className="flex items-center gap-3 hover:text-[#690216] transition">
                  <Mail className="h-4 w-4 text-[#690216]" />
                  support@rentstyle.example
                </Link>
                <Link href="tel:+11234567890" className="flex items-center gap-3 hover:text-[#690216] transition">
                  <Phone className="h-4 w-4 text-[#690216]" />
                  +1 (123) 456-7890
                </Link>
                <Link href="#contact-form" className="flex items-center gap-3 hover:text-[#690216] transition">
                  <MessageSquare className="h-4 w-4 text-[#690216]" />
                  Live chat (during business hours)
                </Link>
              </div>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
              <h3 className="text-base font-semibold">FAQ</h3>
              <details className="mt-3 border-t border-gray-200 py-2">
                <summary className="cursor-pointer font-medium">How fast do you respond?</summary>
                <p className="mt-2 text-sm text-gray-600">Most messages are answered within 2 hours, Monday–Friday 9am–6pm.</p>
              </details>
              <details className="border-t border-gray-200 py-2">
                <summary className="cursor-pointer font-medium">Can you help me choose sizes or gear?</summary>
                <p className="mt-2 text-sm text-gray-600">Yes — tell us your dates, location, preferences, and we’ll recommend items.</p>
              </details>
              <details className="border-t border-gray-200 py-2">
                <summary className="cursor-pointer font-medium">Is my information safe?</summary>
                <p className="mt-2 text-sm text-gray-600">Yes. We keep your data private and secure. We never sell personal details.</p>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600 text-center sm:text-left">
            Prefer email? We’ll keep the thread for your records.
          </p>
          <Link
            href="mailto:support@rentstyle.example"
            className="inline-flex items-center gap-2 rounded-md bg-[#3d000c] px-4 py-2 text-sm text-white hover:bg-[#690216] transition"
          >
            <Mail className="h-4 w-4" />
            Email our team
          </Link>
        </div>
      </section>
    </main>
  )
}
