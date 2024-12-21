import React from "react"
import CarCard from "./ui/Carcard";
import Koen from "../../../public/images/car.jpg";
import Nissan from "../../../public/images/car(1).jpg";
import Rolls from "../../../public/images/Car(2).jpg"



export const PopularCar: React.FC = () => {
  const popularCars = [
    {
      name: "Koenigsegg",
      type: "Sport",
      image: Koen,
      fuelCapacity: "90L",
      transmission: "Manual",
      capacity: "2 People",
      price: 99,
      isFavorite: true,
    },
    {
      name: "Nissan GT - R",
      type: "Sport",
      image: Nissan,
      fuelCapacity: "80L",
      transmission: "Manual",
      capacity: "2 People",
      price: 80,
      discountedPrice: 100,
      isFavorite: false,
    },
    {
      name: "Rolls - Royce",
      type: "Sedan",
      image: Rolls,
      fuelCapacity: "70L",
      transmission: "Manual",
      capacity: "4 People",
      price: 96,
      isFavorite: true,
    },
    {
      name: "Nissan GT - R",
      type: "Sport",
      image: Nissan,
      fuelCapacity: "80L",
      transmission: "Manual",
      capacity: "2 People",
      price: 80,
      discountedPrice: 100,
      isFavorite: false,
    },
  ]

  return (
    <div className="p-6 bg-gray-100 md:p-10">
      <div className="flex justify-between items-center mb-8">

        <h2 className="text-[20px] font-bold text-[#1A202C]">Popular Cars</h2>

        <button className="text-[#3563E9] text-sm font-semibold hover:underline">
          View All
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {popularCars.map((car, index) => (
          <CarCard key={index} {...car} />
        ))}
      </div>
    </div>
  )
}

export default PopularCar