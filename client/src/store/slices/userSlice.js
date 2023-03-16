import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'

//registerUser thunk
export const registerUser = createAsyncThunk('user/registerUser', async (registerData,  {rejectWithValue, fulfillWithValue}) => {
  const {name, email, password, cpassword} = registerData;

  try{
    const res = await fetch('https://mern-watch-shop-server.onrender.com/api/v1/register', {
      method: 'POST', 
      body: JSON.stringify({name, email, password, cpassword}),
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

//loginUser thunk
export const loginUser = createAsyncThunk('user/login', async (loginData, {rejectWithValue, fulfillWithValue}) => {
  const {email, password} = loginData;

  try{
    const res = await fetch('https://mern-watch-shop-server.onrender.com/api/v1/login', {
      method: 'POST', 
      body: JSON.stringify({email, password}),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await res.json();

    if (!res.ok) {
      return rejectWithValue(data)
    }

    return fulfillWithValue(data);
  }
  catch (err){
    return rejectWithValue(err.message);
  }
})


//getUserDetail thunk
export const getUserDetail = createAsyncThunk('user/detail', async (userData, {rejectWithValue, fulfillWithValue}) => {
  try{
    const res = await fetch('https://mern-watch-shop-server.onrender.com/api/v1/profile', {credentials: 'include'});

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


// user detail thunk 
export const logoutUser = createAsyncThunk('user/logout', async (logoutData, {rejectWithValue, fulfillWithValue}) => {
  try{
    const res = await fetch('https://mern-watch-shop-server.onrender.com/api/v1/logout');

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



//user slice starts from here
const userSlice = createSlice({
  name: 'user',

  initialState: {
   user: {},
   loading: false,
   isAuthenticated: false
  },

  reducers: {
    clearError: (state, action) => {
      state.error = null;
    }
  },

  extraReducers: (builder) => {
    //logoutUser
    builder.addCase(logoutUser.pending, (state, action) => {
      state.loading = true;
      state.isAuthenticated = true;
    }).addCase(logoutUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    }).addCase(logoutUser.rejected, (state, action) => {
      state.loading = true;
      state.isAuthenticated = true;
    })

    //loginUser, registerUser, getUserDetail
    builder.addCase(getUserDetail.rejected, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    }).addMatcher(isAnyOf(registerUser.pending, loginUser.pending, getUserDetail.pending), (state, action) => {
      state.loading = true;
      state.isAuthenticated = false;
    }).addMatcher(isAnyOf(registerUser.fulfilled, loginUser.fulfilled, getUserDetail.fulfilled), (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    }).addMatcher(isAnyOf(registerUser.rejected, loginUser.rejected), (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload.message;
    })
  }
})

export const {clearError} = userSlice.actions

export default userSlice.reducer