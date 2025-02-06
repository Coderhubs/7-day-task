"use client"
import React, { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { AiFillHeart } from "react-icons/ai";
import { BsFuelPump, BsPeople } from "react-icons/bs";
import { PiSteeringWheel } from "react-icons/pi";
import Link from "next/link";
import Image from "next/image";
import { useSearch } from "../components/context/SearchContext";
import { useFilterStore } from "@/app/store/filterstore"
import { motion } from 'framer-motion';
import { useFavoriteStore } from '@/app/store/favoriteStore';


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
    <div className="bg-white rounded-[10px] p-5 w-full max-w-[380px] mx-auto flex flex-col">
      <div className="flex justify-between items-start h-[60px]">
        <div>
          <h3 className="text-[20px] font-semibold text-[#1A202C] leading-tight">{name}</h3>
          <p className="text-[14px] text-[#90A3BF] mt-1">{type}</p>
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
              className={`h-5 w-5 ${isFavorite(id) ? "text-red-500" : "text-[#D7E5FF]"}`}
            />
          </motion.div>
        </motion.button>
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
          </div>
          {discountedPrice && discountedPrice > 0 && (
            <span className="text-xs text-[#90A3BF] mt-0.5">
              ${discountedPrice}
            </span>
          )}
        </div>
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
  const { searchTerm } = useSearch();
  const [filteredData, setFilteredData] = useState<CarCardProps[]>([]);
  const filters = useFilterStore((state) => state)

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
          "discountedPrice": select(
            original_price > 0 => original_price,
            null
          ),
          "isFavorite": false
        }`
      );
      setCars(carsData);
    };
    fetchCars();
  }, []);

  React.useEffect(() => {
    let filtered = cars;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((car) =>
        car.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply type filter
    if (filters.types?.length) {
      filtered = filtered.filter((car) =>
        filters.types.includes(car.type)
      );
    }

    // Apply capacity filter
    if (filters.capacity?.length) {
      filtered = filtered.filter((car) =>
        filters.capacity.includes(car.capacity)
      );
    }

    // Apply price filter
    if (filters.maxPrice) {
      filtered = filtered.filter((car) =>
        car.price <= filters.maxPrice
      );
    }

    setFilteredData(filtered);
  }, [searchTerm, cars, filters]);

  return (
    <div className="w-full">
       <div className="flex justify-between items-center mb-5">
     <h2 className="text-sm font-bold text-slate-400 ">Similar Cars</h2>
<button className="text-slate-400 text-sm font-bold hover:underline">
      View All
      </button>
      
         </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* {cars.map((car) => (
          <CarCard key={car.name} {...car} />
        ))} */}
          {filteredData.length === 0 ? (
            <p className="text-center text-gray-500">No cars found for &ldquo;{searchTerm}&ldquo;</p>
          ) : (
            filteredData.map((car) => <CarCard key={car.id} {...car} />)
          )}
      </div>
    </div>
  );
};

export default Recent;

