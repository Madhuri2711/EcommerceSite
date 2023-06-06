import { api } from "../utility/interceptor";

export const postContactUs = async (values) => {
    try {
        const response = await api.post("/contact-us", values);
        return response;
    } catch (error) {
        return error;
    }
};