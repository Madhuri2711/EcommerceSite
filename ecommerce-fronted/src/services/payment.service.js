import { api } from "../utility/interceptor";

export const getPaymentIntent = async (values) => {
    console.log("valus",values)
  try {
    const response = await api.post("/payment/web-checkout", values);
    return response;
  } catch (error) {
    return error;
  }
};