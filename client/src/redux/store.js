import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import sidebarReducer from "./features/sidebarSlice";
import authReducer from "./features/authSlice";
import categoryReducer from "./features/categorySlice";

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["shopData", "adminData", "staffData"],
};
const categoriesPersistConfig = {
  key: "categories",
  storage,
};

const rootReducer = combineReducers({
  sidebar: sidebarReducer,
  auth: persistReducer(persistConfig, authReducer),
  categories: persistReducer(categoriesPersistConfig, categoryReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
