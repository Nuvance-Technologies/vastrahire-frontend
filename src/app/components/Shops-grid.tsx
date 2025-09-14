"use client";
// Product type for fetched products

import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { ProductI } from "../category/women/page";
import Link from "next/link";

interface CategoryOption {
  _id: string;
  name: string;
  subcategories: string[];
}

export function ShopsGrid() {
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [products, setProducts] = useState<ProductI[]>([]);
  const [categories, setCategories] = useState<CategoryOption[]>([]);

  const filteredProducts =
    activeCategoryId === null
      ? products
      : products.filter((product) => product.category === activeCategoryId);

  const getProductsAndCategories = async () => {
    try {
      const response = await axios.get("/api/product/categories");
      // response.data is array of categories, e.g. [{_id, name}]
      const fetchedCategories: CategoryOption[] = response.data;
      setCategories(fetchedCategories);
      const allProducts: ProductI[] = [];
      for (const cat of fetchedCategories) {
        const productRes = await axios.get(`/api/product?catId=${cat._id}`);
        // Ensure each product has category field set to cat._id and image set to first pImages
        const productsWithCategoryId = productRes.data.products.map(
          (p: any) => ({
            ...p,
            category: cat._id,
            image:
              Array.isArray(p.pImages) && p.pImages.length > 0
                ? p.pImages[0]
                : "/placeholder.svg",
          })
        );
        allProducts.push(...productsWithCategoryId);
      }
      setProducts(allProducts);
    } catch (error) {
      console.error("Error fetching categories and products:", error);
    }
  };

  useEffect(() => {
    getProductsAndCategories();
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Featured Products
            </h2>
            <p className="text-gray-600 text-lg">
              Discover curated collections from our top-rated partners
            </p>
          </div>
        </div>

        {/* Category Filter Bar */}
        <div className="flex space-x-4 overflow-x-auto pb-4 mb-8">
          <button
            key="all"
            onClick={() => setActiveCategoryId(null)}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition ${activeCategoryId === null
                ? "bg-[#3d000c] text-white border-[#3d000c]"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => setActiveCategoryId(cat._id)}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition ${activeCategoryId === cat._id
                  ? "bg-[#3d000c] text-white border-[#3d000c]"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Shops Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, idx) => (
            <Link href={`/product/${product._id}`}>
              <div
                key={product._id ?? product._id ?? idx}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-200"
              >
                <div className="relative">
                  <Image
                    src={product.pImages[0] || "/placeholder.svg"}
                    alt={product.pName}
                    className="w-full h-48 object-cover rounded-t-lg"
                    width={100}
                    height={100}
                  />
                  <span className="absolute top-3 left-3 bg-white/90 text-gray-800 text-sm px-2 py-1 rounded">
                    {/* Show category name for product */}
                    {categories.find((cat) => cat._id === product.category)?.name}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {product.pName}
                  </h3>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>&#8377; {product.pPrice}/day</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
