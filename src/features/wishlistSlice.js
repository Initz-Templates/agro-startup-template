// features/wishlistSlice.js
import { createSlice } from "@reduxjs/toolkit";

const saveWishlistToLocalStorage = (wishlist) => {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
};

const loadWishlistFromLocalStorage = () => {
  try {
    const wishlist = JSON.parse(localStorage.getItem("wishlist"));
    return wishlist ? wishlist : [];
  } catch (e) {
    console.error("Failed to parse wishlist from localStorage", e);
    return [];
  }
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: loadWishlistFromLocalStorage(),
  },
  reducers: {
    addToWishlist: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push({ ...action.payload, quantity: action.payload.quantity });
      }
      saveWishlistToLocalStorage(state.items);
    },
    removeFromWishlist: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity -= 1;
        if (existingItem.quantity === 0) {
          state.items = state.items.filter((item) => item.id !== action.payload.id);
        }
      }
      saveWishlistToLocalStorage(state.items);
    },
    deleteFromWishlist: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      saveWishlistToLocalStorage(state.items);
    },
    clearWishlist: (state) => {
      state.items = [];
      saveWishlistToLocalStorage(state.items);
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  deleteFromWishlist,
  clearWishlist,
} = wishlistSlice.actions;
export default wishlistSlice.reducer;
