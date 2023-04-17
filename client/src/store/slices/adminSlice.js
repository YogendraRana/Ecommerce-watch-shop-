import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

//getAdminProducts thunk
export const getAdminProducts = createAsyncThunk('admin/products/getAdminProducts', async () => {
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/admin/products`);
    const data = await res.json();
    return data;
  }
)

//addProduct thunk
export const addProduct = createAsyncThunk('admin/product/addProduct', async (productData,  {rejectWithValue, fulfillWithValue}) => {
  const {name, price, stock, category, description, images, discount} = productData;

  try{
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/admin/product/new`, {
      method: 'POST',
      body: JSON.stringify({name, price,  stock,  category,  description,  images, discount}),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await res.json();

    if (!res.ok) {
      return rejectWithValue(data);
    }

    return fulfillWithValue(data);
  }catch(err){
    return rejectWithValue(err.message);
  }
})


//updateProduct thunk
export const updateProduct = createAsyncThunk('admin/product/updateProduct', async (productData,  {rejectWithValue, fulfillWithValue}) => {
  const {id, name, price, stock, category, description, images, discount} = productData;

  try{
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/admin/product/${id}`, {
      method: 'PUT',
      body: JSON.stringify({name, price, stock, category, description, images, discount}),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await res.json();

    if (!res.ok) {
      return rejectWithValue(data);
    }

    return fulfillWithValue(data);
  }catch(err){
    return rejectWithValue(err.message);
  }
})


//deleteProduct thunk
export const deleteProduct = createAsyncThunk('admin/product/deleteProduct', async (id) => {
  const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/admin/product/${id}`, {method: 'DELETE'});
  const data = await res.json();
  return data;
})

//getAllUsers thunk
export const getAllUsers = createAsyncThunk('admin/user/getAllUsers', async () => {
  const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/admin/users`, {credentials: "include"});
  const data = await res.json();
  return data;
})

//deleteUser thunk
export const deleteUser = createAsyncThunk('admin/user/deleteUser', async (id, {rejectWithValue, fulfillWithValue}) => { 
  try{
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/admin/users/${id}`, {method: 'DELETE'});

    const data = await res.json();

    if (!res.ok) {
      return rejectWithValue(data);
    }

    return fulfillWithValue(data);
  }catch(err){
    return rejectWithValue(err.message);
  }
})



//getEmployees thunk
export const getEmployees = createAsyncThunk('admin/employee/getEmployees', async () => {
  const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/admin/employees`, {creadntials: "include"});
  const data = await res.json();
  return data;
})

//addEmployee thunk
export const addEmployee = createAsyncThunk('admin/employee/addEmployee', async (employeeData,  {rejectWithValue, fulfillWithValue}) => {
  const {name, email,password, cpassword, role} = employeeData;

  try{
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/admin/employee/new`, {
      method: 'POST',
      body: JSON.stringify({name, email, password, cpassword, role}),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await res.json();

    if (!res.ok) {
      return rejectWithValue(data);
    }

    return fulfillWithValue(data);
  }catch(err){
    return rejectWithValue(err.message);
  }
})



//updateEmployee thunk
export const updateEmployee = createAsyncThunk('admin/employee/updateEmployee', async (employeeData, {rejectWithValue, fulfillWithValue}) => {
  const {id, name, email, role} = employeeData;
  
  try{
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/admin/employee/update`, {
      method: 'PUT',
      body: JSON.stringify({id, name, email, role}),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await res.json();

    if (!res.ok) {
      return rejectWithValue(data);
    }

    return fulfillWithValue(data);
  }catch(err){
    return rejectWithValue(err.message);
  }
})

//deleteEmployee thunk
export const deleteEmployee = createAsyncThunk('admin/employee/deleteEmployee', async (id, {rejectWithValue, fulfillWithValue}) => {
  try{
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/admin/employee/${id}`, {method: 'DELETE'});

    const data = await res.json();

    if (!res.ok) {
      return rejectWithValue(data);
    }

    return fulfillWithValue(data);
  }catch(err){
    return rejectWithValue(err.message);
  }
});


//getAllOrders thunk
export const getAllOrders = createAsyncThunk('admin/orders/getAllOrders', async () => {
  const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/admin/orders`, {credentials: "include"});
  const data = await res.json();
  return data;
})


//updateOrder thunk
export const updateOrder = createAsyncThunk('admin/order/updateOrder', async (orderData, {rejectWithValue, fulfillWithValue}) => {  
  const {id, status} = orderData;
  
  try{
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/admin/order/${id}`, {
      method: 'PUT',
      body: JSON.stringify({status}),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await res.json();

    if (!res.ok) {
      return rejectWithValue(data);
    }

    return fulfillWithValue(data);
  }catch(err){
    return rejectWithValue(err.message);
  }
})


