import {createSlice, createAsyncThunk, isAnyOf} from '@reduxjs/toolkit'

export const updateProfile = createAsyncThunk('profile/update', async (updateData,  {rejectWithValue, fulfillWithValue}) => {
  const {name, email} = updateData;

  try{
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/v1/profile/update`, {
      method: 'PUT', 
      body: JSON.stringify({name, email}),
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


export const changePassword = createAsyncThunk('user/changePassword', async (passwordInfo,  {rejectWithValue, fulfillWithValue}) => {
  const {oldPassword, newPassword, confirmNewPassword} = passwordInfo;

  try{
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/v1/password/change`, {
      method: 'PUT', 
      body: JSON.stringify({oldPassword, newPassword, confirmNewPassword}),
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


// slices
const profileSlice = createSlice({
	name: 'profile',

	initialState: {},

	reducers: {
		clearError: (state, action) => {
      state.error = null;
    },

    updateProfileReset: (state, action) => {
      state.isUpdated = false;
    },

     changePasswordReset: (state, action) => {
      state.isUpdated = false;
    }
	}, 

	extraReducers: (builder) => {
		builder.addMatcher(isAnyOf(updateProfile.pending, changePassword.pending), (state, action) => {
			state.loading = true;
		}).addMatcher(isAnyOf(updateProfile.fulfilled, changePassword.fulfilled), (state, action) => {
			state.loading = false;
			state.isUpdated = true;
		}).addMatcher(isAnyOf(updateProfile.rejected, changePassword.rejected), (state, action) => {
			state.loading= false;
			state.error = action.payload.message;
		})
	}
})


// actions and reducers exports
export const {clearError, updateProfileReset, changePasswordReset} = profileSlice.actions;
export default profileSlice.reducer;
