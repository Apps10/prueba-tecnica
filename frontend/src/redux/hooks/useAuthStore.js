import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../slice/userSlice";

export const useAuthStore = () => {
  const dispatch = useDispatch();

  const isLoggingIn = useSelector((state) => state.auth.isLoggingIn);
  const authUser = useSelector((state) => state.auth.authUser);
  const loginAction = (data) => dispatch(login(data));;
  const logoutAction = (data) => dispatch(logout());;
  const isLoggingIng = useSelector((state) => state.auth.isLoggingIng);
  return {
    isLoggingIn,
    authUser,
    loginAction,
    logoutAction,
    isLoggingIng,
  };
};