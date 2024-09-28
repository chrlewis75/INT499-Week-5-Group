import { createContext, useContext, useState, useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Create AuthContext
const AuthContext = createContext();

// AuthProvider component to provide authentication context
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // State to hold user information

  useEffect(() => {
    // Check localStorage for user and authentication state on app load
    const storedUser = localStorage.getItem('user');
    const storedAuth = localStorage.getItem('isAuthenticated');

    if (storedUser && storedAuth === 'true') {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData); // Set user data upon successful login
    localStorage.setItem('isAuthenticated', true);
    localStorage.setItem('user', JSON.stringify(userData)); // Save user data to localStorage
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null); // Clear user data on logout
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user'); // Remove user data from localStorage
  };

  return (
    <GoogleOAuthProvider clientId="572512769720-addm2mqa7gl5qj2qmt4rugh2vpo1o278.apps.googleusercontent.com">
      <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
        {children}
      </AuthContext.Provider>
    </GoogleOAuthProvider>
  );
};

// Export the context and a custom hook to use it
export const useAuth = () => useContext(AuthContext);
export const AuthContextValue = AuthContext; // Not typically needed, but can be useful
