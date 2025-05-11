import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  setChiefComplaint,
  setAdditionalNotes,
  setArch,
  setPackageType,
  setClinicalPreference
} from '../redux/slices/prescriptionSlice';

// Import the TeethRestrictions component from its file
import TeethRestrictions from '../components/layout/TeethRestrictions';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Footer from '../components/layout/Footer';

// Import images
import eonBasic from '../assets/images/eonBasic.png';
import eonPlus from '../assets/images/eonPlus.png';
import eonPro from '../assets/images/eonPro.png';

import RadioButton from '../components/common/RadioButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChevronDown, 
  faChevronUp, 
  faTooth, 
  faPenToSquare, 
  faClipboardCheck, 
  faSave,
  faExclamationTriangle,
  faArrowLeft,
  faArrowRight,
  faInfoCircle,
  faLock,
  faUnlock,
  faQuestionCircle
} from '@fortawesome/free-solid-svg-icons';

const PrescriptionPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const prescription = useSelector((state) => state.prescription);
  
  // Component state
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(true);
  const [activeSection, setActiveSection] = useState(null); // Changed to null to show all content by default
  const [formErrors, setFormErrors] = useState({});
  const [showTooltip, setShowTooltip] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  // Sections in the preferences
  const preferenceSections = [
    { id: 'teeth-move', label: 'Teeth To Be Moved' },
    { id: 'attachments', label: 'Attachments' },
    { id: 'ipr', label: 'Inter-proximal Reduction (IPR)' },
    { id: 'passive-aligners', label: 'Passive Aligners' },
    { id: 'steps', label: 'Number of Steps' },
    { id: 'c-chain', label: 'C-chain' },
    { id: 'pontics', label: 'Pontics' },
    { id: 'other', label: 'Other Preferences' }
  ];
  
  // Tooltips information
  const tooltips = {
    'teeth-move': 'Specify which teeth you want to move during the treatment process.',
    'attachments': 'Attachments help with complex tooth movements. Specify when you want them placed.',
    'ipr': 'Inter-proximal reduction creates space between teeth by removing a small amount of enamel.',
    'passive-aligners': 'When arches require different numbers of steps, you can use passive aligners.',
    'c-chain': 'C-chain helps overcorrect space closure for better results.',
    'pontics': 'Pontics are artificial teeth in the aligner that fill spaces of missing teeth.',
    'arch': 'Specify whether you want to treat just the upper arch, just the lower arch, or both.',
    'packageType': 'Select the package type based on the complexity of treatment needed.',
    'restrictions': 'Click on teeth that should not be moved during treatment.'
  };
  
  // Validate the prescription data
  const validateForm = () => {
    const errors = {};
    
    if (!prescription.chiefComplaint || prescription.chiefComplaint.trim() === '') {
      errors.chiefComplaint = 'Chief complaint is required';
    }
    
    if (prescription.clinicalPreferences.stepsNumber === 'specify' && 
        (!prescription.clinicalPreferences.stepsValue || prescription.clinicalPreferences.stepsValue <= 0)) {
      errors.stepsValue = 'Please enter a valid number of steps';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  
  const handleChiefComplaintChange = (e) => {
    dispatch(setChiefComplaint(e.target.value));
    if (formErrors.chiefComplaint) {
      setFormErrors({ ...formErrors, chiefComplaint: null });
    }
  };

  const handleAdditionalNotesChange = (e) => {
    dispatch(setAdditionalNotes(e.target.value));
  };

  const handleArchChange = (value) => {
    dispatch(setArch(value));
  };

  const handlePackageTypeChange = (value) => {
    dispatch(setPackageType(value));
  };

  const handleClinicalPreferenceChange = (preference, value) => {
    dispatch(setClinicalPreference({ preference, value }));
    if (preference === 'stepsNumber' && value !== 'specify') {
      setFormErrors({ ...formErrors, stepsValue: null });
    } else if (preference === 'stepsValue' && value > 0) {
      setFormErrors({ ...formErrors, stepsValue: null });
    }
  };
  
  // Tooltip handler
  const handleTooltipToggle = (tooltipId) => {
    setShowTooltip(showTooltip === tooltipId ? null : tooltipId);
  };
  
  // Section component for reuse
  const Section = ({ title, icon, children, tooltip, id, collapsible = false, isOpen = true, onToggle }) => {
    const [open, setOpen] = useState(isOpen);
    
    const toggleOpen = () => {
      if (collapsible) {
        setOpen(!open);
        if (onToggle) onToggle();
      }
    };
    
    return (
      <section id={id} className="bg-white shadow-sm rounded-lg p-6 mb-6 relative transition-all duration-300">
        <div className={`flex justify-between items-center ${collapsible ? 'cursor-pointer' : ''}`} onClick={toggleOpen}>
          <div className="flex items-center">
            {icon && <FontAwesomeIcon icon={icon} className="text-teal-600 mr-3" />}
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          </div>
          
          <div className="flex items-center">
            {tooltip && (
              <div className="relative mr-2">
                <FontAwesomeIcon 
                  icon={faInfoCircle} 
                  className="text-gray-400 hover:text-teal-500 cursor-pointer" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTooltipToggle(tooltip);
                  }}
                />
                {showTooltip === tooltip && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg p-3 z-10 text-sm">
                    <p>{tooltips[tooltip]}</p>
                  </div>
                )}
              </div>
            )}
            
            {collapsible && (
              <FontAwesomeIcon 
                icon={open ? faChevronUp : faChevronDown} 
                className={`transition-transform duration-300 text-gray-500`}
              />
            )}
          </div>
        </div>
        
        {(!collapsible || open) && (
          <div className={`${collapsible ? 'mt-4' : ''} transition-all duration-300`}>
            {children}
          </div>
        )}
      </section>
    );
  };

  const PackageInfoCard = ({ type, title, description }) => {
    // Add references to the package images
    const packageImages = {
      'basic': eonBasic,
      'plus': eonPlus,
      'pro': eonPro
    };

    return (
      <div className="absolute z-20 w-72 bg-white border border-gray-200 rounded-md shadow-lg p-3 right-0 mt-2">
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-md font-semibold text-teal-700">{title}</h4>
          <button 
            className="text-gray-400 hover:text-gray-600"
            onClick={() => setShowTooltip(null)}
          >
            &times;
          </button>
        </div>
        <div className="bg-gray-100 h-32 mb-2 rounded flex items-center justify-center overflow-hidden">
          <img 
            src={packageImages[type]} 
            alt={`${title} package image`} 
            className="max-w-full max-h-full object-contain" 
          />
        </div>
        <p className="text-sm text-gray-700 mb-2">{description}</p>
        <p className="text-xs text-gray-500 italic">Free refinements are limited to the number of steps in the initial TS</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Show sidebar only on desktop */}
      {!isMobile && <Sidebar />}
      
      <main className={isMobile ? "pt-[60px] pb-24 px-4" : "ml-[230px] pt-[60px] pb-24 px-6"}>
        <Header />
        
        {/* Progress tracker - Only show on mobile */}
        {isMobile && (
          <div className="max-w-5xl mx-auto mt-6 mb-8">
            <div className="relative">
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-gray-200 z-0"></div>
              <div className="flex justify-between relative z-10">
                <div className="text-center">
                  <div className="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center mx-auto mb-2">1</div>
                  <span className="text-xs font-medium text-gray-600">Photos</span>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center mx-auto mb-2">2</div>
                  <span className="text-xs font-medium text-gray-600">Impressions</span>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center mx-auto mb-2 ring-4 ring-teal-100">3</div>
                  <span className="text-xs font-medium text-teal-600">Prescription</span>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 rounded-full bg-gray-300 text-white flex items-center justify-center mx-auto mb-2">4</div>
                  <span className="text-xs font-medium text-gray-400">Summary</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="max-w-5xl mx-auto">
          {/* Updated header styling */}
          <div className="flex flex-col md:flex-row md:justify-between mb-8 relative">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 relative mt-8 lg:-mr-20">
          Prescription
              <div className="absolute -bottom-2 left-0 w-24 h-1 bg-teal-500"></div>
            </h2>
            
            <div>


              {activeSection !== null && (
                <button
                  onClick={() => setActiveSection(null)}
                  className="px-4 py-2 rounded text-sm font-medium hover:bg-gray-100 text-gray-700 transition-colors"
                >
                  Show All
                </button>
              )}
            </div>
          </div>
          

          
          {/* General Details Section */}
          {(activeSection === null || activeSection === 'general') && (
            <Section title="General Details" icon={faClipboardCheck} id="general-details">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="chief-complaint" className="block text-sm font-medium text-gray-600 mb-2">
                    Chief Complaint *
                    {formErrors.chiefComplaint && (
                      <span className="text-red-500 ml-2">{formErrors.chiefComplaint}</span>
                    )}
                  </label>
                  <textarea
                    id="chief-complaint"
                    value={prescription.chiefComplaint}
                    onChange={handleChiefComplaintChange}
                    className={`w-full p-3 border ${formErrors.chiefComplaint ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 h-[100px] resize-none`}
                    placeholder="Enter patient's chief complaint"
                    required
                  />
                  {formErrors.chiefComplaint && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.chiefComplaint}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="additional-notes" className="block text-sm font-medium text-gray-600 mb-2">
                    Additional Notes:
                  </label>
                  <textarea
                    id="additional-notes"
                    value={prescription.additionalNotes}
                    onChange={handleAdditionalNotesChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 h-[100px] resize-none"
                    placeholder="Enter any additional notes or instructions"
                  />
                </div>
              </div>
            </Section>
          )}
          
          {(activeSection === null || activeSection === 'general') && (
            <Section title="Treatment Options" icon={faTooth} tooltip="arch">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Arch Selection</label>
                  <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                    <RadioButton
                      id="arch-both"
                      name="arch"
                      value="both"
                      checked={prescription.arch === 'both'}
                      onChange={() => handleArchChange('both')}
                      className="bg-white hover:bg-teal-50 border border-gray-200 p-3 rounded-lg transition-colors"
                    >
                      <div className="flex items-center">
                        <div className="ml-2">
                          <span className="font-medium">Upper & Lower</span>
                          <p className="text-xs text-gray-500 mt-1">Treatment for both arches</p>
                        </div>
                      </div>
                    </RadioButton>
                    
                    <RadioButton
                      id="arch-upper"
                      name="arch"
                      value="upper"
                      checked={prescription.arch === 'upper'}
                      onChange={() => handleArchChange('upper')}
                      className="bg-white hover:bg-teal-50 border border-gray-200 p-3 rounded-lg transition-colors"
                    >
                      <div className="flex items-center">
                        <div className="ml-2">
                          <span className="font-medium">Upper</span>
                          <p className="text-xs text-gray-500 mt-1">Treatment for upper arch only</p>
                        </div>
                      </div>
                    </RadioButton>
                    
                    <RadioButton
                      id="arch-lower"
                      name="arch"
                      value="lower"
                      checked={prescription.arch === 'lower'}
                      onChange={() => handleArchChange('lower')}
                      className="bg-white hover:bg-teal-50 border border-gray-200 p-3 rounded-lg transition-colors"
                    >
                      <div className="flex items-center">
                        <div className="ml-2">
                          <span className="font-medium">Lower</span>
                          <p className="text-xs text-gray-500 mt-1">Treatment for lower arch only</p>
                        </div>
                      </div>
                    </RadioButton>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Package Selection</label>
                  <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                    <div className="relative">
                      <RadioButton
                        id="pkg-basic"
                        name="package_type"
                        value="basic"
                        checked={prescription.packageType === 'basic'}
                        onChange={() => handlePackageTypeChange('basic')}
                        className="bg-white hover:bg-teal-50 border border-gray-200 p-3 rounded-lg transition-colors"
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="ml-2">
                            <span className="font-medium">Eon Basic</span>
                            <p className="text-xs text-gray-500 mt-1">For simple cases and minor corrections</p>
                          </div>
                          <div className="relative">
                            <FontAwesomeIcon
                              icon={faQuestionCircle}
                              className="ml-2 text-gray-400 hover:text-teal-500 cursor-pointer"
                              onMouseEnter={() => setShowTooltip('pkg-basic')}
                              onMouseLeave={() => setShowTooltip(null)}
                            />
                            {showTooltip === 'pkg-basic' && (
                              <div className="absolute left-[-900px] top-0 w-480 bg-grey border border-gray-200 rounded-md shadow-lg p-3 z-10">
                                <img src={eonBasic} alt="Eon Basic" className="w-full h-auto rounded" />
                              </div>
                            )}
                          </div>
                        </div>
                      </RadioButton>
                    </div>

                    <div className="relative">
                      <RadioButton
                        id="pkg-plus"
                        name="package_type"
                        value="plus"
                        checked={prescription.packageType === 'plus'}
                        onChange={() => handlePackageTypeChange('plus')}
                        className="bg-white hover:bg-teal-50 border border-gray-200 p-3 rounded-lg transition-colors"
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="ml-2">
                            <span className="font-medium">Eon Plus</span>
                            <p className="text-xs text-gray-500 mt-1">For moderate cases requiring more aligners</p>
                          </div>
                          <div className="relative">
                            <FontAwesomeIcon
                              icon={faQuestionCircle}
                              className="ml-2 text-gray-400 hover:text-teal-500 cursor-pointer"
                              onMouseEnter={() => setShowTooltip('pkg-plus')}
                              onMouseLeave={() => setShowTooltip(null)}
                            />
                            {showTooltip === 'pkg-plus' && (
                              <div className="absolute left-[-900px] top-0 w-480 bg-white border border-gray-200 rounded-md shadow-lg p-3 z-10">
                                <img src={eonPlus} alt="Eon Plus" className="w-full h-auto rounded" />
                              </div>
                            )}
                          </div>
                        </div>
                      </RadioButton>
                    </div>

                    <div className="relative">
                      <RadioButton
                        id="pkg-pro"
                        name="package_type"
                        value="pro"
                        checked={prescription.packageType === 'pro'}
                        onChange={() => handlePackageTypeChange('pro')}
                        className="bg-white hover:bg-teal-50 border border-gray-200 p-3 rounded-lg transition-colors"
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="ml-2">
                            <span className="font-medium">Eon Pro</span>
                            <p className="text-xs text-gray-500 mt-1">For complex cases requiring comprehensive treatment</p>
                          </div>
                          <div className="relative">
                            <FontAwesomeIcon
                              icon={faQuestionCircle}
                              className="ml-2 text-gray-400 hover:text-teal-500 cursor-pointer"
                              onMouseEnter={() => setShowTooltip('pkg-pro')}
                              onMouseLeave={() => setShowTooltip(null)}
                            />
                            {showTooltip === 'pkg-pro' && (
                              <div className="absolute left-[-960px] top-0 w-280 bg-white border border-gray-200 rounded-md shadow-lg p-3 z-10">
                                <img src={eonPro} alt="Eon Pro" className="w-full h-auto rounded" />
                              </div>
                            )}
                          </div>
                        </div>
                      </RadioButton>
                    </div>
                  </div>
                </div>
              </div>
            </Section>
          )}

          {/* Teeth Restrictions Section */}
          {(activeSection === null || activeSection === 'teeth') && (
            <Section 
              title="Teeth Movement Restrictions" 
              icon={faLock} 
              tooltip="restrictions"
              id="teeth-restrictions"
            >
              {/* Import the TeethRestrictions component */}
              <TeethRestrictions />
            </Section>
          )}
          
          {/* Clinical Preferences Section - Dropdown style */}
          {(activeSection === null || activeSection === 'clinical') && (
            <div className="border border-gray-200 rounded-lg shadow-sm overflow-hidden mb-6">
              {/* Collapsible header */}
              <div 
                className="flex justify-between items-center px-5 py-4 bg-white cursor-pointer"
                onClick={() => setIsPreferencesOpen(!isPreferencesOpen)}
              >
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faChevronDown} className={`text-gray-500 mr-3 transition-transform ${isPreferencesOpen ? 'rotate-180' : ''}`} />
                  <h3 className="text-lg font-semibold text-gray-800">Clinical Preferences</h3>
                </div>
                <p className="text-gray-500 text-sm">Adjust your clinical preferences for this case if needed</p>
              </div>
              
              {/* Collapsible content */}
              {isPreferencesOpen && (
                <div className="bg-white p-5 border-t border-gray-200">
                  <p className="mb-4 text-gray-700">Adjust your clinical preferences for this case if needed.</p>
                  

                    
                  <div className="space-y-0">
                    {/* Teeth To be Moved */}
                    <div id="teeth-move" className="pt-2 mb-4">
                      <div className="flex items-center mb-3">
                        <h4 className="text-base font-bold text-gray-800">Teeth To be Moved</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Which teeth do you want to move during treatment?</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <RadioButton
                          id="move-canine"
                          name="teeth_moved_pref"
                          value="canine"
                          checked={prescription.clinicalPreferences.teethToMove === 'canine'}
                          onChange={() => handleClinicalPreferenceChange('teethToMove', 'canine')}
                          className="bg-white hover:bg-teal-50 border border-gray-200 p-3 rounded-lg transition-colors"
                        >
                          <div className="text-center">
                            <span className="font-medium">Canine to canine</span>
                            <p className="text-xs text-gray-500 mt-1">Teeth 3-3 in both arches</p>
                          </div>
                        </RadioButton>
                        <RadioButton
                          id="move-premolar"
                          name="teeth_moved_pref"
                          value="premolar"
                          checked={prescription.clinicalPreferences.teethToMove === 'premolar'}
                          onChange={() => handleClinicalPreferenceChange('teethToMove', 'premolar')}
                          className="bg-white hover:bg-teal-50 border border-gray-200 p-3 rounded-lg transition-colors"
                        >
                          <div className="text-center">
                            <span className="font-medium">Second premolar to second premolar</span>
                            <p className="text-xs text-gray-500 mt-1">Teeth 5-5 in both arches</p>
                          </div>
                        </RadioButton>
                        <RadioButton
                          id="move-molar"
                          name="teeth_moved_pref"
                          value="molar"
                          checked={prescription.clinicalPreferences.teethToMove === 'molar'}
                          onChange={() => handleClinicalPreferenceChange('teethToMove', 'molar')}
                          className="bg-white hover:bg-teal-50 border border-gray-200 p-3 rounded-lg transition-colors"
                        >
                          <div className="text-center">
                          <span className="font-medium">Second molar to second molar</span>
                            <p className="text-xs text-gray-500 mt-1">Teeth 7-7 in both arches</p>
                          </div>
                        </RadioButton>
                      </div>
                      
                      {/* Divider */}
                      <div className="h-px bg-gray-200 my-6"></div>
                    </div>
                    
                    {/* Attachments */}
                    <div id="attachments" className="pt-2 mb-4">
                      <div className="flex items-center mb-3">
                        <h4 className="text-base font-bold text-gray-800">Attachments</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        At what step, if at all, do you prefer to have attachments placed during treatment?
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                        <RadioButton
                          id="attachments-never"
                          name="attachments_pref"
                          value="never"
                          checked={prescription.clinicalPreferences.attachments === 'never'}
                          onChange={() => handleClinicalPreferenceChange('attachments', 'never')}
                          className="bg-white hover:bg-teal-50 border border-gray-200 p-3 rounded-lg transition-colors"
                        >
                          <div className="text-center">
                            <span className="font-medium">Never use</span>
                            <p className="text-xs text-gray-500 mt-1">No attachments</p>
                          </div>
                        </RadioButton>
                        <RadioButton
                          id="attachments-step1"
                          name="attachments_pref"
                          value="step1"
                          checked={prescription.clinicalPreferences.attachments === 'step1'}
                          onChange={() => handleClinicalPreferenceChange('attachments', 'step1')}
                          className="bg-white hover:bg-teal-50 border border-gray-200 p-3 rounded-lg transition-colors"
                        >
                          <div className="text-center">
                            <span className="font-medium">Step 1</span>
                            <p className="text-xs text-gray-500 mt-1">As needed</p>
                          </div>
                        </RadioButton>
                        <RadioButton
                          id="attachments-step2"
                          name="attachments_pref"
                          value="step2"
                          checked={prescription.clinicalPreferences.attachments === 'step2'}
                          onChange={() => handleClinicalPreferenceChange('attachments', 'step2')}
                          className="bg-white hover:bg-teal-50 border border-gray-200 p-3 rounded-lg transition-colors"
                        >
                          <div className="text-center">
                            <span className="font-medium">Step 2</span>
                            <p className="text-xs text-gray-500 mt-1">As needed</p>
                          </div>
                        </RadioButton>
                        <RadioButton
                          id="attachments-step3"
                          name="attachments_pref"
                          value="step3"
                          checked={prescription.clinicalPreferences.attachments === 'step3'}
                          onChange={() => handleClinicalPreferenceChange('attachments', 'step3')}
                          className="bg-white hover:bg-teal-50 border border-gray-200 p-3 rounded-lg transition-colors"
                        >
                          <div className="text-center">
                            <span className="font-medium">Step 3</span>
                            <p className="text-xs text-gray-500 mt-1">As needed</p>
                          </div>
                        </RadioButton>
                      </div>
                      
                      {/* Divider */}
                      <div className="h-px bg-gray-200 my-6"></div>
                    </div>
                    
                    {/* Inter-proximal Reduction (IPR) */}
                    <div id="ipr" className="pt-2 mb-4">
                      <div className="flex items-center mb-3">
                        <h4 className="text-base font-bold text-gray-800">Inter-proximal Reduction (IPR)</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Do you want to use IPR during treatment?</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
                        <RadioButton
                          id="ipr-never"
                          name="ipr_pref"
                          value="never"
                          checked={prescription.clinicalPreferences.iprPref === 'never'}
                          onChange={() => handleClinicalPreferenceChange('iprPref', 'never')}
                          className="bg-white hover:bg-teal-50 border border-gray-200 p-3 rounded-lg transition-colors"
                        >
                          <div className="flex items-center">
                            <span className="font-medium">Never add IPR</span>
                          </div>
                        </RadioButton>
                        <RadioButton
                          id="ipr-needed"
                          name="ipr_pref"
                          value="needed"
                          checked={prescription.clinicalPreferences.iprPref === 'needed'}
                          onChange={() => handleClinicalPreferenceChange('iprPref', 'needed')}
                          className="bg-white hover:bg-teal-50 border border-gray-200 p-3 rounded-lg transition-colors"
                        >
                          <div className="flex items-center">
                            <span className="font-medium">Add IPR when needed</span>
                          </div>
                        </RadioButton>
                      </div>

                      {prescription.clinicalPreferences.iprPref === 'needed' && (
                        <>
                          <p className="text-sm text-gray-600 mb-3">Indicate the total IPR value to be used during treatment:</p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <RadioButton
                              id="ipr-03"
                              name="ipr_value"
                              value="0.3"
                              checked={prescription.clinicalPreferences.iprValue === '0.3'}
                              onChange={() => handleClinicalPreferenceChange('iprValue', '0.3')}
                              className="bg-white hover:bg-teal-50 border border-gray-200 p-3 rounded-lg transition-colors"
                            >
                              <div className="text-center">
                                <span className="font-medium">Do not exceed 0.3 mm</span>
                                <p className="text-xs text-gray-500 mt-1">Per contact</p>
                              </div>
                            </RadioButton>
                            <RadioButton
                              id="ipr-04"
                              name="ipr_value"
                              value="0.4"
                              checked={prescription.clinicalPreferences.iprValue === '0.4'}
                              onChange={() => handleClinicalPreferenceChange('iprValue', '0.4')}
                              className="bg-white hover:bg-teal-50 border border-gray-200 p-3 rounded-lg transition-colors"
                            >
                              <div className="text-center">
                                <span className="font-medium">Do not exceed 0.4 mm</span>
                                <p className="text-xs text-gray-500 mt-1">Per contact</p>
                              </div>
                            </RadioButton>
                            <RadioButton
                              id="ipr-05"
                              name="ipr_value"
                              value="0.5"
                              checked={prescription.clinicalPreferences.iprValue === '0.5'}
                              onChange={() => handleClinicalPreferenceChange('iprValue', '0.5')}
                              className="bg-white hover:bg-teal-50 border border-gray-200 p-3 rounded-lg transition-colors"
                            >
                              <div className="text-center">
                                <span className="font-medium">Do not exceed 0.5 mm</span>
                                <p className="text-xs text-gray-500 mt-1">Per contact</p>
                              </div>
                            </RadioButton>
                          </div>
                        </>
                      )}
                      
                      {/* Divider */}
                      <div className="h-px bg-gray-200 my-6"></div>
                    </div>

                    {/* Passive Aligners */}
                    <div id="passive-aligners" className="pt-2 mb-4">
                      <div className="flex items-center mb-3">
                        <h4 className="text-base font-bold text-gray-800">Passive Aligners</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        How do you want to address different number of aligner steps between arches?
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <RadioButton
                          id="passive-none"
                          name="passive_aligners"
                          value="none"
                          checked={prescription.clinicalPreferences.passiveAligners === 'none'}
                          onChange={() => handleClinicalPreferenceChange('passiveAligners', 'none')}
                          className="bg-white hover:bg-teal-50 border border-gray-200 p-3 rounded-lg transition-colors"
                        >
                          <div className="text-center">
                            <span className="font-medium">Don't use passive aligners</span>
                          </div>
                        </RadioButton>
                        <RadioButton
                          id="passive-use"
                          name="passive_aligners"
                          value="use"
                          checked={prescription.clinicalPreferences.passiveAligners === 'use'}
                          onChange={() => handleClinicalPreferenceChange('passiveAligners', 'use')}
                          className="bg-white hover:bg-teal-50 border border-gray-200 p-3 rounded-lg transition-colors"
                        >
                          <div className="text-center">
                            <span className="font-medium">Use passive aligners</span>
                          </div>
                        </RadioButton>
                        <RadioButton
                          id="passive-active"
                          name="passive_aligners"
                          value="active"
                          checked={prescription.clinicalPreferences.passiveAligners === 'active'}
                          onChange={() => handleClinicalPreferenceChange('passiveAligners', 'active')}
                          className="bg-white hover:bg-teal-50 border border-gray-200 p-3 rounded-lg transition-colors"
                        >
                          <div className="text-center">
                            <span className="font-medium">Keep both arches active during treatment</span>
                          </div>
                        </RadioButton>
                      </div>
                      
                      {/* Divider */}
                      <div className="h-px bg-gray-200 my-6"></div>
                    </div>

                    {/* Number of Steps */}
                    <div id="steps" className="pt-2 mb-4">
                      <div className="flex items-center mb-3">
                        <h4 className="text-base font-bold text-gray-800">Number of Steps</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        Specify the maximum number of aligner steps in your treatment setups:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <RadioButton
                          id="steps-none"
                          name="steps"
                          value="none"
                          checked={prescription.clinicalPreferences.stepsNumber === 'none'}
                          onChange={() => handleClinicalPreferenceChange('stepsNumber', 'none')}
                          className="bg-white hover:bg-teal-50 border border-gray-200 p-3 rounded-lg transition-colors"
                        >
                          <div className="flex items-center">
                            <span className="font-medium">No maximum number</span>
                          </div>
                        </RadioButton>
                        <div className="relative">
                          <RadioButton
                            id="steps-specify"
                            name="steps"
                            value="specify"
                            checked={prescription.clinicalPreferences.stepsNumber === 'specify'}
                            onChange={() => handleClinicalPreferenceChange('stepsNumber', 'specify')}
                            className={`bg-white hover:bg-teal-50 border ${formErrors.stepsValue ? 'border-red-300' : 'border-gray-200'} p-3 rounded-lg transition-colors`}
                          >
                            <div className="flex items-center">
                              <span className="font-medium">Please specify maximum number:</span>
                              {prescription.clinicalPreferences.stepsNumber === 'specify' && (
                                <input
                                  type="number"
                                  min="1"
                                  className={`ml-2 w-16 p-1 border ${formErrors.stepsValue ? 'border-red-500' : 'border-gray-300'} rounded text-center`}
                                  value={prescription.clinicalPreferences.stepsValue || ''}
                                  onChange={(e) => handleClinicalPreferenceChange('stepsValue', e.target.value)}
                                />
                              )}
                            </div>
                          </RadioButton>
                          {formErrors.stepsValue && (
                            <p className="mt-1 text-sm text-red-500 absolute left-3">{formErrors.stepsValue}</p>
                          )}
                        </div>
                      </div>
                      
                      {/* Divider */}
                      <div className="h-px bg-gray-200 my-6"></div>
                    </div>

                    {/* C-chain */}
                    <div id="c-chain" className="pt-2 mb-4">
                      <div className="flex items-center mb-3">
                        <h4 className="text-base font-bold text-gray-800">C-chain</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Do you want to overcorrect space closure?</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <RadioButton
                          id="c-chain-no"
                          name="c_chain"
                          value="no"
                          checked={prescription.clinicalPreferences.cChain === 'no'}
                          onChange={() => handleClinicalPreferenceChange('cChain', 'no')}
                          className="bg-white hover:bg-teal-50 border border-gray-200 p-3 rounded-lg transition-colors"
                        >
                          <div className="flex items-center">
                            <span className="font-medium">No</span>
                          </div>
                        </RadioButton>
                        <RadioButton
                          id="c-chain-yes"
                          name="c_chain"
                          value="yes"
                          checked={prescription.clinicalPreferences.cChain === 'yes'}
                          onChange={() => handleClinicalPreferenceChange('cChain', 'yes')}
                          className="bg-white hover:bg-teal-50 border border-gray-200 p-3 rounded-lg transition-colors"
                        >
                          <div className="flex items-center">
                            <span className="font-medium">Yes, as needed</span>
                          </div>
                        </RadioButton>
                      </div>
                      
                      {/* Divider */}
                      <div className="h-px bg-gray-200 my-6"></div>
                    </div>

                    {/* Pontics */}
                    <div id="pontics" className="pt-2 mb-4">
                      <div className="flex items-center mb-3">
                        <h4 className="text-base font-bold text-gray-800">Pontics</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Should pontics (missing teeth) be filled inside of the aligner?
                      </p>
                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-3 rounded-r-lg">
                        <div className="flex">
                          <FontAwesomeIcon icon={faExclamationTriangle} className="text-yellow-500 mt-1 mr-2" />
                          <p className="text-sm text-yellow-700">
                            Please note there is an additional charge for each pontic.
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <RadioButton
                          id="pontics-none"
                          name="pontics"
                          value="none"
                          checked={prescription.clinicalPreferences.pontics === 'none'}
                          onChange={() => handleClinicalPreferenceChange('pontics', 'none')}
                          className="bg-white hover:bg-teal-50 border border-gray-200 p-3 rounded-lg transition-colors"
                        >
                          <div className="text-center">
                            <span className="font-medium">Don't use pontics</span>
                          </div>
                        </RadioButton>
                        <RadioButton
                          id="pontics-no-paint"
                          name="pontics"
                          value="no-paint"
                          checked={prescription.clinicalPreferences.pontics === 'no-paint'}
                          onChange={() => handleClinicalPreferenceChange('pontics', 'no-paint')}
                          className="bg-white hover:bg-teal-50 border border-gray-200 p-3 rounded-lg transition-colors"
                        >
                          <div className="text-center">
                            <span className="font-medium">Use pontics without paint</span>
                          </div>
                        </RadioButton>
                        <RadioButton
                          id="pontics-paint"
                          name="pontics"
                          value="paint"
                          checked={prescription.clinicalPreferences.pontics === 'paint'}
                          onChange={() => handleClinicalPreferenceChange('pontics', 'paint')}
                          className="bg-white hover:bg-teal-50 border border-gray-200 p-3 rounded-lg transition-colors"
                        >
                          <div className="text-center">
                            <span className="font-medium">Use pontics with paint</span>
                            <p className="text-xs text-gray-500 mt-1">(Second premolar to second premolar ONLY)</p>
                          </div>
                        </RadioButton>
                      </div>
                      
                      {/* Divider */}
                      <div className="h-px bg-gray-200 my-6"></div>
                    </div>

                    {/* Other Preferences */}
                    <div id="other" className="pt-2">
                      <div className="flex items-center mb-3">
                        <h4 className="text-base font-bold text-gray-800">Other Preferences</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        Enter additional instructions to be applied to all of your treatments:
                      </p>
                      <textarea
                        className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 h-[120px] resize-none"
                        placeholder="Type any additional instructions or preferences here..."
                        value={prescription.clinicalPreferences.otherPreferences}
                        onChange={(e) => handleClinicalPreferenceChange('otherPreferences', e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation buttons */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-between">
          <button
            onClick={() => handleNavigation('back')}
            className="px-6 py-2 flex items-center text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Back to Impressions
          </button>
          
          <button
            onClick={() => handleNavigation('next')}
            className="px-6 py-2 flex items-center text-white bg-teal-600 hover:bg-teal-700 rounded-md transition-colors"
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                Saving...
              </>
            ) : (
              <>
                Continue to Summary
                <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </>
            )}
          </button>
        </div>
      </main>

      {/* Only show Footer on desktop */}
      {!isMobile && <Footer />}
    </div>
  );
};

export default PrescriptionPage;