//infopage.jsx
import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Footer from '../components/layout/Footer';

const InfoPage = () => {
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    dob: '',
    contact: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientInfo({
      ...patientInfo,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Patient information submitted:', patientInfo);
    // Here you would typically dispatch this data to your Redux store
    // or send it to an API
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="ml-[230px] pt-[60px] pb-16 px-6">
        
        <Header/>

        <section className="mt-8">
          <div className="flex items-center mb-6 ml-4">
            <h2 className="text-2xl font-bold text-gray-800">Patient Information</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={patientInfo.name}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Enter patient name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input 
                    type="date" 
                    name="dob"
                    value={patientInfo.dob}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                  <input 
                    type="tel" 
                    name="contact"
                    value={patientInfo.contact}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Enter contact number"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    value={patientInfo.email}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Enter email address"
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button 
                type="submit"
                className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
>
                Save Information
              </button>
            </div>
          </form>
        </section>
        
        <Footer />
      </main>
    </div>
  );
};

export default InfoPage;