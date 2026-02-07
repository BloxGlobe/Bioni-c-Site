import React, { useEffect, useState } from 'react';

// Subtitles outside component to avoid dependency warnings
const subtitles = ['Loading…', 'Still loading…', 'Almost there…'];

const Loading: React.FC = () => {
  const [subtitleIndex, setSubtitleIndex] = useState(0);

  useEffect(() => {
    const subtitleTimer = setInterval(() => {
      setSubtitleIndex((prev) => (prev + 1) % subtitles.length);
    }, 3500);

    return () => clearInterval(subtitleTimer);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.05); opacity: 1; }
        }

        @keyframes cornerPulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
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
          gap: '2rem',
          zIndex: 9999,
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        {/* Animated corner accents */}
        {['tl', 'tr', 'bl', 'br'].map((pos) => (
          <div
            key={pos}
            style={{
              position: 'absolute',
              width: '24px',
              height: '24px',
              border: '2px solid #38bdf8',
              opacity: 0.3,
              animation: 'cornerPulse 2.5s ease-in-out infinite',
              ...(pos === 'tl' && { top: 16, left: 16, borderRight: 'none', borderBottom: 'none' }),
              ...(pos === 'tr' && { top: 16, right: 16, borderLeft: 'none', borderBottom: 'none' }),
              ...(pos === 'bl' && { bottom: 16, left: 16, borderRight: 'none', borderTop: 'none' }),
              ...(pos === 'br' && { bottom: 16, right: 16, borderLeft: 'none', borderTop: 'none' }),
            }}
          />
        ))}

        {/* Smooth WiFi-style spinner */}
        <svg width="120" height="120" viewBox="0 0 120 120">
          {/* background ring */}
          <circle
            cx="60"
            cy="60"
            r="46"
            stroke="#1e293b"
            strokeWidth="8"
            fill="none"
          />

          {/* spinning arc */}
          <circle
            cx="60"
            cy="60"
            r="46"
            stroke="#38bdf8"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="150 200"
            strokeDashoffset="0"
            style={{
              transformOrigin: '50% 50%',
              animation: 'spin 1.5s linear infinite, pulse 1.5s ease-in-out infinite',
            }}
          />
        </svg>

        {/* Animated subtitle */}
        <p
          style={{
            color: '#94a3b8',
            fontSize: '1.125rem',
            fontWeight: 500,
            letterSpacing: '0.02em',
            textAlign: 'center',
            transition: 'opacity 0.3s ease-in-out',
          }}
        >
          {subtitles[subtitleIndex]}
        </p>
      </div>
    </>
  );
};

export default Loading;
