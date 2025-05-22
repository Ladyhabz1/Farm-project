// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import animalReducer from '../features/animals/animalSlice';
import cartReducer from '../features/cart/cartSlice';
import orderReducer from '../features/orders/orderSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    animals: animalReducer,
    cart: cartReducer,
    orders: orderReducer,
  },
});

export default store; 