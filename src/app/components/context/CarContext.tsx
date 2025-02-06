"use client";
import React, { createContext, useState, ReactNode } from "react";

export interface Car {
  id: number;
  name: string;
  type: string;
  image: string;
  image_1: string;
  image_2: string;
  image_3: string;
  fuelCapacity: string;
  transmission: string;
  capacity: string;
  price: number;
  discountedPrice?: number;
  isFavorite: boolean;
  description: string;
}

interface CarContextProps {
  car: Car | null;
  setCar: (car: Car) => void;
}

export const CarContext = createContext<CarContextProps | undefined>(undefined);

export const CarProvider = ({ children }: { children: ReactNode }) => {
  const [car, setCar] = useState<Car | null>(null);

  return (
    <CarContext.Provider value={{ car, setCar }}>
      {children}
    </CarContext.Provider>
  );
};