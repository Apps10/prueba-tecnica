import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shippingInfo: {
    shippName: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    contry: ''
  },
};

const shippingSlice = createSlice({
  name: "shipping",
  initialState,
  reducers: {
    addShippingInfo(state, action) {
      state.shippingInfo = (action.payload)
    },
  },
});

export const { addShippingInfo } = shippingSlice.actions;
export default shippingSlice.reducer;
