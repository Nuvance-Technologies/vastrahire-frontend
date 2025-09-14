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
  const [notFound, setNotFound] = useState(false);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setNotFound(false);

      const response = await fetch(
        `/api/get-productById?productId=${productId}`
      );

      if (response.ok) {
        const data = await response.json();
        if (data?.product) {
          setProduct(data.product);
        } else {
          setNotFound(true);
        }
      } else {
        setNotFound(true);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      setNotFound(true);
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

  // ✅ Not found state
  if (notFound || !product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AnnouncementBar />
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-neutral-800 mb-4">
            Product Not Found
          </h1>
          <p className="text-muted-foreground">
            The product you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>
    );
  }

  // ✅ Product found
  return (
    <div className="min-h-screen bg-gray-50">
      <AnnouncementBar />
      <Header />
      <ProductDetail product={product} />
    </div>
  );
}
