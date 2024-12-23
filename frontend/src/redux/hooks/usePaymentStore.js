import { useDispatch, useSelector } from "react-redux";
import { addCreditCard, isRegisterNewCreditCard } from "../slice/paymentSlice";

export const usePaymentStore = () => {
  const dispatch = useDispatch();

  const cryptcreditCard = useSelector((state) => state.payment.creditCard);
  const isRegisterCreditCard = useSelector((state) => state.payment.isRegisterCreditCard);
  const addCreditCardAction = (data) => dispatch(addCreditCard(data));
  const isRegisterNewCreditCardAction = (data) => dispatch(isRegisterNewCreditCard(data));
   return {
    cryptcreditCard,
    isRegisterCreditCard,
    addCreditCardAction,
    isRegisterNewCreditCardAction
  };
};