import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Staff } from '../types/hotel';

interface AuthContextType {
  currentStaff: Staff | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStaff, setCurrentStaff] = useState<Staff | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentStaff(JSON.parse(user));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/login', {
        email,
        password,
      });

      const { token, user } = res.data;

      // Save to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      setCurrentStaff(user);
      return true;
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setCurrentStaff(null);
  };

  return (
    <AuthContext.Provider value={{ currentStaff, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
