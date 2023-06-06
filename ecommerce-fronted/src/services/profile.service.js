import { api } from "../utility/interceptor";

export const getUserProfile = async (id) => {
  try {
    const result = await api.get(`/user/profile/${id}`);
    return { status: 200, data: result?.data?.data };
  } catch (err) {
    return { message: err };
  }
};

export const updateUserProfile = async (values) => {
  try {
    const response = await api.put("user/profile", values);
    return response;
  } catch (err) {
    return err;
  }
};

export const addNewAddress = async (values) => {
  try {
    const response = await api.post("/address/", values);
    return response?.data;
  } catch (error) {
    return error;
  }
};

export const updateAddress = async (id, values) => {
  try {
    const response = await api.put(`/address/${id}`, values);
    return response?.data;
  } catch (err) {
    return err;
  }
};

export const getAllAddress = async () => {
  try {
    const response = await api.get(`/address/`);
    return response?.data;
  } catch (err) {
    return err;
  }
};

export const getContries = async () => {
  try {
    const response = await api.get("user/countries");
    return response;
  } catch (err) {
    return err;
  }
};

export const getState = async (id) => {
  try {
    const response = await api.get(`/user/state/${id}`);
    return response;
  } catch (err) {
    return err;
  }
};

export const getCities = async (id) => {
  try {
    const response = await api.get(`/user/city/${id}`);
    return response;
  } catch (err) {
    return err;
  }
};

export const getAddress = async () => {
  try {
    const response = await api.get(`/address`);
    return response?.data;
  } catch (err) {
    return err;
  }
};

export const getDashboard = async () => {
  try {
    const result = await api.get("/user/dashboard");
    return { status: 200, data: result?.data?.data };
  } catch (err) {
    return err;
  }
};

export const removeAddress = async (id) => {
  try {
    const response = await api.delete(`/address/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const getUserProduct = async (id) => {
  try {
    const response = await api.get(`/user/profile/${id}`);
    return response?.data;
  } catch (error) {
    return error;
  }
};

export const removeUser = async (id) => {
  try {
    const response = await api.put(`/user/${id}`,{
      isActive:false
    });
    return response;
  } catch (err) {
    return { message: err.response.data.message };
  }
};
