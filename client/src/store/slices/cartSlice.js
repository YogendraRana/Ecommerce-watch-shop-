import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',

  initialState: {
    cartItems: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
  },

  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;

      const find = state.cartItems.find(item => item.id === product.id);

      if(find === undefined){
        state.cartItems.push(product);  
      }else{
        const newCartItems = state.cartItems.filter(item => item.id !== product.id);
        state.cartItems = newCartItems;  
      }

      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },

    deleteFromCart: (state, action) => {
      const newCartItems = state.cartItems.filter(item => item.id !== action.payload.id);
      state.cartItems = newCartItems;
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },

    clearCart: (state) => {
      state.cartItems = [];
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    }, 

    increaseItemQuantity: (state, action) => {      
      state.cartItems.forEach(item => {
        if(item.id === action.payload.id){
          if(item.quantity < item.stock){
            item.quantity = item.quantity + 1;
          }else{
            return;
          }
        }
      })
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    }, 

    decreaseItemQuantity: (state, action) => {      
      state.cartItems.forEach(item => {
        if(item.id === action.payload.id){
          if(item.quantity > 1){
            item.quantity = item.quantity - 1;
          }else{
            return;
          }
        }
      })
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    }
  }
})

// Action creators are generated for each case reducer function
export const { addToCart, deleteFromCart, clearCart, increaseItemQuantity, decreaseItemQuantity} = cartSlice.actions

export default cartSlice.reducer