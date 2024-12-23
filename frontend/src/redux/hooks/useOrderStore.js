import { useDispatch, useSelector } from "react-redux";
import { addProductsSelected, clearProductsSelected, deleteProductSelected, updateProductSelected, setProductsSelected } from "../slice/orderSlice";

export const useOrderStore = () => {
  const dispatch = useDispatch();

  const productsSelected = useSelector((state) => state.order.productsSelected);
  const addProductsSelectedAction = (data) => dispatch(addProductsSelected(data));
  const clearProductsSelectedAction = () => dispatch(clearProductsSelected());
  const deleteProductSelectedAction = (id) => dispatch(deleteProductSelected(id))
  const updateProductSelectedAction = (data) => dispatch(updateProductSelected(data))
  const setProductsSelectedAction = (data) => dispatch(setProductsSelected(data))
   return {
    productsSelected,
    addProductsSelectedAction,
    clearProductsSelectedAction,
    deleteProductSelectedAction,
    updateProductSelectedAction,
    setProductsSelectedAction
  };
};