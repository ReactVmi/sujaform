// context/AuthContext.js

import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie'; 
import decodeToken from "jwt-decode";
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {

  const [userRole, setUserRole] = useState('user'); // Set the default role to 'user'
  const [authUser, seauthUser] = useState(); // Set the default role to 'user'
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserRole('user'); // Reset the role on logout
  };
  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken) {
        setUserRole(decodedToken.role);
        seauthUser(decodedToken);
        setIsLoggedIn(true);
      }
    }
    else
    {
        logout()
    }
  }, []);
  return (
    <AuthContext.Provider value={{ userRole, isLoggedIn, authUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
