import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  impressionType: 'upload-3d-scans', // Default selected option
  upperImpression: null,
  lowerImpression: null,
  otherLink: '',
  pickupAddress: '',


};

export const impressionSlice = createSlice({
  name: 'impression',
  initialState,
  reducers: {
    setImpressionType: (state, action) => {
      state.impressionType = action.payload;
    },
    setUpperImpression: (state, action) => {
      state.upperImpression = action.payload;
    },
    setLowerImpression: (state, action) => {
      state.lowerImpression = action.payload;
    },
    setOtherLink: (state, action) => {
      state.otherLink = action.payload;
    },
    setPickupAddress: (state, action) => {
      state.pickupAddress = action.payload;
    },
  },
});

export const {
  setImpressionType,
  setUpperImpression,
  setLowerImpression,
  setOtherLink,
  setPickupAddress,
} = impressionSlice.actions;

export default impressionSlice.reducer;