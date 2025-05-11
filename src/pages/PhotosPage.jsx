import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPhoto, setXray } from '../redux/slices/summarySlice';

// Layout components
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Footer from '../components/layout/Footer';

// Import SVG files for all images
import cephalometricXraySvg from '../assets/PhotosPage/cephalometric_xrayz.svg';
import frontPoseSvg from '../assets/PhotosPage/front_posez.svg';
import frontSmilingSvg from '../assets/PhotosPage/front_smilingz.svg';
import frontalSvg from '../assets/PhotosPage/Frontal.svg';
import leftBuccalSvg from '../assets/PhotosPage/left_buccalz.svg';
import lowerOcclusalSvg from '../assets/PhotosPage/lower_occlusalz.svg';
import panoramicXraySvg from '../assets/PhotosPage/panoramic_xrayz.svg';
import profileSvg from '../assets/PhotosPage/Profilez.svg';
import rightBuccalSvg from '../assets/PhotosPage/right_buccalz.svg';
import upperOcclusalSvg from '../assets/PhotosPage/upper_occlusalz.svg';

const PhotosPage = () => {
  const dispatch = useDispatch();
  const { photos, xrays } = useSelector((state) => state.summary);
  const fileInputRef = useRef(null);
  const [activeUpload, setActiveUpload] = useState(null);

  // Placeholder images using the SVG paths
  const placeholderImages = {
    'rightBuccal': rightBuccalSvg,
    'frontal': frontalSvg,
    'leftBuccal': leftBuccalSvg,
    'upperOcclusal': upperOcclusalSvg,
    'lowerOcclusal': lowerOcclusalSvg,
    'frontSmiling': frontSmilingSvg,
    'frontNonSmiling': frontPoseSvg,
    'profile': profileSvg,
    'panoramic': panoramicXraySvg,
    'cephalometric': cephalometricXraySvg
  };

  // Arrange photos in display order (first row, then second row)
  const photoItems = [
    // First row
    { id: 'rightBuccal', label: 'Right buccal', required: true },
    { id: 'frontal', label: 'Frontal', required: true },
    { id: 'leftBuccal', label: 'Left buccal', required: true },
    // Second row
    { id: 'upperOcclusal', label: 'Upper occlusal', recommended: true },
    { id: 'lowerOcclusal', label: 'Lower occlusal', recommended: true },
    { id: 'frontSmiling', label: 'Front (smiling)', recommended: true },
    // Third row
    { id: 'frontNonSmiling', label: 'Front (non-smiling)' },
    { id: 'profile', label: 'Profile' }
  ];

  // X-ray items data
  const xrayItems = [
    { id: 'panoramic', label: 'Panoramic' },
    { id: 'cephalometric', label: 'Cephalometric' }
  ];

  const triggerUpload = (itemType, itemId) => {
    setActiveUpload({ type: itemType, id: itemId });
    fileInputRef.current.click();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file || !activeUpload) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (activeUpload.type === 'photo') {
        dispatch(setPhoto({ name: activeUpload.id, file: reader.result }));
      } else {
        dispatch(setXray({ name: activeUpload.id, file: reader.result }));
      }
    };
    reader.readAsDataURL(file);
    // Reset the file input
    event.target.value = '';
  };

  // Card component to ensure consistent styling
  const CardComponent = ({ id, label, required, recommended, type, onClick }) => {
    const imageSrc = type === 'photo' 
      ? (photos[id] || placeholderImages[id]) 
      : (xrays[id] || placeholderImages[id]);
    
    return (
      <div className="bg-white rounded-lg shadow-sm overflow-hidden w-full">
        <div className="flex justify-between items-start p-3 pb-1">
          <div>
            <h3 className="text-base font-medium text-gray-700">
              {label}
            </h3>
            {required && (
              <p className="text-xs text-red-500">*Required</p>
            )}
            {recommended && (
              <p className="text-xs text-gray-500">*Recommended</p>
            )}
          </div>
          <button 
            onClick={onClick}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" />
            </svg>
          </button>
        </div>
        <div className="p-3 pt-0">
          <div className="h-40 relative overflow-hidden border border-gray-200 rounded">
            <img 
              src={imageSrc} 
              alt={label}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="ml-[230px] pt-[70px] pb-[80px] px-10">
        <Header />
        
        <section className="mt-4 mb-6">
          <div className="flex items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Photos & X-Rays</h2>
          </div>
          
          {/* Main content area */}
          <div className="overflow-y-auto max-h-[calc(100vh-260px)] px-1 pb-6">
            <div className="grid grid-cols-4 gap-5">
              {/* First row - Photos (3) + X-ray (1) */}
              {photoItems.slice(0, 3).map((item) => (
                <div key={item.id} className="col-span-1">
                  <CardComponent 
                    id={item.id}
                    label={item.label}
                    required={item.required}
                    recommended={item.recommended}
                    type="photo"
                    onClick={() => triggerUpload('photo', item.id)}
                  />
                </div>
              ))}
              <div className="col-span-1">
                <CardComponent 
                  id={xrayItems[0].id}
                  label={xrayItems[0].label}
                  type="xray"
                  onClick={() => triggerUpload('xray', xrayItems[0].id)}
                />
              </div>

              {/* Second row - Photos (3) + X-ray (1) */}
              {photoItems.slice(3, 6).map((item) => (
                <div key={item.id} className="col-span-1">
                  <CardComponent 
                    id={item.id}
                    label={item.label}
                    required={item.required}
                    recommended={item.recommended}
                    type="photo"
                    onClick={() => triggerUpload('photo', item.id)}
                  />
                </div>
              ))}
              <div className="col-span-1">
                <CardComponent 
                  id={xrayItems[1].id}
                  label={xrayItems[1].label}
                  type="xray"
                  onClick={() => triggerUpload('xray', xrayItems[1].id)}
                />
              </div>

              {/* Third row - Photos (2) + Empty spaces (2) */}
              {photoItems.slice(6).map((item) => (
                <div key={item.id} className="col-span-1">
                  <CardComponent 
                    id={item.id}
                    label={item.label}
                    required={item.required}
                    recommended={item.recommended}
                    type="photo"
                    onClick={() => triggerUpload('photo', item.id)}
                  />
                </div>
              ))}
              {/* Empty columns to maintain 4-column layout */}
              <div className="col-span-2"></div>
            </div>
          </div>
        </section>
        
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
        
        {/* Hidden file input */}
        <input 
          type="file" 
          ref={fileInputRef}
          accept="image/*" 
          className="hidden"
          onChange={handleFileUpload}
        />
        
        {/* Using existing Footer component */}
        <Footer />
      </main>
    </div>
  );
};

export default PhotosPage;