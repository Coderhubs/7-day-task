"use client"
import React from "react";
import Image from "next/image";
import { FaHeart, FaBell, FaCog, FaSearch } from "react-icons/fa";
import SearchComponent from "./searchbar";
// import SearchBar from "./searchbar";


const Header: React.FC = () => {
  return (
    <header className="w-full bg-white border-b border-gray-200 py-4 overflow-x-hidden">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between px-4 md:px-10 space-y-4 sm:space-y-0">
        
        {/* Logo Section */}
        <div className="flex items-center justify-between w-full sm:w-auto">
          <h1 className="text-blue-600 text-lg md:text-xl lg:text-2xl font-bold">
            MORENT
          </h1>
          <Image
            src="/images/profile.jpg"
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover ml-4 sm:hidden"
            width={32}
            height={32}
          />
        </div>
        {/* bg-white border border-[#c3d4e9]/40 rounded-[70px] */}
        {/* Responsive Search Bar */}
        < SearchComponent />
        {/* <div className="flex items-center w-full sm:w-[492px] bg-white border border-[#c3d4e9]/40 rounded-[70px] h-11 px-4">
        {/* <SearchBar /> */}
           {/* <FaSearch className="text-gray-500 w-5 h-5 hover:text-blue-500" />
          <input
            type="text"
            placeholder="Search something here"
            className="flex-grow bg-transparent outline-none text-gray-700 ml-2 placeholder-gray-400"
          />
          <Image
            src="/images/filter.jpg"
            alt="filter"
            width={24}
            height={24}
            className="hidden md:block cursor-pointer"
          /> 
        </div> */ }

        {/* Profile and Icons */}
        <div className="flex items-center space-x-4">

          {/* Hidden Icons for Larger Screens */}
          <div className="hidden sm:flex items-center space-x-4 md:space-x-6">
            <div className="w-8 h-8 rounded-full flex items-center justify-center hover:text-blue-red cursor-pointer transition-colors">
              <FaHeart className="text-gray-500 w-4 h-4 hover:text-red-600" />
            </div>
            <div className="w-8 h-8 rounded-full flex items-center justify-center relative hover:text-blue-500 cursor-pointer transition-colors">
              <FaBell className="text-gray-500 w-4 h-4 hover:text-blue-400" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full "></span>
            </div>
            <div className="w-8 h-8 rounded-full flex items-center justify-center hover:text-blue-500 cursor-pointer transition-colors">
              <FaCog className="text-gray-500 w-4 h-4 hover:text-slate-300 " />
            </div>
          </div>

          {/* Profile Image */}
          <Image
            src="/images/profile.jpg"
            alt="Profile"
            className="hidden sm:block w-8 h-8 rounded-full object-cover max-w-full"
            width={32}
            height={32}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
