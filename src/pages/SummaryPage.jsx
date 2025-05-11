import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Footer from '../components/layout/Footer';

// Import the ReadOnlyTeethRestriction component
import ReadOnlyTeethRestriction from '../components/layout/ReadOnlyTeethRestriction';

// Import restriction icon for other parts
import restrictMoveIcon from '../assets/icons/Restrictmove.svg';

const SummaryPage = () => {
  // Get data from Redux store with safe access
  const prescriptionData = useSelector((state) => state.prescription) || {
    chiefComplaint: '',
    additionalNotes: '',
    arch: 'both',
    packageType: 'basic',
    selectedTeeth: [],
    clinicalPreferences: {
      teethToMove: 'premolar',
      attachments: 'step1',
      iprPref: 'needed',
      iprValue: '0.3',
      passiveAligners: 'none',
      stepsNumber: 'none',
      cChain: 'no',
      pontics: 'none',
      otherPreferences: '',
    }
  };
  
  const summaryData = useSelector((state) => state.summary) || { photos: {}, xrays: {} };

  // Helper function to map selection values to display text
  const getDisplayText = {
    // Teeth To be Moved
    teethToMove: {
      'canine': 'Canine to canine',
      'premolar': 'Second premolar to second premolar',
      'molar': 'Second molar to second molar'
    },
    // Attachments
    attachments: {
      'never': 'Never use attachments',
      'step1': 'As needed, at step 1',
      'step2': 'As needed, at step 2',
      'step3': 'As needed, at step 3'
    },
    // IPR
    iprPref: {
      'never': 'Never add IPR',
      'needed': 'Add IPR when needed'
    },
    // IPR Value
    iprValue: {
      '0.3': 'Do not exceed 0.3 per contact',
      '0.4': 'Do not exceed 0.4 per contact',
      '0.5': 'Do not exceed 0.5 per contact'
    },
    // Passive Aligners
    passiveAligners: {
      'none': 'Don\'t use passive aligners',
      'use': 'Use passive aligners',
      'active': 'Keep both arches active during treatment'
    },
    // Steps Number
    stepsNumber: {
      'none': 'No maximum number',
      'specify': 'Maximum number specified: '
    },
    // C-chain
    cChain: {
      'no': 'No',
      'yes': 'Yes, as needed'
    },
    // Pontics
    pontics: {
      'none': 'Don\'t use pontics',
      'no-paint': 'Use pontics without paint',
      'paint': 'Use pontics with paint (canine to canine ONLY)'
    },
    // Arch
    arch: {
      'both': 'Upper & Lower',
      'upper': 'Upper',
      'lower': 'Lower'
    },
    // Package Type
    packageType: {
      'basic': 'Eon Basic',
      'plus': 'Eon Plus',
      'pro': 'Eon Pro'
    }
  };

  // Safe access to clinical preferences
  const clinicalPreferences = prescriptionData.clinicalPreferences || {};
  
  // Define section components for better organization
  const SectionTitle = ({ title, icon }) => (
    <div className="flex items-center mb-5 pb-2 border-b border-gray-200">
      {icon && <span className="mr-3 text-teal-600">{icon}</span>}
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
    </div>
  );
  
  const InfoItem = ({ label, value, description }) => (
    <div className="mb-6 bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition-all duration-300">
      <h3 className="text-md font-semibold text-gray-700 mb-2">{label}</h3>
      {description && <p className="text-sm text-gray-500 mb-2">{description}</p>}
      <div className="p-3 bg-gray-50 rounded border border-gray-100">
        <p className="text-gray-800">{value || 'Not specified'}</p>
      </div>
    </div>
  );

  // Wrapper component for the read-only teeth restrictions
  const TeethRestrictionCard = () => {
    return (
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="bg-teal-500 px-6 py-4">
          <h2 className="text-white font-bold text-lg">Teeth movement restrictions (Optional)</h2>
        </div>
        <div className="p-5">
          <div className="rounded-lg border border-gray-200 p-4">
            {/* Wrap ReadOnlyTeethRestriction in a div with sizing styles */}
            <div className="transform scale-90 origin-top-center mx-auto max-w-3xl">
              <ReadOnlyTeethRestriction />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar />
      
      <main className="ml-[230px] pt-[70px] pb-[100px] px-8">
        <Header />
        
        {/* Page Header */}
        <div className="flex items-center mb-8 border-b border-gray-200 pb-4">
          <div className="bg-teal-500 p-3 rounded-full mr-4 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Treatment Summary</h1>
            <p className="text-gray-600">Review all your treatment preferences before submission</p>
          </div>
        </div>
        
        {/* Summary Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Basic Information and first two clinical preferences */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <SectionTitle 
                title="Basic Information" 
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                } 
              />
              
              <div className="space-y-4">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Package Type</span>
                  <div className="mt-1 flex items-center">
                    <div className="bg-teal-100 text-teal-800 py-1 px-3 rounded-full text-sm font-medium">
                      {getDisplayText.packageType[prescriptionData.packageType] || prescriptionData.packageType || 'Not specified'}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Arch</span>
                  <div className="mt-1 flex items-center">
                    <div className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-sm font-medium">
                      {getDisplayText.arch[prescriptionData.arch] || prescriptionData.arch || 'Not specified'}
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-100">
                  <h3 className="font-medium text-gray-700 mb-2">Chief Complaint</h3>
                  <div className="bg-gray-50 p-3 rounded border border-gray-200">
                    <p className="text-gray-700">{prescriptionData.chiefComplaint || 'No chief complaint provided.'}</p>
                  </div>
                </div>
                
                <div className="pt-4">
                  <h3 className="font-medium text-gray-700 mb-2">Additional Notes</h3>
                  <div className="bg-gray-50 p-3 rounded border border-gray-200">
                    <p className="text-gray-700">{prescriptionData.additionalNotes || 'No additional notes provided.'}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* First two clinical preferences */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <SectionTitle 
                title="Clinical Preferences" 
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                } 
              />
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-md font-semibold text-gray-700 mb-2">Teeth to be moved</h3>
                  <p className="text-sm text-gray-500 mb-2">Which teeth do you want to move during treatment?</p>
                  <div className="p-3 bg-gray-50 rounded border border-gray-100">
                    <p className="text-gray-800">
                      {getDisplayText.teethToMove[clinicalPreferences.teethToMove] || 'Not specified'}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-md font-semibold text-gray-700 mb-2">Attachments</h3>
                  <p className="text-sm text-gray-500 mb-2">At what step, if at all, do you prefer to have attachments placed during treatment?</p>
                  <div className="p-3 bg-gray-50 rounded border border-gray-100">
                    <p className="text-gray-800">
                      {getDisplayText.attachments[clinicalPreferences.attachments] || 'Not specified'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Teeth Restrictions and other Clinical Preferences */}
          <div className="lg:col-span-2">
            {/* Teeth Movement Restrictions Card - Using the ReadOnlyTeethRestriction component */}
            <TeethRestrictionCard />
            
            <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
              <SectionTitle 
                title="Additional Clinical Preferences" 
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                } 
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoItem 
                  label="Inter-proximal Reduction (IPR)"
                  description="Do you want to use IPR during treatment?"
                  value={
                    <>
                      <div className="mb-2">{getDisplayText.iprPref[clinicalPreferences.iprPref] || 'Not specified'}</div>
                      <div className="pt-2 border-t border-gray-200">
                        <span className="block text-sm text-gray-500 mb-1">IPR Value:</span>
                        {getDisplayText.iprValue[clinicalPreferences.iprValue] || 'Not specified'}
                      </div>
                    </>
                  }
                />
                
                <InfoItem 
                  label="Passive Aligners"
                  description="How do you want to address different number of aligner steps between arches?"
                  value={getDisplayText.passiveAligners[clinicalPreferences.passiveAligners] || 'Not specified'}
                />
                
                <InfoItem 
                  label="Number of Steps"
                  description="Specify the maximum number of aligner steps in your treatment setups:"
                  value={
                    clinicalPreferences.stepsNumber === 'specify' && clinicalPreferences.stepsValue
                      ? `${getDisplayText.stepsNumber['specify']}${clinicalPreferences.stepsValue}`
                      : getDisplayText.stepsNumber[clinicalPreferences.stepsNumber] || 'Not specified'
                  }
                />
                
                <InfoItem 
                  label="C-chain"
                  description="Do you want to overcorrect space closure?"
                  value={getDisplayText.cChain[clinicalPreferences.cChain] || 'Not specified'}
                />
                
                <InfoItem 
                  label="Pontics"
                  description="Should pontics (missing teeth) be filled inside of the aligner?"
                  value={getDisplayText.pontics[clinicalPreferences.pontics] || 'Not specified'}
                />
                
                <div className="md:col-span-2">
                  <InfoItem 
                    label="Other Preferences"
                    description="Additional instructions applied to treatments:"
                    value={clinicalPreferences.otherPreferences || 'No additional instructions provided.'}
                  />
                </div>
              </div>
              
              {/* Status Card */}
              <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-5 rounded-lg flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="font-semibold text-blue-800 mb-1">Almost Done!</h3>
                  <p className="text-blue-700">Please review all your preferences carefully. You can make changes by going back to the respective sections.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation buttons */}
        <div className="fixed bottom-0 left-[230px] right-0 bg-white border-t border-gray-200 px-10 py-4 flex justify-between">
          <button className="flex items-center px-5 py-2.5 text-teal-700 border-2 border-teal-700 rounded-md font-medium hover:bg-teal-50 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
          
          <button className="flex items-center px-5 py-2.5 bg-teal-700 text-white rounded-md font-medium hover:bg-teal-800 transition-colors">
            Submit
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

export default SummaryPage;