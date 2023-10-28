import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './CounterSlice'; // Adjust the import path

const rootReducer = combineReducers({
  newAuth: counterReducer
});

export default rootReducer;

// Define RootState type
export type RootState = ReturnType<typeof rootReducer>;
