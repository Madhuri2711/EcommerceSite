import { api } from "../utility/interceptor";

export const getBlog = async () => {
  try {
    const result = await api.get("/blogs");
    return result?.data?.data;
  } catch (err) {
    return err;
  }
};

export const getBlogDetail = async (id) => {
  try {
    const response = await api.get(`/blogs/${id}`);
    return response?.data?.data;
  } catch (error) {
    return error;
  }
};
