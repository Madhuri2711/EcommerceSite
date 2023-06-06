import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import AuthService from "../services/auth.service";

const name = "auth";

export const register = createAsyncThunk(
  `${name}/signupDataStatus`,
  async (values) => {
    try {
      const response = await AuthService.register(values);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const login = createAsyncThunk(
  `${name}/signinDataStatus`,
  async (userCredentialData) => {
    const data = await AuthService.login(userCredentialData);
      return data;
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});

const initialState = {
  isLoggedIn: false,
  error: null,
  user: {},
};

const authSlice = createSlice({
  name,
  initialState,
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [register.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.error = null;
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

const { reducer } = authSlice;
export default reducer;
