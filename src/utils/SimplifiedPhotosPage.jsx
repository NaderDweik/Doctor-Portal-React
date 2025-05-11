import React from 'react';
import { useSelector } from 'react-redux';

const SimplifiedPhotosPage = () => {
  const { photos, xrays } = useSelector((state) => state.summary);
  
  return (
    <div style={{padding: '50px'}}>
      <h1 style={{fontSize: '24px', marginBottom: '20px'}}>Photos and X-rays</h1>
      
      <h2 style={{fontSize: '20px', marginTop: '20px'}}>Photos:</h2>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px'}}>
        {Object.keys(photos).map(key => (
          <div key={key} style={{border: '1px solid #ccc', padding: '10px', borderRadius: '4px'}}>
            <p><strong>{key}</strong></p>
            <p>{photos[key] ? 'Uploaded' : 'Not uploaded'}</p>
          </div>
        ))}
      </div>
      
      <h2 style={{fontSize: '20px', marginTop: '20px'}}>X-rays:</h2>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px'}}>
        {Object.keys(xrays).map(key => (
          <div key={key} style={{border: '1px solid #ccc', padding: '10px', borderRadius: '4px'}}>
            <p><strong>{key}</strong></p>
            <p>{xrays[key] ? 'Uploaded' : 'Not uploaded'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimplifiedPhotosPage;