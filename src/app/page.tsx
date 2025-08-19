'use client'

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function ComingSoon() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-pink-50 to-white flex flex-col items-center justify-center p-4">
      <main className="max-w-4xl w-full text-center space-y-12 py-8">
        {/* Logo */}
        <motion.div
          className="mb-8 flex flex-col items-center justify-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 120, damping: 15 }}
        >
          <Image
            src="/vastrahire.jpg"
            alt="VASTRAHIRE Logo"
            width={200}
            height={200}
            className="rounded-full shadow-xl border-4 border-indigo-100"
          />
          <p className="text-lg text-gray-600 mt-4">
            Clothes • Shoes • Jewellery on Rent
          </p>
        </motion.div>

        {/* Hero Section */}
        <motion.section
          className="space-y-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
            Your Fashion Journey <span className="text-indigo-600">Begins Soon</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We’re crafting an exceptional experience for renting stylish clothes,
            trendy shoes, and elegant jewellery. Be the first to know when we launch!
          </p>
        </motion.section>

        {/* Email Subscription */}
        <motion.section
          className="max-w-md mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {submitted ? (
            <motion.div
              className="bg-green-100 text-green-700 p-4 rounded-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              Thank you! We'll notify you as soon as we launch.
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 text-black focus:ring-indigo-500 focus:border-transparent outline-none transition"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition"
                >
                  Notify Me
                </button>
              </div>
              <p className="text-sm text-gray-500">
                We care about your privacy. Your information will never be shared.
              </p>
            </form>
          )}
        </motion.section>

        {/* Features Preview */}
        <motion.section
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto pt-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          {[
            { icon: '👗', title: 'Designer Clothes', desc: 'Curated fashion for every occasion' },
            { icon: '👠', title: 'Trendy Shoes', desc: 'Step out in style with premium footwear' },
            { icon: '💎', title: 'Elegant Jewellery', desc: 'Complete your look with statement pieces' },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition cursor-pointer"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="font-semibold text-lg mb-2 text-black">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.section>
      </main>

      <footer className="mt-16 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} VASTRAHIRE. All rights reserved.</p>
      </footer>
    </div>
  );
}
