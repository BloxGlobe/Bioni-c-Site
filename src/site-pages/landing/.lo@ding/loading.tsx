import React, { useEffect, useState } from 'react';

const Loading: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 9500; // 9.5 seconds
    const intervalTime = 50;
    const increment = (intervalTime / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

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
        {/* Top progress bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: '#1e293b',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
              transition: 'width 0.05s linear',
            }}
          />
        </div>

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
              width: '100%',
              height: '100%',
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
