import React from 'react';

const Loading: React.FC = () => {
  return (
    <>
      {/* Font + animations */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

          @keyframes spinEase {
            0% { transform: rotate(0deg); }
            50% { transform: rotate(180deg); }
            100% { transform: rotate(360deg); }
          }

          @keyframes cornerPulse {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 0.8; }
          }
        `}
      </style>

      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: '#0a0f1e',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '2rem',
          zIndex: 9999,
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        {/* Corner accents */}
        {['tl', 'tr', 'bl', 'br'].map((pos) => (
          <div
            key={pos}
            style={{
              position: 'absolute',
              width: '24px',
              height: '24px',
              border: '2px solid #38bdf8',
              opacity: 0.4,
              animation: 'cornerPulse 2.5s ease-in-out infinite',
              ...(pos === 'tl' && { top: 16, left: 16, borderRight: 'none', borderBottom: 'none' }),
              ...(pos === 'tr' && { top: 16, right: 16, borderLeft: 'none', borderBottom: 'none' }),
              ...(pos === 'bl' && { bottom: 16, left: 16, borderRight: 'none', borderTop: 'none' }),
              ...(pos === 'br' && { bottom: 16, right: 16, borderLeft: 'none', borderTop: 'none' }),
            }}
          />
        ))}

        {/* Spinner */}
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
        >
          {/* background ring */}
          <circle
            cx="60"
            cy="60"
            r="46"
            stroke="#1e293b"
            strokeWidth="8"
            fill="none"
          />

          {/* animated ring */}
          <circle
            cx="60"
            cy="60"
            r="46"
            stroke="#38bdf8"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="90 280"
            style={{
              transformOrigin: '50% 50%',
              animation: 'spinEase 1.6s ease-in-out infinite',
            }}
          />
        </svg>

        {/* Subtitle */}
        <p
          style={{
            color: '#94a3b8',
            fontSize: '1.05rem',
            fontWeight: 500,
            letterSpacing: '0.02em',
            textAlign: 'center',
          }}
        >
          Loading, please wait…
        </p>
      </div>
    </>
  );
};

export default Loading;
