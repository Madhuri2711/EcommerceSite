import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { tryParseJSONObject } from "../helpers/helpers";

const initialState = {
  cartItems: tryParseJSONObject(localStorage.getItem("compareItems")) || [],
  compareProductTotalCount: 0,
};

const compareProductCountSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCompare(state, action) {
      if (!state.cartItems?.includes(action?.payload)) {
        state.cartItems.push(action?.payload);
        toast.success("Product Added To Compare.");
      } else {
        const index = state.cartItems.indexOf(action?.payload);
        if (index > -1) {
          state.cartItems.splice(index, 1);
          toast.success("Removed Product From Compare.");
        }
      }
      localStorage.setItem("compareItems", JSON.stringify(state.cartItems));
    },
    removeFromCompare(state, action) {
      state.cartItems.map((cartItem) => {
        if (cartItem === action?.payload?._id) {
          const nextCartItems = state?.cartItems?.filter(
            (item) => item !== cartItem
          );
          state.cartItems = nextCartItems;

          toast.success("Removed Product From Compare.");
        }
        localStorage.setItem("compareItems", JSON.stringify(state.cartItems));
        localStorage.setItem(
          "productCompareId",
          JSON.stringify(state.cartItems)
        );
        return state;
      });
    },
    getTotals(state, action) {
      state.compareProductTotalCount = state?.cartItems?.length;
    },
    clearCompare(state, action) {
      state.cartItems = [];
      localStorage.setItem("compareItems", JSON.stringify(state.cartItems));
      toast.success("All Product Removed From Compare.");
    },
  },
});

export const { addToCompare, removeFromCompare, getTotals, clearCompare } =
  compareProductCountSlice.actions;

export default compareProductCountSlice.reducer;
