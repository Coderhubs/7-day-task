'use client'

import React from 'react';
import { useFavoriteStore } from '../store/favoriteStore';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BsFuelPump, BsPeople } from 'react-icons/bs';
import { PiSteeringWheel } from 'react-icons/pi';
import { AiFillHeart, AiOutlineCar } from 'react-icons/ai';

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useFavoriteStore();

  const handleRemoveFavorite = (carId: number) => {
    removeFavorite(carId);
  };

  if (favorites.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-md mx-auto">
          <AiOutlineCar className="w-20 h-20 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">No Favorites Yet</h2>
          <p className="text-gray-600 mb-8">
            Start exploring our collection and add your favorite cars to the list.
          </p>
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#3563E9] text-white px-8 py-3 rounded-lg font-medium shadow-lg hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2 mx-auto"
            >
              <AiOutlineCar className="w-5 h-5" />
              Browse Cars
            </motion.button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">My Favorite Cars</h1>
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#3563E9] text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200 flex items-center gap-2"
          >
            <AiOutlineCar className="w-5 h-5" />
            Browse More Cars
          </motion.button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((car) => (
          <motion.div
            key={car.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{car.name}</h3>
                  <p className="text-sm text-gray-500">{car.type}</p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleRemoveFavorite(car.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <AiFillHeart className="w-6 h-6" />
                </motion.button>
              </div>

              <div className="relative h-40 mb-4">
                <Image
                  src={car.image}
                  alt={car.name}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <BsFuelPump className="text-gray-400" />
                  <span className="text-sm text-gray-600">{car.fuelCapacity}</span>
                </div>
                <div className="flex items-center gap-2">
                  <PiSteeringWheel className="text-gray-400" />
                  <span className="text-sm text-gray-600">{car.transmission}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BsPeople className="text-gray-400" />
                  <span className="text-sm text-gray-600">{car.capacity}</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <span className="text-lg font-semibold text-gray-800">
                    ${car.price}
                  </span>
                  <span className="text-sm text-gray-500">/day</span>
                </div>
                <Link href={`/detail/${car.id}`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#3563E9] text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Rent Now
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 