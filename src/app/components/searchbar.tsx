import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Image from 'next/image';

export default function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');

interface SearchChangeEvent extends React.ChangeEvent<HTMLInputElement> {}

const handleSearchChange = (e: SearchChangeEvent): void => {
    setSearchTerm(e.target.value);
    // Add additional functionality here, like filtering data or making API calls
};

  return (
    <div className="space-y-6">
      {/* First Search Bar */}
      <div className="flex items-center w-full sm:w-[492px] bg-white border border-[#c3d4e9]/40 rounded-[70px] h-11 px-4">
        <FaSearch className="text-gray-500 w-5 h-5 hover:text-blue-500" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
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
      </div>

    </div>
  );
}
