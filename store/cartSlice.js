import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(
        (i) => i.product_name === item.product_name
      );
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.items.push(item);
      }
    },
    removeItem: (state, action) => {
      const product = action.payload;
      state.items = state.items.filter((i) => i.product_name !== product_name);
    },
    updateQuantity: (state, action) => {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find(
        (i) => i.product_name === product_name
      );
      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItem, removeItem, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;
