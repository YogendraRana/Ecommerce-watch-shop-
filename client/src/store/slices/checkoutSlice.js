import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'checkout',

  initialState: {
    shippingInfo: localStorage.getItem('shipping') ? JSON.parse(localStorage.getItem('shipping')) : {}
  },

  reducers: {
    saveShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
      localStorage.setItem("shipping", JSON.stringify(action.payload));
    }
  }
})

// Action creators are generated for each case reducer function
export const {saveShippingInfo } = cartSlice.actions

export default cartSlice.reducer