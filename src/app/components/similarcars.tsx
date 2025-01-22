// // "use client"

// // import type React from "react"
// // import { useEffect, useState } from "react"
// // import Link from "next/link"
// // import Image from "next/image"
// // import { AiFillHeart } from "react-icons/ai"
// // import { BsFuelPump, BsPeople } from "react-icons/bs"
// // import { PiSteeringWheel } from "react-icons/pi"
// // import { client } from "@/sanity/lib/client"

// // type CarCardProps = {
// //   name: string
// //   type: string
// //   image: string
// //   fuelCapacity: string
// //   transmission: string
// //   capacity: string
// //   price: number
// //   discountedPrice?: number
// //   isFavorite: boolean
// // }

// // const CarCard: React.FC<CarCardProps> = ({
// //   name,
// //   type,
// //   image,
// //   fuelCapacity,
// //   transmission,
// //   capacity,
// //   price,
// //   discountedPrice,
// //   isFavorite: initialFavorite,
// // }) => {
// //   const [isFavorite, setIsFavorite] = useState(initialFavorite)

// //   return (
// //     <div className="bg-white rounded-[10px] p-4 hover:shadow-md transition-shadow duration-200">
// //       <div className="flex justify-between items-start mb-4">
// //         <div>
// //           <h3 className="text-[20px] font-semibold text-[#1A202C]">{name}</h3>
// //           <p className="text-[14px] text-[#90A3BF]">{type}</p>
// //         </div>
// //         <button onClick={() => setIsFavorite(!isFavorite)} className="p-1 hover:opacity-80 transition-opacity">
// //           <AiFillHeart className={`h-5 w-5 ${isFavorite ? "text-red-500" : "text-[#D7E5FF]"}`} />
// //         </button>
// //       </div>

// //       <div className="relative h-[140px] my-6">
// //         <Image
// //           src={image || "/placeholder.svg"}
// //           alt={`${name} car`}
// //           fill
// //           className="object-contain"
// //           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
// //         />
// //       </div>

// //       <div className="grid grid-cols-3 gap-4 mb-6">
// //         <div className="flex items-center gap-2">
// //           <BsFuelPump className="text-[#90A3BF] w-4 h-4" />
// //           <span className="text-sm text-[#90A3BF]">{fuelCapacity}</span>
// //         </div>
// //         <div className="flex items-center gap-2">
// //           <PiSteeringWheel className="text-[#90A3BF] w-4 h-4" />
// //           <span className="text-sm text-[#90A3BF]">{transmission}</span>
// //         </div>
// //         <div className="flex items-center gap-2">
// //           <BsPeople className="text-[#90A3BF] w-4 h-4" />
// //           <span className="text-sm text-[#90A3BF]">{capacity}</span>
// //         </div>
// //       </div>

// //       <div className="flex justify-between items-end">
// //         <div>
// //           <div className="flex items-baseline gap-1">
// //             <span className="text-[18px] font-semibold text-[#1A202C]">${price}</span>
// //             <span className="text-[14px] text-[#90A3BF]">/day</span>
// //           </div>
// //           {discountedPrice && <p className="text-[14px] text-[#90A3BF] line-through">${discountedPrice}</p>}
// //         </div>
// //         <Link href="/detail">
// //           <button className="bg-[#3563E9] text-white px-5 py-2 rounded-[4px] text-[14px] font-semibold hover:bg-blue-600 transition-colors">
// //             Rent Now
// //           </button>
// //         </Link>
// //       </div>
// //     </div>
// //   )
// // }

// // const SimilarCar: React.FC = () => {
// //   const [cars, setCars] = useState<CarCardProps[]>([])

// //   useEffect(() => {
// //     const fetchCars = async () => {
// //       const carsData = await client.fetch(`*[_type == "cars" && "showmore" in tags]{
// //         name,
// //         type,
// //         "image": image.asset->url,
// //         "fuelCapacity": fuel_capacity,
// //         "transmission": transmission,
// //         "capacity": seating_capacity,
// //         "price": price_per_day,
// //         "discountedPrice": original_price,
// //         "isFavorite": false
// //       }`)
// //       setCars(carsData)
// //     }
// //     fetchCars()
// //   }, [])

// //   return (
// //     <section className="p-6 bg-gray-50">
// //       <div className="max-w-7xl mx-auto">
// //         <div className="flex justify-between items-center mb-8">
// //           {/* <h5 className="text-md font-bold text-[#aeafb3]">Recommended Cars</h5> */}
// //           {/* <button className="text-[#3563E9] text-sm font-semibold hover:underline">View All</button> */}
// //          </div>
// //          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// //           {cars.map((car) => (
// //             <CarCard key={car.name} {...car} />
// //           ))}
            
