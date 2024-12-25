import { useDispatch, useSelector } from "react-redux";
import { addCreditCard, isRegisterNewCreditCard, payOrder, clearPaymentResponse} from "../slice/paymentSlice";

export const usePaymentStore = () => {
  const dispatch = useDispatch();
  const paymentResponse = useSelector((state) => state.payment.paymentResponse)
  const cryptcreditCard = useSelector((state) => state.payment.creditCard);
  const isRegisterCreditCard = useSelector((state) => state.payment.isRegisterCreditCard);
  const isPaying = useSelector((state) => state.payment.isPaying);
  const clearPaymentResponseAction = () => dispatch(clearPaymentResponse());
  const addCreditCardAction = (data) => dispatch(addCreditCard(data));
  const payOrderAction = (data) => dispatch(payOrder(data))
  const isRegisterNewCreditCardAction = (data) => dispatch(isRegisterNewCreditCard(data));

   return {
    cryptcreditCard,
    isRegisterCreditCard,
    isPaying,
    paymentResponse,
    addCreditCardAction,
    isRegisterNewCreditCardAction,
    payOrderAction,
    clearPaymentResponseAction
  };
};