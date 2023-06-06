import { api } from "../utility/interceptor";

export const compareProduct = async (values) => {
  try {
    const response = await api.post("/product/compare", values);
    return response?.data;
  } catch (err) {
    return err?.response?.data;
  }
};
