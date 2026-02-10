/* eslint-disable react-hooks/purity */
import React, { useState } from 'react';
import Login from './login';
import Register from './register';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  defaultView?: 'login' | 'register';
}

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  defaultView = 'login',
}) => {
  const [view, setView] = useState<'login' | 'register'>(defaultView);

  if (!isOpen) return null;

  const handleSuccess = () => {
    onClose();
    onSuccess?.();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background:
            'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.15))',
          backdropFilter: 'blur(14px)',
          zIndex: 9998,
          animation: 'fadeIn 0.3s ease',
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: '900px',
          maxHeight: '90vh',
          background: 'linear-gradient(180deg, #020617, #020617)',
          borderRadius: '1.5rem',
          overflow: 'hidden',
          zIndex: 9999,
          border: '1px solid rgba(99,102,241,0.35)',
          boxShadow:
            '0 25px 80px rgba(0,0,0,0.7), 0 0 60px rgba(99,102,241,0.25)',
          animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '4px',
              height: '4px',
              background: '#6366f1',
              borderRadius: '50%',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.2,
              animation: `float ${4 + Math.random() * 3}s infinite ease-in-out`,
            }}
          />
        ))}

        {/* Split Layout */}
        <div style={{ display: 'flex', minHeight: '520px' }}>
          {/* LEFT — FORM */}
          <div
            style={{
              flex: 1,
              padding: '3rem',
              position: 'relative',
            }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                background: 'rgba(148,163,184,0.1)',
                border: 'none',
                color: '#94a3b8',
                fontSize: '1.4rem',
                cursor: 'pointer',
                width: '2.4rem',
                height: '2.4rem',
                borderRadius: '0.5rem',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(239,68,68,0.2)';
                e.currentTarget.style.color = '#ef4444';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  'rgba(148,163,184,0.1)';
                e.currentTarget.style.color = '#94a3b8';
              }}
            >
              ✕
            </button>

            <div style={{ marginTop: '2rem' }}>
              {view === 'login' ? (
                <Login
                  onSuccess={handleSuccess}
                  onSwitchToRegister={() => setView('register')}
                />
              ) : (
                <Register
                  onSuccess={handleSuccess}
                  onSwitchToLogin={() => setView('login')}
                />
              )}
            </div>
          </div>

          {/* RIGHT — BRANDING / ANIMATION */}
          <div
            style={{
              flex: 1,
              position: 'relative',
              overflow: 'hidden',
              background:
                'linear-gradient(135deg, #3b82f6, #6366f1, #8b5cf6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Ambient glow */}
            <div className="gradient-orb" />

            {/* Logo */}
            <div
              style={{
                zIndex: 2,
                textAlign: 'center',
                color: 'white',
                animation: 'floatSlow 6s ease-in-out infinite',
                padding: '2rem',
              }}
            >
              <div
                style={{
                  width: '140px',
                  height: '140px',
                  margin: '0 auto 1.5rem',
                  borderRadius: '2rem',
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(14px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 40px rgba(255,255,255,0.25)',
                }}
              >
                <img
                  src="/logo.svg"
                  alt="Bionic Studio"
                  style={{
                    width: '70%',
                    height: '70%',
                    filter:
                      'drop-shadow(0 0 12px rgba(255,255,255,0.45))',
                  }}
                />
              </div>

              <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>
                Bionic Studio
              </h2>

              <p
                style={{
                  marginTop: '0.75rem',
                  opacity: 0.9,
                  maxWidth: '280px',
                  lineHeight: 1.6,
                }}
              >
                Build fast. Experiment freely.
                <br />
                You&apos;re early — that&apos;s the point.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translate(-50%, -40%) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes floatSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }

        .gradient-orb {
          position: absolute;
          width: 420px;
          height: 420px;
          background: radial-gradient(circle, rgba(255,255,255,0.25), transparent 70%);
          filter: blur(90px);
          animation: orbMove 12s infinite alternate ease-in-out;
        }

        @keyframes orbMove {
          from { transform: translate(-60px, -40px); }
          to { transform: translate(60px, 40px); }
        }
      `}</style>
    </>
  );
};

export default AuthModal;
