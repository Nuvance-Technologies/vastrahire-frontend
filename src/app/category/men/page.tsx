"use client";

import { Header } from "@/app/components/Header";
import { AnnouncementBar } from "../../components/Announcement-bar";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BecomeLender } from "@/app/components/Become-lender";
import { ProductI, SubCatI } from "../women/page";
import { fetchSubCategories } from "@/util/get-subCategories";
import { getProducts } from "@/util/get-product";

function AnimatedDropdown({
  id,
  label,
  options,
  activeDropdown,
  setActiveDropdown,
}: {
  id: string;
  label: string;
  options: string[];
  activeDropdown: string | null;
  setActiveDropdown: (id: string | null) => void;
}) {
  const open = activeDropdown === id;
  const [selected, setSelected] = useState(label);

  return (
    <div className="relative">
      <button
        onClick={() => setActiveDropdown(open ? null : id)}
        className="flex items-center justify-between w-full border px-3 py-2 text-sm text-gray-700 rounded-md bg-white shadow-sm hover:bg-gray-50 transition"
      >
        <span>{selected}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="absolute mt-1 w-full bg-white border rounded-md shadow-md z-10 overflow-hidden"
          >
            {options.map((option) => (
              <li
                key={option}
                onClick={() => {
                  setSelected(option);
                  setActiveDropdown(null);
                }}
                className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                {option}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ClothingPage() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [sortOpen, setSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Relevance");
  const [activeCategory, setActiveCategory] = useState("All");
  const [subCategories, setSubCategories] = useState<SubCatI[]>([]);
  const [products, setProducts] = useState<ProductI[]>([]);
  const [catId, setCatId] = useState("");

  const getProductsBySubCategory = async (subCategory?: string) => {
    const productRes = await getProducts(catId, subCategory);
    setProducts(productRes);
  };

  const getSubCategories = async () => {
    const subs = await fetchSubCategories("men");

    if (subs.length > 0) {
      setCatId(subs[0]._id); // ✅ use first element’s _id
      if (subs[0].subcategories.length > 0) {
        setSubCategories(subs[0].subcategories);
      }
    }
  };

  useEffect(() => {
    (async () => {
      await getSubCategories();
      // ✅ ensure catId is set before fetching products
      if (catId) {
        getProductsBySubCategory("all");
      }
    })();
  }, [catId]);

  // ✅ Filtered products
  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.subcategory === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Header />

      {/* ✅ Sticky Top Navigation with Categories */}
      <div className="border-b sticky top-0 bg-white z-20">
        <div className="max-w-8xl mx-auto px-6 bg-[#3d000c68] flex items-center space-x-4 overflow-x-auto h-12">
          <button
            onClick={() => {
              setActiveCategory("All");
              getProductsBySubCategory("all");
            }}
            className={`text-sm font-bold py-1 px-3 rounded-xl transition ${
              activeCategory === "All"
                ? "bg-black text-white"
                : "text-gray-700 hover:text-black"
            }`}
          >
            All
          </button>
          {subCategories.map((cat, id) => (
            <button
              key={id}
              onClick={() => {
                setActiveCategory(cat?.name);
                getProductsBySubCategory(cat?.name);
              }}
              className={`text-sm font-bold py-1 px-3 rounded-xl transition capitalize ${
                activeCategory === cat?.name
                  ? "bg-black text-white"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              {cat?.name}
            </button>
          ))}
        </div>
      </div>
      <BecomeLender />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* ✅ Dynamic Heading */}
        <h1 className="text-xl mb-6 font-bold text-gray-800">
          {activeCategory === "All" ? "All Products" : activeCategory}
        </h1>

        {/* Filters (Dropdowns) */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8 font-bold">
          <AnimatedDropdown
            id="cat"
            label="Categories"
            options={["Sarees", "Lehengas", "Indo Western", "Salwar Kameez"]}
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
          />
          <AnimatedDropdown
            id="col"
            label="Colour"
            options={["Red", "Wine", "Peach", "Cream", "Dark"]}
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
          />
          <AnimatedDropdown
            id="dis"
            label="Discount"
            options={[
              "0% and above",
              "10% and above",
              "20% and above",
              "30% and above",
              "40% and above",
            ]}
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
          />
          <AnimatedDropdown
            id="fab"
            label="Fabric"
            options={["Silk", "Cotton", "Linen", "Georgette", "Chiffon"]}
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
          />
          <AnimatedDropdown
            id="pat"
            label="Pattern"
            options={["Embroidered", "Floral", "Geometric", "Abstract"]}
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
          />
          <AnimatedDropdown
            id="occ"
            label="Occasion"
            options={[
              "Festival wear",
              "Party wear",
              "Casual wear",
              "Formal wear",
              "Ethnic wear",
            ]}
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
          />
          <AnimatedDropdown
            id="siz"
            label="Size"
            options={["Small", "Medium", "Large", "X-Large", "XX-Large"]}
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
          />
          <AnimatedDropdown
            id="pri"
            label="Price"
            options={["0-500", "500-1000", "1000-1500", "1500-2000", "2000+"]}
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
          />
        </div>

        {/* Sub Heading + Sort Dropdown */}
        <div className="flex items-center justify-between border-b pb-3 mb-6">
          <p className="text-sm text-gray-700 font-medium">
            {activeCategory === "All" ? "ALL" : activeCategory.toUpperCase()} |{" "}
            {filteredProducts.length} STYLES FOUND
          </p>

          {/* Sort */}
          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center space-x-1 text-sm font-medium text-gray-700 border px-3 py-2 rounded-md shadow-sm hover:bg-gray-50 transition"
            >
              <span>Sort By: {selectedSort}</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  sortOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {sortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10 overflow-hidden"
                >
                  {["Newest", "Price: Low to High", "Price: High to Low"].map(
                    (option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setSelectedSort(option);
                          setSortOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                      >
                        {option}
                      </button>
                    )
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ✅ Products Grid (filtered) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Link key={product._id} href={`/product/${product._id}`}>
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="aspect-[4/5] overflow-hidden">
                  <Image
                    src={product.pImages?.[0] || "/placeholder.svg"}
                    alt={product.pName}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    width={400}
                    height={500}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                    {product.pName}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-red-600 text-sm font-bold">
                      {product.pDiscount}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-colors">
            Load More Products
          </button>
        </div>
      </main>
    </div>
  );
}
