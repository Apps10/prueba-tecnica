import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";

const initialState = {
  productsSelected: [],
};


export const newOrder = createAsyncThunk(
  "order/new",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/order", { items: data });
      return res.data.body.User;
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
    addProductsSelected(state, action) {
      state.productsSelected.push(action.payload)
    },
    setProductsSelected(state, action) {
      state.productsSelected = action.payload
    },
    clearProductsSelected(state){
      state.productsSelected = []
    },
    updateProductSelected(state, action){
      const index = state.productsSelected.findIndex(p=> p.id == action.payload.id)
      state.productsSelected[index] = action.payload
    },
    deleteProductSelected(state, action){
      const index = state.productsSelected.findIndex(p=> p.id == action.payload.id)
      delete(state.productsSelected[index])
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(newOrder.pending, (state) => {
        state.isCheckingAuth = true;
      })
      .addCase(newOrder.fulfilled, (state, action) => {
        state.authUser = action.payload;
        console.log(action);
        state.isCheckingAuth = false;
      })
      .addCase(newOrder.rejected, (state) => {
        state.authUser = null;
        state.isCheckingAuth = false;
      })
  },
});

export const { addProductsSelected , clearProductsSelected, deleteProductSelected, updateProductSelected, setProductsSelected } = orderSlice.actions;
export default orderSlice.reducer;
