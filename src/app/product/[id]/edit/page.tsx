"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import Image from "next/image";
import axios from "axios";

interface ProductI {
    _id: string;
    pName: string;
    pPrice: number;
    pDesc: string;
    pSize: string[];
    pImages: string[];
    pColor: string;
    category: string;
    subcategory: string;
    pDiscount: string;
    pFabric: string;
    pPattern: string;
    pOccasion: string;
    availability: string;
    ownerID: string;
    pLocation: string;
    quantity: number;
}

export default function EditProduct() {
    const params = useParams();
    const router = useRouter();

    const [newProduct, setNewProduct] = useState<ProductI>({
        _id: "",
        pName: "",
        pPrice: 0,
        pDesc: "",
        pSize: [],
        pImages: [],
        pColor: "",
        category: "",
        subcategory: "",
        pDiscount: "",
        pFabric: "",
        pPattern: "",
        pOccasion: "",
        availability: "",
        ownerID: "",
        pLocation: "",
        quantity: 0,
    });

    const [isUploading, setIsUploading] = useState(false);

    // ✅ Fetch product by ID (prefill form)
    useEffect(() => {
        if (params?.id) {
            // Remove any trailing '}' or invalid characters from id
            const cleanId = typeof params.id === 'string' ? params.id.replace(/[^a-fA-F0-9]/g, '').slice(0, 24) : params.id;
            axios.get(`/api/get-productById?productId=${cleanId}`).then((res) => {
                setNewProduct(res.data.product);
            });
        }
    }, [params?.id]);

    // ✅ Handle Image Upload
    const handleProductImageChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (!e.target.files) return;

        setIsUploading(true);

        const files = Array.from(e.target.files);
        const uploadedUrls: string[] = [];

        for (const file of files) {
            const formData = new FormData();
            formData.append("file", file);
            // Example upload endpoint (replace with Cloudinary, S3, etc.)
            const res = await axios.post("/api/upload", formData);
            uploadedUrls.push(res.data.url);
        }

        setNewProduct((prev) => ({
            ...prev,
            pImages: [...prev.pImages, ...uploadedUrls],
        }));

        setIsUploading(false);
    };


    // ✅ Handle form submit
    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // 1. Map category name to ObjectId
            let categoryId = newProduct.category;
            if (categoryId && categoryId.length !== 24) {
                // Fetch category ObjectId by name
                const catRes = await axios.get(`/api/category?name=${newProduct.category}`);
                categoryId = catRes.data.category?._id || categoryId;
            }

            // 2. Fetch ownerID ObjectId if needed
            let ownerId = newProduct.ownerID;
            if (ownerId && ownerId.length !== 24) {
                const userRes = await axios.get(`/api/get-user?email=${newProduct.ownerID}`);
                ownerId = userRes.data._id || ownerId;
            }

            // 3. Build payload with correct ObjectIds
            const payload = {
                ...newProduct,
                category: categoryId,
                ownerID: ownerId,
            };
            const response = await axios.put('/api/updateProductDetail', payload);
        }
        catch (error) {
            console.error("Error updating product:", error);
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-6 my-6 bg-white rounded-lg shadow-md">
            <h1 className="text-xl font-bold mb-4">Edit Product</h1>

            <form
                className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-black"
                onSubmit={handleFormSubmit}
            >
                <input
                    type="text"
                    placeholder="Product Name"
                    value={newProduct.pName}
                    onChange={(e) =>
                        setNewProduct({ ...newProduct, pName: e.target.value })
                    }
                    className="border rounded-lg p-2 col-span-2 md:col-span-1"
                />

                {/* Category */}
                <select
                    value={newProduct.category}
                    onChange={(e) =>
                        setNewProduct({ ...newProduct, category: e.target.value })
                    }
                    className="border rounded-lg p-2 col-span-2 md:col-span-1"
                >
                    <option value="">Select Category</option>
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kids">Kids</option>
                </select>

                <input
                    type="number"
                    placeholder="Daily Rate (₹)"
                    value={newProduct.pPrice}
                    onChange={(e) =>
                        setNewProduct({ ...newProduct, pPrice: Number(e.target.value) })
                    }
                    className="border rounded-lg p-2 col-span-2 md:col-span-1"
                />

                <input
                    type="text"
                    placeholder="Available Sizes (S, M, L)"
                    value={newProduct.pSize.join(", ")}
                    onChange={(e) =>
                        setNewProduct({
                            ...newProduct,
                            pSize: e.target.value
                                .split(",")
                                .map((s) => s.trim())
                                .filter(Boolean),
                        })
                    }
                    className="border rounded-lg p-2 col-span-2 md:col-span-1"
                />

                <input
                    type="text"
                    placeholder="Pickup Location"
                    value={newProduct.pLocation}
                    onChange={(e) =>
                        setNewProduct({ ...newProduct, pLocation: e.target.value })
                    }
                    className="border rounded-lg p-2 w-full col-span-2"
                />

                <input
                    type="number"
                    placeholder="Quantity Available"
                    value={newProduct.quantity}
                    onChange={(e) =>
                        setNewProduct({ ...newProduct, quantity: Number(e.target.value) })
                    }
                    className="border rounded-lg p-2 col-span-2 md:col-span-1"
                />

                <input
                    type="text"
                    placeholder="Color"
                    value={newProduct.pColor}
                    onChange={(e) =>
                        setNewProduct({ ...newProduct, pColor: e.target.value })
                    }
                    className="border rounded-lg p-2 col-span-2 md:col-span-1"
                />

                <select
                    value={newProduct.subcategory}
                    onChange={(e) =>
                        setNewProduct({ ...newProduct, subcategory: e.target.value })
                    }
                    className="border rounded-lg p-2 col-span-2 md:col-span-1"
                >
                    <option value="">Select Subcategory</option>
                    <option value="clothes">Clothes</option>
                    <option value="accessories">Accessories</option>
                    <option value="footwear">Footwear</option>
                    <option value="jewellery">Jewellery</option>
                    <option value="handbags">Hand Bags</option>
                    <option value="watches">Watches</option>
                </select>

                <input
                    type="number"
                    placeholder="Discount (%)"
                    value={newProduct.pDiscount}
                    onChange={(e) =>
                        setNewProduct({ ...newProduct, pDiscount: e.target.value })
                    }
                    className="border rounded-lg p-2 col-span-2 md:col-span-1"
                />

                <input
                    type="text"
                    placeholder="Fabric"
                    value={newProduct.pFabric}
                    onChange={(e) =>
                        setNewProduct({ ...newProduct, pFabric: e.target.value })
                    }
                    className="border rounded-lg p-2 col-span-2 md:col-span-1"
                />

                <input
                    type="text"
                    placeholder="Pattern"
                    value={newProduct.pPattern}
                    onChange={(e) =>
                        setNewProduct({ ...newProduct, pPattern: e.target.value })
                    }
                    className="border rounded-lg p-2 col-span-2 md:col-span-1"
                />

                <input
                    type="text"
                    placeholder="Occasion"
                    value={newProduct.pOccasion}
                    onChange={(e) =>
                        setNewProduct({ ...newProduct, pOccasion: e.target.value })
                    }
                    className="border rounded-lg p-2 col-span-2 md:col-span-1"
                />

                <textarea
                    placeholder="Description"
                    value={newProduct.pDesc}
                    onChange={(e) =>
                        setNewProduct({ ...newProduct, pDesc: e.target.value })
                    }
                    className="border rounded-lg p-2 col-span-2"
                />

                {/* Images */}
                <input
                    type="file"
                    multiple
                    onChange={handleProductImageChange}
                    className="border rounded-lg p-2 col-span-2"
                />

                {/* Preview images */}
                {newProduct.pImages.length > 0 && (
                    <div className="col-span-2 flex gap-2 flex-wrap">
                        {newProduct.pImages.map((img, idx) => (
                            <Image
                                key={idx}
                                src={img}
                                alt="Product Image"
                                width={100}
                                height={100}
                                className="rounded border"
                            />
                        ))}
                    </div>
                )}

                {isUploading && <p className="text-sm text-blue-500">Uploading...</p>}

                <button
                    type="submit"
                    className="col-span-2 px-4 py-2 bg-[#3d000c] hover:bg-[#570112] text-white rounded-lg"
                >
                    <Plus className="inline h-4 w-4 mr-1" /> Update Product
                </button>
            </form>
        </div>
    );
}
