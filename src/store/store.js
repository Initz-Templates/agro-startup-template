// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cartSlice';
import wishlistReducer from '../features/wishlistSlice';
import billingReducer from '../features/billingSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        wishlist: wishlistReducer,
        billing: billingReducer,
    },
});

store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem('billingDetails', JSON.stringify(state.billing));
});

export default store;
