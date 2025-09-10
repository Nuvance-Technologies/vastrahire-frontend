import axios from "axios";

export const fetchSubCategories = async (name: string) => {
  try {
    const response = await axios.get(`/api/category?name=${name}`);
    return response.data.categories;
  } catch (error) {
    console.error(error);
  }
};
