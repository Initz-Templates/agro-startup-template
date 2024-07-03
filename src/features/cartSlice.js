// features/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const loadCartFromLocalStorage = () => {
  try {
    const cart = JSON.parse(localStorage.getItem("cart"));
    return cart ? cart : [];
  } catch (e) {
    console.error("Failed to parse cart from localStorage", e);
    return [];
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: loadCartFromLocalStorage(),
  },
  reducers: {
    addToCart: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex((item) => item.id === id);
      if (existingItemIndex !== -1) {
        // If item already exists in cart, update its quantity
        state.items[existingItemIndex].quantity += quantity;
      } else {
        // If item does not exist in cart, add it
        state.items.push({ ...action.payload });
      }
      saveCartToLocalStorage(state.items);
    },

    removeFromCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity -= 1;
        if (existingItem.quantity === 0) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload.id
          );
        }
      }
      saveCartToLocalStorage(state.items);
    },

    deleteFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      saveCartToLocalStorage(state.items);
    },

    addAllToCart: (state, action) => {
      action.payload.forEach((item) => {
        const existingItem = state.items.find(
          (cartItem) => cartItem.id === item.id
        );
        if (existingItem) {
          existingItem.quantity += item.quantity;
        } else {
          state.items.push({ ...item });
        }
      });
      saveCartToLocalStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveCartToLocalStorage(state.items);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  deleteFromCart,
  addAllToCart,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
