import axios from "axios";
import { signOut } from "./helpers";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    if (response.status === 401) {
      alert("You are not authorized");
      return Promise.reject("You are not authorized");
    }
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 403) {
      signOut();
    }
    return Promise.reject(error.message);
  }
);