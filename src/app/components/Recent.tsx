import React from "react";
import CarCard from "./ui/Carcard";
import Koen from "../../../public/images/car.jpg";
import Terols from "../../../public/images/Car(16).jpg";
import Nissan from "../../../public/images/car(1).jpg";
import Rolls from "../../../public/images/Car(2).jpg";
import Rush from "../../../public/images/Car(17).jpg"
import CR from "../../../public/images/Car(15).jpg";



export const Recent: React.FC = () => {
  const similarCars = [
    {
      name: "Koenigsegg",
      type: "Sport",
      image: Koen,
      fuelCapacity: "90L",
      transmission: "Manual",
      capacity: "2 People",
      price: 99.0,
      isFavorite: true
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
      isFavorite: false
    },
    {
      name: "Rolls - Royce",
      type: "Sedan",
      image: Rolls,
      fuelCapacity: "70L",
      transmission: "Manual",
      capacity: "4 People",
      price: 96.0,
      isFavorite: true
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
  ];

  return (
    <div className="w-full bg-[#F6F7F9] py-8">

      {/* Header Section */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-sm font-bold text-slate-400 ">Similar Cars</h2>
        <button className="text-slate-400 text-sm font-bold hover:underline">
          View All
        </button>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {similarCars.map((car, index) => (
          <div 
            key={index} 
            
          >
            <CarCard {...car} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recent;

