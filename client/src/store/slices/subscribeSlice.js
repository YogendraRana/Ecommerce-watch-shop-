import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

// register subscription
export const registerSubscriber = createAsyncThunk('user/subscribe', async (email,  {rejectWithValue, fulfillWithValue}) => {
  try{
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/v1/subscribe`, {
      method: 'POST', 
      body: JSON.stringify({email}),
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


const subscribeSlice = createSlice({
  name: 'subscribe',

  initialState: {},

  reducers: {
    clearError: (state, action) => {
      state.error = null;
    },

    resetAdded: (state, action) => {
      state.isAdded = false;
    },

     resetDeleted: (state, action) => {
      state.isDeleted = false;
    }
  },

  extraReducers: (builder) => {
    builder.addCase(registerSubscriber.pending, (state, action) => {
      state.loading = true;
    }).addCase(registerSubscriber.fulfilled, (state, action) => {
      state.loading = false;
      state.isAdded = true;
    }).addCase(registerSubscriber.rejected, (state, action) => {
      state.loading= false;
      state.error = action.payload.message;
    })
  }
})


export const {clearError, resetAdded, resetDeleted} = subscribeSlice.actions;
export default subscribeSlice.reducer;