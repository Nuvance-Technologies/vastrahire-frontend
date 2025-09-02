"use client"

import type React from "react"

import { useMemo, useRef, useState } from "react"
import type { Review } from "./review-card"

type MediaItem = { type: string; dataUrl: string }

function classNames(...c: (string | false | null | undefined)[]) {
  return c.filter(Boolean).join(" ")
}

export default function ReviewForm({ onAdd }: { onAdd: (r: Review) => void }) {
  const [name, setName] = useState("")
  const [text, setText] = useState("")
  const [rating, setRating] = useState(5)
  const [files, setFiles] = useState<FileList | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const starButtons = useMemo(
    () =>
      [1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
          onClick={() => setRating(n)}
          className={classNames(
            "rounded-md p-2 transition-colors",
            n <= rating ? "text-amber-500" : "text-gray-300",
            "hover:bg-gray-50",
          )}
        >
          <svg className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.036a1 1 0 0 0-1.175 0l-2.802 2.036c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.88 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 0 0 .95-.69l1.07-3.292Z" />
          </svg>
        </button>
      )),
    [rating],
  )

  async function toDataUrl(f: File): Promise<MediaItem> {
    const reader = new FileReader()
    return new Promise((resolve, reject) => {
      reader.onerror = () => reject(new Error("Failed to read file"))
      reader.onload = () => resolve({ type: f.type, dataUrl: String(reader.result) })
      reader.readAsDataURL(f)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const media: MediaItem[] = []
      if (files && files.length) {
        // limit to first 6 files for performance
        const slice = Array.from(files).slice(0, 6)
        for (const f of slice) {
          media.push(await toDataUrl(f))
        }
      }
      const review: Review = {
        id: crypto.randomUUID(),
        name: name.trim() || "Anonymous",
        rating,
        text: text.trim(),
        dateISO: new Date().toISOString(),
        media,
      }
      onAdd(review)
      setName("")
      setText("")
      setRating(5)
      if (fileInputRef.current) fileInputRef.current.value = ""
      setFiles(null)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <h2 className="text-base font-semibold text-gray-900">Write a review</h2>
      <p className="mt-1 text-sm text-gray-500">Share your experience. Add photos or videos if you like.</p>

      <div className="mt-4 grid gap-4">
        <div className="grid gap-2">
          <label htmlFor="review-name" className="text-sm font-medium text-gray-700">
            Your name
          </label>
          <input
            id="review-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Doe"
            className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="grid gap-2">
          <span className="text-sm font-medium text-gray-700">Rating</span>
          <div className="flex items-center gap-1" role="radiogroup" aria-label="Rating">
            {starButtons}
          </div>
        </div>

        <div className="grid gap-2">
          <label htmlFor="review-text" className="text-sm font-medium text-gray-700">
            Your review
          </label>
          <textarea
            id="review-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            rows={4}
            placeholder="What did you like or dislike?"
            className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="review-media" className="text-sm font-medium text-gray-700">
            Photos or videos
          </label>
          <input
            id="review-media"
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={(e) => setFiles(e.target.files)}
            className="block w-full text-sm text-gray-600 file:mr-4 file:rounded-md file:border-0 file:bg-emerald-50 file:px-3 file:py-2 file:text-emerald-700 hover:file:bg-emerald-100"
          />
          {!!files?.length && <p className="text-xs text-gray-500">{files.length} file(s) selected</p>}
        </div>

        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={submitting || !text.trim()}
            className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-60 transition-colors"
          >
            {submitting ? "Submitting..." : "Post review"}
          </button>
        </div>
      </div>
    </form>
  )
}
