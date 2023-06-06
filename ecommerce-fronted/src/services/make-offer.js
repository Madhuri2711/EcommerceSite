import { api } from "../utility/interceptor";

export const addMakeOffer = async (values) => {
  try {
    const response = await api.post("/make-offer", values);
    return response?.data;
  } catch (err) {
    return err?.response?.data;
  }
};
