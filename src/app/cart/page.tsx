"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"

type CartItem = {
  id: number
  name: string
  image: string
  dailyRate: number
  qty: number
}

const FALLBACK_CART: CartItem[] = [
  { id: 1, name: "Canon EOS R6", image: "/vintage-camera-still-life.png", dailyRate: 30, qty: 1 },
  { id: 2, name: "DJI Mavic 3", image: "/dji-mavic-3-drone.png", dailyRate: 45, qty: 2 },
]

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([])

  // Load from localStorage or use fallback
  useEffect(() => {
    try {
      const raw = localStorage.getItem("cart")
      if (raw) {
        setItems(JSON.parse(raw))
      } else {
        setItems(FALLBACK_CART)
      }
    } catch {
      setItems(FALLBACK_CART)
    }
  }, [])

  // Persist on change
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(items))
    } catch { }
  }, [items])

  const totals = useMemo(() => {
    const totalItems = items.reduce((sum, it) => sum + it.qty, 0)
    const totalPrice = items.reduce((sum, it) => sum + it.qty * it.dailyRate, 0)
    return { totalItems, totalPrice }
  }, [items])

  const inc = (id: number) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, qty: it.qty + 1 } : it)))
  }
  const dec = (id: number) => {
    setItems(
      (prev) =>
        prev.map((it) => (it.id === id ? { ...it, qty: Math.max(1, it.qty - 1) } : it)).filter(Boolean) as CartItem[],
    )
  }
  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((it) => it.id !== id))
  }

  return (
    <main className="min-h-screen bg-slate-50 pb-32 md:pb-12">
      <div className="container mx-auto px-4">
        <header className="py-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Your Cart</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Product List */}
          <section className="md:col-span-2 space-y-4">
            {items.length === 0 ? (
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm text-center">
                <p className="text-slate-700">Your cart is empty.</p>
                <p className="text-slate-500 text-sm mt-1">Browse products and add items to rent.</p>
              </div>
            ) : (
              items.map((it) => (
                <article
                  key={it.id}
                  className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-20 w-20 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                      <Image
                        src={it.image || "/placeholder.svg?height=120&width=120&query=cart%20item"}
                        alt={it.name}
                        className="h-full w-full object-cover"
                        width={80}
                        height={80}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-slate-900 font-semibold truncate">{it.name}</h3>
                      <p className="text-slate-600 text-sm mt-0.5">₹{it.dailyRate}/day</p>
                      <div className="mt-3 flex items-center gap-3">
                        <div className="inline-flex items-center rounded-full border border-slate-200">
                          <button
                            aria-label="Decrease quantity"
                            onClick={() => dec(it.id)}
                            className="px-3 py-1.5 text-slate-700 hover:bg-slate-50"
                          >
                            −
                          </button>
                          <span className="px-3 py-1.5 text-slate-900 font-medium">{it.qty}</span>
                          <button
                            aria-label="Increase quantity"
                            onClick={() => inc(it.id)}
                            className="px-3 py-1.5 text-slate-700 hover:bg-slate-50"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(it.id)}
                          className="text-sm text-slate-600 hover:text-red-600"
                          aria-label={`Remove ${it.name}`}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="hidden sm:block text-right">
                      <p className="text-slate-900 font-semibold">₹{(it.qty * it.dailyRate).toFixed(2)}</p>
                      <p className="text-slate-500 text-xs">Subtotal</p>
                    </div>
                  </div>
                </article>
              ))
            )}
          </section>

          {/* Summary (desktop) */}
          <aside className="hidden md:block">
            <div className="sticky top-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Summary</h2>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Total items</span>
                  <span className="text-slate-900 font-medium">{totals.totalItems}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Total price</span>
                  <span className="text-slate-900 font-semibold">₹{totals.totalPrice.toFixed(2)}</span>
                </div>
              </div>
              <div className="pt-5">
                <Link
                  href="/customer/payment"
                  className="block w-full text-center bg-[#3d000c] text-white font-medium py-3 px-4 rounded-xl shadow hover:bg-[#5a0014] transition"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Summary (mobile fixed) */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/70">
        <div className="mx-auto max-w-screen-sm px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-600">Total</p>
              <p className="text-base font-semibold text-slate-900">
              ₹{totals.totalPrice.toFixed(2)}{" "}
                <span className="text-slate-500 text-sm">({totals.totalItems} items)</span>
              </p>
            </div>
            <Link href="/customer/payment">
              <button className="inline-flex items-center rounded-lg bg-[#3d000c] text-white px-4 py-2.5 font-medium hover:bg-[#87001b] transition-colors">
                Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
