"use client";

import React, { useMemo, useState, useEffect, Suspense } from "react";
import { MapPin, Crown, Gem, Search } from "lucide-react";
import { Header } from "../components/Header";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { UserI } from "../components/Individual-renters";
import axios from "axios";
import { ProductI } from "../category/women/page";

function LenderProfilePage() {
  const searchParams = useSearchParams();
  const ownerId = searchParams.get("ownerId");

  const [profile, setProfile] = useState<UserI | null>(null);
  const [products, setProducts] = useState<ProductI[]>([]);
  const [showCategories, setShowCategories] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [sortOption, setSortOption] = useState<string>("Default");

  const router = useRouter();

  useEffect(() => {
    if (!ownerId) return;

    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/get-user?userId=${ownerId}`);
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get(`/api/product/${ownerId}`);
        // ✅ Adjust based on your API response
        setProducts(response.data.products ?? response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchUser();
    fetchProducts();
  }, [ownerId]);

  const sortedAndFiltered = useMemo(() => {
    let list = [...products];

    if (activeCategory !== "All") {
      list = list.filter((p) => p.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.pName.toLowerCase().includes(q) ||
          p.pDesc.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q)
      );
    }

    switch (sortOption) {
      case "Cheapest":
        return list.sort((a, b) => a.pPrice - b.pPrice);
      case "New Arrivals":
        return list.sort(
          (a, b) =>
            new Date(b.createdAt ?? "").getTime() -
            new Date(a.createdAt ?? "").getTime()
        );
      default:
        return list;
    }
  }, [products, activeCategory, sortOption, searchQuery]);

  useEffect(() => {
    document.body.style.overflow = filterOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [filterOpen]);

  return (
    <main className="min-h-screen bg-slate-50">
      <Header />

      {/* Profile Section */}
      <section className="container mx-auto px-4 pt-8">
        <div className="grid grid-cols-2 md:grid-cols-3 items-center gap-6">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
                {profile?.name?.firstname} {profile?.name?.lastname}
              </h1>
            </div>

            <div className="mt-2 flex items-center gap-2 text-slate-600">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              <span className="text-sm sm:text-base">{profile?.address}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 🔍 Desktop Search Bar */}
      <section className="container mx-auto px-4 mt-6 hidden md:block">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3d000c] focus:border-[#3d000c]"
          />
        </div>
      </section>

      {/* Products */}
      <section className="container mx-auto px-4 mt-6 pb-28 md:pb-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {sortedAndFiltered.map((p) => (
            <article
              key={p._id}
              onClick={() => router.push(`/product/${p._id}`)}
              className="group rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-t-xl relative">
                <Image
                  src={p.pImages[0]}
                  alt={p.pName}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  width={400}
                  height={300}
                />
              </div>
              <div className="p-3 sm:p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm sm:text-base font-semibold text-slate-900">
                    {p.pName}
                  </h3>
                  <span className="text-[#3d000c] font-semibold text-sm">
                    ${p.pPrice}/day
                  </span>
                </div>
                <p className="mt-1 text-xs sm:text-sm text-slate-600">
                  {p.pDesc}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-slate-100 text-slate-700">
                    {p.subcategory}
                  </span>
                  <button className="text-sm text-[#3d000c] font-medium">
                    View
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default function LenderProfileWrapper() {
  return (
    <Suspense fallback={<div className="p-6">Loading profile...</div>}>
      <LenderProfilePage />
    </Suspense>
  );
}
