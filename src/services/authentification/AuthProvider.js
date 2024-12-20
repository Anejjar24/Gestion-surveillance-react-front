import React, { createContext, useState, useContext, useEffect } from 'react';
import { AuthService } from "services/authentification/authService";
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = () => {
      const currentUser = AuthService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        AuthService.initializeAuth();
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    const response = await AuthService.login(email, password);
    setUser(response);
    return response;
  };

  const signup = async (email, password) => {
    const response = await AuthService.signup(email, password);
    return response;
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

// Ajout de la validation des props
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé à l intérieur d un AuthProvider');
  }
  return context;
};

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return children;
};

// Ajout de la validation des props pour ProtectedRoute
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};