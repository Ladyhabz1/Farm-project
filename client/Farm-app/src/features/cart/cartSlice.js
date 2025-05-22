import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Each item: { animal, quantity }
  },
  reducers: {
    addToCart: (state, action) => {
      const existing = state.items.find(item => item.animal.id === action.payload.animal.id);
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.animal.id !== action.payload);
    },
    clearCart: state => {
      state.items = [];
    },
    updateQuantity: (state, action) => {
      const item = state.items.find(item => item.animal.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