// //         </div>
// //       </div>
// //     </section>
// //   )
// // }

// // // export default SimilarCar
// "use client"

// import type React from "react"
// import { useEffect, useState } from "react"
// import Link from "next/link"
// import Image from "next/image"
// import { AiFillHeart } from "react-icons/ai"
// import { BsFuelPump, BsPeople } from "react-icons/bs"
// import { PiSteeringWheel } from "react-icons/pi"
// import { client } from "@/sanity/lib/client"

// type CarCardProps = {
//   name: string
//   type: string
//   image: string
//   fuelCapacity: string
//   transmission: string
//   capacity: string
//   price: number
//   discountedPrice?: number
//   isFavorite: boolean
// }

// const CarCard: React.FC<CarCardProps> = ({
//   name,
//   type,
//   image,
//   fuelCapacity,
//   transmission,
//   capacity,
//   price,
//   discountedPrice,
//   isFavorite: initialFavorite,
// }) => {
//   const [isFavorite, setIsFavorite] = useState(initialFavorite)

//   return (
//     <div className="bg-white rounded-[10px] p-5">
//       <div className="flex justify-between items-start">
//         <div>
//           <h3 className="text-[20px] font-semibold text-[#1A202C]">{name}</h3>
//           <p className="text-[14px] text-[#90A3BF] mt-1">{type}</p>
//         </div>
//         <button 
//           onClick={() => setIsFavorite(!isFavorite)} 
//           className="mt-1"
//         >
//           <AiFillHeart 
//             className={`h-5 w-5 ${isFavorite ? "text-red-500" : "text-[#D7E5FF]"}`} 
//           />
//         </button>
//       </div>

//       <div className="relative h-[120px] my-8">
//         <Image
//           src={image || "/placeholder.svg"}
//           alt={`${name}`}
//           fill
//           className="object-contain"
//           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//         />
//       </div>

//       <div className="flex items-center justify-start gap-4 mb-6">
//         <div className="flex items-center gap-2">
//           <BsFuelPump className="text-[#90A3BF] w-4 h-4" />
//           <span className="text-sm text-[#90A3BF]">{fuelCapacity}</span>
//         </div>
//         <div className="flex items-center gap-2">
//           <PiSteeringWheel className="text-[#90A3BF] w-4 h-4" />
//           <span className="text-sm text-[#90A3BF]">{transmission}</span>
//         </div>
//         <div className="flex items-center gap-2">
//           <BsPeople className="text-[#90A3BF] w-4 h-4" />
//           <span className="text-sm text-[#90A3BF]">{capacity}</span>
//         </div>
//       </div>

//       <div className="flex justify-between items-center">
//         <div>
//           <div className="flex items-center gap-1">
//             <span className="text-[18px] font-semibold text-[#1A202C]">${price}</span>
//             <span className="text-[14px] text-[#90A3BF]">/day</span>
//           </div>
//           {discountedPrice && (
//             <span className="text-[14px] text-[#90A3BF] block">
//               ${discountedPrice}
//             </span>
//           )}
//         </div>
//         <Link href="/detail">
//           <button className="bg-[#3563E9] text-white px-4 py-2 rounded-[4px] text-[14px] font-medium hover:bg-blue-600 transition-colors">
//             Rent Now
//           </button>
//         </Link>
//       </div>
//     </div>
//   )
// }

// const SimilarCar: React.FC = () => {
//   const [cars, setCars] = useState<CarCardProps[]>([])

//   useEffect(() => {
//     const fetchCars = async () => {
//       const carsData = await client.fetch(`*[_type == "cars" && "showmore" in tags]{
//         name,
//         type,
//         "image": image.asset->url,
//         "fuelCapacity": fuel_capacity,
//         "transmission": transmission,
//         "capacity": seating_capacity,
//         "price": price_per_day,
//         "discountedPrice": original_price,
//         "isFavorite": false
//       }`)
//       setCars(carsData)
//     }
//     fetchCars()
//   }, [])

//   return (
//     <div className="w-full">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {cars.map((car) => (
//           <CarCard key={car.name} {...car} />
//         ))}
//       </div>
//     </div>
//   )
// }

// // export default SimilarCar
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

const SimilarCar: React.FC = () => {
  const [cars, setCars] = useState<CarCardProps[]>([]);

  useEffect(() => {
    const fetchCars = async () => {
      const carsData = await client.fetch(
        `*[_type == "cars" && "showmore" in tags]{
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cars.map((car) => (
          <CarCard key={car.name} {...car} />
        ))}
      </div>
    </div>
  );
};

export default SimilarCar;
