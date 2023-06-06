import { api } from "../utility/interceptor";

export const getAllCategory = async () => {
  try {
    const response = await api.get("/public-category");
    return response?.data?.data;
  } catch (err) {
    return { message: err.response.data.message };
  }
};
