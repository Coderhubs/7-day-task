"use client";

import React from "react";
import FilterSidebar from "../../components/Sidebar";
import Booking from "../../components/Booking";
import CarCard from "../../components/ui/Carcard";
import Button from "../../components/Button";
import Koen from "../../../../public/images/car.jpg";
import Rush from "../../../../public/images/car(17).jpg";
import CR from "../../../../public/images/car(15).jpg";
import Terols from "../../../../public/images/car(16).jpg";
import MG from "../../../../public/images/Car(15).jpg"
import Nissan from "../../../../public/images/car(1).jpg"
import Rolls from "../../../../public/images/car(2).jpg";


const carData = [
  {
    name: "Koenigsegg",
    type: "Sport",
    image: Koen,
    fuelCapacity: "90L",
    transmission: "Manual",
    capacity: "2 People",
    price: 99.0,
    favoriteIcon: "/images/red.png",
    isFavorite: true, // Added isFavorite
  },
  {
    name: "Nissan GT - R",
    type: "Sport",
    image: Nissan,
    fuelCapacity: "80L",
    transmission: "Manual",
    capacity: "2 People",
    price: 80.0,
    discountedPrice: 100,
    favoriteIcon: "/images/heart.jpg",
    isFavorite: false, // Added isFavorite
  },
  {
    name: "Rolls - Royce",
    type: "Sedan",
    image: Rolls,
    fuelCapacity: "70L",
    transmission: "Manual",
    capacity: "4 People",
    price: 96.0,
    favoriteIcon: "/images/red.png",
    isFavorite: true, // Added isFavorite
  },
  {
    name: "All New Rush",
    type: "SUV",
    image: Rush,
    fuelCapacity: "70L",
    transmission: "Manual",
    capacity: "6 People",
    price: 72.0,
    favoriteIcon: "/images/red.png",
    isFavorite: true, // Added isFavorite
  },
  {
    name: "CR -V",
    type: "SUV",
    image: CR,
    fuelCapacity: "80L",
    transmission: "Manual",
    capacity: "6 People",
    price: 80.0,
    favoriteIcon: "/images/heart.jpg",
    isFavorite: false, // Added isFavorite
  },
  {
    name: "All New Terlos",
    type: "SUV",
    image: Terols,
    fuelCapacity: "90L",
    transmission: "Manual",
    capacity: "6 People",
    price: 74.0,
    favoriteIcon: "/images/red.png",
    isFavorite: true, // Added isFavorite
  },
  {
    name: "MG ZX Exclusive",
    type: "Hatchback",
    image: MG,
    fuelCapacity: "90L",
    transmission: "Manual",
    capacity: "2 People",
    price: 99.0,
    favoriteIcon: "/images/red.png",
    isFavorite: true, // Added isFavorite
  },
  {
    name: "Nissan GT - R",
    type: "Sport",
    image: Nissan,
    fuelCapacity: "90L",
    transmission: "Manual",
    capacity: "2 People",
    price: 80.00,
    discountedPrice: 100,
    favoriteIcon: "/images/heart.jpg",
    isFavorite: true,
  },
  {
    name: "MG ZX Exclusive",
    type: "Hatchback",
    image: MG,
    fuelCapacity: "90L",
    transmission: "Manual",
    capacity: "2 People",
    price: 99.00,
    favoriteIcon: "/images/red.png",
    isFavorite: true,
  },
];

const Page = () => {
  return (
    <div className="flex">
      <FilterSidebar />
      <div className="flex flex-col flex-grow p-6">
        <Booking />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {carData.map((car, index) => (
            <CarCard key={index} {...car} />
          ))}
        </div>
        <Button />
      </div>
    </div>
  );
};

export default Page;
