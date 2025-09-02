"use client"

import type React from "react"
import Link from "next/link"
import { useState } from "react"

export default function ContactWidget() {
    const [open, setOpen] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [success, setSuccess] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)
        // Simulate async submit
        setTimeout(() => {
            setSubmitting(false)
            setSuccess(true)
            setName("")
            setEmail("")
            setMessage("")
            // Auto-close after short delay
            setTimeout(() => {
                setOpen(false)
                setSuccess(false)
            }, 1800)
        }, 900)
    }

    return (
        <>
            <Link href="/contact">
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    aria-haspopup="dialog"
                    aria-expanded={open}
                    className="fixed bottom-5 right-5 z-40 rounded-full bg-[#3d000c] text-white shadow-lg hover:bg-[#690216] focus:outline-none cursor-pointer transition-colors p-4"
                >
                    <span className="sr-only">Contact us</span>
                    {/* Simple chat bubble icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-messages-square-icon lucide-messages-square"><path d="M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /><path d="M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1" /></svg>
                </button>
            </Link>
        </>
    )
}
