type MediaItem = { type: string; dataUrl: string }

export type Review = {
  id: string
  name: string
  rating: number
  text: string
  dateISO: string
  media: MediaItem[]
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Rating: ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          className={`h-4 w-4 ${n <= rating ? "text-amber-500" : "text-gray-300"}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.036a1 1 0 0 0-1.175 0l-2.802 2.036c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.88 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 0 0 .95-.69l1.07-3.292Z" />
        </svg>
      ))}
    </div>
  )
}

export default function ReviewCard({ review }: { review: Review }) {
  const date = new Date(review.dateISO).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return (
    <article className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">{review.name}</h3>
          <p className="mt-1 text-xs text-gray-500">{date}</p>
        </div>
        <Stars rating={review.rating} />
      </div>

      <p className="mt-4 text-sm leading-6 text-gray-700">{review.text}</p>

      {review.media.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {review.media.map((m, idx) => (
            <div key={idx} className="group overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
              {m.type.startsWith("video/") ? (
                <video
                  controls
                  className="h-32 w-full object-cover transition-transform group-hover:scale-105"
                  src={m.dataUrl}
                />
              ) : (
                <img
                  alt={`Review media ${idx + 1}`}
                  className="h-32 w-full object-cover transition-transform group-hover:scale-105"
                  src={m.dataUrl || "/placeholder.svg"}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </article>
  )
}
