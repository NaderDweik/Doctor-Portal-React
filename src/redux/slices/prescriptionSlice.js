import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chiefComplaint: '',
  additionalNotes: '',
  arch: 'both', // Default to both
  packageType: 'basic', // Default to basic
  selectedTeeth: [], // Array to store IDs of selected teeth
  clinicalPreferences: {
    teethToMove: 'premolar', // Default to premolar
    attachments: 'step1', // Default to step 1
    iprPref: 'needed', // Default to as needed
    iprValue: '0.3', // Default to 0.3
    passiveAligners: 'none', // Default to none
    stepsNumber: 'none', // Default to no maximum
    stepsValue: '', // Value for maximum steps if specified
    cChain: 'no', // Default to no
    pontics: 'none', // Default to none
    otherPreferences: '', // Additional instructions
  },
};

export const prescriptionSlice = createSlice({
  name: 'prescription',
  initialState,
  reducers: {
    setChiefComplaint: (state, action) => {
      state.chiefComplaint = action.payload;
    },
    setAdditionalNotes: (state, action) => {
      state.additionalNotes = action.payload;
    },
    setArch: (state, action) => {
      state.arch = action.payload;
    },
    setPackageType: (state, action) => {
      state.packageType = action.payload;
    },
    toggleSelectedTooth: (state, action) => {
      const toothId = action.payload;
      const index = state.selectedTeeth.indexOf(toothId);
      if (index !== -1) {
        // If tooth is already selected, remove it
        state.selectedTeeth.splice(index, 1);
      } else {
        // Otherwise add it to the selection
        state.selectedTeeth.push(toothId);
      }
    },
    setClinicalPreference: (state, action) => {
      const { preference, value } = action.payload;
      state.clinicalPreferences[preference] = value;
    },
    // New action to reset form
    resetPrescription: (state) => {
      return initialState;
    },
    // New action to set entire prescription (useful for loading from saved data)
    setPrescription: (state, action) => {
      return action.payload;
    },
    // Add resetSelectedTeeth action
    resetSelectedTeeth: (state) => {
      state.selectedTeeth = [];
    }
  },
});

export const {
  setChiefComplaint,
  setAdditionalNotes,
  setArch,
  setPackageType,
  toggleSelectedTooth,
  setClinicalPreference,
  resetPrescription,
  setPrescription,
  resetSelectedTeeth // Add this exported action
} = prescriptionSlice.actions;

export default prescriptionSlice.reducer;