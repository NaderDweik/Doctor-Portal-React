# Doctor Portal for Case Management

## Project Overview

The Doctor Portal for Case Management is a comprehensive web application designed for dental professionals to manage patient treatment cases. This modern React-based platform streamlines the entire case workflow from patient information intake to final submission, making it easier for dental clinics to provide specialized services to their patients.

## Key Features

![image](https://github.com/user-attachments/assets/7edc8e09-f481-49b6-8f97-24b4fca292d0)

### Dashboard
- At-a-glance case statistics and metrics
- Recent case overview with filtering capabilities
- Notification center for important case updates
- Upcoming appointment tracking
- Quick access to resources and support

### Case Management Workflow
1. **Patient Information** - Record basic patient details
2. **Photos & X-Rays** - Upload and manage dental images in a structured format
3. **Impressions** - Multiple submission options:
   - Digital file upload (STL, PLY, DCM)
   - External link sharing
   - Physical impression pickup service
4. **Prescription** - Specify detailed treatment preferences:
   - Treatment type selection
   - Clinical preferences configuration
   - Teeth movement restrictions
5. **Summary Review** - Final verification of all case details before submission

### User Settings
- Profile management
- Clinical preference defaults
- Address management for impression pickups
- Access to resources and documentation

## Technical Implementation

### Frontend Stack
- React.js with functional components and hooks
- Redux Toolkit for state management
- React Router for navigation
- Tailwind CSS for responsive design

### Key React Patterns
- Custom form components with validation
- File upload handling with FileReader API
- Dynamic conditional rendering based on user selections
- Multi-step workflow with state persistence
- Responsive design for all device sizes

### State Management
- Centralized Redux store with slice pattern
- Separate slices for different feature areas:
  - `impressionSlice` - For dental impression data
  - `prescriptionSlice` - For treatment preferences
  - `settingsSlice` - For user profile and preferences
  - `summarySlice` - For photos and X-rays

## Getting Started

### Prerequisites
- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

### Installation
1. Clone the repository
```bash
git clone https://github.com/your-username/doctor-portal.git
cd doctor-portal
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure
```
src/
├── assets/         # Images, icons, and other static assets
├── components/     # Reusable UI components
│   └── layout/     # Layout components (Header, Sidebar, Footer)
├── pages/          # Main page components
├── redux/          # Redux store configuration
│   └── slices/     # Redux Toolkit slices
├── styles/         # Global styles and Tailwind configuration
├── utils/          # Utility functions and helpers
├── App.js          # Main application component
└── index.js        # Application entry point
```

## Future Enhancements
- Patient record database integration
- Calendar and scheduling system
- Treatment plan visualization
- Case progress tracking
- Mobile application for on-the-go case management

## Creator
Developed by Nader Dweik (nderdweik@gmail.com)

## License
This project is proprietary and confidential. Unauthorized use, distribution, or modification is prohibited.
