import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

// getWishlist
export const getWishlist = createAsyncThunk('user/wishlist/getWishlist', async (data, {rejectWithValue, fulfillWithValue}) => {
  try{
    const res = await fetch('/api/v1/wishlist', {method: 'GET'});

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


// addtoWishlist
export const addToWishlist = createAsyncThunk('user/wishlist/addToWishlist', async (newWishProduct,  {rejectWithValue, fulfillWithValue}) => {
  try{
    const res = await fetch('/api/v1/wishlist', {
      method: 'POST', 
      body: JSON.stringify(newWishProduct),
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

// deleteFromWishlist
export const deleteFromWishlist = createAsyncThunk('user/wishlist/deleteFromWishlist', async (id,  {rejectWithValue, fulfillWithValue}) => {
  try{
    const res = await fetch('/api/v1/wishlist', {
      method: 'DELETE', 
      body: JSON.stringify({id}),
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


//forgot password
const wishlistSlice = createSlice({
  name: 'wishlist',

  initialState: {
    list: []
  },

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
    builder.addCase(getWishlist.pending, (state, action) => {
      state.loading = true;
    }).addCase(getWishlist.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload.wishlist;
    }).addCase(getWishlist.rejected, (state, action) => {
      state.loading= false;
      state.error = action.payload.message;
    })

    builder.addCase(addToWishlist.pending, (state, action) => {
      state.loading = true;
    }).addCase(addToWishlist.fulfilled, (state, action) => {
      state.loading = false;
      state.isAdded = true;
    }).addCase(addToWishlist.rejected, (state, action) => {
      state.loading= false;
      state.error = action.payload.message;
    })

    builder.addCase(deleteFromWishlist.pending, (state, action) => {
      state.loading = true;
    }).addCase(deleteFromWishlist.fulfilled, (state, action) => {
      state.loading = false;
      state.isDeleted = true;
    }).addCase(deleteFromWishlist.rejected, (state, action) => {
      state.loading= false;
      state.error = action.payload.message;
    })
  }
})


export const {clearError, resetAdded, resetDeleted} = wishlistSlice.actions;
export default wishlistSlice.reducer;