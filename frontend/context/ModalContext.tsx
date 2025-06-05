"use client";
import { createContext, useContext, useState } from 'react';

const ModalContext = createContext({
  isDetailOpen: false,
  setIsDetailOpen: (isOpen: boolean) => {}
});

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  
  return (
    <ModalContext.Provider value={{ isDetailOpen, setIsDetailOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);