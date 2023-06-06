import { api } from "../utility/interceptor";

export const getAllSubCategory = async () => {
  try {
    const response = await api.get("/public-subcategory");
    return response?.data?.data;
  } catch (err) {
    return { message: err.response.data.message };
  }
};
