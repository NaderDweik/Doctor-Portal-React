// Footer.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Define the navigation order
  const routes = ['/info', '/photos', '/impressions', '/prescription', '/summary', '/submission-complete'];
  
  const currentIndex = routes.indexOf(location.pathname);
  
  const handlePrevious = () => {
    if (currentIndex > 0) {
      navigate(routes[currentIndex - 1]);
    }
  };
  
  const handleNext = () => {
    if (currentIndex < routes.length - 1) {
      navigate(routes[currentIndex + 1]);
    }
  };
  
  return (
    <footer className="fixed bottom-0 left-[230px] right-0 z-10 flex justify-between items-center p-4 bg-gray-100 border-t border-gray-200">
      <button 
        onClick={handlePrevious}
        className="px-6 py-2 ml-12 bg-white text-teal-500 border-2 border-teal-500 font-bold rounded-xl flex items-center gap-2 transition-colors hover:bg-teal-600 hover:text-white"
        disabled={currentIndex <= 0}
      >
        <span>&#8592;</span> Previous
      </button>
      
      <button 
        onClick={handleNext}
        className="px-6 py-2 mr-12 bg-teal-500 text-white border-none font-bold rounded-xl flex items-center gap-2 transition-colors hover:bg-teal-600"
        disabled={currentIndex >= routes.length - 1}
      >
        Next <span>&#8594;</span>
      </button>
    </footer>
  );
};

export default Footer;