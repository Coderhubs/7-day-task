import React from "react";
import Ads from "./components/Ads";
import Booking from "./components/Booking";
import PopularCard from "./components/PopularCard";
import RecommendedCar from "./components/RecommendedCar";


// import Catalogue from "./components/Catalogue";

export default function Home() {
  return (
   <div>
   
    <Ads />
    <Booking />
    <PopularCard />
    <RecommendedCar />
    

   </div>
  );
}
