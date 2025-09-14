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
    pDesc:
      "A stylish dummy product for testing. Lightweight, comfortable, and perfect for trying out product detail view.",
    pSize: ["S", "M", "L", "XL"],
    pImages: ["/dummy-dress.jpg"],
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
    createdAt: new Date(),
  };

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
          setProduct(dummyProduct); // fallback
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
