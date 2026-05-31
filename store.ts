import { configureStore } from '@reduxjs/toolkit';

import modalReducer from './modalSlice';
import cartReducer from './cartSlice';
import userReducer from './userSlice';

import { productApi } from './services/productApi';

import {
  persistStore,
  persistReducer,
} from 'redux-persist';

import storage from './storage';

const persistConfig = {
  key: 'cart',
  storage,
};

const persistedCartReducer = persistReducer(
  persistConfig,
  cartReducer
);

export const store = configureStore({
  reducer: {
    modal: modalReducer,

    cart: persistedCartReducer,

    [productApi.reducerPath]: productApi.reducer,

    user: userReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(productApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<
  typeof store.getState
>;

export type AppDispatch = typeof store.dispatch;