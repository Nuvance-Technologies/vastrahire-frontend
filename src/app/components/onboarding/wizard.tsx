"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

type Question = {
  id: string
  title: string
  options: { id: string; label: string }[]
  section: "common" | "rent" | "lend"
}

function OptionPill({ name, value, label, selected, onChange }: {
  name: string
  value: string
  label: string
  selected: boolean
  onChange: (next: boolean) => void
}) {
  return (
    <label
      className={[
        "cursor-pointer select-none rounded-xl border px-4 py-3 text-sm md:text-base font-medium transition",
        "inline-flex items-center gap-2",
        selected
          ? "bg-[#3d000c] text-white border-[#3d000c] shadow-sm ring-1 ring-[#3d000c]"
          : "border-slate-200 hover:border-[#3d000c] hover:bg-[#3d000c1a] text-slate-700",
      ].join(" ")}
    >
      <input
        type="checkbox"
        name={name}
        value={value}
        className="sr-only"
        checked={selected}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span
        className="h-2 w-2 rounded-full border"
        aria-hidden="true"
        style={{ borderColor: selected ? "white" : "rgb(148 163 184)" }}
      />
      <span>{label}</span>
    </label>
  )
}

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = total > 0 ? Math.round(((current + 1) / total) * 100) : 0
  return (
    <div className="mt-8">
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full bg-[#3d000c] transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-slate-500">
        Step {current + 1} of {total}
      </p>
    </div>
  )
}

