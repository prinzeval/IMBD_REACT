"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CountryContextType {
  selectedCountry: string;
  updateCountry: (countryCode: string) => void;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export const useCountry = () => {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error('useCountry must be used within a CountryProvider');
  }
  return context;
};

export const CountryProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCountry, setSelectedCountry] = useState('US');

  useEffect(() => {
    // Load saved country from localStorage
    if (typeof window !== 'undefined') {
      const savedCountry = localStorage.getItem('selectedCountry');
      if (savedCountry) {
        setSelectedCountry(savedCountry);
      }
    }
  }, []);

  const updateCountry = (countryCode: string) => {
    setSelectedCountry(countryCode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedCountry', countryCode);
    }
  };

  const value = {
    selectedCountry,
    updateCountry,
  };

  return (
    <CountryContext.Provider value={value}>
      {children}
    </CountryContext.Provider>
  );
};

