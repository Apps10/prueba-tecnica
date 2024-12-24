import { useDispatch, useSelector } from "react-redux";
import { 
  addProductsSelected, 
  clearProductsSelected, 
  deleteProductSelected, 
  updateProductSelected, 
  setProductsSelected, 
  setconfirmProducts,
  newOrder
} from "../slice/orderSlice";

export const useOrderStore = () => {
  const dispatch = useDispatch();

  const order = useSelector((state) => state.order.order);
  const productsSelected = useSelector((state) => state.order.productsSelected);
  const confirmOrderProduct = useSelector((state) => state.order.confirmOrderProduct);
  const setconfirmOrderProductAction = (data) => dispatch(setconfirmProducts(data));
  const addProductsSelectedAction = (data) => dispatch(addProductsSelected(data));
  const clearProductsSelectedAction = () => dispatch(clearProductsSelected());
  const deleteProductSelectedAction = (id) => dispatch(deleteProductSelected(id))
  const updateProductSelectedAction = (data) => dispatch(updateProductSelected(data))
  const setProductsSelectedAction = (data) => dispatch(setProductsSelected(data))
  const newOrderAction = (data) => dispatch(newOrder(data))
  
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
    order
  };
};