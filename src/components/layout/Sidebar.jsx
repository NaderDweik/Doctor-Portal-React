import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

// Import your icons
import infoIcon from '../../assets/icons/Information.png';
import cameraIcon from '../../assets/icons/CAMPhoto.svg';
import impressionsIcon from '../../assets/icons/Impressions.png';
import prescriptionIcon from '../../assets/icons/Prescription.png';
import frameIcon from '../../assets/icons/Frame.png';
import logoImg from '../../assets/images/Logo.png';
import stepBackground from '../../assets/images/step_background.svg';

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Menu items for navigation
  const menuItems = [
    {
      path: '/info',
      icon: infoIcon,
      label: 'Patient Information',
      showBackground: true
    },
    {
      path: '/photos',
      icon: cameraIcon,
      label: 'Photos & X-rays',
      showBackground: true
    },
    {
      path: '/impressions',
      icon: impressionsIcon,
      label: 'Impressions',
      showBackground: true
    },
    {
      path: '/prescription',
      icon: prescriptionIcon,
      label: 'Prescription',
      showBackground: true
    },
    {
      path: '/summary',
      icon: infoIcon,
      label: 'Summary',
      showBackground: true
    },
    {
      path: '/submission-complete',
      icon: frameIcon,
      label: 'Submission Complete',
      showBackground: true
    },
  ];

  return (
    <aside className="fixed top-0 left-0 h-full w-[230px] bg-teal-500 text-white pl-5 pt-5 pb-5 flex flex-col z-20">
      <div className="mb-10">
        <img src={logoImg} alt="Eon Access Logo" className="w-32" />
      </div>
      <nav>
        <ul>
          {menuItems.map((item) => (




<li key={item.path} className="mb-4 relative">
  <NavLink
    to={item.path}
    className={({ isActive }) =>
      `relative flex items-center py-2 px-4 rounded-lg transition-colors
      ${isActive ? 'text-teal-500 font-bold' : 'text-white hover:bg-teal-600'}`
    }
  >
    {({ isActive }) => (
      <>
        {isActive && item.showBackground && (
          <img 
            src={stepBackground}
            alt="Step Background"
            className="absolute top-1/2 left-0 transform -translate-y-1/2 w-[500px] h-auto z-0 transition-all duration-500 ease-in-out"
          />
        )}
        <div className={`relative z-10 flex items-center ${isActive ? 'text-teal-500' : 'text-white'}`}>
          <img
            src={item.icon}
            alt={item.label + " icon"}
            className={`w-5 h-5 mr-3 ${isActive ? 'filter-none' : 'brightness-0 invert'}`}
          />
          {item.label}
        </div>
      </>
    )}
  </NavLink>
</li>




          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;