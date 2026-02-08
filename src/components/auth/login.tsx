import React, { useState } from 'react';
import { isValidEmail } from '../../utils/helpers';

interface LoginProps {
  onSuccess: () => void;
  onSwitchToRegister: () => void;
}

const Login: React.FC<LoginProps> = ({ onSuccess, onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Store user data
      localStorage.setItem('bionic_user', JSON.stringify({
        email: formData.email,
      }));
      localStorage.setItem('bionic_token', 'demo-token-' + Date.now());

      setLoading(false);
      onSuccess();
    }, 1500);
  };

  return (
    <div style={{ width: '100%' }}>
      <h2 style={{
        fontSize: '1.875rem',
        fontWeight: 700,
        color: '#f1f5f9',
        marginBottom: '0.5rem',
        textAlign: 'center',
      }}>
        Welcome Back
      </h2>
      <p style={{
        color: '#94a3b8',
        textAlign: 'center',
        marginBottom: '2rem',
      }}>
        Sign in to your account
      </p>

      <form onSubmit={handleSubmit}>
        {/* Email */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{
            display: 'block',
            color: '#cbd5e1',
            fontSize: '0.875rem',
            fontWeight: 500,
            marginBottom: '0.5rem',
          }}>
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: '#1e293b',
              border: errors.email ? '2px solid #ef4444' : '2px solid #334155',
              borderRadius: '0.5rem',
              color: '#f1f5f9',
              fontSize: '1rem',
              outline: 'none',
            }}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{
            display: 'block',
            color: '#cbd5e1',
            fontSize: '0.875rem',
            fontWeight: 500,
            marginBottom: '0.5rem',
          }}>
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: '#1e293b',
              border: errors.password ? '2px solid #ef4444' : '2px solid #334155',
              borderRadius: '0.5rem',
              color: '#f1f5f9',
              fontSize: '1rem',
              outline: 'none',
            }}
            placeholder="Enter your password"
          />
          {errors.password && (
            <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              {errors.password}
            </p>
          )}
        </div>

        {/* Forgot Password */}
        <div style={{ textAlign: 'right', marginBottom: '1.5rem' }}>
          <button
            type="button"
            style={{
              background: 'none',
              border: 'none',
              color: '#3b82f6',
              fontSize: '0.875rem',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            Forgot password?
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '0.875rem',
            background: loading ? '#1e40af' : '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            marginBottom: '1rem',
          }}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>

      {/* Switch to Register */}
      <p style={{
        textAlign: 'center',
        color: '#94a3b8',
        fontSize: '0.875rem',
      }}>
        Don't have an account?{' '}
        <button
          onClick={onSwitchToRegister}
          style={{
            background: 'none',
            border: 'none',
            color: '#3b82f6',
            cursor: 'pointer',
            textDecoration: 'underline',
            fontWeight: 600,
          }}
        >
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default Login;