import axios from "axios";
//import { signOut } from "../../src/helpers/helpers";
import { toast } from "react-hot-toast";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_LOCALURL,
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    if (response.status === 401) {
      toast.error("You are not authorized");
      return Promise.reject("You are not authorized");
    }

    if (response?.data?.status === 404) {
      if (response?.data?.message) {
        toast.error(response?.data?.message);
      }
      return response;
    }
    return response;
  },
  (error) => {
    if (
      error &&
      error?.response &&
      (error?.response?.status === 403 ||
        error.response.status === 401 ||
        error?.response?.status === 500)
    ) {
      // unauthorized
      // signOut();
    }
    if (error?.response && error?.response?.status === 500) {
      // internal server error
      toast.error(error?.response?.data?.message);
      return Promise.reject(error?.response?.data?.message);
    }
    if (error?.response && error?.response?.status === 404) {
      // method or api not found
      if (error?.response?.data.error) {
        toast.error(error?.response?.data?.error);
        return Promise.reject(error?.response?.data.error);
      } else if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
        return Promise.reject(error?.response?.data?.message);
      }
    }
    return Promise.reject(error);
  }
);

export const api = instance;
