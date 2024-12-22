import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Usa localStorage por defecto
import authReducer from "../slice/userSlice";


const persistConfig = {
  key: 'root', // El key que usará redux-persist
  storage,     // Almacenamiento local (puedes cambiarlo por sessionStorage si prefieres)
  whitelist: ['authUser']
};

const AuthpersistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: AuthpersistedReducer, //estados de aplicacion, en este caso manejara el usuario
  },
});

const persistor = persistStore(store);

export { store, persistor }