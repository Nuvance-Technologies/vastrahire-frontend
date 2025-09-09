import axios from "axios";

export const getProducts = async (id: string, subCategory?: string) => {
  if (subCategory === "all") {
    const res = await axios(`/api/product?catId=${id}`);
    console.log(res.data);
    return res.data.products || [];
  }
  const res = await axios(`/api/product/?subCat=${subCategory}&catId=${id}`);
  return res.data.products || [];
};
