
"use client"
import { createContext, useContext, useState } from "react";

interface ModalContextType {
  isDetailOpen: boolean;
  selectedTourId: number | null;
  openDetail: (id: number) => void;
  closeDetail: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDetailOpen, setDetailOpen] = useState(false);
  const [selectedTourId, setSelectedTourId] = useState<number | null>(null);

  const openDetail = (id: number) => {
    setSelectedTourId(id);
    setDetailOpen(true);
  };

  const closeDetail = () => {
    setSelectedTourId(null);
    setDetailOpen(false);
  };

  return (
    <ModalContext.Provider value={{ isDetailOpen, selectedTourId, openDetail, closeDetail }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within ModalProvider");
  return context;
};
