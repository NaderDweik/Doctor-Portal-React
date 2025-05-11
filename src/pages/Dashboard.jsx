import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChartLine, 
  faFileAlt, 
  faBell, 
  faCalendarAlt, 
  faUserMd, 
  faCheckCircle,
  faSpinner,
  faExclamationTriangle,
  faChevronRight,
  faSearch,
  faFilter
} from '@fortawesome/free-solid-svg-icons';
import Header from '../components/layout/Header';

const Dashboard = () => {
  // State for the dashboard data
  const [stats, setStats] = useState({
    totalCases: 0,
    activeCases: 0,
    completedCases: 0,
    pendingReview: 0
  });
  
  const [recentCases, setRecentCases] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Simulate loading data from an API
  useEffect(() => {
    // Mock API calls with setTimeout
    setTimeout(() => {
      // Set dashboard statistics
      setStats({
        totalCases: 42,
        activeCases: 18,
        completedCases: 21,
        pendingReview: 3
      });
      
      // Set recent cases data
      setRecentCases([
        { 
          id: 'EON-73170', 
          patientName: 'Nader Dweik', 
          submitDate: '2025-05-06', 
          status: 'pending', 
          treatment: 'Eon Plus',
          arch: 'both'
        },
        { 
          id: 'EON-73155', 
          patientName: 'Esraa Husamiah', 
          submitDate: '2025-05-04', 
          status: 'active', 
          treatment: 'Eon Pro',
          arch: 'upper'
        },

      ]);
      
      
      

      
      setIsLoading(false);
    }, 1000); // Simulate 1 second loading time
  }, []);
  
  // Filter cases based on status and search term
  const filteredCases = recentCases
    .filter(caseItem => {
      if (filterStatus === 'all') return true;
      return caseItem.status === filterStatus;
    })
    .filter(caseItem => {
      if (!searchTerm) return true;
      return (
        caseItem.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caseItem.patientName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    
  // Handler for marking a notification as read
  const handleMarkAsRead = (notificationId) => {
    setNotifications(prev => prev.map(notification => 
      notification.id === notificationId 
        ? { ...notification, isRead: true } 
        : notification
    ));
  };
  
  // Get status badge style based on status
  const getStatusBadge = (status) => {
    const baseClass = "px-2 py-1 rounded-full text-xs font-medium";
    
    switch(status) {
      case 'pending':
        return `${baseClass} bg-yellow-100 text-yellow-800`;
      case 'active':
        return `${baseClass} bg-blue-100 text-blue-800`;
      case 'completed':
        return `${baseClass} bg-green-100 text-green-800`;
      default:
        return `${baseClass} bg-gray-100 text-gray-800`;
    }
  };
  
  // Get notification icon based on type
  const getNotificationIcon = (type) => {
    switch(type) {
      case 'action':
        return <FontAwesomeIcon icon={faExclamationTriangle} className="text-orange-500" />;
      case 'success':
        return <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />;
      case 'info':
      default:
        return <FontAwesomeIcon icon={faBell} className="text-blue-500" />;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dashboard-page">
      <Header />
      
      <main className="pt-[80px] pb-8 px-6 max-w-screen-2xl mx-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <FontAwesomeIcon icon={faSpinner} spin className="text-4xl text-teal-500" />
          </div>
        ) : (
          <>
            {/* Dashboard Title */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome to your Eon Dental dashboard</p>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Total Cases</p>
                    <h3 className="text-2xl font-bold text-gray-800">{stats.totalCases}</h3>
                  </div>
                  <div className="rounded-full bg-teal-100 p-3">
                    <FontAwesomeIcon icon={faFileAlt} className="text-teal-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Active Cases</p>
                    <h3 className="text-2xl font-bold text-blue-600">{stats.activeCases}</h3>
                  </div>
                  <div className="rounded-full bg-blue-100 p-3">
                    <FontAwesomeIcon icon={faChartLine} className="text-blue-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Completed</p>
                    <h3 className="text-2xl font-bold text-green-600">{stats.completedCases}</h3>
                  </div>
                  <div className="rounded-full bg-green-100 p-3">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-green-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Pending Review</p>
                    <h3 className="text-2xl font-bold text-yellow-600">{stats.pendingReview}</h3>
                  </div>
                  <div className="rounded-full bg-yellow-100 p-3">
                    <FontAwesomeIcon icon={faExclamationTriangle} className="text-yellow-600" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Content - Two Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Cases Section - Takes 2/3 of the grid */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold text-gray-800">Recent Cases</h2>
                      <Link to="/cases" className="text-teal-600 hover:text-teal-700 text-sm font-medium flex items-center">
                        View All
                        <FontAwesomeIcon icon={faChevronRight} className="ml-1 h-3 w-3" />
                      </Link>
                    </div>
                    
                    {/* Search and Filter */}
                    <div className="flex flex-col md:flex-row gap-4 mb-4">
                      <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                          <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                          placeholder="Search by case ID or patient name"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <FontAwesomeIcon icon={faFilter} className="text-gray-400" />
                        <select
                          className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
                          value={filterStatus}
                          onChange={(e) => setFilterStatus(e.target.value)}
                        >
                          <option value="all">All Status</option>
                          <option value="pending">Pending</option>
                          <option value="active">Active</option>
                          <option value="completed">Completed</option>
                        </select>
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
                            Treatment
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredCases.length === 0 ? (
                          <tr>
                            <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                              No cases found
                            </td>
                          </tr>
                        ) : (
                          filteredCases.map((caseItem) => (
                            <tr key={caseItem.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-teal-600">
                                {caseItem.id}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                {caseItem.patientName}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                <div>
                                  {caseItem.treatment}
                                  <span className="ml-2 px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs">
                                    {caseItem.arch === 'both' ? 'Upper & Lower' : caseItem.arch === 'upper' ? 'Upper' : 'Lower'}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                {new Date(caseItem.submitDate).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={getStatusBadge(caseItem.status)}>
                                  {caseItem.status.charAt(0).toUpperCase() + caseItem.status.slice(1)}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                <Link to={`/cases/${caseItem.id}`} className="text-teal-600 hover:text-teal-800 font-medium">
                                  View Details
                                </Link>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                {/* Action Button */}
                <div className="flex justify-center">
                  <Link 
                    to="/patient-information"
                    className="inline-flex items-center px-8 py-3 bg-teal-600 text-white rounded-md font-medium hover:bg-teal-700 transition-colors shadow-md"
                  >
                    Start a New Case
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
              
              {/* Right Column - Sidebar (1/3 of grid) */}
              <div className="space-y-8">
                {/* Notifications Panel */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-bold text-gray-800">Notifications</h2>
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                        {notifications.filter(n => !n.isRead).length} New
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-4">
                      {notifications.length === 0 ? (
                        <p className="text-gray-500 text-center py-4">No notifications</p>
                      ) : (
                        notifications.map((notification) => (
                          <div 
                            key={notification.id} 
                            className={`p-3 rounded-lg border ${notification.isRead ? 'border-gray-200 bg-white' : 'border-blue-200 bg-blue-50'}`}
                          >
                            <div className="flex">
                              <div className="flex-shrink-0 mt-0.5 mr-3">
                                {getNotificationIcon(notification.type)}
                              </div>
                              <div className="flex-1">
                                <p className={`text-sm ${notification.isRead ? 'text-gray-600' : 'text-gray-800 font-medium'}`}>
                                  {notification.message}
                                </p>
                                <div className="flex justify-between items-center mt-1">
                                  <span className="text-xs text-gray-500">
                                    {new Date(notification.date).toLocaleDateString('en-US', {
                                      month: 'short',
                                      day: 'numeric'
                                    })}
                                  </span>
                                  {!notification.isRead && (
                                    <button 
                                      onClick={() => handleMarkAsRead(notification.id)} 
                                      className="text-xs text-teal-600 hover:text-teal-800"
                                    >
                                      Mark as read
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    
                    {notifications.length > 0 && (
                      <div className="mt-4 text-center">
                        <Link to="/notifications" className="text-sm text-teal-600 hover:text-teal-800 font-medium">
                          View All Notifications
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Upcoming Appointments */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faCalendarAlt} className="text-teal-600 mr-3" />
                      <h2 className="text-xl font-bold text-gray-800">Upcoming Appointments</h2>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-4">
                      {upcomingAppointments.length === 0 ? (
                        <p className="text-gray-500 text-center py-4">No upcoming appointments</p>
                      ) : (
                        upcomingAppointments.map((appointment) => (
                          <div key={appointment.id} className="p-3 rounded-lg border border-gray-200 hover:border-teal-200 hover:bg-teal-50 transition-colors">
                            <div className="flex items-start">
                              <div className="flex-shrink-0 rounded-full bg-teal-100 p-2 mr-3">
                                <FontAwesomeIcon icon={faUserMd} className="text-teal-600" />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-gray-800">{appointment.patientName}</p>
                                <div className="flex justify-between items-center">
                                  <div>
                                    <p className="text-sm text-gray-600">{appointment.type}</p>
                                    <p className="text-xs text-gray-500">
                                      {new Date(appointment.date).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric'
                                      })} at {appointment.time}
                                    </p>
                                  </div>
                                  <FontAwesomeIcon icon={faChevronRight} className="text-gray-400" />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    
                    {upcomingAppointments.length > 0 && (
                      <div className="mt-4 text-center">
                        <Link to="/appointments" className="text-sm text-teal-600 hover:text-teal-800 font-medium">
                          View All Appointments
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Quick Links */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800">Quick Links</h2>
                  </div>
                  
                  <div className="p-4">
                    <ul className="divide-y divide-gray-100">
                      <li>
                        <Link to="/resources" className="flex items-center text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md p-3">
                          <FontAwesomeIcon icon={faFileAlt} className="mr-3 text-gray-500" />
                          <span>Treatment Resources</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/faq" className="flex items-center text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md p-3">
                          <FontAwesomeIcon icon={faFileAlt} className="mr-3 text-gray-500" />
                          <span>Frequently Asked Questions</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/support" className="flex items-center text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md p-3">
                          <FontAwesomeIcon icon={faFileAlt} className="mr-3 text-gray-500" />
                          <span>Contact Support</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;