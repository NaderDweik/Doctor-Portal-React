import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  photos: {
    frontPose: null,
    frontSmiling: null,
    frontal: null,
    leftBuccal: null,
    lowerOcclusal: null,
    upperOcclusal: null,
    rightBuccal: null,
    sideProfile: null,
  },
  xrays: {
    cephalometric: null,
    panoramic: null,
  },
};

export const summarySlice = createSlice({
  name: 'summary',
  initialState,
  reducers: {
    setPhoto: (state, action) => {
      const { name, file } = action.payload;
      state.photos[name] = file;
    },
    setXray: (state, action) => {
      const { name, file } = action.payload;
      state.xrays[name] = file;
    },
  },
});

export const { setPhoto, setXray } = summarySlice.actions;

export default summarySlice.reducer;