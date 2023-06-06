import { api } from "../utility/interceptor";

export const getWalletBalance = async () => {
  try {
    const response = await api.get("/wallet/balance");
    return response?.data;
  } catch (err) {
    return err;
  }
};

export const getWalletTransaction = async () => {
  try {
    const response = await api.get("/wallet");
    return response?.data;
  } catch (err) {
    return { message: err };
  }
};
