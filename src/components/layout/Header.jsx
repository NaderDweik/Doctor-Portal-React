// Header.jsx
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';

// Import icons from assets folder
import notificationIcon from '../../assets/icons/Notification-Icon.png';
import settingsIcon from '../../assets/icons/Settings-Icon.png';
import logoutIcon from '../../assets/icons/Logout-icon.png';
import logo from '../../assets/images/Logo2SVG.svg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBell, 
  faGear, 
  faSignOutAlt, 
  faTachometerAlt, 
  faSearch,
  faUser
} from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  
  const { profile } = useSelector((state) => state.settings);

  const user = {
    name: profile.name || "Dr. Nader Dweik",
    role: "Dental Specialist",
    avatar: profile.profileImage || "/images/me.jpeg"
  };
  
  
  
  // Get current page title
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/dashboard')) return 'Dashboard';
    if (path.includes('/info')) return 'Patient Information';
    if (path.includes('/photos')) return 'Upload Photos';
    if (path.includes('/impressions')) return 'Upload Impressions';
    if (path.includes('/prescription')) return 'Prescription';
    if (path.includes('/summary')) return 'Summary';
    if (path.includes('/submission-complete')) return 'Submission Complete';
    if (path.includes('/settings')) return 'Settings';
    if (path.includes('/profile')) return 'My Profile';
    return 'Eon Dental';
  };
  
  const handleLogout = () => {
    // Implement logout logic here
    navigate('/login');
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search logic here
    console.log("Searching for:", searchQuery);
    setSearchQuery("");
    setIsSearchVisible(false);
  };
  
  const unreadNotificationsCount = notifications.filter(n => !n.isRead).length;
  
  return (
    <header 
      className={`fixed top-0 right-0 left-[230px] z-20 flex justify-between items-center py-3 px-6 bg-white transition-all duration-200 ${
        isScrolled ? 'shadow-md h-[60px]' : 'border-b border-gray-200 shadow-sm h-[60px]'
      }`}
    >
      {/* Left section with logo (mobile) and page title */}
      <div className="flex items-center">
        <img src={logo} alt="Eon Access Logo" className="h-8 mr-4 md:hidden" />
        <div className="hidden md:block">
          <h1 className="text-xl font-bold text-gray-800">{getPageTitle()}</h1>
          <div className="text-xs text-gray-500">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </div>
      
      {/* Center section with navigation */}
      <div className="hidden md:flex items-center space-x-6 absolute left-1/2 transform -translate-x-1/2">
        <Link 
          to="/dashboard" 
          className={`flex items-center px-3 py-2 rounded-md font-medium transition-colors ${
            location.pathname === '/dashboard' 
              ? 'text-teal-600 bg-teal-50' 
              : 'text-gray-700 hover:text-teal-600 hover:bg-gray-50'
          }`}
        >
          <FontAwesomeIcon icon={faTachometerAlt} className="mr-2" />
          <span>Dashboard</span>
        </Link>
        
        <Link 
          to="/info" 
          className={`flex items-center px-3 py-2 rounded-md font-medium transition-colors ${
            location.pathname === '/info' 
              ? 'text-teal-600 bg-teal-50' 
              : 'text-gray-700 hover:text-teal-600 hover:bg-gray-50'
          }`}
        >
          <span>New Case</span>
        </Link>
      </div>
      
      {/* Right section with action buttons */}
      <div className="flex items-center space-x-2">
        {/* Search button & form */}
        <div className="relative">
          <button 
            className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600"
            onClick={() => setIsSearchVisible(!isSearchVisible)}
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
          
          {isSearchVisible && (
            <form 
              onSubmit={handleSearch} 
              className="absolute right-0 top-12 w-64 bg-white shadow-lg rounded-lg p-3 border border-gray-200 z-30"
            >
              <div className="flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search cases..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button 
                  type="submit" 
                  className="ml-2 bg-teal-500 text-white p-2 rounded-md hover:bg-teal-600"
                >
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </form>
          )}
        </div>
        
        {/* Notification button & dropdown */}
        <div className="relative">
          <button 
            className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600 relative"
            onClick={() => setIsDropdownOpen(prev => ({ ...prev, notifications: !prev.notifications }))}
          >
            <FontAwesomeIcon icon={faBell} />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {unreadNotificationsCount}
              </span>
            )}
          </button>
          
          {isDropdownOpen?.notifications && (
            <div className="absolute right-0 top-12 w-80 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 z-30">
              <div className="flex justify-between items-center p-3 border-b border-gray-200 bg-gray-50">
                <h3 className="font-semibold text-gray-800">Notifications</h3>
                <button className="text-xs text-teal-600 hover:text-teal-800">Mark all as read</button>
              </div>
              
              <div className="max-h-80 overflow-y-auto">
                {notifications.map(notification => (
                  <div 
                    key={notification.id}
                    className={`p-3 border-b border-gray-100 hover:bg-gray-50 ${!notification.isRead ? 'bg-blue-50' : ''}`}
                  >
                    <div className="flex items-start">
                      <div className={`w-2 h-2 rounded-full mt-1.5 mr-2 ${!notification.isRead ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-800">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-3 border-t border-gray-200 text-center">
                <Link to="/notifications" className="text-sm text-teal-600 hover:text-teal-800 font-medium">
                  View All Notifications
                </Link>
              </div>
            </div>
          )}
        </div>
        
        {/* Settings button - Now links directly to settings page */}
        <Link to="/settings" className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600">
          <FontAwesomeIcon icon={faGear} />
        </Link>
        
        {/* User profile & dropdown */}
        <div className="relative ml-2">
          <button 
            className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => setIsDropdownOpen(prev => ({ ...prev, profile: !prev.profile }))}
          >
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-8 h-8 rounded-full border-2 border-teal-500"
            />
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-gray-800">{user.name}</p>
              <p className="text-xs text-gray-500">{user.role}</p>
            </div>
          </button>
          
          {isDropdownOpen?.profile && (
            <div className="absolute right-0 top-12 w-60 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 z-30">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center">
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-12 h-12 rounded-full border-2 border-teal-500 mr-3"
                  />
                  <div>
                    <p className="font-medium text-gray-800">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.role}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-2">
                <Link to="/profile" className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center">
                  <FontAwesomeIcon icon={faUser} className="mr-3 text-gray-500" />
                  My Profile
                </Link>
                <Link to="/settings" className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center">
                  <FontAwesomeIcon icon={faGear} className="mr-3 text-gray-500" />
                  Account Settings
                </Link>
                <div className="border-t border-gray-200 my-2"></div>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md flex items-center"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-3" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Overlay for closing dropdowns when clicking outside */}
      {(isDropdownOpen?.notifications || isDropdownOpen?.profile || isSearchVisible) && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={() => {
            setIsDropdownOpen({});
            setIsSearchVisible(false);
          }}
        ></div>
      )}
    </header>
  );
};

export default Header;