"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the interface for your context state
export interface NavbarContextProps {
  currentUrl: string;
  setCurrentUrl: (url: string) => void;
}

// Create the context with an initial value of null
const NavbarContext = createContext<NavbarContextProps | null>(null);

// Create a provider component
export const NavbarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentUrl, setCurrentUrl] = useState("/");

  return (
    <NavbarContext.Provider value={{ currentUrl, setCurrentUrl }}>
      {children}
    </NavbarContext.Provider>
  );
};

// Custom hook to use the Navbar context
export const useNavbar = (): NavbarContextProps => {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error("useNavbar must be used within a NavbarProvider");
  }
  return context;
};
