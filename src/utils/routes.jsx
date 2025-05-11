// //routes.jsx
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { store } from '../redux/store';  // Adjust this path too

// // Import pages with correct relative paths
// import PhotosPage from '../pages/PhotosPage.jsx';
// import ImpressionPage from '../pages/impressionPage.jsx';
// import PrescriptionPage from '../pages/PrescriptionPage.jsx';
// import SummaryPage from '../pages/SummaryPage.jsx';
// import SubmissionCompletePage from '../pages/SubmissionCompletePage.jsx';
// import Dashboard from '../pages/Dashboard.jsx';
// import PatientInformationPage from '../pages/PatientInformationPage.jsx';
// import SettingsPage from '../pages/SettingsPage.jsx'; // Import the Settings page
// import ProfilePage from '../pages/ProfilePage.jsx'; // Import the Profile page (optional)

// function App() {
//   return (
//     <Provider store={store}>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Navigate to="/dashboard" />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/patient-information" element={<PatientInformationPage />} />
//           <Route path="/photos" element={<PhotosPage />} />
//           <Route path="/impressions" element={<ImpressionPage />} />
//           <Route path="/prescription" element={<PrescriptionPage />} />
//           <Route path="/summary" element={<SummaryPage />} />
//           <Route path="/submission-complete" element={<SubmissionCompletePage />} />
//           <Route path="/settings" element={<SettingsPage />} /> {/* Added Settings page route */}
//           <Route path="/profile" element={<ProfilePage />} /> {/* Added Profile page route (optional) */}

//         </Routes>
//       </Router>
//     </Provider>
//   );
// }

// export default App;