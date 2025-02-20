import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/AuthSlice';
import complaintReducer from './slices/complaintSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    complaints: complaintReducer,
  },
});

// Remove TypeScript type exports
export const getState = store.getState;
export const dispatch = store.dispatch; 