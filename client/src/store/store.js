import { configureStore } from '@reduxjs/toolkit'

//importing reducers
import cartReducer from './slices/cartSlice.js'
import productReducer from './slices/productSlice.js'
import userReducer from './slices/userSlice.js'
import profileReducer from './slices/profileSlice.js'
import forgotPasswordReducer from './slices/forgotPasswordSlice.js'
import checkoutReducer from './slices/checkoutSlice.js'
import orderReducer from './slices/orderSlice.js'
import reviewReducer from './slices/reviewSlice.js'
import adminReducer from './slices/adminSlice.js'
import wishlistReducer from './slices/wishlistSlice.js'
import subscribeReducer from './slices/subscribeSlice.js'

export const store = configureStore({
  reducer: {
    store: productReducer,
    user: userReducer,
    cart: cartReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    checkout: checkoutReducer,
    order: orderReducer,
    review: reviewReducer,
    admin: adminReducer,
    subscribe: subscribeReducer,
    wishlist: wishlistReducer
  },
})

export default store;