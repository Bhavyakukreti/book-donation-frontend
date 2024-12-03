import React, { createContext, useState, useContext } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component to provide auth context values
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // Example user state (can be updated based on your auth logic)

  const login = (userData) => {
    setUser(userData);  // Update user state on login
  };

  const logout = () => {
    setUser(null);  // Clear user state on logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
