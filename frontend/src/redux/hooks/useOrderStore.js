import { useDispatch, useSelector } from "react-redux";
import { 
  addProductsSelected, 
  clearProductsSelected, 
  deleteProductSelected, 
  updateProductSelected, 
  setProductsSelected, 
  setconfirmProducts,
  newOrder,
  clearAllOrderStore
} from "../slice/orderSlice";

export const useOrderStore = () => {
  const dispatch = useDispatch();

  const productsSelected = useSelector((state) => state.order.productsSelected);
  const confirmOrderProduct = useSelector((state) => state.order.confirmOrderProduct);
  const setconfirmOrderProductAction = (data) => dispatch(setconfirmProducts(data));
  const addProductsSelectedAction = (data) => dispatch(addProductsSelected(data));
  const clearProductsSelectedAction = () => dispatch(clearProductsSelected());
  const deleteProductSelectedAction = (id) => dispatch(deleteProductSelected(id))
  const updateProductSelectedAction = (data) => dispatch(updateProductSelected(data))
  const setProductsSelectedAction = (data) => dispatch(setProductsSelected(data))
  const newOrderAction = async (data) => dispatch(newOrder(data))
  const clearAllOrderStoreAction = async () => dispatch(clearAllOrderStore())
  
   return {
    productsSelected,
    confirmOrderProduct,
    setconfirmOrderProductAction,
    addProductsSelectedAction,
    clearProductsSelectedAction,
    deleteProductSelectedAction,
    updateProductSelectedAction,
    setProductsSelectedAction,
    newOrderAction,
    clearAllOrderStoreAction,
  };
};