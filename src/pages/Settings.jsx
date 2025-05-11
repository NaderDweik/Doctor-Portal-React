// src/pages/SettingsPage.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  updateUserProfile, 
  updateClinicalPreferences,
  addAddress,
  updateAddress,
  deleteAddress,
  toggleConfirmModal
} from '../redux/slices/settingsSlice';
import { ArrowLeft, Home, Upload, Edit, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

// Layout components - Import these from your project
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Footer from '../components/layout/Footer';

export const SettingsPage = () => {
  const dispatch = useDispatch();
  const { profile, clinicalPreferences, addresses, showConfirmModal } = useSelector((state) => state.settings);
  
  // State for active tab
  const [activeTab, setActiveTab] = useState('general');
  
  // State for editable fields
  const [editableField, setEditableField] = useState(null);
  const [tempEditValue, setTempEditValue] = useState('');
  
  // State for new address
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    id: '',
    addressLine1: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
  });

  // Function to handle tab change
  //conditional rendering of tabs based on activeTab state
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setEditableField(null);
  };

  // Function to handle edit mode When edit button is clicked:
  const handleEditClick = (field, value) => {
    setEditableField(field); //Set editableField to the field being edited

    setTempEditValue(value); //Set tempEditValue to current value

  };

  // Function to save changes to profile
  const handleSaveProfile = (field) => {
    dispatch(updateUserProfile({ field, value: tempEditValue }));
    setEditableField(null);
  };

  // Function to handle profile field change
  const handleProfileChange = (e) => {
    setTempEditValue(e.target.value);
  };

  // Function to handle clinical preference change
  const handlePreferenceChange = (preference, value) => {
    dispatch(updateClinicalPreferences({ preference, value }));
  };

  // Functions for address  operations
  const handleAddAddress = () => {
    const addressId = `address_${addresses.length + 1}`;
    const addressWithId = { ...newAddress, id: addressId };
    dispatch(addAddress(addressWithId));
    setNewAddress({
      id: '',
      addressLine1: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
    });
    setIsAddingNewAddress(false); //will close the "Add Address" modal.
  };

  const handleUpdateAddress = (addressId) => {
    dispatch(updateAddress({ id: addressId, ...tempEditValue }));
    setEditableField(null);
  };

  const handleDeleteAddress = (addressId) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      dispatch(deleteAddress(addressId));
    }
  };

  const handleNewAddressChange = (field, value) => {
    setNewAddress({
      ...newAddress,
      [field]: value //Uses computed property name syntax to update just the specific field ('city', 'state') with the new value.
    });
  };

  // Function to handle profile image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader(); // Create a new FileReader instance to read the file
      reader.onload = (event) => { 
        dispatch(updateUserProfile({ field: 'profileImage', value: event.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to handle additional instructions
  const handleAdditionalInstructionsChange = (e) => {
    dispatch(updateClinicalPreferences({ preference: 'additionalInstructions', value: e.target.value }));
  };

  // Function to reset preferences to defaults
  const handleResetToDefaults = () => {
    // You could define default values here or dispatch a reset action
    if (window.confirm('Are you sure you want to reset all preferences to defaults?')) {
      dispatch(updateClinicalPreferences({ preference: 'teethToMove', value: 'canine' }));
      dispatch(updateClinicalPreferences({ preference: 'attachments', value: 'never' }));
      dispatch(updateClinicalPreferences({ preference: 'iprPref', value: 'never' }));
      dispatch(updateClinicalPreferences({ preference: 'iprValue', value: '0.3' }));
      dispatch(updateClinicalPreferences({ preference: 'passiveAligners', value: 'use' }));
      dispatch(updateClinicalPreferences({ preference: 'stepsNumber', value: 'specify' }));
      dispatch(updateClinicalPreferences({ preference: 'stepsValue', value: '20' }));
      dispatch(updateClinicalPreferences({ preference: 'pontics', value: 'none' }));
      dispatch(updateClinicalPreferences({ preference: 'additionalInstructions', value: '' }));
    }
  };

  // Function to close confirmation modal
  const handleCloseConfirmModal = (confirmed) => {
    // If not confirmed, you could revert the changes here
    dispatch(toggleConfirmModal(false));
  };









  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-200">
        <div className="container mx-auto px-6 py-4"> 
          <div className="flex items-center">
            <Link to="/" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft size={40} />
            </Link>
            <h1 className="text-xl font-medium text-gray-800 ml-6">Settings</h1>
          </div>
        </div>
      </div>
      
      <main className="container mx-auto px-6 py-6">
        {/* Tabs */}
        <div className="flex border-b mb-8">
          <button
            className={`px-6 py-2 font-medium ${
              activeTab === 'general'
                ? 'text-teal-700 border-b-2 border-teal-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => handleTabChange('general')}
          >
            General
          </button>
          <button
            className={`px-6 py-2 font-medium ${
              activeTab === 'clinical'
                ? 'text-teal-700 border-b-2 border-teal-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => handleTabChange('clinical')}
          >
            Clinical Preferences
          </button>
          <button
            className={`px-6 py-2 font-medium ${
              activeTab === 'address'
                ? 'text-teal-700 border-b-2 border-teal-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => handleTabChange('address')}
          >
            Address
          </button>
          <button
            className={`px-6 py-2 font-medium ${
              activeTab === 'resources'
                ? 'text-teal-700 border-b-2 border-teal-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => handleTabChange('resources')}
          >
            Resources
          </button>
        </div><div>
</div>



















          {activeTab === 'general' && (
            <div className="max-w-5xl mx-auto">
              {/* Profile Photo */}
              <div className="flex items-center mb-12">
                <div className="relative">
                  <div className="w-28 h-28 rounded-full bg-gray-200 overflow-hidden">
                    {profile.profileImage ? (
                      <img
                        src={profile.profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-12 h-12"
                        >
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      </div>
                    )}
                  </div>
                  <label
                    htmlFor="profile-image"
                    className="absolute bottom-0 right-0 bg-teal-600 text-white p-1 rounded-full cursor-pointer"
                  >
                    <Upload size={16} />
                    <input
                      type="file"
                      id="profile-image"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
                <div className="ml-8">
                  <button className="text-teal-600 hover:underline" onClick={handleImageChange}>
                    Change image

                    
                  </button>
                </div>
              </div>

              {}
              <div>

              
                {/* Name */}
                <div className="border-t border-gray-200">
                  <div className="flex justify-between items-center py-6">
                    <div className="text-gray-600">Name</div>
                    {editableField === 'name' ? (
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={tempEditValue}
                          onChange={handleProfileChange}
                          className="border-b border-teal-500 px-2 py-1 mr-2 focus:outline-none"
                        />
                        <button
                          onClick={() => handleSaveProfile('name')}
                          className="text-teal-600 hover:text-teal-800 font-medium"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <span className="mr-3 text-gray-800">{profile.name}</span>
                        <button
                          onClick={() => handleEditClick('name', profile.name)}
                          className="text-teal-600 hover:text-teal-800"
                        >
                          Edit
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="border-t border-gray-200">
                  <div className="flex justify-between items-center py-6">
                    <div className="text-gray-600">Email</div>
                    <div className="text-gray-800">{profile.email}</div>
                  </div>
                </div>

                {/* Phone Number */}
                <div className="border-t border-gray-200">
                  <div className="flex justify-between items-center py-6">
                    <div className="text-gray-600">Phone Number</div>
                    {editableField === 'phoneNumber' ? (
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={tempEditValue}
                          onChange={handleProfileChange}
                          className="border-b border-teal-500 px-2 py-1 mr-2 focus:outline-none"
                        />
                        <button
                          onClick={() => handleSaveProfile('phoneNumber')}
                          className="text-teal-600 hover:text-teal-800 font-medium"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <span className="mr-3 text-gray-800">{profile.phoneNumber}</span>
                        <button
                          onClick={() => handleEditClick('phoneNumber', profile.phoneNumber)}
                          className="text-teal-600 hover:text-teal-800"
                        >
                          Edit
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Dental Notation */}
                <div className="border-t border-gray-200">
                  <div className="flex justify-between items-center py-6">
                    <div className="text-gray-600">Dental Notation</div>
                    {editableField === 'dentalNotation' ? (
                      <div className="flex items-center">
                        <select
                          value={tempEditValue}
                          onChange={handleProfileChange}
                          className="border-b border-teal-500 px-2 py-1 mr-2 focus:outline-none"
                        >
                          <option value="Palmer Notation System">Palmer Notation System</option>
                          <option value="FDI World Dental Federation Notation">FDI World Dental Federation Notation</option>
                          <option value="Universal Numbering System">Universal Numbering System</option>
                        </select>
                        <button
                          onClick={() => handleSaveProfile('dentalNotation')}
                          className="text-teal-600 hover:text-teal-800 font-medium"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <span className="mr-3 text-gray-800">{profile.dentalNotation}</span>
                        <button
                          onClick={() => handleEditClick('dentalNotation', profile.dentalNotation)}
                          className="text-teal-600 hover:text-teal-800"
                        >
                          Edit
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Language */}
                <div className="border-t border-gray-200">
                  <div className="flex justify-between items-center py-6">
                    <div className="text-gray-600">Language</div>
                    {editableField === 'language' ? (
                      <div className="flex items-center">
                        <select
                          value={tempEditValue}
                          onChange={handleProfileChange}
                          className="border-b border-teal-500 px-2 py-1 mr-2 focus:outline-none"
                        >
                          <option value="English">English</option>
                          <option value="Spanish">Spanish</option>
                          <option value="French">French</option>
                          <option value="Arabic">Arabic</option>
                        </select>
                        <button
                          onClick={() => handleSaveProfile('language')}
                          className="text-teal-600 hover:text-teal-800 font-medium"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <span className="mr-3 text-gray-800">{profile.language}</span>
                        <button
                          onClick={() => handleEditClick('language', profile.language)}
                          className="text-teal-600 hover:text-teal-800 font-medium"
                        >
                          Edit
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}






















          {/* Clinical Preferences Tab Content */}
          {activeTab === 'clinical' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="space-y-8">
                  {/* Teeth To be Moved */}
                  <div className="border-t border-gray-200 pt-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 md:mb-0">Teeth To be Moved</h3>
                      <div className="text-gray-700">Which teeth do you want to move during treatment?</div>
                    </div>
                    <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-6">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="teethToMove"
                          value="canine"
                          checked={clinicalPreferences.teethToMove === 'canine'}
                          onChange={() => handlePreferenceChange('teethToMove', 'canine')}
                          className="h-5 w-5 text-teal-600 focus:ring-teal-500"
                        />
                        <span className="ml-2 text-gray-700">Canine to canine</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="teethToMove"
                          value="premolar"
                          checked={clinicalPreferences.teethToMove === 'premolar'}
                          onChange={() => handlePreferenceChange('teethToMove', 'premolar')}
                          className="h-5 w-5 text-teal-600 focus:ring-teal-500"
                        />
                        <span className="ml-2 text-gray-700">Second premolar to second premolar</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="teethToMove"
                          value="molar"
                          checked={clinicalPreferences.teethToMove === 'molar'}
                          onChange={() => handlePreferenceChange('teethToMove', 'molar')}
                          className="h-5 w-5 text-teal-600 focus:ring-teal-500"
                        />
                        <span className="ml-2 text-gray-700">Second molar to second molar</span>
                      </label>
                    </div>
                  </div>

                  {/* Pontics */}
                  <div className="border-t border-gray-200 pt-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 md:mb-0">Pontics</h3>
                      <div className="text-gray-700">Should pontics (missing teeth) be filled inside of the aligner?</div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">Please note there is additional charges for each pontic</p>
                    <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-6">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="pontics"
                          value="none"
                          checked={clinicalPreferences.pontics === 'none'}
                          onChange={() => handlePreferenceChange('pontics', 'none')}
                          className="h-5 w-5 text-teal-600 focus:ring-teal-500"
                        />
                        <span className="ml-2 text-gray-700">Don't use pontics</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="pontics"
                          value="withoutPaint"
                          checked={clinicalPreferences.pontics === 'withoutPaint'}
                          onChange={() => handlePreferenceChange('pontics', 'withoutPaint')}
                          className="h-5 w-5 text-teal-600 focus:ring-teal-500"
                        />
                        <span className="ml-2 text-gray-700">Use pontics without paint</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="pontics"
                          value="withPaint"
                          checked={clinicalPreferences.pontics === 'withPaint'}
                          onChange={() => handlePreferenceChange('pontics', 'withPaint')}
                          className="h-5 w-5 text-teal-600 focus:ring-teal-500"
                        />
                        <span className="ml-2 text-gray-700">Use pontics with paint (second premolar to second premolar only)</span>
                      </label>
                    </div>
                  </div>

                  {/* Attachments */}
                  <div className="border-t border-gray-200 pt-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 md:mb-0">Attachments</h3>
                      <div className="text-gray-700">
                        At what step, if at all, do you prefer to have attachments placed during treatment?
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-6">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="attachments"
                          value="never"
                          checked={clinicalPreferences.attachments === 'never'}
                          onChange={() => handlePreferenceChange('attachments', 'never')}
                          className="h-5 w-5 text-teal-600 focus:ring-teal-500"
                        />
                        <span className="ml-2 text-gray-700">Never use attachments</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="attachments"
                          value="step1"
                          checked={clinicalPreferences.attachments === 'step1'}
                          onChange={() => handlePreferenceChange('attachments', 'step1')}
                          className="h-5 w-5 text-teal-600 focus:ring-teal-500"
                        />
                        <span className="ml-2 text-gray-700">As needed, at step 1</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="attachments"
                          value="step2"
                          checked={clinicalPreferences.attachments === 'step2'}
                          onChange={() => handlePreferenceChange('attachments', 'step2')}
                          className="h-5 w-5 text-teal-600 focus:ring-teal-500"
                        />
                        <span className="ml-2 text-gray-700">As needed, at step 2</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="attachments"
                          value="step3"
                          checked={clinicalPreferences.attachments === 'step3'}
                          onChange={() => handlePreferenceChange('attachments', 'step3')}
                          className="h-5 w-5 text-teal-600 focus:ring-teal-500"
                        />
                        <span className="ml-2 text-gray-700">As needed, at step 3</span>
                      </label>
                    </div>
                  </div>

                  {/* Inter-proximal reduction (IPR) */}
                  <div className="border-t border-gray-200 pt-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 md:mb-0">
                        Inter-proximal reduction (IPR)
                      </h3>
                      <div className="text-gray-700">Do you want to use IPR during treatment?</div>
                    </div>
                    <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-6 mb-6">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="iprPref"
                          value="never"
                          checked={clinicalPreferences.iprPref === 'never'}
                          onChange={() => handlePreferenceChange('iprPref', 'never')}
                          className="h-5 w-5 text-teal-600 focus:ring-teal-500"
                        />
                        <span className="ml-2 text-gray-700">Never add IPR</span>
                      </label>

                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="iprPref"
                          value="needed"
                          checked={clinicalPreferences.iprPref === 'needed'}
                          onChange={() => handlePreferenceChange('iprPref', 'needed')}
                          className="h-5 w-5 text-teal-600 focus:ring-teal-500"
                        />
                        <span className="ml-2 text-gray-700">Add IPR when needed</span>
                      </label>
                    </div>

                    {clinicalPreferences.iprPref === 'needed' && (
                      <div>
                        <div className="text-gray-700 mb-3">
                          Indicate the total IPR value to be used during treatment:
                        </div>
                        <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-6">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="iprValue"
                              value="0.3"
                              checked={clinicalPreferences.iprValue === '0.3'}
                              onChange={() => handlePreferenceChange('iprValue', '0.3')}
                              className="h-5 w-5 text-teal-600 focus:ring-teal-500"
                            />
                            <span className="ml-2 text-gray-700">Do not exceed 0.3 mm (Per contact)</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="iprValue"
                              value="0.4"
                              checked={clinicalPreferences.iprValue === '0.4'}
                              onChange={() => handlePreferenceChange('iprValue', '0.4')}
                              className="h-5 w-5 text-teal-600 focus:ring-teal-500"
                            />
                            <span className="ml-2 text-gray-700">Do not exceed 0.4 mm (Per contact)</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="iprValue"
                              value="0.5"
                              checked={clinicalPreferences.iprValue === '0.5'}
                              onChange={() => handlePreferenceChange('iprValue', '0.5')}
                              className="h-5 w-5 text-teal-600 focus:ring-teal-500"
                            />
                            <span className="ml-2 text-gray-700">Do not exceed 0.5 mm (Per contact)</span>
                          </label>
                        </div>
                      </div>
                    )}
                  </div>


                  {/* Passive Aligners */}
                  <div className="border-t border-gray-200 pt-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 md:mb-0">Passive Aligners</h3>
                      <div className="text-gray-700">
                        How do you want to address different number of aligner steps between arches?
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-6">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="passiveAligners"
                          value="none"
                          checked={clinicalPreferences.passiveAligners === 'none'}
                          onChange={() => handlePreferenceChange('passiveAligners', 'none')}
                          className="h-5 w-5 text-teal-600 focus:ring-teal-500"
                        />
                        <span className="ml-2 text-gray-700">Don't use passive aligners</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="passiveAligners"
                          value="use"
                          checked={clinicalPreferences.passiveAligners === 'use'}
                          onChange={() => handlePreferenceChange('passiveAligners', 'use')}
                          className="h-5 w-5 text-teal-600 focus:ring-teal-500"
                        />
                        <span className="ml-2 text-gray-700">Use passive aligners</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="passiveAligners"
                          value="active"
                          checked={clinicalPreferences.passiveAligners === 'active'}
                          onChange={() => handlePreferenceChange('passiveAligners', 'active')}
                          className="h-5 w-5 text-teal-600 focus:ring-teal-500"
                        />
                        <span className="ml-2 text-gray-700">Keep both arches active during treatment</span>
                      </label>
                    </div>
                  </div>


                  {/* Number of Steps */}
                  <div className="border-t border-gray-200 pt-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 md:mb-0">Number of Steps</h3>
                      <div className="text-gray-700">
                        Specify the maximum number of aligner steps in your treatment setups:
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-6">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="stepsNumber"
                          value="none"
                          checked={clinicalPreferences.stepsNumber === 'none'}
                          onChange={() => handlePreferenceChange('stepsNumber', 'none')}
                          className="h-5 w-5 text-teal-500 focus:ring-teal-500"
                        />
                        <span className="ml-2 text-gray-700">No maximum number</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="stepsNumber"
                          value="specify"
                          checked={clinicalPreferences.stepsNumber === 'specify'}
                          onChange={() => handlePreferenceChange('stepsNumber', 'specify')}
                          className="h-5 w-5 text-teal-600 focus:ring-teal-500"
                        />
                        <span className="ml-2 text-gray-700">Please specify maximum number:</span>
                        
                        {clinicalPreferences.stepsNumber === 'specify' && (
                          <input
                            type="number"
                            min="1"
                            value={clinicalPreferences.stepsValue}
                            onChange={(e) => handlePreferenceChange('stepsValue', e.target.value)}
                            className="ml-2 w-16 p-1 border border-gray-300 rounded text-center"
                          />
                        )}
                      </label>
                    </div>
                  </div>

                  {/* Other preferences - From Image 2 */}
                  <div className="border-t border-gray-200 pt-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 md:mb-0">Other preferences</h3>
                      <div className="text-gray-700">
                        Enter additional instructions to be applied to all of your treatments:
                      </div>
                    </div>
                    <textarea 
                      value={clinicalPreferences.additionalInstructions}
                      onChange={handleAdditionalInstructionsChange}
                      className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none h-32"
                      placeholder="Type here ..."
                    />
                  </div>
                </div>

                {/* Action buttons for the clinical tab - match Image 2 */}
                <div className="flex justify-end mt-8 space-x-4">
                  <button
                    onClick={handleResetToDefaults}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors"
                  >
                    Reset to defaults
                  </button>
                  <button
                    onClick={() => dispatch(toggleConfirmModal(true))}
                    className="px-6 py-2 bg-teal-700 text-white rounded-full hover:bg-teal-800 transition-colors"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Address Tab Content - Match Image 3 */}
          {activeTab === 'address' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-lg font-semibold text-gray-800">Your Addresses</h3>
                  <button
                    onClick={() => setIsAddingNewAddress(true)}
                    className="px-4 py-2 bg-teal-700 text-white rounded-lg flex items-center"
                  >
                    <span className="mr-2">Add new Address</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </button>
                </div>

                {/* Addresses List - Styled to match Image 3 */}
                <div className="grid md:grid-cols-3 gap-6">
                  {addresses.map((address, index) => (
                    <div
                      key={address.id}
                      className="border border-gray-200 rounded-lg p-4 relative"
                    >
                      <div className="flex items-start mb-3">
                        <Home size={18} className="text-teal-600 mr-2 mt-1" />
                        <h4 className="text-base font-medium">Address {index + 1}</h4>
                      </div>
                      <div className="text-gray-600 space-y-1 mb-4">
                        <p>{address.addressLine1}</p>
                        <p>{address.city}</p>
                        <p>{address.country}</p>
                        <p>{address.state}</p>
                        <p>{address.postalCode}</p>
                      </div>
                      <div className="mt-2">

                      </div>

                      <div className="mt-2 flex justify-between">
  <button
    onClick={() => handleDeleteAddress(address.id)}
    className="text-red-600 hover:text-red-800 text-sm"
  >
    Delete
  </button>
  <button
    onClick={() => {
      setEditableField(`address_${address.id}`);
      setTempEditValue(address);
    }}
    className="text-teal-600 hover:text-teal-800 text-sm"
  >
    Edit
  </button>
</div>



                    </div>
                  ))}
                </div>

                {/* Edit Address Modal */}
                {editableField && editableField.startsWith('address_') && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                      <h3 className="text-lg font-semibold mb-4">Edit Address</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Address Line</label>
                          <input
                            type="text"
                            value={tempEditValue.addressLine1}
                            onChange={(e) => setTempEditValue({...tempEditValue, addressLine1: e.target.value})}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                          <input
                            type="text"
                            value={tempEditValue.city}
                            onChange={(e) => setTempEditValue({...tempEditValue, city: e.target.value})}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
                          <input
                            type="text"
                            value={tempEditValue.state}
                            onChange={(e) => setTempEditValue({...tempEditValue, state: e.target.value})}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                          <input
                            type="text"
                            value={tempEditValue.country}
                            onChange={(e) => setTempEditValue({...tempEditValue, country: e.target.value})}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                          <input
                            type="text"
                            value={tempEditValue.postalCode}
                            onChange={(e) => setTempEditValue({...tempEditValue, postalCode: e.target.value})}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end mt-6 space-x-3">
                        <button
                          onClick={() => setEditableField(null)}
                          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            const addressId = editableField.replace('address_', '');
                            handleUpdateAddress(addressId);
                          }}
                          className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Add New Address Modal */}
                {isAddingNewAddress && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                      <h3 className="text-lg font-semibold mb-4">Add New Address</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Address Line</label>
                          <input
                            type="text"
                            value={newAddress.addressLine1}
                            onChange={(e) => handleNewAddressChange('addressLine1', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                          <input
                            type="text"
                            value={newAddress.city}
                            onChange={(e) => handleNewAddressChange('city', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
                          <input
                            type="text"
                            value={newAddress.state}
                            onChange={(e) => handleNewAddressChange('state', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                          <input
                            type="text"
                            value={newAddress.country}
                            onChange={(e) => handleNewAddressChange('country', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                          <input
                            type="text"
                            value={newAddress.postalCode}
                            onChange={(e) => handleNewAddressChange('postalCode', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end mt-6 space-x-3">
                        <button
                          onClick={() => setIsAddingNewAddress(false)}
                          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleAddAddress}
                          className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Resources Tab Content */}
          {activeTab === 'resources' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">Resources</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Resource Cards */}
                  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h4 className="font-medium text-lg mb-2">User Guide</h4>
                    <p className="text-gray-600 mb-4">Learn how to use the EonDental platform with our comprehensive user guide.</p>
                    <a href="#" className="text-teal-600 hover:underline">View Guide</a>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h4 className="font-medium text-lg mb-2">Clinical Research</h4>
                    <p className="text-gray-600 mb-4">Access the latest research on clear aligner therapy and treatment outcomes.</p>
                    <a href="#" className="text-teal-600 hover:underline">View Research</a>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h4 className="font-medium text-lg mb-2">Troubleshooting</h4>
                    <p className="text-gray-600 mb-4">Find solutions to common issues and get support for your aligner treatments.</p>
                    <a href="#" className="text-teal-600 hover:underline">Get Help</a>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h4 className="font-medium text-lg mb-2">Training Videos</h4>
                    <p className="text-gray-600 mb-4">Watch step-by-step videos to learn best practices for clear aligner therapy.</p>
                    <a href="#" className="text-teal-600 hover:underline">Watch Videos</a>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Action Buttons - Only needed for General tab like in Image 1 */}
          {activeTab === 'general' && (
            <div className="flex justify-end mt-8 max-w-5xl mx-auto">
              <div className="space-x-4">
                <Link 
                  to="/dashboard"
                  className="px-10 py-3 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </Link>
                <button
                  onClick={() => {
                    // You can add additional validation or confirmation here if needed
                    alert('Settings saved successfully!');
                  }}
                  className="px-10 py-3 bg-teal-700 text-white rounded-full hover:bg-gray-400 transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          )}
{showConfirmModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-8 w-full max-w-md">
      <div className="flex items-start mb-4">
        <div className="flex-shrink-0 text-red-500 mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="12" cy="12" r="10" strokeWidth="2" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">These new preferences will only be applied to new case submissions.</h3>
        </div>
      </div>
      <div className="border-t border-gray-200 my-6"></div>
      <div className="flex justify-end space-x-4">
        <button
          onClick={() => handleCloseConfirmModal(false)}
          className="px-8 py-2 bg-white border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50"
        >
          No
        </button>
        <button
          onClick={() => {
            handleCloseConfirmModal(true);
            alert('Clinical preferences saved successfully!');
          }}
          className="px-8 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700"
        >
          Yes
        </button>
      </div>
    </div>
  </div>
)}
{/* Close the return block */}
</main>
</div>
);
};





export default SettingsPage;
