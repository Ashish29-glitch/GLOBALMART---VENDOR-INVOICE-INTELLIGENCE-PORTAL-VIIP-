'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Country, COUNTRIES } from '@/lib/mockData';

interface User {
  id: string;
  email: string;
  name: string;
  isGuest: boolean;
}

interface AppContextType {
  user: User | null;
  selectedCountry: Country;
  setSelectedCountry: (country: Country) => void;
  login: (email: string, password: string) => void;
  loginAsGuest: () => void;
  logout: () => void;
  isCountryModalOpen: boolean;
  setIsCountryModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);
  const [isCountryModalOpen, setIsCountryModalOpen] = useState(false);

  const login = (email: string, _password: string) => {
    setUser({ id: '1', email, name: email.split('@')[0], isGuest: false });
  };

  const loginAsGuest = () => {
    setUser({ id: 'guest-' + Date.now(), email: 'guest@globalmart.com', name: 'Guest User', isGuest: true });
  };

  const logout = () => setUser(null);

  return (
    <AppContext.Provider value={{ user, selectedCountry, setSelectedCountry, login, loginAsGuest, logout, isCountryModalOpen, setIsCountryModalOpen }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}