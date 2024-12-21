'use client';

import { TiBriefcase } from 'react-icons/ti';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useEffect, useState } from 'react';

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Effect to check the initial theme on page load
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.body.classList.remove('dark');
    }
  }, []);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newDarkMode = !prev;
      if (newDarkMode) {
        document.body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return newDarkMode;
    });
  };

  return (
    <ul>
      <li className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <TiBriefcase className="text-[#90A3BF] text-xl" />
          <span className="text-gray-500 font-medium">Dark Mode</span>
        </div>
        <div
          onClick={toggleDarkMode}
          className="flex items-center bg-gray-100 p-1 rounded-full w-14 cursor-pointer"
        >
          <div
            className={`bg-[#3563E9] w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 ${isDarkMode ? 'transform translate-x-7' : ''}`}
          >
            <FaSun className="text-white text-sm" />
          </div>
          <FaMoon className={`text-gray-600 text-sm ml-2 ${isDarkMode ? 'bg-black' : ''}`} />
        </div>
      </li>
    </ul>
  );
};

export default DarkModeToggle;
