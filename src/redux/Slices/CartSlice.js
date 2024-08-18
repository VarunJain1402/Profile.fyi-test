import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    add: (state, action) => {
      const itemIndex = state.findIndex(item => item.id === action.payload.id);
      if (itemIndex >= 0) {
        // Item already in cart, increment quantity
        state[itemIndex].quantity += 1;
      } else {
        // Add new item with quantity 1
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    remove: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const itemIndex = state.findIndex(item => item.id === id);
      if (itemIndex >= 0) {
        state[itemIndex].quantity = quantity;
      }
    }
  }
});

export const { add, remove, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;
