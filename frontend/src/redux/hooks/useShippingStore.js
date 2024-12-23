import { useDispatch, useSelector } from "react-redux";
import { addShippingInfo } from "../slice/shippingSlice";

export const useShippingStore = () => {
  const dispatch = useDispatch();

  const shippingInfo = useSelector((state) => state.shipping.shippingInfo);
  const addShippingInfoAction = (data) => dispatch(addShippingInfo(data))
   return {
    shippingInfo,
    addShippingInfoAction
  };
};