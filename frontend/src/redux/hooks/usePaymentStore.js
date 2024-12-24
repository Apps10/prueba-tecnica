import { useDispatch, useSelector } from "react-redux";
import { addCreditCard, isRegisterNewCreditCard, setIsPaying } from "../slice/paymentSlice";

export const usePaymentStore = () => {
  const dispatch = useDispatch();

  const cryptcreditCard = useSelector((state) => state.payment.creditCard);
  const isRegisterCreditCard = useSelector((state) => state.payment.isRegisterCreditCard);
  const isPaying = useSelector((state) => state.payment.isPaying);
  const addCreditCardAction = (data) => dispatch(addCreditCard(data));
  const setIsPayingAction = (data) => dispatch(setIsPaying(data));
  
  const isRegisterNewCreditCardAction = (data) => dispatch(isRegisterNewCreditCard(data));
   return {
    cryptcreditCard,
    isRegisterCreditCard,
    isPaying,
    setIsPayingAction,
    addCreditCardAction,
    isRegisterNewCreditCardAction
  };
};