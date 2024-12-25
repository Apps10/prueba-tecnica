import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';
import { axiosInstance } from "../../lib/axios";

const initialState = {
  creditCard: null,
  isRegisterCreditCard: false,
  isPaying: false,
  isPayingOrder: false,
  paymentResponse: null
};

export const payOrder = createAsyncThunk(
  "payment/process",
  async (data, { rejectWithValue, getState }) => {
    try {
      
      const token = Cookies.get('token')

      console.log(data);
      const res = await axiosInstance.post("/payment/process", { ...data }, {
        headers: {
          Authorization: 'Bearer '+ token
        }
      });

   
      return res.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(null);
    }
  }
);

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
    clearPaymentResponse(state) {
      state.paymentResponse = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(payOrder.pending, (state, action) => {
        state.isPayingOrder = true;
        state.isPaying = true
        state.isRegisterNewCreditCardAction=false
      })
      .addCase(payOrder.fulfilled, (state, action) => {
        state.paymentResponse=action.payload
        state.isRegisterNewCreditCardAction=false
        state.isPaying = false
        state.isPayingOrder = false;
      })
      .addCase(payOrder.rejected, (state) => {
        state.isPayingOrder = false;
        state.isPaying = false
        state.isRegisterNewCreditCardAction=false
      });
  },
});

export const { addCreditCard, isRegisterNewCreditCard, clearPaymentResponse } = paymentSlice.actions;
export default paymentSlice.reducer;
