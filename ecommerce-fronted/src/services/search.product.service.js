import { api } from "../utility/interceptor";

export const getSearchValue = async (values) => {
  try {
    const response = await api.post("/product/search", values);
    return response;
  } catch (err) {
    return err;
  }
};
