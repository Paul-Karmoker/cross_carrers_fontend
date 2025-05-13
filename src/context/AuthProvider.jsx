import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Base API configuration
  const api = axios.create({
    baseURL: 'http://localhost:4001',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // Check authentication on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await api.get('/auth/validate', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(response.data.user);
        }
      } catch (error) {
        console.error('Auth verification failed:', error);
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      
      if (!response.data.token || !response.data.user) {
        throw new Error('Invalid response from server');
      }

      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      toast.success('Login successful');
      navigate('/');
      
      return { success: true, user: response.data.user };
    } catch (error) {
      console.error('Login error:', error);
      
      let errorMessage = 'Login failed. Please try again.';
      if (error.response) {
        errorMessage = error.response.data?.message || 
                     error.response.data?.error || 
                     `Error: ${error.response.status}`;
      }

      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  // Signup function
  const signup = async (userData) => {
    try {
      const response = await api.post('/auth/signup', {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        referralCode: userData.referralCode || undefined // Send undefined if empty
      });

      if (!response.data.user) {
        throw new Error('Invalid response from server');
      }

      // If token is returned (optional)
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }

      setUser(response.data.user);
      toast.success('Signup successful!');
      
      return {
        success: true,
        user: response.data.user,
        message: response.data.message || 'Signup successful'
      };
    } catch (error) {
      console.error('Signup error:', error);
      
      let errorMessage = 'Signup failed. Please try again.';
      if (error.response) {
        errorMessage = error.response.data?.message || 
                      error.response.data?.error || 
                      `Error: ${error.response.status}`;
        
        // Handle specific error cases
        if (error.response.status === 409) {
          errorMessage = 'Email already exists';
        }
      }

      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.success('Logged out successfully');
    navigate('/');
  };

  // Token refresh function
  const refreshToken = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await api.get('/auth/refresh-token', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      localStorage.removeItem('token');
      setUser(null);
    }
  };

  // Set up token refresh interval
  useEffect(() => {
    const intervalId = setInterval(refreshToken, 1000 * 60 * 10); // Refresh every 10 minutes
    return () => clearInterval(intervalId);
  }, []);

  // Memoized context value
  const value = useMemo(() => ({
    user,
    loading,
    isAuthenticated: !!user,
    login,
    signup,
    logout
  }), [user, loading]);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;