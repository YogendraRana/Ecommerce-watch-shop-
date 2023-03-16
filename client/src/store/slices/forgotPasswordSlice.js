import {createSlice, createAsyncThunk, isAnyOf} from '@reduxjs/toolkit'

export const forgotPassword = createAsyncThunk('user/forgotPassword', async (email,  {rejectWithValue, fulfillWithValue}) => {

  try{
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/v1/password/forgot`, {
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


export const resetPassword = createAsyncThunk('user/resetPassword', async (resetPasswordInfo,  {rejectWithValue, fulfillWithValue}) => {
  const {password, confirmPassword, token} = resetPasswordInfo;

  console.log(resetPasswordInfo);

  try{
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/v1/password/reset/${token}`, {
      method: 'PUT', 
      body: JSON.stringify({password, confirmPassword}),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await res.json();

    console.log(data);

    if (!res.ok) {
      return rejectWithValue(data);
    }

    return fulfillWithValue(data);
  }
  catch(err){
    return rejectWithValue(err.message);
  }
})


//forgot password
const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',

  initialState: {},

  reducers: {
    clearError: (state, action) => {
      state.error = null;
    },

    clearMessage: (state, action) => {
      state.message = null;
    }
  },

  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(forgotPassword.pending, resetPassword.pending), (state, action) => {
      state.loading = true;
    }).addMatcher(isAnyOf(forgotPassword.fulfilled, resetPassword.fulfilled), (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    }).addMatcher(isAnyOf(forgotPassword.rejected, resetPassword.rejected), (state, action) => {
      state.loading= false;
      state.error = action.payload.message;
    })
  }
})


export const {clearError, clearMessage} = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;