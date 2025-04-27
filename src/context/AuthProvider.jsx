import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:4001/user/validate', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(response.data.user);
        }
      } catch (error) {
        console.error('Auth verification failed:', error);
        // localStorage.removeItem('token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:4001/user/login', {
        email,
        password
      }, {
        withCredentials: true
      });


      // Make sure the response contains what you expect
      if (!response.data.token || !response.data.user) {
        throw new Error('Invalid response structure from server');
      }

      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      navigate('/');
      return { success: true };
    } catch (error) {
      console.error('Detailed login error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        stack: error.stack
      });

      return {
        success: false,
        message: error.response?.data?.message ||
          error.response?.data?.error ||
          'Login failed. Please try again.'
      };
    }
  };

  const signup = async (userData) => {
    try {
      const response = await axios.post('http://localhost:4001/user/signup', userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Modified to match your backend response structure
      if (!response.data.user) {
        throw new Error('Invalid response from server');
      }

      // Optional: If you add token later
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }

      setUser(response.data.user);
      // navigate('/signin');

      return {
        success: true,
        user: response.data.user,
        message: response.data.message || 'Signup successful'
      };

    } catch (error) {
      console.error('Signup error:', error);

      // Clear auth state on error
      // localStorage.removeItem('token');
      // setUser(null);

      // Enhanced error message handling
      let errorMessage = 'Signup failed. Please try again.';

      if (error.response) {
        // Handle HTTP errors (4xx, 5xx)
        errorMessage = error.response.data?.message ||
          error.response.statusText ||
          `Server error (${error.response.status})`;
      } else if (error.request) {
        // The request was made but no response received
        errorMessage = 'Network error - no response from server';
      }

      return {
        success: false,
        message: errorMessage
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  const refresh_token = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.get('http://localhost:4001/user/refresh-token', {
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

  useEffect(() => {
    const intervalId = setInterval(refresh_token, 1000 * 60 * 10); // Refresh token every 10 minutes
    return () => clearInterval(intervalId);
  }, []);

  const value = useMemo(() => ({
    user,
    loading,
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
