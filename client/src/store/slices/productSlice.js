import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

//getProducts thunk
export const getProducts = createAsyncThunk('products/getProducts', async ({keyword='', pageNumber=0, currentCategory}) => {
    let link = `${process.env.REACT_APP_SERVER_URL}/api/v1/products?keyword=${keyword}&category=${currentCategory}&page=${pageNumber}`

    const res = await fetch(link);
    const data = await res.json();
    return data;
  }
)

//getProductDetail thunk
export const getProductDetail = createAsyncThunk('product/getProductDetail', async(id) => {
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/v1/product/${id}`);
    const data = await res.json();
    return data;
  }
)

const productSlice = createSlice({
  name: 'products',

  initialState: {
    products: [],
    product: {},
    loading: false
  },

  reducers: {
    clearError: (state, action) => {
      state.error = null;
    },
  },

  extraReducers: {
    // getProducts
    [getProducts.pending]: (state) => {
      state.loading = true
    },
    [getProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.productsCount = action.payload.productsCount;
      state.resultPerPage = action.payload.resultPerPage;
      state.filteredProductsCount = action.payload.filteredProductsCount;
    },
    [getProducts.rejected]: (state, action) => {
      state.products = [];
      state.loading = false;
      state.error = action.error.message;
    },

    //getProductDetail
    [getProductDetail.pending]: (state) => {
       state.loading = true
    },
    [getProductDetail.fulfilled]: (state, action) => {
      state.product = action.payload.product;
      state.loading = false;
    },
    [getProductDetail.rejected]: (state, action) => {
      state.product = []
      state.loading = false
      state.error = action.error.message
    }
  }
})

export default productSlice.reducer
export const {clearError} = productSlice.actions;