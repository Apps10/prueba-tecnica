import { useDispatch, useSelector } from "react-redux";
import { findProducts, setProducts, updateStockProductSold } from "../slice/productSlice";

export const useProductStore = () => {
  const dispatch = useDispatch();

  const products =  useSelector((state) => state.product.products);
  const findProductsAction = () => dispatch(findProducts())
  const updateStockProductSoldAction = (data) => dispatch(updateStockProductSold(data))
  const setProdutsAction = (data) => dispatch(setProducts(data))

   return {
    products,
    findProductsAction,
    updateStockProductSoldAction,
    setProdutsAction
  };
};