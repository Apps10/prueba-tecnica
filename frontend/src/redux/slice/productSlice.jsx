import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";

const initialState = {
  products:[],
};


export const findProducts = createAsyncThunk(
  "product",
  async (data, { rejectWithValue }) => {
    try{
      const res = await axiosInstance.get("product");
      const { Products, metadata } = res.data;
      return Products.map(p=>({...p, quantity: 1}))
    }catch(error){
      return rejectWithValue(error)
    }
});

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    updateStockProductSold(state, action) {
      const productsLocal = JSON.parse(JSON.stringify(state.products))
      
      const productUpdated = productsLocal.map(p=>{
        const productLocal = action.payload.find(ptu=> ptu.id == p.id)
        if(!productLocal) return { ...p }
        
        return {
          ...p,
          stock: p.stock - productLocal.quantity,
          quantity: 1
        }
      })
      state.products = productUpdated 
    },
    setProducts(state, action) {
      state.products = action.payload 
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(findProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
    }
});

export const { updateStockProductSold, setProducts } = productSlice.actions;
export default productSlice.reducer;
