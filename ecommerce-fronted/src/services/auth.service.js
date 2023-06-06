import { api } from "../utility/interceptor";

export const register = async (values) => {
  try {
    const { firstName, lastName, userName, email, password } = values;
    const response = await api.post("auth/signup", {
      firstName,
      lastName,
      userName,
      email,
      password,
    });
    return response;
  } catch (error) {
    return {
      message: error,
    };
  }
};

const login = async (values) => {
  try {
    const response = await api.post("auth/login", values);
    if (response.data.data.token) {
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("userName", response.data.data.userName);
      localStorage.setItem("userid", response.data.data._id);
    }

    return response;
  } catch (err) {
    return { message: err };
  }
};

export const forgotPassword = async (values) => {
  try {
    const response = await api.post("auth/forgot", {
      email: values.email,
    });
    return response;
  } catch (err) {
    return { message: err.response.data.message };
  }
};

export const forgotPasswordChange = async (values) => {
  try {
    const response = await api.post(
      "auth/forgot-password-change",
      values
    );
    return response;
  } catch (err) {
    return { status: err.response.status, message: err.response.data.message };
  }
};

export const changePasswordRequest = async (values) => {
  try {
    const response = await api.post("auth/changePassword", values);
    return response;
  } catch (err) {
    return { message: err.response.data.message };
  }
};

const logout = (props) => {
  localStorage.removeItem("token");
  localStorage.removeItem("userName");
  localStorage.removeItem("userid");
  localStorage.removeItem("productCompareId");
  // localStorage.removeItem("compareItems");
  localStorage.removeItem("myObject");
  props.history.push("/");
};

export default {
  register,
  login,
  logout,
};
