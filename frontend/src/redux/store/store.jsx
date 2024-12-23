import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Usa localStorage por defecto
import authReducer from "../slice/userSlice";
import orderReducer from "../slice/orderSlice";
import paymentReducer from "../slice/paymentSlice";
import shippingReducer from "../slice/shippingSlice";


const persistConfig = {
  key: 'root', // El key que usará redux-persist
  storage,     // Almacenamiento local (puedes cambiarlo por sessionStorage si prefieres)
  whitelist: ['authUser', 'shippingInfo', "productsSelected"]
};

const AuthpersistedReducer = persistReducer(persistConfig, authReducer);
const ShippingPersistedReducer = persistReducer(persistConfig, shippingReducer);
const orderPersistedReducer = persistReducer(persistConfig, orderReducer);

const store = configureStore({
  reducer: {
    auth: AuthpersistedReducer,
    order: orderPersistedReducer,
    payment: paymentReducer,
    shipping: ShippingPersistedReducer
  },
});

const persistor = persistStore(store);

export { store, persistor }