import React, { useEffect, useState } from 'react';

const Loading: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 9500; // 9.5 seconds
    const intervalTime = 50; // Update every 50ms
    const increment = (intervalTime / duration) * 100;

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(progressTimer);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
      `}</style>

      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: '#0a0f1e',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '3rem',
          zIndex: 9999,
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        {/* Progress bar at top */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: '#1e293b',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)',
              width: `${progress}%`,
              transition: 'width 0.05s linear',
            }}
          />
        </div>

        {/* Pyramid - no animation */}
        <svg width="200" height="200" viewBox="0 0 200 200">
          {/* Pyramid base triangle */}
          <polygon
            points="100,40 40,160 160,160"
            fill="#1e293b"
            stroke="#3b82f6"
            strokeWidth="2"
          />
          
          {/* Left face */}
          <polygon
            points="100,40 40,160 100,120"
            fill="#0f172a"
            stroke="#3b82f6"
            strokeWidth="1"
            opacity="0.8"
          />
          
          {/* Right face */}
          <polygon
            points="100,40 160,160 100,120"
            fill="#1e293b"
            stroke="#3b82f6"
            strokeWidth="1"
            opacity="0.9"
          />
        </svg>

        {/* Loading text */}
        <p
          style={{
            color: '#94a3b8',
            fontSize: '1.125rem',
            fontWeight: 500,
            letterSpacing: '0.02em',
            textAlign: 'center',
          }}
        >
          System: Initializing Bionic Studio...
        </p>
      </div>
    </>
  );
};

export default Loading;