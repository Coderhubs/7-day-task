'use client'; // Mark this as a Client Component

import { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import Image from "next/image";
import FilterSidebar from "@/app/components/Sidebar";
import Reviews from "@/app/components/ui/Reviews";
import Recent from "@/app/components/Recent";
import { client } from "@/sanity/lib/client";
import Rating from "../../../components/rating";
import { useContext } from "react";
import { CarContext } from "../../../components/context/CarContext";
import { useRouter } from 'next/navigation'; // Update this import
import Link from "next/link";
import { motion } from 'framer-motion';
import { useFavoriteStore } from '@/app/store/favoriteStore';

interface Car {
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
  _id: string;
}

const Detail = ({ params }: { params: { id: number } }) => {
  const [car, setCarState] = useState<Car | null>(null);
  const { id } = params;
  const carContext = useContext(CarContext);
  const router = useRouter();
  const { addFavorite, removeFavorite, isFavorite } = useFavoriteStore();
  const [isAnimating, setIsAnimating] = useState(false);

  if (!carContext) {
    throw new Error("CarContext must be used within a CarProvider");
  }
  const { setCar } = carContext;

  useEffect(() => {
    const fetchCar = async () => {
      const query = `
        *[_type == "cars" && id == ${id}]{
          id,
          name,
          type,
          "image": image.asset->url,
          "image_1": image_1.asset->url,
          "image_2": image_2.asset->url,
          "image_3": image_3.asset->url,
          "fuelCapacity": fuel_capacity,
          "transmission": transmission,
          "capacity": seating_capacity,
          "price": price_per_day,
          "discountedPrice": select(
            original_price > 0 => original_price,
            null
          ),
          "isFavorite": false,
          description,
          _id
        } [0]`;

      const carData: Car = await client.fetch(query);
      setCarState(carData);
    };

    fetchCar();
  }, [id]);

  const handleFavoriteClick = () => {
    if (!car) return;
    
    setIsAnimating(true);
    if (isFavorite(car.id)) {
      removeFavorite(car.id);
    } else {
      addFavorite({
        id: car.id,
        name: car.name,
        type: car.type,
        image: car.image,
        fuelCapacity: car.fuelCapacity,
        transmission: car.transmission,
        capacity: car.capacity,
        price: car.price,
        discountedPrice: car.discountedPrice,
      });
    }
    setTimeout(() => setIsAnimating(false), 300);
  };

  if (!car) {
    return <div>Loading...</div>;
  }

  const handleRentNow = () => {
    setCar(car);
    router.push("/checkout");
  };

  const thumbnails = [car.image_1, car.image_2, car.image_3];

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar Section */}
      <div className="w-full h-max-auto md:w-1/4">
              <FilterSidebar /> 
       
      </div>

      <div className="w-full md:w-3/4 mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-8 p-4">
        {/* Left Section */}
        <div className="w-full flex flex-col items-center">
          {/* Main Car Card */}
          <div className="relative mt-6 w-full h-[360px] rounded-[10px] bg-gradient-to-br from-blue-500 to-blue-700 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]" />
            <div className="text-white space-y-4">
              <h2 className="text-xl font-bold flex justify-center items-center text-center mt-8">
                Experience Luxury & Comfort with Morent
              </h2>
              <p className="text-yellow-300 text-xl ml-3 mb-14 font-bold text-center items-center justify-center">
                Our services, your ride
              </p>
              <p className="text-blue-100 text-xl ml-3">
                Drive the future today with our premium SUV selection. Perfect blend of style, space, and innovation.
              </p>
            </div>
            <Image
              src={car.image}
              alt="Car2"
              width={360}
              height={240}
              className="rounded-[10px] object-cover mb-20 mt-0 ml-20 mr-0"
              priority
            />
          </div>
          {/* Thumbnails */}
          <div className="flex justify-between gap-4 mt-6 overflow-x-auto">
            {thumbnails.map((src, index) => (
              <Image
                key={index}
                src={src || "fallback.jpg"}
                alt={`View ${index + 1}`}
                width={148}
                height={124}
                className="rounded-[10px] object-cover"
              />
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full h-fit p-6 bg-white rounded-[10px] mt-6">
          {/* Title and Favorite Icon */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl md:text-3xl font-bold">{car.name}</h2>
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
                  className={`h-6 w-6 ${
                    isFavorite(car.id) ? "text-red-500" : "text-[#D7E5FF]"
                  }`}
                />
              </motion.div>
            </motion.button>
          </div>

          {/* Rating */}
          <Rating />

          {/* Description */}
          <p className="text-[#596780] text-sm md:text-lg mt-4 md:mt-8">
            {car.description}
          </p>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            {[
              { label: "Type Car:", value: `${car.type}` },
              { label: "Capacity:", value: `${car.capacity}` },
              { label: "Steering:", value: `${car.transmission}` },
              { label: "Gasoline:", value: `${car.fuelCapacity}` },
            ].map((feature, index) => (
              <div key={index} className="flex justify-between text-sm md:text-lg">
                <span className="text-[#90A3BF] font-medium">{feature.label}</span>
                <span className="text-[#596780] font-semibold">{feature.value}</span>
              </div>
            ))}
          </div>

          {/* Price and Button */}
          <div className="flex justify-between items-center mt-10 md:mt-12">
            <div>
              <div className="flex items-center">
                <span className="text-2xl md:text-3xl font-bold text-black">${car.price}</span>
                <span className="text-sm md:text-base font-bold text-[#90A3BF] ml-2">/days</span>
              </div>
              {car.discountedPrice && car.discountedPrice > 0 && (
                <span className="text-[#90A3BF] line-through text-sm md:text-base font-bold">
                  ${car.discountedPrice}
                </span>
              )}
            </div>
            <Link href={`/payment?id=${car._id}`}>
              <button
                onClick={handleRentNow}
                className="bg-[#3563E9] w-[120px] md:w-[140px] h-[48px] md:h-[56px] text-white rounded-md font-medium hover:bg-blue-600"
              >
                Rent Now
              </button>
            </Link>
          </div>
        </div>

        {/* Reviews and Recent Cards Section */}
        <div className="col-span-1 md:col-span-2 mt-8 md:mt-16">
          <Reviews />
          <div className="mt-8 md:mt-16">
            <Recent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;