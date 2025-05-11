//Store.js
import { configureStore } from '@reduxjs/toolkit';
import impressionReducer from './slices/impressionSlice';
import prescriptionReducer from './slices/prescriptionSlice';
import summaryReducer from './slices/summarySlice';
import settingsReducer from './slices/settingsSlice'; // Add this import

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    impression: impressionReducer,
    prescription: prescriptionReducer,
    summary: summaryReducer,
  },
});