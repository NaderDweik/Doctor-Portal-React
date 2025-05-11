import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

// Import all existing page components
import PhotosPage from '../pages/PhotosPage';
import ImpressionPage from '../pages/impressionPage'; // Note the lowercase 'i'
import PrescriptionPage from '../pages/PrescriptionPage';
import SummaryPage from '../pages/SummaryPage';
import SubmissionCompletePage from '../pages/SubmissionCompletePage';
import InfoPage from '../pages/InfoPage';
import Dashboard from '../pages/Dashboard'; // Import the Dashboard component
import SettingsPage from '../pages/Settings'; // Import the Settings page component

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} /> {/* Changed default route to dashboard */}
          <Route path="/dashboard" element={<Dashboard />} /> {/* Added Dashboard route */}
          <Route path="/info" element={<InfoPage />} />
          <Route path="/photos" element={<PhotosPage />} />
          <Route path="/impressions" element={<ImpressionPage />} />
          <Route path="/prescription" element={<PrescriptionPage />} />
          <Route path="/summary" element={<SummaryPage />} />
          <Route path="/submission-complete" element={<SubmissionCompletePage />} />
          <Route path="/settings" element={<SettingsPage />} /> {/* Added Settings route */}
          
          {/* Additional routes for Dashboard functionality
          <Route path="/cases/:caseId" element={<Dashboard />} />
          <Route path="/notifications" element={<Dashboard />} />
          <Route path="/appointments" element={<Dashboard />} />
          <Route path="/resources" element={<Dashboard />} />
          <Route path="/faq" element={<Dashboard />} />
          <Route path="/support" element={<Dashboard />} /> */}

        </Routes>
      </Router>
    </Provider>
  );
}

export default App;