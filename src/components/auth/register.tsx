import React, { useState } from 'react';
import { isValidEmail, isStrongPassword } from '../../utils/helpers';

interface RegisterProps {
  onSuccess: () => void;
  onSwitchToLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ onSuccess, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!isStrongPassword(formData.password)) {
      newErrors.password = 'Password must be 8+ characters with uppercase, lowercase, and number';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
        username: formData.username,
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
        Create Account
      </h2>
      <p style={{
        color: '#94a3b8',
        textAlign: 'center',
        marginBottom: '2rem',
      }}>
        Join Bionic Studio today
      </p>

      <form onSubmit={handleSubmit}>
        {/* Username */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{
            display: 'block',
            color: '#cbd5e1',
            fontSize: '0.875rem',
            fontWeight: 500,
            marginBottom: '0.5rem',
          }}>
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: '#1e293b',
              border: errors.username ? '2px solid #ef4444' : '2px solid #334155',
              borderRadius: '0.5rem',
              color: '#f1f5f9',
              fontSize: '1rem',
              outline: 'none',
            }}
            placeholder="Enter your username"
          />
          {errors.username && (
            <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              {errors.username}
            </p>
          )}
        </div>

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
        <div style={{ marginBottom: '1.25rem' }}>
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
            placeholder="Create a strong password"
          />
          {errors.password && (
            <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              {errors.password}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            color: '#cbd5e1',
            fontSize: '0.875rem',
            fontWeight: 500,
            marginBottom: '0.5rem',
          }}>
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: '#1e293b',
              border: errors.confirmPassword ? '2px solid #ef4444' : '2px solid #334155',
              borderRadius: '0.5rem',
              color: '#f1f5f9',
              fontSize: '1rem',
              outline: 'none',
            }}
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && (
            <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              {errors.confirmPassword}
            </p>
          )}
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
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>

      {/* Switch to Login */}
      <p style={{
        textAlign: 'center',
        color: '#94a3b8',
        fontSize: '0.875rem',
      }}>
        Already have an account?{' '}
        <button
          onClick={onSwitchToLogin}
          style={{
            background: 'none',
            border: 'none',
            color: '#3b82f6',
            cursor: 'pointer',
            textDecoration: 'underline',
            fontWeight: 600,
          }}
        >
          Sign In
        </button>
      </p>
    </div>
  );
};

export default Register;