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
  defaultView = 'login' 
}) => {
  const [view, setView] = useState<'login' | 'register'>(defaultView);

  if (!isOpen) return null;

  const handleSuccess = () => {
    onClose();
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <>
      {/* Backdrop with animated gradient */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
          backdropFilter: 'blur(12px)',
          zIndex: 9998,
          animation: 'fadeIn 0.3s ease',
        }}
      />

      {/* Modal Container */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          borderRadius: '1.5rem',
          padding: '0',
          maxWidth: '900px',
          width: '90%',
          maxHeight: '90vh',
          overflowY: 'auto',
          zIndex: 9999,
          border: '1px solid rgba(59, 130, 246, 0.3)',
          boxShadow: '0 25px 80px rgba(0, 0, 0, 0.7), 0 0 60px rgba(59, 130, 246, 0.2)',
          animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Animated particles inside modal */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '4px',
              height: '4px',
              background: '#3b82f6',
              borderRadius: '50%',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.2,
              animation: `float ${3 + Math.random() * 3}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}

        {/* Split Layout */}
        <div style={{ display: 'flex', minHeight: '500px' }}>
          {/* Left Side - Branding */}
          <div
            style={{
              flex: 1,
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              padding: '3rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '1.5rem 0 0 1.5rem',
            }}
          >
            {/* Animated background pattern */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.1,
                backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px),
                                  radial-gradient(circle at 80% 80%, white 1px, transparent 1px)`,
                backgroundSize: '50px 50px',
                animation: 'drift 20s infinite linear',
              }}
            />

            {/* Logo */}
            <div
              style={{
                width: '120px',
                height: '120px',
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                borderRadius: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem',
                fontWeight: 900,
                color: 'white',
                marginBottom: '2rem',
                border: '3px solid rgba(255, 255, 255, 0.3)',
                animation: 'pulse 3s infinite ease-in-out',
              }}
            >
              BS
            </div>

            <h2
              style={{
                color: 'white',
                fontSize: '2rem',
                fontWeight: 700,
                marginBottom: '1rem',
                textAlign: 'center',
              }}
            >
              Bionic Studio
            </h2>

            <p
              style={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '1rem',
                textAlign: 'center',
                maxWidth: '300px',
                lineHeight: 1.6,
              }}
            >
              {view === 'login'
                ? 'Welcome back! Continue building the impossible.'
                : 'Join thousands of creators making the impossible possible.'}
            </p>

            {/* Stats */}
            <div
              style={{
                marginTop: '3rem',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '2rem',
                width: '100%',
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    fontSize: '2rem',
                    fontWeight: 700,
                    color: 'white',
                  }}
                >
                  5K+
                </div>
                <div
                  style={{
                    fontSize: '0.875rem',
                    color: 'rgba(255, 255, 255, 0.8)',
                  }}
                >
                  Creators
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    fontSize: '2rem',
                    fontWeight: 700,
                    color: 'white',
                  }}
                >
                  10K+
                </div>
                <div
                  style={{
                    fontSize: '0.875rem',
                    color: 'rgba(255, 255, 255, 0.8)',
                  }}
                >
                  Projects
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div
            style={{
              flex: 1,
              padding: '3rem',
              position: 'relative',
            }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                background: 'rgba(148, 163, 184, 0.1)',
                border: 'none',
                color: '#94a3b8',
                fontSize: '1.5rem',
                cursor: 'pointer',
                width: '2.5rem',
                height: '2.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '0.5rem',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
                e.currentTarget.style.color = '#ef4444';
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.currentTarget.style.background = 'rgba(148, 163, 184, 0.1)';
                e.currentTarget.style.color = '#94a3b8';
              }}
            >
              ✕
            </button>

            {/* Form Content */}
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
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-10px) translateX(5px); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes drift {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </>
  );
};

export default AuthModal;