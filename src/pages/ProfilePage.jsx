// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faHourglass, faExclamationCircle, faUser, faIdCard, faPhone, faEnvelope, faGlobe } from '@fortawesome/free-solid-svg-icons';

// Layout components
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Footer from '../components/layout/Footer';

const ProfilePage = () => {
  const { profile } = useSelector((state) => state.settings);
  const [activeTab, setActiveTab] = useState('profile');
  const [cases, setCases] = useState([]);
  
  // Mock cases data - in a real app, you would fetch this from an API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCases([
        {
          id: 'EON-2025001',
          patientName: 'Sarah Johnson',
          submissionDate: '2025-04-28',
          status: 'completed',
          currentStep: 'complete',
          steps: {
            info: { status: 'completed', date: '2025-04-28' },
            photos: { status: 'completed', date: '2025-04-28' },
            impressions: { status: 'completed', date: '2025-04-29' },
            prescription: { status: 'completed', date: '2025-04-30' },
            summary: { status: 'completed', date: '2025-04-30' }
          }
        },
        {
          id: 'EON-2025002',
          patientName: 'Michael Chen',
          submissionDate: '2025-05-02',
          status: 'in-progress',
          currentStep: 'prescription',
          steps: {
            info: { status: 'completed', date: '2025-05-02' },
            photos: { status: 'completed', date: '2025-05-02' },
            impressions: { status: 'completed', date: '2025-05-03' },
            prescription: { status: 'in-progress', date: null },
            summary: { status: 'pending', date: null }
          }
        },
        {
          id: 'EON-2025003',
          patientName: 'Emily Rodriguez',
          submissionDate: '2025-05-05',
          status: 'pending-review',
          currentStep: 'summary',
          steps: {
            info: { status: 'completed', date: '2025-05-05' },
            photos: { status: 'completed', date: '2025-05-05' },
            impressions: { status: 'completed', date: '2025-05-05' },
            prescription: { status: 'completed', date: '2025-05-06' },
            summary: { status: 'pending-review', date: '2025-05-06' }
          }
        },
        {
          id: 'EON-2025004',
          patientName: 'David Patel',
          submissionDate: '2025-04-15',
          status: 'failed',
          currentStep: 'impressions',
          steps: {
            info: { status: 'completed', date: '2025-04-15' },
            photos: { status: 'completed', date: '2025-04-15' },
            impressions: { status: 'failed', date: '2025-04-16' },
            prescription: { status: 'pending', date: null },
            summary: { status: 'pending', date: null }
          }
        }
      ]);
    }, 500);
  }, []);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed':
        return <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />;
      case 'in-progress':
        return <FontAwesomeIcon icon={faHourglass} className="text-blue-500" />;
      case 'pending-review':
        return <FontAwesomeIcon icon={faHourglass} className="text-orange-500" />;
      case 'failed':
        return <FontAwesomeIcon icon={faExclamationCircle} className="text-red-500" />;
      case 'pending':
        return <div className="w-4 h-4 rounded-full bg-gray-300"></div>;
      default:
        return <div className="w-4 h-4 rounded-full bg-gray-300"></div>;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending-review':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'pending':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      case 'pending-review':
        return 'Pending Review';
      case 'failed':
        return 'Action Required';
      case 'pending':
        return 'Pending';
      default:
        return 'Pending';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="ml-[230px] pt-[60px] pb-16 px-6">
        <Header />
        
        <div className="max-w-7xl mx-auto mt-8">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-1">My Profile</h1>
              <p className="text-gray-600">Manage your account and view case history</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link 
                to="/settings" 
                className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
              >
                Edit Profile Settings
              </Link>
            </div>
          </div>
          
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 mb-8">
            <div className="flex -mb-px">
              <button
                className={`px-4 py-2 font-medium text-sm mr-8 ${
                  activeTab === 'profile'
                    ? 'border-b-2 border-teal-500 text-teal-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('profile')}
              >
                Profile Information
              </button>
              <button
                className={`px-4 py-2 font-medium text-sm ${
                  activeTab === 'cases'
                    ? 'border-b-2 border-teal-500 text-teal-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('cases')}
              >
                Case History
              </button>
            </div>
          </div>
          
          {/* Profile Tab Content */}
          {activeTab === 'profile' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Profile Card */}
              <div className="md:col-span-1">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="bg-gradient-to-r from-teal-500 to-teal-600 h-24"></div>
                  <div className="px-6 pb-6">
                    <div className="flex justify-center -mt-12 mb-4">
                      <div className="w-24 h-24 rounded-full bg-white p-1 shadow">
                        {profile.profileImage ? (
                          <img
                            src={profile.profileImage}
                            alt="Profile"
                            className="w-full h-full object-cover rounded-full"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-full text-gray-400">
                            <FontAwesomeIcon icon={faUser} className="text-4xl" />
                          </div>
                        )}
                      </div>
                    </div>
                    <h2 className="text-xl font-bold text-center text-gray-800">{profile.name}</h2>
                    <p className="text-center text-gray-600 mb-6">{profile.role || "Dental Specialist"}</p>
                    
                    <div className="space-y-4">
                      <div className="flex items-center text-gray-700">
                        <FontAwesomeIcon icon={faIdCard} className="w-5 h-5 mr-3 text-gray-500" />
                        <span className="font-medium">Dental ID:</span>
                        <span className="ml-2">EON-DR-{profile.id || "10045"}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <FontAwesomeIcon icon={faPhone} className="w-5 h-5 mr-3 text-gray-500" />
                        <span className="font-medium">Phone:</span>
                        <span className="ml-2">{profile.phoneNumber}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5 mr-3 text-gray-500" />
                        <span className="font-medium">Email:</span>
                        <span className="ml-2">{profile.email}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <FontAwesomeIcon icon={faGlobe} className="w-5 h-5 mr-3 text-gray-500" />
                        <span className="font-medium">Language:</span>
                        <span className="ml-2">{profile.language}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Stats and Summary */}
              <div className="md:col-span-2">
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-6">Activity Summary</h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="bg-indigo-50 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-indigo-600 mb-1">{cases.length}</div>
                      <div className="text-sm text-indigo-800">Total Cases</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-green-600 mb-1">
                        {cases.filter(c => c.status === 'completed').length}
                      </div>
                      <div className="text-sm text-green-800">Completed</div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-1">
                        {cases.filter(c => c.status === 'in-progress').length}
                      </div>
                      <div className="text-sm text-blue-800">In Progress</div>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-orange-600 mb-1">
                        {cases.filter(c => c.status === 'pending-review').length}
                      </div>
                      <div className="text-sm text-orange-800">Pending Review</div>
                    </div>
                  </div>
                </div>
                
                {/* Recent Cases */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-800">Recent Cases</h3>
                    <button 
                      onClick={() => setActiveTab('cases')}
                      className="text-sm text-teal-600 hover:text-teal-800"
                    >
                      View All
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {cases.slice(0, 3).map(caseItem => (
                      <div key={caseItem.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <div>
                          <div className="font-medium text-gray-800">{caseItem.patientName}</div>
                          <div className="text-sm text-gray-500">{caseItem.id}</div>
                        </div>
                        <div className="flex items-center">
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(caseItem.status)}`}>
                            {getStatusText(caseItem.status)}
                          </div>
                          <Link 
                            to={`/cases/${caseItem.id}`}
                            className="ml-4 text-sm text-teal-600 hover:text-teal-800"
                          >
                            Details
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Cases Tab Content */}
          {activeTab === 'cases' && (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">All Cases</h3>
              </div>
              
              {/* Filter and Search (could be implemented) */}
              <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="text-sm text-gray-600">
                    Showing {cases.length} cases
                  </div>
                  <div className="mt-2 md:mt-0">
                    <input
                      type="text"
                      placeholder="Search cases..."
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                    />
                  </div>
                </div>
              </div>
              
              {/* Cases Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Case ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Patient
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Submission Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Progress
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {cases.map(caseItem => (
                      <tr key={caseItem.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{caseItem.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{caseItem.patientName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {new Date(caseItem.submissionDate).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(caseItem.status)}`}>
                            {getStatusText(caseItem.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                caseItem.steps.info.status === 'completed' ? 'bg-green-100' : 'bg-gray-100'
                              }`}>
                                {getStatusIcon(caseItem.steps.info.status)}
                              </div>
                              <div className={`h-1 w-4 ${
                                caseItem.steps.photos.status === 'completed' ? 'bg-green-500' : 'bg-gray-200'
                              }`}></div>
                            </div>
                            
                            <div className="flex items-center">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                caseItem.steps.photos.status === 'completed' ? 'bg-green-100' : 'bg-gray-100'
                              }`}>
                                {getStatusIcon(caseItem.steps.photos.status)}
                              </div>
                              <div className={`h-1 w-4 ${
                                caseItem.steps.impressions.status === 'completed' ? 'bg-green-500' : 'bg-gray-200'
                              }`}></div>
                            </div>
                            
                            <div className="flex items-center">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                caseItem.steps.impressions.status === 'completed' ? 'bg-green-100' : 
                                caseItem.steps.impressions.status === 'failed' ? 'bg-red-100' : 'bg-gray-100'
                              }`}>
                                {getStatusIcon(caseItem.steps.impressions.status)}
                              </div>
                              <div className={`h-1 w-4 ${
                                caseItem.steps.prescription.status === 'completed' ? 'bg-green-500' : 'bg-gray-200'
                              }`}></div>
                            </div>
                            
                            <div className="flex items-center">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                caseItem.steps.prescription.status === 'completed' ? 'bg-green-100' : 
                                caseItem.steps.prescription.status === 'in-progress' ? 'bg-blue-100' : 'bg-gray-100'
                              }`}>
                                {getStatusIcon(caseItem.steps.prescription.status)}
                              </div>
                              <div className={`h-1 w-4 ${
                                caseItem.steps.summary.status === 'completed' ? 'bg-green-500' : 'bg-gray-200'
                              }`}></div>
                            </div>
                            
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              caseItem.steps.summary.status === 'completed' ? 'bg-green-100' : 
                              caseItem.steps.summary.status === 'pending-review' ? 'bg-orange-100' : 'bg-gray-100'
                            }`}>
                              {getStatusIcon(caseItem.steps.summary.status)}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <Link 
                            to={`/cases/${caseItem.id}`}
                            className="text-teal-600 hover:text-teal-900 mr-4"
                          >
                            View
                          </Link>
                          {caseItem.status === 'in-progress' && (
                            <Link 
                              to={`/${caseItem.currentStep}`}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Continue
                            </Link>
                          )}
                          {caseItem.status === 'failed' && (
                            <Link 
                              to={`/${caseItem.currentStep}`}
                              className="text-red-600 hover:text-red-900"
                            >
                              Fix Issues
                            </Link>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination if needed */}
              <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200 bg-gray-50">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">1</span> to <span className="font-medium">{cases.length}</span> of{' '}
                      <span className="font-medium">{cases.length}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span className="sr-only">Previous</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                        1
                      </button>
                      <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span className="sr-only">Next</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
          
        <Footer />
      </main>
    </div>
  );
};

export default ProfilePage;