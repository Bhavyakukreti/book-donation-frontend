import React from 'react';
import { Navigate, Route } from 'react-router-dom';

const PrivateRoute = ({ element, ...rest }) => {
  // Check if the JWT token exists in localStorage
  const token = localStorage.getItem('token');
  if (!token) {
    // If no token, redirect to login page
    return <Navigate to="/login" />;
  }

  // If token exists, allow access to the main page
  return <Route {...rest} element={element} />;
};

export default PrivateRoute;
