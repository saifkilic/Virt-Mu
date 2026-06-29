import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../services/apiClient';
import type { ReactNode } from 'react';
import { api } from '../services/api';

export interface AuthUser {
  id: string;
  email: string;
  username: string;
  role: 'user' | 'curator' | 'admin';
  displayName?: string;
  avatar?: string;
  bio?: string;
  language?: 'en' | 'ur';
  createdAt?: string | Date;
  favoritesCount?: number;
  preferences?: {
    notifications: boolean;
    newsletter: boolean;
  };
  stats?: {
    artifactsViewed: number;
    totalTimeSpent: number;
    commentsCount: number;
    favoritesCount: number;
    museumsVisited: Array<{
      museumId: string;
      visitCount: number;
      totalTime: number;
      lastVisit: Date;
    }>;
  };
  achievements?: Array<{
    id: string;
    name: string;
    description: string;
    type: 'saves' | 'comments';
    threshold: number;
    earnedAt: Date;
  }>;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: AuthUser) => void;
  updateUserProfile: (updates: Partial<AuthUser>) => Promise<void>;
  error: string | null;
  clearError: () => void;
  refreshUserData: () => Promise<void>;
}

interface TokenData {
  token: string;
  expiresAt: number; // timestamp when token expires
  refreshToken?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Token expiration check - tokens expire after 24 hours
const TOKEN_EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 24 hours in ms
const TOKEN_REFRESH_BUFFER = 5 * 60 * 1000; // Refresh 5 minutes before expiry

// Helper functions to manage token storage securely
const saveToken = (token: string, refreshToken?: string) => {
  const expiresAt = Date.now() + TOKEN_EXPIRATION_TIME;
  const tokenData: TokenData = { token, expiresAt, refreshToken };
  localStorage.setItem('authToken', JSON.stringify(tokenData));
};

const getStoredToken = (): TokenData | null => {
  try {
    const stored = localStorage.getItem('authToken');
    if (!stored) return null;
    
    const tokenData: TokenData = JSON.parse(stored);
    
    // Check if token has expired
    if (tokenData.expiresAt && Date.now() > tokenData.expiresAt) {
      // Token expired, clear it
      localStorage.removeItem('authToken');
      return null;
    }
    
    return tokenData;
  } catch (err) {
    console.error('Failed to parse stored token:', err);
    localStorage.removeItem('authToken');
    return null;
  }
};

const clearToken = () => {
  localStorage.removeItem('authToken');
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tokenRefreshTimer, setTokenRefreshTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  // Initialize auth on app load
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const tokenData = getStoredToken();
        
        if (tokenData) {
          // Token exists and is valid, verify it by fetching current user
          try {
            const response = await apiClient.get('/auth/me', {
              headers: {
                Authorization: `Bearer ${tokenData.token}`
              }
            });
            
            if (response.data?.data?.user) {
              setUser(response.data.data.user);
              // Set up token refresh timer
              setupTokenRefreshTimer(tokenData.expiresAt);
            } else if (response.data?.user) {
              setUser(response.data.user);
              setupTokenRefreshTimer(tokenData.expiresAt);
            }
          } catch (verifyErr) {
            // Token verification failed (token might be invalid on server)
            console.error('Token verification failed:', verifyErr);
            clearToken();
            setUser(null);
          }
        }
      } catch (err) {
        console.error('Auth initialization failed:', err);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Cleanup on unmount
    return () => {
      if (tokenRefreshTimer) {
        clearInterval(tokenRefreshTimer);
      }
    };
  }, []);

  // Set up token refresh timer
  const setupTokenRefreshTimer = (expiresAt: number) => {
    if (tokenRefreshTimer) {
      clearInterval(tokenRefreshTimer);
    }

    // Calculate time until we should refresh (5 minutes before expiry)
    const now = Date.now();
    const timeUntilRefresh = expiresAt - now - TOKEN_REFRESH_BUFFER;

    if (timeUntilRefresh > 0) {
      const timer = setTimeout(async () => {
        try {
          await refreshToken();
        } catch (err) {
          console.error('Automatic token refresh failed:', err);
          // Let user know they need to log in again
          logout();
        }
      }, timeUntilRefresh);

      setTokenRefreshTimer(timer);
    }
  };

  // Refresh token function
  const refreshToken = async () => {
    const tokenData = getStoredToken();
    if (!tokenData) {
      throw new Error('No token to refresh');
    }

    try {
      const response = await apiClient.post('/auth/refresh', {
        refreshToken: tokenData.refreshToken
      });

      const newToken = response.data.data?.token || response.data.token;
      const newRefreshToken = response.data.data?.refreshToken || tokenData.refreshToken;

      saveToken(newToken, newRefreshToken);
      setupTokenRefreshTimer(Date.now() + TOKEN_EXPIRATION_TIME);
    } catch (err) {
      // Refresh failed, clear auth
      clearToken();
      setUser(null);
      throw err;
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      const { token, user: userData, refreshToken } = response.data.data || response.data;

      // Save token with expiration time
      saveToken(token, refreshToken);
      setUser(userData);

      // Set up automatic token refresh
      setupTokenRefreshTimer(Date.now() + TOKEN_EXPIRATION_TIME);
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.response?.data?.error || 'Login failed';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, username: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.post('/auth/register', { email, username, password });
      const { token, user: userData, refreshToken } = response.data.data || response.data;

      // Save token with expiration time
      saveToken(token, refreshToken);
      setUser(userData);

      // Set up automatic token refresh
      setupTokenRefreshTimer(Date.now() + TOKEN_EXPIRATION_TIME);
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.response?.data?.error || 'Registration failed';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      // Attempt to notify server of logout
      await apiClient.post('/auth/logout');
    } catch (err) {
      console.error('Logout notification failed:', err);
    } finally {
      // Clear local state regardless of server response
      clearToken();
      if (tokenRefreshTimer) {
        clearInterval(tokenRefreshTimer);
        setTokenRefreshTimer(null);
      }
      setUser(null);
      setIsLoading(false);
    }
  };

  const updateUser = (updatedUser: AuthUser) => {
    setUser(updatedUser);
  };

  const updateUserProfile = async (updates: Partial<AuthUser>) => {
    setIsLoading(true);
    setError(null);
    try {
      const { displayName, avatar, bio } = updates;
      
      const updatedProfile = await api.updateUserProfile({ 
        displayName, 
        avatar, 
        bio 
      });
      
      setUser(prev => prev ? { ...prev, ...updatedProfile } : null);
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Failed to update profile';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUserData = async () => {
    try {
      const profile = await api.getUserProfile();
      const achievements = await api.getUserAchievements();
      
      setUser(prev => prev ? { 
        ...prev, 
        ...profile,
        achievements 
      } : null);
    } catch (err) {
      console.error('Failed to refresh user data:', err);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateUser,
    updateUserProfile,
    error,
    clearError,
    refreshUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};