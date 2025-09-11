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

  const fetchProduct = async () => {
    const response = await fetch(`/api/get-productById?productId=${productId}`);
    const data = await response.json();
    setProduct(data.product);
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <AnnouncementBar />
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Product Not Found
          </h1>
          <p className="text-muted-foreground">
            The product you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />
      <ProductDetail product={product} />
    </div>
  );
}
