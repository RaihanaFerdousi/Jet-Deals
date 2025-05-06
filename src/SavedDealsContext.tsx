import React, { createContext, useContext, useState } from "react";

interface Ticket {
  origin: string;
  destination: string;
  price: number;
  dateRange: string;
  airline: string;
  score: string;
  travelTips?: string[];
}

interface SavedDealsContextType {
  savedDeals: Ticket[];
  saveDeal: (deal: Ticket) => void;
  deleteDeal: (deal: Ticket) => void; // Add the deleteDeal function here
}

const SavedDealsContext = createContext<SavedDealsContextType | undefined>(undefined);

export const useSavedDeals = (): SavedDealsContextType => {
  const context = useContext(SavedDealsContext);
  if (!context) {
    throw new Error("useSavedDeals must be used within a SavedDealsProvider");
  }
  return context;
};

export const SavedDealsProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [savedDeals, setSavedDeals] = useState<Ticket[]>([]);

  const saveDeal = (deal: Ticket) => {
    setSavedDeals((prevDeals) => [...prevDeals, deal]);
  };

  const deleteDeal = (deal: Ticket) => {
    setSavedDeals((prevDeals) => prevDeals.filter(d => d.origin !== deal.origin || d.destination !== deal.destination || d.price !== deal.price));
  };

  return (
    <SavedDealsContext.Provider value={{ savedDeals, saveDeal, deleteDeal }}>
      {children}
    </SavedDealsContext.Provider>
  );
};
