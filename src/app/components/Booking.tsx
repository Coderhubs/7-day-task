 "use client"
import { useState, useEffect } from 'react';
import { LuArrowDownUp } from 'react-icons/lu';

const PickDrop = () => {
  const [pickupLocation, setPickupLocation] = useState('select');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('select');
  const [dropoffDate, setDropoffDate] = useState('');
  const [dropoffTime, setDropoffTime] = useState('');
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [customPickupTime, setCustomPickupTime] = useState('');
  const [customDropoffTime, setCustomDropoffTime] = useState('');
  const [isSwapped, setIsSwapped] = useState(false);  // State to track if swapped

  const locations = ['Karachi', 'Hyderabad', 'Nawabshah'];

  const generateAvailableTimes = () => {
    const times = [];
    const currentTime = new Date();
    for (let i = 0; i <= 48; i++) {
      const time = new Date(currentTime.getTime() + i * 30 * 60000); 
      const hours = time.getHours().toString().padStart(2, '0');
      const minutes = time.getMinutes().toString().padStart(2, '0');
      times.push(`${hours}:${minutes}`);
    }
    return times;
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>, type: 'pickup' | 'dropoff') => {
    const value = event.target.value;
    if (type === 'pickup') {
      setPickupLocation(value);
    } else {
      setDropoffLocation(value);
    }
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>, type: 'pickup' | 'dropoff') => {
    const value = event.target.value;
    if (type === 'pickup') {
      setPickupTime(value);
    } else {
      setDropoffTime(value);
    }
  };

  const handleCustomTimeChange = (event: React.ChangeEvent<HTMLInputElement>, type: 'pickup' | 'dropoff') => {
    const value = event.target.value;
    if (type === 'pickup') {
      setCustomPickupTime(value);
    } else {
      setCustomDropoffTime(value);
    }
  };

  const handleSwap = () => {
    // Swap locations and times
    setPickupLocation(dropoffLocation);
    setDropoffLocation(pickupLocation);
    setPickupTime(dropoffTime);
    setDropoffTime(pickupTime);
    setCustomPickupTime(customDropoffTime);
    setCustomDropoffTime(customPickupTime);

    // Toggle swap state to trigger CSS transition
    setIsSwapped(!isSwapped);
  };

  // useEffect(() => {
  //   const currentDate = new Date().toISOString().split('T')[0];
  //   setPickupDate(currentDate);
  //   setDropoffDate(currentDate);
  //   setAvailableTimes(generateAvailableTimes());
  //   setPickupTime(availableTimes[0]);
  //   setDropoffTime(availableTimes[0]);
  // }, [availableTimes]);
  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0];
    setPickupDate(currentDate);
    setDropoffDate(currentDate);
  
    // Generate available times and set initial values for pickup and dropoff
    const times = generateAvailableTimes();
    setAvailableTimes(times);
    setPickupTime(times[0]);
    setDropoffTime(times[0]);
  }, []); // Empty dependency array ensures this runs only once
  
  return (
    <div className="relative flex flex-col md:flex-row justify-center items-center gap-6 p-6">
      {/* Pick-Up Card */}
      <div className={`flex flex-col w-full max-w-md md:max-w-[582px] bg-white rounded-lg p-4 shadow-md ${isSwapped ? 'transform translate-x-4' : ''}`}>
        <div className="flex items-center gap-2 mb-4">
          <input type="radio" name="location" id="pickup" defaultChecked />
          <label htmlFor="pickup" className="text-lg font-semibold">Pick-Up</label>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Locations</label>
            <select
              className="w-full text-sm p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={pickupLocation}
              onChange={(e) => handleLocationChange(e, 'pickup')}
            >
              {locations.map((location, index) => (
                <option key={index} value={location}>{location}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Date</label>
            <input
              type="date"
              className="w-full text-sm p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Time</label>
            <select
              className="w-full text-sm p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={pickupTime}
              onChange={(e) => handleTimeChange(e, 'pickup')}
            >
              {availableTimes.map((time, index) => (
                <option key={index} value={time}>{time}</option>
              ))}
            </select>
            {/* Custom Time Input */}
            <input
              type="time"
              className="mt-2 w-full text-sm p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={customPickupTime}
              onChange={(e) => handleCustomTimeChange(e, 'pickup')}
              placeholder="or select custom time"
            />
          </div>
        </div>
      </div>

      {/* Swap Icon */}
      <div
        onClick={handleSwap}
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 lg:w-12 lg:h-12 bg-blue-500 text-white rounded-lg shadow-blue-200 shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center z-10 cursor-pointer ${isSwapped ? 'rotate-180' : ''}`}
      >
        <LuArrowDownUp className="text-xl md:text-2xl lg:text-3xl" />
      </div>

      {/* Drop-Off Card */}
      <div className={`flex flex-col w-full max-w-md md:max-w-[582px] bg-white rounded-lg p-4 shadow-md ${isSwapped ? 'transform -translate-x-4' : ''}`}>
        <div className="flex items-center gap-2 mb-4">
          <input type="radio" name="location" id="dropoff" />
          <label htmlFor="dropoff" className="text-lg font-semibold">Drop-Off</label>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Locations</label>
            <select
              className="w-full text-sm p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={dropoffLocation}
              onChange={(e) => handleLocationChange(e, 'dropoff')}
            >
              {locations.map((location, index) => (
                <option key={index} value={location}>{location}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Date</label>
            <input
              type="date"
              className="w-full text-sm p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={dropoffDate}
              onChange={(e) => setDropoffDate(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Time</label>
            <select
              className="w-full text-sm p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={dropoffTime}
              onChange={(e) => handleTimeChange(e, 'dropoff')}
            >
              {availableTimes.map((time, index) => (
                <option key={index} value={time}>{time}</option>
              ))}
            </select>
            {/* Custom Time Input */}
            <input
              type="time"
              className="mt-2 w-full text-sm p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={customDropoffTime}
              onChange={(e) => handleCustomTimeChange(e, 'dropoff')}
              placeholder="or select custom time"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickDrop;
