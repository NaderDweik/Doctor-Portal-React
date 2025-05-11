import React from 'react';
import { useSelector } from 'react-redux';

const MinimalReduxTest = () => {
  // Try to log the entire Redux state
  const state = useSelector(state => state);
  
  return (
    <div style={{padding: '50px'}}>
      <h1>Redux Test</h1>
      <p>Redux state available: {state ? 'Yes' : 'No'}</p>
      <p>Redux keys: {state ? Object.keys(state).join(', ') : 'None'}</p>
      <div>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </div>
    </div>
  );
};

export default MinimalReduxTest;