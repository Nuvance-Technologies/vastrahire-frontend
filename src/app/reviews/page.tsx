"use client"

import { useEffect, useState } from "react"
import ReviewCard, { type Review } from "../components/reviews/review-card"
import ReviewForm from "../components/reviews/review-form"

const STORAGE_KEY = "reviews:v1"

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null
      if (raw) {
        const parsed = JSON.parse(raw) as Review[]
        setReviews(parsed)
      }
    } catch {
      // ignore parsing errors
    }
  }, [])

  // Persist to localStorage
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews))
      }
    } catch {
      // ignore quota or serialization errors
    }
  }, [reviews])

  const addReview = (r: Review) => {
    setReviews((prev) => [r, ...prev])
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
      <header className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-balance text-2xl font-bold text-gray-900 sm:text-3xl">Product Reviews</h1>
          <p className="mt-1 text-sm text-gray-500">Read what others think and share your experience.</p>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="order-2 md:order-1">
          <section aria-label="Reviews" className="grid gap-4">
            {reviews.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-200 bg-white p-6 text-center text-sm text-gray-500">
                No reviews yet. Be the first to write one!
              </div>
            ) : (
              <div className="grid gap-4">
                {reviews.map((r) => (
                  <ReviewCard key={r.id} review={r} />
                ))}
              </div>
            )}
          </section>
        </div>

        <div className="order-1 md:order-2">
          <ReviewForm onAdd={addReview} />
        </div>
      </div>
    </main>
  )
}
