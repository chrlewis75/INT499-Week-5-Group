import React from 'react';
import { useAuth } from '../context/AuthContext'; // Import useAuth to get auth state
import { Navigate } from 'react-router-dom'; // Import Navigate for redirection

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Check authentication status

  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If authenticated, render the child component
  return children;
};

export default ProtectedRoute;
