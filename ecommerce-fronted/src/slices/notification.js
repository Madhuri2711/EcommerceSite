import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getNotificationCount } from '../services/notification.service'

export const STATUSES = Object.freeze({
  IDLE: 'idle',
  ERROR: 'error',
  LOADING: 'loading',
})

export const getNotificationCounts = createAsyncThunk(
  'notification/fetch',
  async () => {
      const response = await getNotificationCount()
      return response
    } 
)



const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    notification: [],
    // allCart:[],
    status: "",
  },
  // reducers: {
  //   removeproductDetail: (state) => {
  //     state.productDetail = []
  //   },
  // },
  extraReducers: (builder) => {
    builder
      .addCase(getNotificationCounts.pending, (state, action) => {
        state.status = STATUSES.LOADING
      })
      .addCase(getNotificationCounts.fulfilled, (state, action) => {
        state.notification = action.payload
        state.status = STATUSES.IDLE
      })
      .addCase(getNotificationCounts.rejected, (state, action) => {
        state.status = STATUSES.ERROR
      })
  },
})

// export const { removeproductDetail } = cartSlice.actions
export default notificationSlice.reducer
