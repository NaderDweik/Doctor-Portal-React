import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  setImpressionType, 
  setUpperImpression, 
  setLowerImpression, 
  setOtherLink, 
  setPickupAddress 
} from '../redux/slices/impressionSlice';

// Layout components
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Footer from '../components/layout/Footer';

// Import assets - updated paths
import upperImpressionSvg from '../assets/PhotosPage/upperImpressions.svg';
import lowerImpressionSvg from '../assets/PhotosPage/lowerImpressionz.svg';
import uploadIcon from '../assets/icons/UPSVG.svg';

const ImpressionPage = () => {
  const dispatch = useDispatch();
  const { 
    impressionType, 
    upperImpression, 
    lowerImpression, 
    otherLink, 
    pickupAddress 
  } = useSelector((state) => state.impression);
  
  // Get addresses from settings state
  const { addresses } = useSelector((state) => state.settings);
  
  // Refs for file inputs
  const upperFileInputRef = useRef(null);
  const lowerFileInputRef = useRef(null);

  // Handle radio button change
  const handleImpressionTypeChange = (e) => {
    dispatch(setImpressionType(e.target.value));
  };

  // Handle file upload
  const handleFileUpload = (type, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'upper') {
          dispatch(setUpperImpression(reader.result));
        } else if (type === 'lower') {
          dispatch(setLowerImpression(reader.result));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file upload dialog
  const triggerFileInput = (type) => {
    if (type === 'upper') {
      upperFileInputRef.current.click();
    } else {
      lowerFileInputRef.current.click();
    }
  };

  // Handle text input change
  const handleTextChange = (e) => {
    dispatch(setOtherLink(e.target.value));
  };

  // Handle address selection
  const handleAddressChange = (e) => {
    dispatch(setPickupAddress(e.target.value));
  };

  // Format address as string
  const formatAddress = (address) => {
    let formattedAddress = '';
    
    if (address.addressLine1) {
      formattedAddress += address.addressLine1;
    }
    
    if (address.city) {
      formattedAddress += formattedAddress ? `, ${address.city}` : address.city;
    }
    
    if (address.state) {
      formattedAddress += formattedAddress ? `, ${address.state}` : address.state;
    }
    
    if (address.postalCode) {
      formattedAddress += formattedAddress ? ` ${address.postalCode}` : address.postalCode;
    }
    
    if (address.country) {
      formattedAddress += formattedAddress ? `, ${address.country}` : address.country;
    }
    
    return formattedAddress;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar />
      
      <main className="ml-[230px] pt-[70px] pb-[80px] px-8">
        <Header />
        
        {/* Page header with gradient underline */}
        <div className="mb-8 relative">
          <h1 className="text-3xl font-bold text-gray-800">Impressions</h1>
          <div className="absolute bottom-0 left-0 h-1 w-24 bg-gradient-to-r from-teal-400 to-teal-600"></div>
        </div>
        
        {/* Main content card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Selection Area */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">Submission Method</h2>
                  <p className="text-gray-700 mb-6">Select how you would like to submit your impressions:</p>
                  
                  {/* Option Cards */}
                  <div className="space-y-4">
                    {/* Digital Section */}
                    <div className="mb-6">
                      <h3 className="font-medium text-gray-700 mb-3 uppercase tracking-wide text-sm">Digital Options</h3>
                      <div className="space-y-3">
                        {/* Upload 3D Scans */}
                        <label className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-200 ${impressionType === 'upload-3d-scans' ? 'bg-teal-50 border-2 border-teal-500' : 'bg-white border border-gray-200 hover:bg-gray-50'}`}>
                          <input
                            type="radio"
                            name="impression-type"
                            value="upload-3d-scans"
                            checked={impressionType === 'upload-3d-scans'}
                            onChange={handleImpressionTypeChange}
                            className="hidden"
                          />
                          <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${impressionType === 'upload-3d-scans' ? 'border-teal-500' : 'border-gray-300'}`}>
                            {impressionType === 'upload-3d-scans' && (
                              <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                            )}
                          </div>
                          <div>
                            <span className="font-medium text-gray-800">Upload 3D Scans</span>
                            <p className="text-xs text-gray-500 mt-1">Upload STL, PLY, or DCM files directly</p>
                          </div>
                        </label>
                        
                        {/* Other */}
                        <label className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-200 ${impressionType === 'other' ? 'bg-teal-50 border-2 border-teal-500' : 'bg-white border border-gray-200 hover:bg-gray-50'}`}>
                          <input
                            type="radio"
                            name="impression-type"
                            value="other"
                            checked={impressionType === 'other'}
                            onChange={handleImpressionTypeChange}
                            className="hidden"
                          />
                          <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${impressionType === 'other' ? 'border-teal-500' : 'border-gray-300'}`}>
                            {impressionType === 'other' && (
                              <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                            )}
                          </div>
                          <div>
                            <span className="font-medium text-gray-800">External Link</span>
                            <p className="text-xs text-gray-500 mt-1">Share via WeTransfer, Google Drive, etc.</p>
                          </div>
                        </label>
                      </div>
                    </div>
                    
                    {/* Physical Section */}
                    <div>
                      <h3 className="font-medium text-gray-700 mb-3 uppercase tracking-wide text-sm">Physical Options</h3>
                      <label className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-200 ${impressionType === 'impression-pickup' ? 'bg-teal-50 border-2 border-teal-500' : 'bg-white border border-gray-200 hover:bg-gray-50'}`}>
                        <input
                          type="radio"
                          name="impression-type"
                          value="impression-pickup"
                          checked={impressionType === 'impression-pickup'}
                          onChange={handleImpressionTypeChange}
                          className="hidden"
                        />
                        <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${impressionType === 'impression-pickup' ? 'border-teal-500' : 'border-gray-300'}`}>
                          {impressionType === 'impression-pickup' && (
                            <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                          )}
                        </div>
                        <div>
                          <span className="font-medium text-gray-800">Impression Pickup</span>
                          <p className="text-xs text-gray-500 mt-1">Schedule a courier pickup service</p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Content Area */}
              <div className="lg:col-span-2">
                {/* Upload 3D Scans Content */}
                {impressionType === 'upload-3d-scans' && (
                  <div className="bg-white p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Upload 3D Scans</h3>
                    <p className="text-gray-600 mb-6">Please upload your 3D scans in STL, PLY, or DCM format:</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Upper Impression */}
                      <div className="flex flex-col items-center">
                        <div 
                          onClick={() => triggerFileInput('upper')}
                          className="relative w-full h-64 mb-4 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 hover:border-teal-500 transition-colors cursor-pointer bg-gray-50 flex items-center justify-center"
                        >
                          {upperImpression ? (
                            <img 
                              src={upperImpression} 
                              alt="Upper Impression" 
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <div className="text-center p-4">
                              <img 
                                src={upperImpressionSvg} 
                                alt="Upper Impression" 
                                className="w-32 h-32 mx-auto mb-2"
                              />
                              <div className="flex items-center justify-center mt-2">
                                <img src={uploadIcon} alt="Upload" className="w-5 h-5 mr-2" />
                                <span className="text-sm text-gray-600">Click to upload</span>
                              </div>
                            </div>
                          )}
                        </div>
                        <input
                          type="file"
                          ref={upperFileInputRef}
                          accept=".stl,.ply,.dcm"
                          onChange={(e) => handleFileUpload('upper', e)}
                          className="hidden"
                        />
                        <div className="text-center">
                          <h4 className="font-semibold text-gray-800">Upper Impression</h4>
                          <p className="text-sm text-red-500">*Required</p>
                        </div>
                      </div>
                      
                      {/* Lower Impression */}
                      <div className="flex flex-col items-center">
                        <div 
                          onClick={() => triggerFileInput('lower')}
                          className="relative w-full h-64 mb-4 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 hover:border-teal-500 transition-colors cursor-pointer bg-gray-50 flex items-center justify-center"
                        >
                          {lowerImpression ? (
                            <img 
                              src={lowerImpression} 
                              alt="Lower Impression" 
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <div className="text-center p-4">
                              <img 
                                src={lowerImpressionSvg} 
                                alt="Lower Impression" 
                                className="w-32 h-32 mx-auto mb-2"
                              />
                              <div className="flex items-center justify-center mt-2">
                                <img src={uploadIcon} alt="Upload" className="w-5 h-5 mr-2" />
                                <span className="text-sm text-gray-600">Click to upload</span>
                              </div>
                            </div>
                          )}
                        </div>
                        <input
                          type="file"
                          ref={lowerFileInputRef}
                          accept=".stl,.ply,.dcm"
                          onChange={(e) => handleFileUpload('lower', e)}
                          className="hidden"
                        />
                        <div className="text-center">
                          <h4 className="font-semibold text-gray-800">Lower Impression</h4>
                          <p className="text-sm text-red-500">*Required</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-800 mb-2">Accepted File Formats</h4>
                      <div className="flex gap-4">
                        <div className="bg-white p-3 rounded border border-blue-200 flex items-center">
                          <span className="text-blue-700 font-mono">.STL</span>
                        </div>
                        <div className="bg-white p-3 rounded border border-blue-200 flex items-center">
                          <span className="text-blue-700 font-mono">.PLY</span>
                        </div>
                        <div className="bg-white p-3 rounded border border-blue-200 flex items-center">
                          <span className="text-blue-700 font-mono">.DCM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Other Content */}
                {impressionType === 'other' && (
                  <div className="bg-white p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">External Link</h3>
                    <p className="text-gray-600 mb-6">Provide links to your impression files (e.g., WeTransfer, Google Drive):</p>
                    
                    <div className="mb-6">
                      <textarea
                        placeholder="Paste your file sharing links here..."
                        value={otherLink}
                        onChange={handleTextChange}
                        className="w-full h-40 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
                      ></textarea>
                    </div>
                    
                    <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                      <h4 className="font-medium text-yellow-800 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        Important Notes
                      </h4>
                      <ul className="mt-2 text-sm text-yellow-700 space-y-2">
                        <li>• Make sure the link does not expire before processing</li>
                        <li>• Include both upper and lower impressions</li>
                        <li>• Include your case ID in the file names</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-700 mb-2">Recommended Platforms</h4>
                      <div className="flex flex-wrap gap-3">
                        <span className="px-3 py-2 text-sm bg-white border border-gray-200 rounded-full">Google Drive</span>
                        <span className="px-3 py-2 text-sm bg-white border border-gray-200 rounded-full">WeTransfer</span>
                        <span className="px-3 py-2 text-sm bg-white border border-gray-200 rounded-full">Dropbox</span>
                        <span className="px-3 py-2 text-sm bg-white border border-gray-200 rounded-full">OneDrive</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Impression Pickup Content */}
                {impressionType === 'impression-pickup' && (
                  <div className="bg-white p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Impression Pickup</h3>
                    <p className="text-gray-600 mb-6">A courier service will contact you to arrange for the date and time of the impression pick-up.</p>
                    
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                      <p className="text-yellow-700 font-medium">Please note: impression trays won't be returned.</p>
                    </div>
                    
                    <div className="mb-8">
                      <h4 className="font-semibold text-gray-800 mb-3">Requirements</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center text-gray-700">
                          <svg className="w-5 h-5 mr-3 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          Clean, clear and sterilized impressions
                        </li>
                        <li className="flex items-center text-gray-700">
                          <svg className="w-5 h-5 mr-3 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          Silicone impressions (Alginate impressions are not accepted)
                        </li>
                        <li className="flex items-center text-gray-700">
                          <svg className="w-5 h-5 mr-3 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          Case ID and doctor name to be printed on the impression box
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <label htmlFor="pickup-address" className="block text-sm font-medium text-gray-700 mb-2">Pickup Address *</label>
                      <select
                        id="pickup-address"
                        value={pickupAddress}
                        onChange={handleAddressChange}
                        className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                      >
                        <option value="" disabled>Select address for pickup</option>
                        {addresses.map((address) => (
                          <option key={address.id} value={formatAddress(address)}>
                            {formatAddress(address)}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-700 mb-2">Scheduling Details</h4>
                      <p className="text-sm text-gray-600">After selecting an address, our team will contact you within 24 hours to schedule a convenient pickup time.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation buttons */}
        <div className="fixed bottom-0 left-[230px] right-0 bg-white border-t border-gray-200 px-10 py-4 flex justify-between">
          <button className="flex items-center px-5 py-2 text-teal-700 border-2 border-teal-700 rounded-md font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
          
          <button className="flex items-center px-5 py-2 bg-teal-700 text-white rounded-md font-medium">
            Next
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ImpressionPage;