// context/FilterContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the type for the filter state
interface FilterContextType {
  selectedFilters: { [key: string]: string[] | number[] }; // Updated to allow number[] for price
  setSelectedFilters: React.Dispatch<React.SetStateAction<{ [key: string]: string[] | number[] }>>; // Updated here as well
}

// Create the context with a default value of undefined
const FilterContext = createContext<FilterContextType | undefined>(undefined);

// Define the FilterProvider component
export const FilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize the state with the correct type
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] | number[] }>({
    type: [],
    capacity: [],
    price: [100], // Now this can stay as a number array
  });

  // Provide the state and updater function to the context
  return (
    <FilterContext.Provider value={{ selectedFilters, setSelectedFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

// Custom hook to use the filter context
export const useFilter = (): FilterContextType => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};
