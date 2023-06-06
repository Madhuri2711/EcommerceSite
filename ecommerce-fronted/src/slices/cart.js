import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { token } from '../lib/constant'
import { addCart, deleteCart, getCart } from '../services/cart.services'

export const STATUSES = Object.freeze({
  IDLE: 'idle',
  ERROR: 'error',
  LOADING: 'loading',
})


export const addToCart = createAsyncThunk(
  'cart/add',
  async (value) => {
      const response = await addCart(value)
      return response
    } 
)

export const getAllCart = createAsyncThunk(
  'cart/fetch',
  async () => {
      const response = await getCart()
      return response
    } 
)


export const removeCart = createAsyncThunk(
  "cart/remove",
  async (id) => {
      const response = await deleteCart(id);
      return response;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    allCart:[],
    status: "",
  },
  // reducers: {
  //   removeproductDetail: (state) => {
  //     state.productDetail = []
  //   },
  // },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state, action) => {
        state.status = STATUSES.LOADING
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = action.payload
        state.status = STATUSES.IDLE
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = STATUSES.ERROR
      }).addCase(getAllCart.pending, (state, action) => {
        state.status = STATUSES.LOADING
      })
      .addCase(getAllCart.fulfilled, (state, action) => {
        state.allCart = action.payload
        state.status = STATUSES.IDLE
      })
      .addCase(getAllCart.rejected, (state, action) => {
        state.status = STATUSES.ERROR
      }).addCase(removeCart.pending, (state, action) => {
        state.status = STATUSES.LOADING
      })
      .addCase(removeCart.fulfilled, (state, action) => {
        state.allCart.data =  state?.allCart?.data.filter((cart) => cart._id !== action.payload.data._id) 
        state.status = STATUSES.IDLE
      })
      .addCase(removeCart.rejected, (state, action) => {
        state.status = STATUSES.ERROR
      })
  },
})

export const { removeproductDetail } = cartSlice.actions
export default cartSlice.reducer
