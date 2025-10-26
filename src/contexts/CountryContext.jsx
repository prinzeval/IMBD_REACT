import React, { createContext, useContext, useState, useEffect } from 'react';

const CountryContext = createContext();

export const useCountry = () => {
    const context = useContext(CountryContext);
    if (!context) {
        throw new Error('useCountry must be used within a CountryProvider');
    }
    return context;
};

export const CountryProvider = ({ children }) => {
    const [selectedCountry, setSelectedCountry] = useState('US');

    useEffect(() => {
        // Load saved country from localStorage
        const savedCountry = localStorage.getItem('selectedCountry');
        if (savedCountry) {
            setSelectedCountry(savedCountry);
        }
    }, []);

    const updateCountry = (countryCode) => {
        setSelectedCountry(countryCode);
        localStorage.setItem('selectedCountry', countryCode);
    };

    const value = {
        selectedCountry,
        updateCountry
    };

    return (
        <CountryContext.Provider value={value}>
            {children}
        </CountryContext.Provider>
    );
};
