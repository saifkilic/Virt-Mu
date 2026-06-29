import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, AlertCircle } from 'lucide-react';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setValidationErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
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
      await login(formData.email, formData.password);
      navigate('/');
    } catch (err) {
      // Error is already set in context
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-white to-light-gray flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-deep-navy mb-2">
            Welcome Back
          </h1>
          <p className="text-deep-navy/60 font-body">
            Sign in to your heritage explorer account
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
              {validationErrors.password && (
                <p className="text-xs text-museum-red font-body mt-1">{validationErrors.password}</p>
              )}
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-light-gray/60 accent-deep-gold"
                  defaultChecked
                />
                <span className="text-deep-navy/70 font-body">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-deep-gold hover:text-deep-gold/80 font-body font-semibold transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-3 bg-gradient-to-r from-deep-gold to-gold-accent text-rich-brown font-body font-bold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-light-gray/60" />
            <span className="text-xs text-deep-navy/40 font-body">OR</span>
            <div className="flex-1 h-px bg-light-gray/60" />
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm font-body text-deep-navy/70">
            Don't have an account?{' '}
            <Link to="/register" className="text-deep-gold hover:text-deep-gold/80 font-semibold transition-colors">
              Sign up here
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-deep-navy/40 font-body mt-6">
          By signing in, you agree to our{' '}
          <a href="#" className="text-deep-gold hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-deep-gold hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};