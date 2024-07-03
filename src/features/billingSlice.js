// features/billingSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    subtotal: 0,
    shippingCost: 0,
    couponDiscount: 0,
    total: 0,
};

const billingSlice = createSlice({
    name: 'billing',
    initialState,
    reducers: {
        setBillingDetails: (state, action) => {
            const { subtotal, shippingCost, couponDiscount, total } = action.payload;
            state.subtotal = subtotal;
            state.shippingCost = shippingCost;
            state.couponDiscount = couponDiscount;
            state.total = total;
        },
    },
});

export const { setBillingDetails } = billingSlice.actions;
export default billingSlice.reducer;
