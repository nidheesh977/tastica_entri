import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import sidebarReducer from "./features/sidebarSlice";
import authReducer from "./features/authSlice";

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["shopData", "adminData", "staffData"],
};

const rootReducer = combineReducers({
  sidebar: sidebarReducer,
  auth: persistReducer(persistConfig, authReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
