import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { token } from '../lib/constant'
import { addWishList, removeWishlist, getAllWishlist } from '../services/wishlist'

export const STATUSES = Object.freeze({
  IDLE: 'idle',
  ERROR: 'error',
  LOADING: 'loading',
})


export const addToWishList = createAsyncThunk(
  'wishlist/add',
  async (value) => {
      const response = await addWishList(value)
      return response?.data
    } 
)

export const getWishlist = createAsyncThunk(
  'wishlist/fetch',
  async () => {
      const response = await getAllWishlist()
      return response?.data?.data
    } 
)


export const removeToWishlist = createAsyncThunk(
  "wishlist/remove",
  async (id) => {
      const response = await removeWishlist(id);
      return response;
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    wishList:[],
    allWishList:[],
    status: "",
  },
  // reducers: {
  //   removeproductDetail: (state) => {
  //     state.productDetail = []
  //   },
  // },
  extraReducers: (builder) => {
    builder
      .addCase(addToWishList.pending, (state, action) => {
        state.status = STATUSES.LOADING
      })
      .addCase(addToWishList.fulfilled, (state, action) => {
        console.log("action",action.payload)
        state.wishList = action.payload
        state.status = STATUSES.IDLE
      })
      .addCase(addToWishList.rejected, (state, action) => {
        state.status = STATUSES.ERROR
      }).addCase(getWishlist.pending, (state, action) => {
        state.status = STATUSES.LOADING
      })
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.allWishList = action.payload
        state.status = STATUSES.IDLE
      })
      .addCase(getWishlist.rejected, (state, action) => {
        state.status = STATUSES.ERROR
      }).addCase(removeToWishlist.pending, (state, action) => {
        state.status = STATUSES.LOADING
      })
      .addCase(removeToWishlist.fulfilled, (state, action) => {
        // state.allCart.data =  state?.allCart?.data.filter((cart) => cart._id !== action.payload.data._id) 
        state.status = STATUSES.IDLE
      })
      .addCase(removeToWishlist.rejected, (state, action) => {
        state.status = STATUSES.ERROR
      })
  },
})

// export const { removeproductDetail } = cartSlice.actions
export default wishlistSlice.reducer
