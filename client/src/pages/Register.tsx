import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, AlertCircle, Check } from 'lucide-react';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register, isLoading, error, clearError } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Username validation
    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_-]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, _ and -';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])/.test(formData.password)) {
      newErrors.password = 'Password must contain lowercase letters';
    } else if (!/(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase letters';
    } else if (!/(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain numbers';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setValidationErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (!validateForm()) return;

    try {
      await register(formData.email, formData.username, formData.password);
      navigate('/');
    } catch (err) {
      // Error is already set in context
    }
  };

  // Password strength checker
  const getPasswordStrength = () => {
    const pwd = formData.password;
    let strength = 0;

    if (pwd.length >= 8) strength++;
    if (/[a-z]/.test(pwd)) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/\d/.test(pwd)) strength++;
    if (/[^a-zA-Z\d]/.test(pwd)) strength++;

    return strength;
  };

  const passwordStrength = getPasswordStrength();
  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
  const strengthColors = ['bg-museum-red', 'bg-orange-500', 'bg-yellow-500', 'bg-pk-green', 'bg-pk-green/80'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-white to-light-gray flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-deep-navy mb-2">
            Create Account
          </h1>
          <p className="text-deep-navy/60 font-body">
            Join our heritage exploring community
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          {/* Error Alert */}
          {error && (
            <div className="flex gap-3 p-4 bg-museum-red/10 border border-museum-red/30 rounded-lg">
              <AlertCircle className="h-5 w-5 text-museum-red flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-body font-semibold text-museum-red">{error}</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-body font-semibold text-deep-navy mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-deep-navy/30" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  placeholder="your@email.com"
                  className={`w-full pl-10 pr-4 py-3 bg-cream border-2 rounded-lg font-body text-sm transition-colors focus:outline-none focus:border-deep-gold ${
                    validationErrors.email
                      ? 'border-museum-red/50 focus:border-museum-red'
                      : 'border-light-gray/60 focus:border-deep-gold'
                  }`}
                />
              </div>
              {validationErrors.email && (
                <p className="text-xs text-museum-red font-body mt-1">{validationErrors.email}</p>
              )}
            </div>

            {/* Username Field */}
            <div>
              <label className="block text-sm font-body font-semibold text-deep-navy mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 h-5 w-5 text-deep-navy/30" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  disabled={isLoading}
                  placeholder="your_username"
                  className={`w-full pl-10 pr-4 py-3 bg-cream border-2 rounded-lg font-body text-sm transition-colors focus:outline-none focus:border-deep-gold ${
                    validationErrors.username
                      ? 'border-museum-red/50 focus:border-museum-red'
                      : 'border-light-gray/60 focus:border-deep-gold'
                  }`}
                />
              </div>
              {validationErrors.username && (
                <p className="text-xs text-museum-red font-body mt-1">{validationErrors.username}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-body font-semibold text-deep-navy mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-deep-navy/30" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-4 py-3 bg-cream border-2 rounded-lg font-body text-sm transition-colors focus:outline-none focus:border-deep-gold ${
                    validationErrors.password
                      ? 'border-museum-red/50 focus:border-museum-red'
                      : 'border-light-gray/60 focus:border-deep-gold'
                  }`}
                />
              </div>

              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2 space-y-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-colors ${
                          i < passwordStrength ? strengthColors[passwordStrength - 1] : 'bg-light-gray/40'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-deep-navy/60 font-body">
                    Strength: <span className="font-semibold">{strengthLabels[passwordStrength - 1] || 'Too weak'}</span>
                  </p>
                </div>
              )}

              {validationErrors.password && (
                <p className="text-xs text-museum-red font-body mt-1">{validationErrors.password}</p>
              )}

              {/* Password Requirements */}
              <div className="mt-3 space-y-1">
                <p className="text-xs font-body text-deep-navy/50 mb-2">Password must contain:</p>
                {[
                  { text: 'At least 8 characters', met: formData.password.length >= 8 },
                  { text: 'Lowercase letters (a-z)', met: /[a-z]/.test(formData.password) },
                  { text: 'Uppercase letters (A-Z)', met: /[A-Z]/.test(formData.password) },
                  { text: 'Numbers (0-9)', met: /\d/.test(formData.password) },
                ].map((req, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-body">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${req.met ? 'bg-pk-green' : 'bg-light-gray'}`}>
                      {req.met && <Check className="h-2.5 w-2.5 text-white" />}
                    </div>
                    <span className={req.met ? 'text-pk-green' : 'text-deep-navy/40'}>{req.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-body font-semibold text-deep-navy mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-deep-navy/30" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={isLoading}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-4 py-3 bg-cream border-2 rounded-lg font-body text-sm transition-colors focus:outline-none focus:border-deep-gold ${
                    validationErrors.confirmPassword
                      ? 'border-museum-red/50 focus:border-museum-red'
                      : 'border-light-gray/60 focus:border-deep-gold'
                  }`}
                />
              </div>
              {validationErrors.confirmPassword && (
                <p className="text-xs text-museum-red font-body mt-1">{validationErrors.confirmPassword}</p>
              )}
            </div>

            {/* Terms & Conditions */}
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                required
                className="w-4 h-4 rounded border-light-gray/60 accent-deep-gold mt-1"
              />
              <span className="text-xs text-deep-navy/70 font-body">
                I agree to the{' '}
                <a href="#" className="text-deep-gold hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-deep-gold hover:underline">
                  Privacy Policy
                </a>
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-3 bg-gradient-to-r from-deep-gold to-gold-accent text-rich-brown font-body font-bold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-light-gray/60" />
            <span className="text-xs text-deep-navy/40 font-body">OR</span>
            <div className="flex-1 h-px bg-light-gray/60" />
          </div>

          {/* Sign In Link */}
          <p className="text-center text-sm font-body text-deep-navy/70">
            Already have an account?{' '}
            <Link to="/login" className="text-deep-gold hover:text-deep-gold/80 font-semibold transition-colors">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};