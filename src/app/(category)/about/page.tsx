
// import React from "react";
// import FilterSidebar from "../../components/Sidebar";
// import Booking from "../../components/Booking";
// import Button from "../../components/Button";
// import SimilarCar from "@/app/components/similarcars";

// const Page = () => {
  
  
//   return (
//     <div className="flex flex-col md:flex-row min-h-screen">
//       <FilterSidebar cars={[]} onFiltersChange={() => {}} />
//       <main className="flex-1 bg-[#F6F7F9]">
//         <div className="p-4 md:p-8 max-w-[1400px] mx-auto">
//           <Booking />
//           <div className="mt-8">
//             <SimilarCar />
//           </div>
//           <div className="mt-8">
//             <Button />
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Page;
"use client"
import FilterSidebar from "@/app/components/Sidebar"
import Booking from "../../components/Booking"
import Button from "../../components/Button"
import SimilarCar from "@/app/components/similarcars"
import { useFilterStore } from "@/app/store/filterstore"

const Page = () => {
  const setFilters = useFilterStore((state) => state.setFilters)

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters)
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <FilterSidebar  />
      <main className="flex-1 bg-[#F6F7F9]">
        <div className="p-4 md:p-8 max-w-[1400px] mx-auto">
          <Booking />
          <div className="mt-8">
            <SimilarCar />
          </div>
          <div className="mt-8">
            <Button />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Page

