import { api } from "../utility/interceptor";

export const getAllTranscation = async () => {
  try {
    const response = await api.get("/order/transactions");
    return response?.data;
  } catch (err) {
    return err;
  }
};