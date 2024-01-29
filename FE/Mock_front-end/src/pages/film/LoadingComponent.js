import React from 'react';

const LoadingComponent = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="loader"></div>
      {/* You can add additional loading text or elements here */}
    </div>
  );
};

export default LoadingComponent;