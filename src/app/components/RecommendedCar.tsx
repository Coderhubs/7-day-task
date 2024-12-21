import React from "react"
import CarCard from "./ui/Carcard"
import Button from "./Button"
import Tesla from "../../../public/images/Car(13).jpg";
import Ford from "../../../public/images/Car(14).jpg";
import BMW from "../../../public/images/Car(15).jpg";
import Audi from "../../../public/images/Car(16).jpg";
import Mercedes from "../../../public/images/Car(17).jpg";
import Porsche from "../../../public/images/Car(18).jpg";
import chevrolet from "../../../public/images/Car(19).jpg";
import Altima from "../../../public/images/Car(20).jpg";



export const RecommendedCar: React.FC = () => {
  const cars = [
    {
      name: "Tesla Model 3",
      type: "Electric",
      image: Tesla,
      fuelCapacity: "100kWh",
      transmission: "Manual",
      capacity: "5 seats",
      price: 100,
      favoriteIcon: "/images/heart.jpg",
      isFavorite: true,
    },
    {
      name: "Ford Mustang",
      type: "Gasoline",
      image: Ford,
      fuelCapacity: "60 L",
      transmission: "Manual",
      capacity: "4 seats",
      price: 80,
      favoriteIcon: "/images/red.png",
      isFavorite: true,
    },
    {
      name: "BMW X5",
      type: "Diesel",
      image: BMW,
      fuelCapacity: "70L",
      transmission: "Manual",
      capacity: "7 seats",
      price: 150,
      favoriteIcon: "/images/heart.jpg",
      isFavorite: true,
    },
    {
      name: "Audi A6",
      type: "Hybrid",
      image: Audi,
      fuelCapacity: "50L",
      transmission: "Manual",
      capacity: "5 seats",
      price: 120,
      favoriteIcon: "/images/red.png",
      isFavorite: true,
    },
    {
      name: "Mercedes-Benz C-Class",
      type: "Mercedes",
      image: Mercedes,
      fuelCapacity: "65L",
      transmission: "Manual",
      capacity: "5 seats",
      price: 140,
      favoriteIcon: "/images/heart.jpg",
      isFavorite: true,
    },
    {
      name: "Porsche 911",
      type: "Gasoline",
      image: Porsche,
      fuelCapacity: "60L",
      transmission: "Manual",
      capacity: "4 seats",
      price: 200,
      favoriteIcon: "/images/red.png",
      isFavorite: true,
    },
    {
      name: "Chevrolet Camaro",
      type: "Gasoline",
      image: chevrolet,
      fuelCapacity: "70 L",
      transmission: "Manual",
      capacity: "4 seats",
      price: 110,
      isFavorite: true,
        },
    {
      name: "Nissan Altima",
      type: "Hybrid",
      image: Altima,
      fuelCapacity: "50L",
      transmission: "Manual",
      capacity: "5 seats",
      price: 90,
      favoriteIcon: "/images/red.png",
      isFavorite: true,
    },
  ]

  return (
    <div className="p-6 bg-gray-100 md:p-10">
      <h2 className="text-lg font-semibold text-slate-500 text-left mb-8 md:text-xl">
        Recommended Car
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {cars.map((car, index) => (
          <CarCard key={index} {...car} />
        ))}
      </div>
      <Button />
    </div>
  )
}

export default RecommendedCar
