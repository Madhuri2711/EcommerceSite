import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserProfile, updateUserProfile } from "../services/profile.service";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const name = "user";

export const fetchUserDetails = createAsyncThunk(
  `${name}/fetch`,
  async (id) => {
    try {
      const response = await getUserProfile(id);
      return response?.data;
    } catch (error) {
      return error;
    }
  }
);

export const updateUser = createAsyncThunk(`${name}/update`, async (value) => {
  try {
    const response = await updateUserProfile(value);
    return response?.data;
  } catch (error) {
    return error;
  }
});

const userDetails = createSlice({
  name,
  initialState: {
    status: STATUSES.IDLE,
    updatedUserProfile: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updatedUserProfile = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(fetchUserDetails.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

const { reducer } = userDetails;
export default reducer;
