import { api } from "../utility/interceptor";

export const addCart = async (values) => {
  try {
    const result = await api.post("/cart", values);
    return { status: 200, data: result?.data?.data };
  } catch (err) {
    return err;
  }
};

export const getCart = async (values) => {
  try {
    const result = await api.get("/cart");
    return { status: 200, data: result?.data?.data };
  } catch (err) {
    return err;
  }
};

export const deleteCart = async (id) => {
  try {
    const response = await api.delete(`/cart/${id}`);
    return { data: response?.data?.data };
  } catch (error) {
    return error;
  }
};
