// AuthProvider.tsx
import React, { createContext, useContext, useState } from 'react';

type AuthContextType = {
  user: any; // replace 'any' with your user data type
  token: string | undefined;
  login: (user: any, token: string | undefined) => void;
  logout: () => void;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | undefined>(undefined);

  const login = (userData: any, authToken: string | undefined) => {
    console.log("token stored")
    setUser(userData);
    setToken(authToken);
    console.log("token stored")
  };

  const logout = () => {
    setUser(null);
    setToken(undefined);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
