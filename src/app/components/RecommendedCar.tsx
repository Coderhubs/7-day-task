"use client"

import  React from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import Button from "./Button"
import { AiFillHeart } from "react-icons/ai"
import { BsFuelPump, BsPeople } from "react-icons/bs"
import { PiSteeringWheel } from "react-icons/pi"
import { client } from "@/sanity/lib/client"
import { useSearch } from "../components/context/SearchContext";
import { motion } from 'framer-motion';
import { useFavoriteStore } from '@/app/store/favoriteStore';


type CarCardProps = {
  id: number
  name: string
  type: string
  image: string
  fuelCapacity: string
  transmission: string
  capacity: string
  price: number
  discountedPrice?: number
  isFavorite: boolean
}

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
  const { addFavorite, removeFavorite, isFavorite } = useFavoriteStore();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFavoriteClick = () => {
    setIsAnimating(true);
    if (isFavorite(id)) {
      removeFavorite(id);
    } else {
      addFavorite({
        id,
        name,
        type,
        image,
        fuelCapacity,
        transmission,
        capacity,
        price,
        discountedPrice,
      });
    }
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div className="bg-white rounded-[10px] p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-[20px] font-semibold text-[#1A202C]">{name}</h3>
          <p className="text-[14px] text-[#90A3BF]">{type}</p>
          <p className="text-[14px] text-[#90A3BF] mt-1">Type &quot;A&quot; car</p>
        </div>
        <motion.button
          onClick={handleFavoriteClick}
          whileTap={{ scale: 0.9 }}
          className="p-1 hover:opacity-80 transition-opacity"
        >
          <motion.div
            animate={isAnimating ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <AiFillHeart 
              className={`h-5 w-5 ${
                isFavorite(id) ? "text-red-500" : "text-[#D7E5FF]"
              }`} 
            />
          </motion.div>
        </motion.button>
      </div>

      <div className="relative h-[140px] my-6">
        <Image
          src={image || "/placeholder.svg"}
          alt={`${name} car`}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="flex items-center gap-2">
          <BsFuelPump className="text-[#90A3BF] w-4 h-4" />
          <span className="text-sm text-[#90A3BF]">{fuelCapacity}</span>
        </div>
        <div className="flex items-center gap-2">
          <PiSteeringWheel className="text-[#90A3BF] w-4 h-4" />
          <span className="text-sm text-[#90A3BF]">{transmission}</span>
        </div>
        <div className="flex items-center gap-2">
          <BsPeople className="text-[#90A3BF] w-4 h-4" />
          <span className="text-sm text-[#90A3BF]">{capacity}</span>
        </div>
      </div>

      <div className="flex justify-between items-end">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-[18px] font-semibold text-[#1A202C]">${price}</span>
            <span className="text-[14px] text-[#90A3BF]">/day</span>
          </div>
          {discountedPrice && discountedPrice > 0 && (
            <p className="text-[14px] text-[#90A3BF] line-through">${discountedPrice}</p>
          )}
        </div>
        <Link href={`/detail/${id}`}>
          <button className="bg-[#3563E9] text-white px-5 py-2 rounded-[4px] text-[14px] font-semibold hover:bg-blue-600 transition-colors">
            Rent Now
          </button>
        </Link>
      </div>
    </div>
  )
}

const RecommendedCar: React.FC = () => {
  const [cars, setCars] = useState<CarCardProps[]>([])
  const { searchTerm } = useSearch(); // Get searchTerm from context
  const [filteredData, setFilteredData] = useState<CarCardProps[]>([]);

  useEffect(() => {
    const fetchCars = async () => {
      const carsData = await client.fetch(`*[_type == "cars" && "recommended" in tags]{
        id,
        name,
        type,
        "image": image.asset->url,
        "fuelCapacity": fuel_capacity,
        "transmission": transmission,
        "capacity": seating_capacity,
        "price": price_per_day,
        "discountedPrice": select(
          original_price > 0 => original_price,
          null
        ),
        "isFavorite": false
      }`)
      setCars(carsData)
    }
    fetchCars()
  }, [])
console.log(cars);

 React.useEffect(() => {
    const filteredData = cars.filter((car) =>
      car.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filteredData);
  }, [searchTerm, cars]);

  return (
    <section className="p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h5 className="text-md font-bold text-[#aeafb3]">Recommended Cars</h5>
          {/* <button className="text-[#3563E9] text-sm font-semibold hover:underline">View All</button> */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* {cars.map((car) => (
            <CarCard key={car.name} {...car} />
          ))} */}
              {filteredData.length === 0 ? (
            <p className="text-center text-gray-500">No cars found for &ldquo;{searchTerm}&ldquo;</p>
          ) : (
            filteredData.map((car) => <CarCard key={car.id} {...car} />)
          )}
        </div>
        <Button />
      </div>
    </section>
  )
}

export default RecommendedCar
