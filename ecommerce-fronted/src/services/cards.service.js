import { api } from "../utility/interceptor";

export const getCardsList = async () => {
  try {
    const response = await api.get("/payment/cards");
    return response?.data;
  } catch (err) {
    return { message: err };
  }
};

export const addNewCard = async (values) => {
  try {
    const response = await api.post("/payment/new-card", values);
    return response?.data;
  } catch (err) {
    return { message: err };
  }
};

export const removeCard = async (id) => {
  try {
    const response = await api.delete(`/payment/card/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};