//deleteOrder thunk
export const deleteOrder = createAsyncThunk('admin/order/deleteOrder', async (id, {rejectWithValue, fulfillWithValue}) => {
  try{
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/admin/order/${id}`, {method: 'DELETE'});

    const data = await res.json();

    if (!res.ok) {
      return rejectWithValue(data);
    }

    return fulfillWithValue(data);
  }catch(err){
    return rejectWithValue(err.message);
  }
});



const adminSlice = createSlice({
  name: 'admin',

  initialState: {
    adminProducts: [],
    users: [],
    employees: [],
    orders: [],
    // latestOrders: [],
    topSellingProducts: [],
    loading: false
  },

  reducers: {
    clearError: (state, action) => {
      state.error = null;
    },

    resetAdded: (state, action) => {
      state.isAdded = false;
    },

    resetUpdated: (state, action) => {
      state.isUpdated = false;
    },

    resetDeleted: (state, action) => {
      state.isDeleted = false;
    }
  },

  extraReducers: {
    // getAdminProducts
    [getAdminProducts.pending]: (state, action) => {
      state.loading = true
    },
    [getAdminProducts.fulfilled]: (state, action) => {
      state.adminProducts = action.payload.products;
      state.loading = false;
    },
    [getAdminProducts.rejected]: (state, action) => {
      state.adminProducts = [];
      state.loading = false;
      state.error = action.payload.message;
    },

     // addProduct
    [addProduct.pending]: (state, action) => {
      state.loading = true;
    },
    [addProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.isAdded = true;
    },
    [addProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

      // updateProduct
    [updateProduct.pending]: (state, action) => {
      state.loading = true;
    },
    [updateProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.isUpdated = true;
    },
    [updateProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    // deleteProduct
    [deleteProduct.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.isDeleted = true;
      state.adminProducts = state.adminProducts.filter(product => product._id !== action.payload.product._id)
    },
    [deleteProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },





    // getAllUsers
    [getAllUsers.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload.users;
    },
    [getAllUsers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    // deleteUser
    [deleteUser.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.isDeleted = true;
      state.users = state.users.filter(user => user._id !== action.payload.user._id)
    },
    [deleteUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },





     // getEmployees
    [getEmployees.pending]: (state, action) => {
      state.loading = true;
    },
    [getEmployees.fulfilled]: (state, action) => {
      state.loading = false;
      state.employees = action.payload.employees;
    },
    [getEmployees.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

     // addEmployee
    [addEmployee.pending]: (state, action) => {
      state.loading = true;
    },
    [addEmployee.fulfilled]: (state, action) => {
      state.loading = false;
      state.isAdded = true;
    },
    [addEmployee.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

     // updateEmployee
    [updateEmployee.pending]: (state, action) => {
      state.loading = true;
    },
    [updateEmployee.fulfilled]: (state, action) => {
      state.loading = false;
      state.isUpdated = true;
    },
    [updateEmployee.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    // deleteEmloyee
    [deleteEmployee.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteEmployee.fulfilled]: (state, action) => {
      state.loading = false;
      state.isDeleted = true;
      state.employees = state.employees.filter(employee => employee._id !== action.payload.employee._id);
    },
    [deleteEmployee.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },





    // getAllOrders
    [getAllOrders.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllOrders.fulfilled]: (state, action) => {
      state.loading = false;
      state.orders = action.payload.orders;
      // state.latestOrders = action.payload.latestOrders;
      state.totalSales = action.payload.totalSales;
      state.topSellingProducts = action.payload.topSellingProducts;
    },
    [getAllOrders.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
      state.orders = [];
      // state.latestOrders = [];
      state.totalSales = null;
      state.topSellingProducts = [];
    },


    // updateOrder
    [updateOrder.pending]: (state, action) => {
      state.loading = true;
    },
    [updateOrder.fulfilled]: (state, action) => {
      state.loading = false;
      state.isUpdated = true;
    },
    [updateOrder.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },


    // deleteOrder
    [deleteOrder.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteOrder.fulfilled]: (state, action) => {
      state.loading = false;
      state.isDeleted = true;
      state.orders = state.orders.filter(order => order._id !== action.payload.order._id);
    },
    [deleteOrder.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },



  }
})

export default adminSlice.reducer
export const {clearError, resetAdded, resetUpdated, resetDeleted} = adminSlice.actions;