export default function OnboardingWizard() {
  const router = useRouter();
  const { data: session } = useSession();
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [activeIndex, setActiveIndex] = useState(0);
  const [animPhase, setAnimPhase] = useState<"enter" | "exit">("enter");
  const [loading, setLoading] = useState(false);

  // Inside OnboardingWizard.tsx

  // 1. All questions combined
  const steps: Question[] = [
    // --- Part 1: For All Users ---
    {
      id: "style-inspiration",
      title: "What inspires your style the most?",
      section: "common",
      options: [
        { id: "latest-trends", label: "I follow the latest trends." },
        { id: "classic-timeless", label: "I love classic, timeless looks." },
        { id: "unique-expressive", label: "My style is unique and expressive." },
        { id: "sustainable-ethical", label: "I care about sustainable and ethical fashion." },
      ],
    },
    {
      id: "color-preference",
      title: "Which of these colors are you most drawn to for special occasions?",
      section: "common",
      options: [
        { id: "vibrant-bright", label: "Vibrant & Bright (Fuchsia, Emerald, Turquoise)" },
        { id: "deep-royal", label: "Deep & Royal (Wine, Navy, Black)" },
        { id: "soft-pastel", label: "Soft & Pastel (Lavender, Powder Blue, Mint)" },
        { id: "earthy-natural", label: "Earthy & Natural (Olive, Rust, Terracotta)" },
        { id: "metallic-sparkling", label: "Metallic & Sparkling (Gold, Silver, Bronze)" },
      ],
    },
    {
      id: "event-likelihood",
      title: "What kind of event are you most likely to attend or host in the next year?",
      section: "common",
      options: [
        { id: "weddings-sangeets", label: "Weddings & Sangeets" },
        { id: "formal-dinners-galas", label: "Formal Dinners & Galas" },
        { id: "festivals-cultural", label: "Festivals & Cultural Events" },
        { id: "weekend-getaways", label: "Weekend Getaways & Trips" },
        { id: "professional-corporate", label: "Professional & Corporate Events" },
      ],
    },

    // --- Part 2: For Renters ---
    {
      id: "rent-challenge",
      title: "What is your biggest challenge when getting ready for a special event?",
      section: "rent",
      options: [
        { id: "nothing-to-wear", label: "I have nothing to wear!" },
        { id: "cost-buying-designer", label: "The cost of buying designer clothes." },
        { id: "finding-fit-size", label: "Finding the right fit or size." },
        { id: "avoiding-repeats", label: "Avoiding fashion repeats." },
        { id: "cleaning-storing", label: "Hassle of cleaning & storing clothes." },
      ],
    },
    {
      id: "discover-styles",
      title: "How do you typically discover new styles and fashion trends?",
      section: "rent",
      options: [
        { id: "social-media", label: "Social Media (Instagram, Pinterest)" },
        { id: "magazines-blogs", label: "Fashion Magazines & Blogs" },
        { id: "celebrity-influencer", label: "Celebrity & Influencer Style" },
        { id: "friends-recommendations", label: "Word-of-Mouth from friends" },
        { id: "shopping-in-person", label: "Shopping in person" },
      ],
    },
    {
      id: "price-range",
      title: "What is the average price range you are comfortable with for rentals?",
      section: "rent",
      options: [
        { id: "upto-1500", label: "Up to ₹1,500" },
        { id: "1500-3000", label: "₹1,500 - ₹3,000" },
        { id: "3000-6000", label: "₹3,000 - ₹6,000" },
        { id: "6000-10000", label: "₹6,000 - ₹10,000" },
        { id: "10000-plus", label: "₹10,000+" },
      ],
    },
    {
      id: "fit-concern",
      title: "When choosing an outfit, what is your biggest concern about fit?",
      section: "rent",
      options: [
        { id: "length", label: "Length (too long/short)" },
        { id: "tight-loose", label: "Too tight/loose in areas" },
        { id: "match-photos", label: "Fit may not match photos" },
        { id: "size-charts", label: "Trouble with size charts" },
      ],
    },

    // --- Part 3: For Lenders ---
    {
      id: "lend-motivation",
      title: "What is your primary motivation for lending clothes?",
      section: "lend",
      options: [
        { id: "earn-passive", label: "To earn passive income" },
        { id: "sustainable", label: "To make pre-loved items sustainable" },
        { id: "declutter", label: "To declutter my closet" },
        { id: "share-style", label: "To share my style with others" },
      ],
    },
    {
      id: "lend-items",
      title: "What types of items are you most excited to lend?",
      section: "lend",
      options: [
        { id: "women", label: "Women’s Clothing (Lehengas, Gowns, Sarees, etc.)" },
        { id: "men", label: "Men’s Clothing (Sherwanis, Suits, Blazers, etc.)" },
        { id: "kids", label: "Kids’ Clothing (Ethnic, Party, Special Occasion, Casual wear)" },
        { id: "bags", label: "Bags & Purses (Clutches, Handbags, Evening Bags)" },
        { id: "watches-jewelry", label: "Watches & Jewelry (Luxury Watches, Earrings, Necklaces, etc.)" },
        { id: "shoes", label: "Shoes (Heels, Sandals, Ethnic, Formal)" },
      ],
    },
  ]


  const total = steps.length
  const current = steps[activeIndex]
  const selectedForCurrent = (current && answers[current.id]) || []

  useEffect(() => setAnimPhase("enter"), [activeIndex])

  function toggleOption(qid: string, opt: string) {
    setAnswers((prev) => {
      const set = new Set(prev[qid] || [])
      if (set.has(opt)) set.delete(opt)
      else set.add(opt)
      return { ...prev, [qid]: Array.from(set) }
    })
  }

  function canProceed() {
    return (answers[current?.id || ""]?.length || 0) > 0
  }

  function next() {
    setAnimPhase("exit")
    setTimeout(() => {
      setActiveIndex((i) => (i + 1 < total ? i + 1 : i))
    }, 180)
  }

  async function finish() {
    setLoading(true);
    try {
      const userId = session?.user?.id;
      if (!userId) {
        alert("User not logged in");
        setLoading(false);
        return;
      }
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, answers }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Onboarding answers saved!");
        router.push("/customer/dashboard"); // or wherever you want to redirect
      } else {
        alert(data.error || "Failed to save answers");
      }
    } catch (err) {
      alert("Error saving onboarding answers");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: "url('/vastrahire.jpg')" }}
    >
      <div className="mx-auto max-w-xl px-4 py-8 md:py-12 bg-white/30 backdrop-blur-sm rounded-2xl shadow-lg">
        <header className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">
            Tell us about your style
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Help VASTRAHIRE personalize your renting and lending experience.
          </p>
        </header>

        {current && (
          <section
            key={current.id}
            className={[
              "rounded-2xl border border-slate-200 bg-white/60 p-5 md:p-6 shadow-sm",
              animPhase === "enter"
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2",
            ].join(" ")}
          >
            <span className="md:text-xl text-md rounded-xl font-semibold py-1 px-3 bg-[#ffecd1] text-[#3d000c] text-center flex justify-center">
              {current.section === "common" && "For all users"}
              {current.section === "rent" && "For renters"}
              {current.section === "lend" && "For lenders"}
            </span>


            <h2 className="text-lg md:text-xl font-semibold text-slate-900 mt-5">
              {current.title}
            </h2>

            <div className="mt-4 flex flex-wrap gap-2">
              {current.options.map((opt) => (
                <OptionPill
                  key={opt.id}
                  name={current.id}
                  value={opt.id}
                  label={opt.label}
                  selected={selectedForCurrent.includes(opt.id)}
                  onChange={() => toggleOption(current.id, opt.id)}
                />
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div className="text-xs text-slate-500">
                {selectedForCurrent.length > 0
                  ? `${selectedForCurrent.length} option${selectedForCurrent.length > 1 ? "s" : ""
                  } selected`
                  : "Select one or more options"}
              </div>
              <button
                type="button"
                onClick={activeIndex === total - 1 ? finish : next}
                disabled={!canProceed() || loading}
                className={[
                  "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition",
                  canProceed() && !loading
                    ? "bg-[#3d000c] text-white hover:bg-[#6d0016e8]"
                    : "bg-slate-200 text-slate-500 cursor-not-allowed",
                ].join(" ")}
              >
                {loading
                  ? "Saving..."
                  : activeIndex === total - 1
                  ? "Finish"
                  : "Next"}
              </button>
            </div>

            <ProgressBar current={activeIndex} total={total} />
          </section>
        )}
      </div>
    </div>
  )
}
