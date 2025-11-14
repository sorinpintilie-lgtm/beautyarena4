import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('beautyarena-user', null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!user);
  }, [user]);

  // Login function (mock implementation)
  const login = async (email, password) => {
    try {
      // Mock login - in real app, this would call an API
      if (email && password) {
        const mockUser = {
          id: Date.now(),
          email,
          name: email.split('@')[0],
          createdAt: new Date().toISOString(),
        };
        
        setUser(mockUser);
        toast.success('Autentificare reușită!');
        return { success: true, user: mockUser };
      }
      
      throw new Error('Email și parolă sunt obligatorii');
    } catch (error) {
      toast.error(error.message || 'Eroare la autentificare');
      return { success: false, error: error.message };
    }
  };

  // Register function (mock implementation)
  const register = async (name, email, password) => {
    try {
      // Mock registration - in real app, this would call an API
      if (name && email && password) {
        const mockUser = {
          id: Date.now(),
          name,
          email,
          createdAt: new Date().toISOString(),
        };
        
        setUser(mockUser);
        toast.success('Cont creat cu succes!');
        return { success: true, user: mockUser };
      }
      
      throw new Error('Toate câmpurile sunt obligatorii');
    } catch (error) {
      toast.error(error.message || 'Eroare la înregistrare');
      return { success: false, error: error.message };
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    toast.success('Deconectare reușită');
  };

  // Update user profile
  const updateProfile = (updates) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      toast.success('Profil actualizat');
      return { success: true, user: updatedUser };
    }
    return { success: false, error: 'Nu ești autentificat' };
  };

  const value = {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;