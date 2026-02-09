import React from 'react';

const Loading: React.FC = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>

      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: '#0a0f1e',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Inter, system-ui, sans-serif',
          zIndex: 9999,
        }}
      >
        {/* Logo + circular loader */}
        <div
          style={{
            position: 'relative',
            width: 140,
            height: 140,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Circular loader */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '3px solid rgba(148, 163, 184, 0.2)',
              borderTopColor: '#3b82f6',
              animation: 'spin 1.2s linear infinite',
            }}
          />

          {/* Logo */}
          <img
            src="/logo.svg"
            alt="Logo"
            style={{
              width: 64,
              height: 64,
            }}
          />
        </div>

        {/* Loading text */}
        <p
          style={{
            marginTop: '2rem',
            color: '#94a3b8',
            fontSize: '1rem',
            fontWeight: 500,
            letterSpacing: '0.02em',
          }}
        >
          System: Please wait as we export components for you...
        </p>
      </div>
    </>
  );
};

export default Loading;
