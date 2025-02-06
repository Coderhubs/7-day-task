// import React from "react";
// import Ads from "./components/Ads";
// import Booking from "./components/Booking";
// import PopularCard from "./components/PopularCard";
// import RecommendedCar from "./components/RecommendedCar";


// // import Catalogue from "./components/Catalogue";



// export default function Home() {
//   return (
//    <div>
   
//     <Ads />
//     <Booking />
//     <PopularCard />
       

//     <RecommendedCar />
    

//    </div>
//   );
// }// Home.tsx (with dynamic search)
"use client"
import React, { useState } from "react";
import Ads from "./components/Ads";
import Booking from "./components/Booking";
import PopularCard from "./components/PopularCard";
import RecommendedCar from "./components/RecommendedCar";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchTerm(e.target.value);
  // };

  return (
    <div>
      <Ads />
      <Booking />
      
      {/* Add an input to change searchTerm */}
      {/* <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search for cars..."
        className="p-2 border rounded"
      /> */}
      
      <PopularCard />
      
      <RecommendedCar />
    </div>
  );
}
