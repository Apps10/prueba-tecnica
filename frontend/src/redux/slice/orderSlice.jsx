import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import Cookies from 'js-cookie';
import { payOrder } from "./paymentSlice";
import { updateStockProductSold } from "./productSlice";
import toast from "react-hot-toast";

const initialState = {
  productsSelected: [],
  confirmOrderProduct: false,
};

export const newOrder = createAsyncThunk(
  "order/new",
  async (data, { rejectWithValue, getState, dispatch }) => {
    try {
      const { productsSelectedLocal, globalTotal } = data
      const paymentState = getState().payment
      const authState = getState().auth
      const { authUser } = authState
      
      const token = Cookies.get('token')
      const parsedProducts = productsSelectedLocal.map(p=> ({...p, productId: p.id}))
      const order = (await axiosInstance.post("/order", { items: parsedProducts }, {
       headers: {
          Authorization: 'Bearer '+ token
        }
      })).data;

      const { cvv, ownName, cardNumber, expDate } = JSON.parse(atob(paymentState.creditCard)) 

      const paymentPayload = {
        orderId: order.id,
        amount: globalTotal,
        emailHolder: authUser.email,
        creditCard: {
          number: cardNumber,
          card_holder: ownName,
          cvc: cvv,
          exp_month: expDate.split("/")[0],
          exp_year:expDate.split("/")[1]
        }
      }
      await dispatch(payOrder(paymentPayload))
      
      await dispatch(
        updateStockProductSold(
          productsSelectedLocal.map(({id, quantity})=>({id, quantity}))
        )
      )
    } catch (error) {
      const { message } = error.response.data;
      toast.error(message);
      console.error(error);
      return rejectWithValue(null);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setconfirmProducts(state, action) {
      state.confirmOrderProduct = action.payload;
    },

    addProductsSelected(state, action) {
      const products = JSON.parse(JSON.stringify(state.productsSelected));
      const index = products.findIndex(p=>p.id == action.payload.id)
      if(index == -1){
        state.productsSelected.push(action.payload);
        return
      }
      products[index].quantity +=action.payload.quantity
      state.productsSelected = products
    },
    setProductsSelected(state, action) {
      state.productsSelected = action.payload;
    },
    clearProductsSelected(state) {
      state.productsSelected = [];
    },
    clearAllOrderStore(state) {
      state.productsSelected = [];
      state.order = {}
      state.confirmOrderProduct = false
    },
    updateProductSelected(state, action) {
      const index = state.productsSelected.findIndex(
        (p) => p.id == action.payload.id
      );
      state.productsSelected[index] = action.payload;
    },
    deleteProductSelected(state, action) {
      const index = state.productsSelected.findIndex(
        (p) => p.id == action.payload.id
      );
      delete state.productsSelected[index];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(newOrder.pending, (state, action) => {
        state.isCheckingAuth = true;

      })
      .addCase(newOrder.fulfilled, (state, action) => {
        state.isCheckingAuth = false;
        state.confirmOrderProduct=false
        state.productsSelected=[]
      })
      .addCase(newOrder.rejected, (state) => {
        state.isCheckingAuth = false;
        state.confirmOrderProduct=false
        state.productsSelected=[]
      });

  },
});

export const {
  addProductsSelected,
  clearProductsSelected,
  deleteProductSelected,
  updateProductSelected,
  setProductsSelected,
  setconfirmProducts,
  clearAllOrderStore
} = orderSlice.actions;
export default orderSlice.reducer;
