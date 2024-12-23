import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  creditCard: null,
  isRegisterCreditCard: false
};



const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    addCreditCard(state, action) {
      state.creditCard = (action.payload)
    },
    isRegisterNewCreditCard(state, action) {
      state.isRegisterCreditCard = (action.payload)
    },
  },
});

export const { addCreditCard, isRegisterNewCreditCard } = paymentSlice.actions;
export default paymentSlice.reducer;
