"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaHeart, FaBell, FaCog, FaSearch, FaSignInAlt, FaSignOutAlt, FaCar } from "react-icons/fa";
import { useSearch } from "../components/context/SearchContext";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useFavoriteStore } from '@/app/store/favoriteStore';
import { SlidersHorizontal } from "lucide-react"


// Darakshan

const Header: React.FC = () => {

  // Darakshan
  const [isFilterBarOpen, setIsFilterBarOpen] = useState(false); // State to control the filter bar visibility
  const { searchTerm, setSearchTerm } = useSearch();
  const { data: session } = useSession();

  // New states for notifications and favorites
  const [notifications, setNotifications] = useState<Array<{ id: number; message: string; read: boolean }>>([]);
  const { favorites } = useFavoriteStore();
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  // Simulate fetching notifications and favorites count
  useEffect(() => {
    if (session) {
      // Mock notifications - replace with actual API calls
      setNotifications([
        { id: 1, message: "New car listing available!", read: false },
        { id: 2, message: "Your booking was confirmed", read: false },
        { id: 3, message: "Special offer available", read: true },
      ]);

      // Mock favorites count - replace with actual API call
      // favorites.length is not directly accessible in the useFavoriteStore
    }
  }, [session]);

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const handleNotificationClick = () => {
    setShowNotificationDropdown(!showNotificationDropdown);
    // Mark all notifications as read when opening dropdown
    if (!showNotificationDropdown) {
      setNotifications(notifications.map(n => ({ ...n, read: true })));
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('#profile-menu')) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOut({ 
      callbackUrl: '/auth/signin',
      redirect: true 
    });
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 py-4 overflow-x-hidden">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between px-4 md:px-10 space-y-4 sm:space-y-0 relative">
        
        {/* Logo Section */}
        <div className="flex items-center justify-between w-full sm:w-auto">
          <Link href="/">
            <h1 className="text-blue-600 text-lg md:text-xl lg:text-2xl font-bold cursor-pointer">
              MORENT
            </h1>
          </Link>
          {session && (
            <Image
              src={session.user?.image || "/images/profile.jpg"}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ml-4 sm:hidden"
              width={32}
              height={32}
            />
          )}
        </div>
        {/* bg-white border border-[#c3d4e9]/40 rounded-[70px] */}
        {/* Responsive Search Bar */}
        <div className="flex items-center w-full sm:w-[492px] bg-white border border-[#c3d4e9]/40 rounded-[70px] h-11 px-4">

        
        {/* <SearchBar /> */}
           <FaSearch className="text-gray-500 w-5 h-5 hover:text-blue-500" />
          <input
            // type="text"
            // placeholder="Search something here" simra
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search something here"
            className="flex-grow bg-transparent outline-none text-gray-700 ml-2 placeholder-gray-400"
          />
            <button className=" hover:bg-gray-300 p-2">
      <SlidersHorizontal className="w-5 h-5" />
    </button>
        {/* <SearchBar searchParams={{ term: '' }} /> */}

        </div> 

        {/* Profile and Icons */}
        <div className="flex items-center space-x-4">

          {/* Hidden Icons for Larger Screens */}
          {session ? (
            <>
              <div className="hidden sm:flex items-center space-x-4 md:space-x-6">
                {/* Favorites Icon */}
                <Link href="/favorites">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center hover:text-blue-red cursor-pointer transition-colors relative">
                    <FaHeart className="text-gray-500 w-4 h-4 hover:text-red-600" />
                    {favorites.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        {favorites.length}
                      </span>
                    )}
                  </div>
                </Link>

                {/* Notifications Icon */}
                <div className="relative">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center relative hover:text-blue-500 cursor-pointer transition-colors"
                    onClick={handleNotificationClick}
                  >
                    <FaBell className="text-gray-500 w-4 h-4 hover:text-blue-400" />
                    {unreadNotifications > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        {unreadNotifications}
                      </span>
                    )}
                  </div>

                  {/* Notifications Dropdown */}
                  {showNotificationDropdown && (
                    <div className="fixed top-16 right-4 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <div className="p-2">
                        <h3 className="text-sm font-semibold mb-2">Notifications</h3>
                        {notifications.length > 0 ? (
                          <div className="space-y-2">
                            {notifications.map((notification) => (
                              <div
                                key={notification.id}
                                className={`p-2 text-sm rounded-lg ${
                                  notification.read ? 'bg-gray-50' : 'bg-blue-50'
                                }`}
                              >
                                {notification.message}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500">No notifications</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Settings Icon */}
                <Link href="/settings">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center hover:text-blue-500 cursor-pointer transition-colors">
                    <FaCog className="text-gray-500 w-4 h-4 hover:text-slate-300" />
                  </div>
                </Link>

                {/* Sign Out Icon */}
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:text-blue-500 cursor-pointer transition-colors"
                  onClick={() => signOut()}
                >
                  <FaSignOutAlt className="text-gray-500 w-4 h-4 hover:text-red-500" />
                </div>
              </div>
              <div id="profile-menu" className="relative">
                <div 
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="cursor-pointer"
                >
                  <Image
                    src={session.user?.image || "/images/profile.jpg"}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                    width={32}
                    height={32}
                  />
                </div>

                {/* Profile Dropdown - Updated positioning */}
                {showProfileDropdown && (
                  <div className="fixed right-4 top-16 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-200 z-50">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">{session.user?.name}</p>
                      <p className="text-sm text-gray-500">{session.user?.email}</p>
                    </div>
                    
                    {/* Updated Rental Management option with car icon */}
                    <Link
                      href="/dashboard"
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <FaCar className="w-4 h-4 text-gray-500" />
                      <span>Rental Management</span>
                    </Link>

                    <div className="border-t border-gray-200"></div>
                    
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <FaSignOutAlt className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <button 
              onClick={() => signIn('google', { 
                callbackUrl: '/',
                redirect: true
              })}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-500"
            >
              <FaSignInAlt className="w-4 h-4" />
              <span>Login</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;



