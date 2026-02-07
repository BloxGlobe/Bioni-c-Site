import React from 'react';

const Loading: React.FC = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: '#0a0f1e',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '2rem',
      zIndex: 9999
    }}>
      <img 
        src="/wifi-fade.svg" 
        alt="Loading Bionic Studio" 
        style={{ width: '100px', height: '100px' }}
      />
      <p style={{ 
        color: '#cbd5e1', 
        fontSize: '1.25rem',
        fontWeight: 500
      }}>
        Loading Bionic Studio...
      </p>
    </div>
  );
};

export default Loading;