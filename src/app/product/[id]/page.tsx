"use client";

import { ProductI } from "@/app/category/women/page";
import { AnnouncementBar } from "../../components/Announcement-bar";
import { Header } from "../../components/Header";
import { ProductDetail } from "../../components/product-detail";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductPage() {
  const params = useParams<{ id: string }>();
  const productId = params.id;

  const [product, setProduct] = useState<ProductI | null>(null);
  const [loading, setLoading] = useState(true);

  const dummyProduct: ProductI = {
    _id: "dummy123",
    pName: "Dummy Summer Dress",
    pPrice: 1499,
    pretailPrice: 0,
    pDesc:
      "A stylish dummy product for testing. Lightweight, comfortable, and perfect for trying out product detail view.",
    pSize: ["S", "M", "L", "XL"],
    pImages: ["/elegant-dress.png", "/images/Slide3.jpg"],
    pColor: "Red",
    category: "Women",
    subcategory: "Dresses",
    pDiscount: "20% OFF",
    pFabric: "Cotton",
    pPattern: "Floral",
    pOccasion: "Casual wear",
    availability: "In Stock",
    ownerID: "owner_dummy",
    pLocation: "India",
    quantity: 15,
    pRating: 4.2,
    createdAt: new Date(),
    sizeChart: {
      S: { bust: "32", waist: "26", hips: "36" },
      M: { bust: "34", waist: "28", hips: "38" },
      L: { bust: "36", waist: "30", hips: "40" },
      XL: { bust: "38", waist: "32", hips: "42" },
    },
  };
  // Whenever you set product state, auto-calculate pretailPrice
  useEffect(() => {
    if (product?.pPrice) {
      // Example: Retail price = rental price + 20%
      const calculatedRetail = Math.round(product.pPrice * 1.2);

      setProduct((prev) =>
        prev ? { ...prev, pretailPrice: calculatedRetail } : prev
      );
    }
  }, [product?.pPrice]);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `/api/get-productById?productId=${productId}`
      );

      if (response.ok) {
        const data = await response.json();
        if (data?.product) {
          setProduct(data.product);
        } else {
          setProduct(dummyProduct);
        }
      } else {
        setProduct(dummyProduct);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      setProduct(dummyProduct);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  // ✅ Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-muted-foreground">Loading product...</p>
      </div>
    );
  }

  // ✅ Always show product (real or dummy)
  return (
    <div className="min-h-screen bg-gray-50">
      <AnnouncementBar />
      <Header />
      <ProductDetail product={product!} />
    </div>
  );
}
