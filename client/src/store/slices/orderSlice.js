import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


// createOrder thunk
export const createOrder = createAsyncThunk('order/create', async (orderData,  {rejectWithValue, fulfillWithValue}) => {
  
  const {shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice} = orderData;

  try{
    const res = await fetch(`/api/v1/order/new`, {
      method: 'POST', 
      body: JSON.stringify({shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice}),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await res.json();

    if (!res.ok) {
      return rejectWithValue(data);
    }

    return fulfillWithValue(data);
  }
  catch(err){
    return rejectWithValue(err.message);
  }
})

// myOrders thunk
export const myOrders = createAsyncThunk('order/myOrders', async () => {
    const res = await fetch(`/api/v1/orders/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {'Content-Type': 'application/json'}
    })

    const data = await res.json();

    return data;
})

// orderSlice starts from here
export const orderSlice = createSlice({
  name: 'order',

  initialState: {
    orders: [],
    loading: true,
  },

  reducers: {
      clearError: (state, action) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    //createOrder
    builder.addCase(createOrder.pending, (state, action) => {
      state.loading = true;
    }).addCase(createOrder.fulfilled, (state, action) => {
      state.loading = false;
      // state.order = action.payload;
    }).addCase(createOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    //myOrders
    builder.addCase(myOrders.pending, (state, action) => {
      state.loading = true;
    }).addCase(myOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload.orders;
    }).addCase(myOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
  }
})

// Action creators are generated for each case reducer function
export const {clearError} = orderSlice.actions

export default orderSlice.reducer