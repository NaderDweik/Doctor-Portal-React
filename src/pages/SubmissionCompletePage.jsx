//SubmissionCompletePage.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Footer from '../components/layout/Footer';
import { Link } from 'react-router-dom';

const SubmissionCompletePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="ml-[230px] pt-[60px] pb-32 px-6"> {/* Added more padding at bottom */}
        <Header />
        
        <div className="max-w-3xl mx-auto mt-16">
          {/* Success Icon Container - Contained within the card */}
          <div className="bg-white rounded-xl shadow-md p-8 pt-16 pb-10 relative">
            {/* Checkmark circle at the top-center of the card */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-24 h-24 bg-teal-500 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-white animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="text-center">
              <h1 className="text-3xl font-bold text-teal-700 mb-4">Submission Complete!</h1>
              <p className="text-lg text-gray-700 mb-8">
                Your case has been successfully submitted to the Eon Dental team.
              </p>
            </div>
            
            {/* Submission Details */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <div className="flex items-center mb-4">
                <FontAwesomeIcon icon={faFileAlt} className="text-teal-600 text-xl mr-3" />
                <h3 className="text-xl font-semibold text-gray-800">Submission Details</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:pr-4">
                  <p className="text-sm text-gray-500">Case Number</p>
                  <p className="text-lg font-medium text-gray-800">EON-73170</p>
                </div>
                <div className="md:pl-4">
                  <p className="text-sm text-gray-500">Submission Date</p>
                  <p className="text-lg font-medium text-gray-800">May 6, 2025</p>
                </div>
              </div>
            </div>
            
            {/* What's Next Section */}
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <FontAwesomeIcon icon={faClipboardCheck} className="text-teal-600 text-xl mr-3" />
                <h3 className="text-xl font-semibold text-gray-800">What's Next?</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-teal-100 rounded-full h-8 w-8 flex items-center justify-center text-teal-700 font-semibold mr-3 flex-shrink-0">
                    1
                  </div>
                  <p className="text-gray-700 pt-1">Our team will review your submission within 2-3 business days.</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-teal-100 rounded-full h-8 w-8 flex items-center justify-center text-teal-700 font-semibold mr-3 flex-shrink-0">
                    2
                  </div>
                  <p className="text-gray-700 pt-1">You'll receive a confirmation email with your case details and initial assessment.</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-teal-100 rounded-full h-8 w-8 flex items-center justify-center text-teal-700 font-semibold mr-3 flex-shrink-0">
                    3
                  </div>
                  <p className="text-gray-700 pt-1">A dedicated case specialist will be assigned and will contact you to discuss the next steps.</p>
                </div>
              </div>
            </div>
            
            {/* Action Buttons - Updated with correct links */}
            <div className="flex flex-col md:flex-row justify-center space-y-3 md:space-y-0 md:space-x-4 mt-8">
              <Link to="/dashboard" className="px-6 py-3 bg-teal-600 text-white rounded-md font-medium hover:bg-teal-700 transition-colors shadow-md">
                Go to Dashboard
              </Link>
              <Link to="/info" className="px-6 py-3 border-2 border-teal-600 text-teal-600 rounded-md font-medium hover:bg-teal-50 transition-colors">
                Start a New Case
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SubmissionCompletePage;