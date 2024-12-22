import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slice/userSlice";

export const store = configureStore({
  reducer: {
    auth: userReducer, //estados de aplicacion, en este caso manejara el usuario
  },
});
