import { configureStore } from '@reduxjs/toolkit';
import CounterReducer from './CounterSlice';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
  key: 'root', // Key under which your persisted state will be stored
  storage: AsyncStorage, // Storage engine to be used for persistence
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, CounterReducer);

export const store = configureStore({
  reducer: {
    newAuth : persistedReducer,
  

  },
});

export const persistor = persistStore(store);
