import { useDispatch, useSelector } from "react-redux";
import { login, logout, signin, checkAuth } from "../slice/userSlice";

export const useAuthStore = () => {
  const dispatch = useDispatch();

  const isLoggingIn = useSelector((state) => state.auth.isLoggingIn);
  const authUser = useSelector((state) => state.auth.authUser);
  const loginAction = (data) => dispatch(login(data));
  const logoutAction = () => dispatch(logout());
  const signinAction = (data) => dispatch(signin(data));
  const isLoggingIng = useSelector((state) => state.auth.isLoggingIng);
  const checkAuthAction = () => dispatch(checkAuth())
  
  return {
    isLoggingIn,
    authUser,
    signinAction,
    loginAction,
    logoutAction,
    checkAuthAction,
    isLoggingIng,
  };
};