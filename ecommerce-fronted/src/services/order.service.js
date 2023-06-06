import { api } from "../utility/interceptor";

export const checkoutProduct = async (values) => {
    try {
        const response = await api.post("/order/checkout", values);
        console.log("response",response)
        return response;
    } catch (error) {
        return error;
    }
};