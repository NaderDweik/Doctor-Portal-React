// src/redux/slices/settingsSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  profile: {
    name: 'Nader Dwiek',
    email: 'n.aldweik@eondental.com',
    phoneNumber: '0777778272',
    dentalNotation: 'Palmer Notation System',
    language: 'English',
    profileImage: null,
    id: '10045'
  },
  clinicalPreferences: {
    teethToMove: 'canine',
    attachments: 'never',
    iprPref: 'never',
    iprValue: '0.3',
    passiveAligners: 'none',
    stepsNumber: 'none',
    stepsValue: '20',
    pontics: 'none', // Adding from the second image
    additionalInstructions: '' // Adding from the second image
  },
  addresses: [
    {
      id: 'address_1',
      addressLine1: 'ss',
      city: 'Amman',
      state: 'ss',
      country: 'Jordan',
      postalCode: '433434'
    },
    {
      id: 'address_2',
      addressLine1: 'dssd',
      city: 'Amman',
      state: 'dsds',
      country: 'Albania',
      postalCode: 'sdsd'
    },
    {
      id: 'address_3',
      addressLine1: 'saa',
      city: 'Amman',
      state: 'aas',
      country: 'Afghanistan',
      postalCode: 'sas<div>a</div>'
    }
  ],
 
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateUserProfile: (state, action) => {
      const { field, value } = action.payload;
      state.profile[field] = value;
    },
    updateClinicalPreferences: (state, action) => {
      const { preference, value } = action.payload;
      state.clinicalPreferences[preference] = value;
    },
    addAddress: (state, action) => {
      state.addresses.push(action.payload);
    },
    updateAddress: (state, action) => {
      const { id, ...addressData } = action.payload;
      const addressIndex = state.addresses.findIndex(addr => addr.id === id);
      if (addressIndex !== -1) {
        state.addresses[addressIndex] = { id, ...addressData };
      }
    },
    deleteAddress: (state, action) => {
      const addressId = action.payload;
      state.addresses = state.addresses.filter(addr => addr.id !== addressId);
    },
    toggleConfirmModal: (state, action) => {
      state.showConfirmModal = action.payload !== undefined ? action.payload : !state.showConfirmModal;
    }
  }
});

export const { 
  updateUserProfile, 
  updateClinicalPreferences, 
  addAddress, 
  updateAddress, 
  deleteAddress,
  toggleConfirmModal
} = settingsSlice.actions;

export default settingsSlice.reducer;