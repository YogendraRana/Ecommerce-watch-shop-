import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


// create review thunk
export const newReview = createAsyncThunk('review/create', async (reviewData,  {rejectWithValue, fulfillWithValue}) => {
	const {rating, comment, id} = reviewData;
	let productId = id;

	try{
		const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/review`, {
			method: 'PUT', 
			body: JSON.stringify({rating, comment, productId}),
			headers: {
				'Content-Type': 'application/json'
			}
		})

		const data = await res.json();

    if (!res.ok) {
      return rejectWithValue(data);
    }

    return fulfillWithValue(data);

	}catch(err){
		rejectWithValue(err.message);
	}
})

export const getProductReviews = createAsyncThunk('review/productReviews', async ({rejectWithValue, fulfillWithValue}) => {

	try{
		const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/reviews`, {
			method: 'GET',
			headers: {'Content-Type': 'application/json'}
		})

		const data = await res.json();

    if (!res.ok) {
      return rejectWithValue(data);
    }

    return fulfillWithValue(data);
	}catch(err){
		rejectWithValue(err.message);
	}
})


// reviewSlice starts from here
export const reviewSlice = createSlice({
  name: 'review',

  initialState: {},

  reducers: {
      clearError: (state, action) => {
      	state.error = null;
    	},

    	resetAdded: (state, action) => {
    		state.isAdded = false;
    	}
  },

  extraReducers: (builder) => {
    //newReview
    builder.addCase(newReview.pending, (state, action) => {
      state.loading = true;
    }).addCase(newReview.fulfilled, (state, action) => {
      state.loading = false;
      state.isAdded = true;
    }).addCase(newReview.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    })

    //productReviews
    builder.addCase(getProductReviews.pending, (state, action) => {
    	state.loading = true;
    }).addCase(getProductReviews.fulfilled, (state, action) => {
    	state.loading=false;
    	state.reviews=action.payload.reviews;
    }).addCase(getProductReviews.rejected, (state, action) => {
    	state.loading=false;
    	state.error=action.payload.message;
    })

  }
})

// Action creators are generated for each case reducer function
export const {clearError, resetAdded} = reviewSlice.actions

export default reviewSlice.reducer