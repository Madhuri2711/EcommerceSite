import { api } from "../utility/interceptor";

export const postBankDetail = async (values) => {
  try {
    const response = await api.post("/payment/new-bank", values);
    return response;
  } catch (error) {
    return error;
  }
};

export const getBankDetail = async () => {
  try {
    const response = await api.get("/payment/banks");
    return response?.data;
  } catch (error) {
    return error;
  }
};