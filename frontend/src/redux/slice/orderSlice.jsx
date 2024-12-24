import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import Cookies from 'js-cookie';

const initialState = {
  productsSelected: [],
  confirmOrderProduct: false,
  order: {}
};

export const newOrder = createAsyncThunk(
  "order/new",
  async (data, { rejectWithValue }) => {
    try {
      const token = Cookies.get('token')
      const parsedProducts = data.map(p=> ({...p, productId: p.id}))
      const res = await axiosInstance.post("/order", { items: parsedProducts }, {
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
        state.order = action.payload
      })
      .addCase(newOrder.rejected, (state) => {
        state.authUser = null;
        state.isCheckingAuth = false;
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
} = orderSlice.actions;
export default orderSlice.reducer;
