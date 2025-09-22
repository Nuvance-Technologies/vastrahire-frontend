import axios from "axios";

export const getProducts = async (id: string, subCategory?: string) => {
  try {
    if (!id) {
      console.error("Category ID is required");
      return [];
    }

    if (subCategory === "all" || !subCategory) {
      const res = await axios(`/api/product?catId=${id}`);
      return res.data.products || [];
    }
    
    // Use the subCategory route for specific subcategory filtering
    const res = await axios(`/api/product/subCategory?subCat=${encodeURIComponent(subCategory)}&catId=${id}`);
    return res.data.products || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
