"use client";

import { AiFillHeart } from "react-icons/ai";
import Image from "next/image";
import React from "react";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
import FilterSidebar from "@/app/components/Sidebar";
import Reviews from "@/app/components/ui/Reviews";
import Recent from "@/app/components/Recent";
import view from "../../../../public/images/View.jpg";
import v1 from "../../../../public/images/v1.jpg";
import v2 from "../../../../public/images/v2.jpg";
import v3 from "../../../../public/images/v3.jpg";

const Detail = () => {
  const thumbnails = [v1, v2, v3];

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar Section */}
      <div className="w-full md:w-1/4">
        <FilterSidebar />
      </div>

      <div className="w-full md:w-3/4 mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-8 p-4">

        {/* Left Section */}

        <div className="w-full flex flex-col items-center">
          
          {/* Main Car Card */}
          <div className="relative bg-white mt-6 w-full h-[360px] rounded-[10px]">
            <Image
              src= {view}
              alt="Car2"
              layout="responsive"
              width={360}
              height={240}
              className="rounded-[10px] object-cover"
              priority
            />
          </div>

          {/* Thumbnails */}
          <div className="flex justify-between gap-4 mt-6 overflow-x-auto">
            {thumbnails.map((src, index) => (
              <Image
                key={index}
                src={src || "/images/fallback.jpg"}
                alt={`View ${index + 1}`}
                width={148}
                height={124}
                className="rounded-[10px] object-cover"
              />
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full h-auto p-5 bg-white rounded-[10px] mt-6">
          {/* Title and Favorite Icon */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl md:text-3xl font-bold">Nissan GT &ndash; R</h2>
            <AiFillHeart className="text-red-500 text-xl md:text-2xl cursor-pointer" />
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-2">
            <p className="text-yellow-500 flex items-center gap-1 text-sm md:text-base">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <CiStar />
            </p>
            <p className="text-[#596780] text-xs md:text-sm">440+ Reviews</p>
          </div>

          {/* Description */}
          <p className="text-[#596780] text-sm md:text-lg mt-4 md:mt-8">
            NISMO has become the embodiment of Nissan &apos;s outstanding performance, inspired by the most unforgiving proving ground, the race track.
          </p>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            {[
              { label: "Type Car:", value: "Sport" },
              { label: "Capacity:", value: "2 Person" },
              { label: "Steering:", value: "Manual" },
              { label: "Gasoline:", value: "70L" },
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
                <span className="text-2xl md:text-3xl font-bold text-black">$80.00</span>
                <span className="text-sm md:text-base font-bold text-[#90A3BF] ml-2">/days</span>
              </div>
              <span className="text-[#90A3BF] line-through text-sm md:text-base font-bold">$100.00</span>
            </div>

            <Link href="payment">
              <button className="bg-[#3563E9] w-[120px] md:w-[140px] h-[48px] md:h-[56px] text-white rounded-md font-medium hover:bg-blue-600">
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
