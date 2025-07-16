import React, { createContext, useContext, useState, useEffect } from 'react';
import { Staff, StaffRole } from '../types/hotel';

interface AuthContextType {
  currentStaff: Staff | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock staff data
const mockStaff: Staff[] = [
  {
    id: 'staff-1',
    name: 'Sarah Johnson',
    email: 'sarah@grandhotel.com',
    role: 'receptionist',
    isActive: true,
  },
  {
    id: 'staff-2',
    name: 'Marco Rodriguez',
    email: 'marco@grandhotel.com',
    role: 'kitchen',
    isActive: true,
  },
  {
    id: 'staff-3',
    name: 'Emily Chen',
    email: 'emily@grandhotel.com',
    role: 'waiter',
    isActive: true,
  },
];

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStaff, setCurrentStaff] = useState<Staff | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const savedStaff = localStorage.getItem('currentStaff');
    if (savedStaff) {
      setCurrentStaff(JSON.parse(savedStaff));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find staff member by email
    const staff = mockStaff.find(s => s.email === email && s.isActive);
    
    // Simple password check (in real app, this would be secure)
    if (staff && password === 'hotel123') {
      setCurrentStaff(staff);
      localStorage.setItem('currentStaff', JSON.stringify(staff));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setCurrentStaff(null);
    localStorage.removeItem('currentStaff');
  };

  return (
    <AuthContext.Provider value={{ currentStaff, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};