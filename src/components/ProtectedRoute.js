// components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from 'services/authentification/authService';

const ProtectedRoute = ({ element }) => {
  const user = AuthService.getCurrentUser();
  if (!user) {
    // Rediriger vers la page de login si l'utilisateur n'est pas connecté
    return <Navigate to="/" />;
  }
  // Rendre la route protégée si l'utilisateur est connecté
  return element;
};
// Validation des props
ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,  // Valider que `element` est un composant React
};

export default ProtectedRoute;
