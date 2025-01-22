// import React from "react";
// import CarCard from "./ui/Carcard";
// import Koen from "../../../public/images/car.jpg";
// import Terols from "../../../public/images/Car(16).jpg";
// import Nissan from "../../../public/images/car(1).jpg";
// import Rolls from "../../../public/images/Car(2).jpg";
// import Rush from "../../../public/images/Car(17).jpg"
// import CR from "../../../public/images/Car(15).jpg";



// export const Recent: React.FC = () => {
//   const similarCars = [
//     {
//       name: "Koenigsegg",
//       type: "Sport",
//       image: Koen,
//       fuelCapacity: "90L",
//       transmission: "Manual",
//       capacity: "2 People",
//       price: 99.0,
//       isFavorite: true
//     },
//     {
//       name: "Nissan GT - R",
//       type: "Sport",
//       image: Nissan,
//       fuelCapacity: "80L",
//       transmission: "Manual",
//       capacity: "2 People",
//       price: 80.0,
//       discountedPrice: 100,
//       isFavorite: false
//     },
//     {
//       name: "Rolls - Royce",
//       type: "Sedan",
//       image: Rolls,
//       fuelCapacity: "70L",
//       transmission: "Manual",
//       capacity: "4 People",
//       price: 96.0,
//       isFavorite: true
//     },
//     {
//       name: "All New Rush",
//       type: "SUV",
//       image: Rush,
//       fuelCapacity: "70L",
//       transmission: "Manual",
//       capacity: "6 People",
//       price: 72.0,
//       favoriteIcon: "/images/red.png",
//       isFavorite: true, // Added isFavorite
//     },
//     {
//       name: "CR -V",
//       type: "SUV",
//       image: CR,
//       fuelCapacity: "80L",
//       transmission: "Manual",
//       capacity: "6 People",
//       price: 80.0,
//       favoriteIcon: "/images/heart.jpg",
//       isFavorite: false, // Added isFavorite
//     },
//     {
//       name: "All New Terlos",
//       type: "SUV",
//       image: Terols,
//       fuelCapacity: "90L",
//       transmission: "Manual",
//       capacity: "6 People",
//       price: 74.0,
//       favoriteIcon: "/images/red.png",
//       isFavorite: true, // Added isFavorite
//     },
//   ];

//   return (
//     <div className="w-full bg-[#F6F7F9] py-8">

//       {/* Header Section */}
//       <div className="flex justify-between items-center mb-5">
//         <h2 className="text-sm font-bold text-slate-400 ">Similar Cars</h2>
//         <button className="text-slate-400 text-sm font-bold hover:underline">
//           View All
//         </button>
//       </div>

//       {/* Card Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {similarCars.map((car, index) => (
//           <div 
//             key={index} 
            
//           >
//             <CarCard {...car} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Recent;

"use client"
import React, { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { AiFillHeart } from "react-icons/ai";
import { BsFuelPump, BsPeople } from "react-icons/bs";
import { PiSteeringWheel } from "react-icons/pi";
import Link from "next/link";
import Image from "next/image";

type CarCardProps = {
  id:number
  name: string;
  type: string;
  image: string;
  fuelCapacity: string;
  transmission: string;
  capacity: string;
  price: number;
  discountedPrice?: number;
  isFavorite: boolean;
};

const CarCard: React.FC<CarCardProps> = ({
  id,
  name,
  type,
  image,
  fuelCapacity,
  transmission,
  capacity,
  price,
  discountedPrice,
  isFavorite: initialFavorite,
}) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);

  return (
    <div className="bg-white rounded-[10px] p-5 w-full max-w-[380px] mx-auto flex flex-col">
      <div className="flex justify-between items-start h-[60px]">
        <div>
          <h3 className="text-[20px] font-semibold text-[#1A202C] leading-tight">{name}</h3>
          <p className="text-[14px] text-[#90A3BF] mt-1">{type}</p>
        </div>
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="mt-1"
        >
          <AiFillHeart
            className={`h-5 w-5 ${isFavorite ? "text-red-500" : "text-[#D7E5FF]"}`}
          />
        </button>
      </div>

      <div className="relative h-[110px] my-6">
        <Image
          src={image || "/placeholder.svg"}
          alt={`${name}`}
          layout="fill"
          className="object-contain"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="flex items-center space-x-6 mb-6 px-1">
        <div className="flex items-center gap-2 min-w-[60px]">
          <BsFuelPump className="text-[#90A3BF] w-4 h-4" />
          <span className="text-xs text-[#90A3BF]">{fuelCapacity}</span>
        </div>
        <div className="flex items-center gap-2 min-w-[60px]">
          <PiSteeringWheel className="text-[#90A3BF] w-4 h-4" />
          <span className="text-xs text-[#90A3BF]">{transmission}</span>
        </div>
        <div className="flex items-center gap-2 min-w-[60px]">
          <BsPeople className="text-[#90A3BF] w-4 h-4" />
          <span className="text-xs text-[#90A3BF]">{capacity}</span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span className="text-md font-semibold text-[#1A202C]">${price}</span>
            {/* <span className="text-[14px] text-[#90A3BF]">/day</span> */}
          </div>
          {discountedPrice && (
            <span className="text-xs text-[#90A3BF] mt-0.5">
              ${discountedPrice}
            </span>
          )}
        </div>
        {/* <Link href={`/detail/${id}`}>
          <button className="bg-[#3563E9] text-white px-4 py-[10px] rounded-[4px] text-[14px] font-medium hover:bg-blue-600 transition-colors">
            Rent Now
          </button>
        </Link> */}
         <Link href={`/detail/${id}`}>
          <button className="bg-[#3563E9] text-white px-5 py-2 rounded-[4px] text-[14px] font-semibold hover:bg-blue-600 transition-colors">
            Rent Now
          </button>
        </Link>
      </div>
    </div>
  );
};

const Recent: React.FC = () => {
  const [cars, setCars] = useState<CarCardProps[]>([]);

  useEffect(() => {
    const fetchCars = async () => {
      const carsData = await client.fetch(
        `*[_type == "cars" && "recent" in tags]{
        id,
          name,
          type,
          "image": image.asset->url,
          "fuelCapacity": fuel_capacity,
          "transmission": transmission,
          "capacity": seating_capacity,
          "price": price_per_day,
          "discountedPrice": original_price,
          "isFavorite": false
        }`
      );
      setCars(carsData);
    };
    fetchCars();
  }, []);

  return (
    <div className="w-full">
       <div className="flex justify-between items-center mb-5">
     <h2 className="text-sm font-bold text-slate-400 ">Similar Cars</h2>
<button className="text-slate-400 text-sm font-bold hover:underline">
      View All
      </button>
      
         </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cars.map((car) => (
          <CarCard key={car.name} {...car} />
        ))}
      </div>
    </div>
  );
};

export default Recent;
