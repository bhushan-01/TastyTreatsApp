import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: 0,
  ProductDetails:{},
  CartItem:{}
};
const CounterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    Increment: (state, action) => {
      state.value += 1;
    },
    ProductDetails:(state,action) =>{
      state.ProductDetails = action.payload

    },
    CartItems:(state,action) =>{
      state.CartItem = action.payload
    }
  },
});
export const {Increment,ProductDetails,CartItems} = CounterSlice.actions;
export default CounterSlice.reducer;
