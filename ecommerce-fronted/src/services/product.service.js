import { api } from "../utility/interceptor";

export const getAllProduct = async () => {
  try {
    const response = await api.post("/product", {
      pageLimit: 8,
    });
    return { data: response?.data };
  } catch (err) {
    return { message: err?.response?.data?.message };
  }
};

export const getAllPublicProduct = async (values) => {
  try {
    const response = await api.post("/public-product", values);
    return { data: response?.data };
  } catch (err) {
    return { message: err?.response?.data?.message };
  }
};

export const getProductDetail = async (id) => {
  try {
    const response = await api.get(`/product/${id}`);
    return { data: response?.data };
  } catch (error) {
    return error;
  }
};

export const getPublicProductDetail = async (id) => {
  try {
    const response = await api.get(`/public-product/${id}`);
    return { data: response?.data };
  } catch (error) {
    return error;
  }
};

export const addProductComment = async (value) => {
  try {
    const response = await api.post(`/comment`, value);
    return { data: response?.data, status: 200 };
  } catch (error) {
    return error;
  }
};

export const getProductList = async (values) => {
  try {
    const response = await api.post("/public-product", values);
    return response?.data;
  } catch (err) {
    return { message: err?.response?.data?.message };
  }
};

export const addProductDetails = async (value) => {
  try {
    const response = await api.post("/product/add", value);
    return response?.data;
  } catch (error) {
    return error;
  }
};

export const updateProductDetails = async (id, value) => {
  try {
    const response = await api.put(`/product/update/${id}`, value);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProfileByUserId = async (id, value) => {
  try {
    const response = await api.put(`/product/update/${id}`, value);
    return response?.data;
  } catch (error) {
    return error;
  }
};

export const deleteProfileProduct = async (id) => {
  try {
    const response = await api.delete(`/product/${id}`);
    return response?.data;
  } catch (error) {
    return error;
  }
};

export const createBundle = async (value) => {
  try {
    const response = await api.post("product/make-bundle", value);
    return response?.data;
  } catch (error) {
    return error;
  }
};

export const getProductCount = async (values) => {
  try {
    const response = await api.post("/public-product/product-count/", values);
    return response?.data;
  } catch (error) {
    return error;
  }
};

export const getProductFilter = async () => {
  try {
    const response = await api.get("/filter/");
    return response?.data;
  } catch (error) {
    return error;
  }
};
