// // // "use client";

// // // import React from "react";
// // // import FilterSidebar from "../../components/Sidebar";
// // // import Booking from "../../components/Booking";
// // // import Button from "../../components/Button";
// // // import SimilarCar from "../../components/similarcars";

// // // const Page = () => {
// // //   return (
// // //     <div className="flex">
// // //       <FilterSidebar />
// // //       <div className="flex flex-col flex-grow p-6">
// // //         <Booking />
// // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
// // //           {/* {carData.map((car, index) => (
// // //             <CarCard key={index} {...car} />
// // //           ))} */}
// // //           <SimilarCar />
// // //         </div>
// // //         <Button />
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Page;


// import React from "react"
// import FilterSidebar from "../../components/Sidebar";
// import Booking from "../../components/Booking";
// import Button from "../../components/Button";
// import SimilarCar from "../../components/similarcars";
// const Page = () => {
//   return (
//     <div className="flex">
//       <FilterSidebar />
//       <div className="flex-grow bg-[#F6F7F9]">
//         <div className="p-8">
//           <Booking />
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  mt-6">
//           <SimilarCar />
//           </div>
        
//         </div>
//         <Button />
//       </div>
//     </div>
//   )
// }

// export default Page;

// // import React from "react";
// // import FilterSidebar from "../../components/Sidebar";
// // import Booking from "../../components/Booking";
// // import Button from "../../components/Button";
// // import SimilarCar from "../../components/similarcars";

// // const Page = () => {
// //   return (
// //     <div className="flex">
// //       <FilterSidebar />
// //       <div className="flex-grow bg-[#F6F7F9]">
// //         <div className="p-8">
// //           <Booking />
// //             {/* Repeat SimilarCar component to simulate multiple cards */}
// //             <SimilarCar />
            
// //           </div>
// //         </div>
// //         <Button />
// //       </div>
// //     </div>
// //   );
// // };

// // export default Page;
// // import React from "react";
// // import FilterSidebar from "../../components/Sidebar";
// // import Booking from "../../components/Booking";
// // import Button from "../../components/Button";
// // import SimilarCar from "@/app/components/similarcars";

// // const Page = () => {
// //   return (
// //     <main className="flex">
// //       <FilterSidebar />
// //       <div className="flex flex-col flex-grow p-6 bg-[#F6F7F9]">
// //         <Booking />

// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
// //          {/* Repeat SimilarCar component to simulate multiple cards */}
// //        <SimilarCar />
            
// //        </div>
// //         <div className="mt-8">
// //           <Button />
// //         </div>
// //       </div>
// //     </main>
// //   );
// // };

// // export default Page;
import React from "react";
import FilterSidebar from "../../components/Sidebar";
import Booking from "../../components/Booking";
import Button from "../../components/Button";
import SimilarCar from "@/app/components/similarcars";

const Page = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <FilterSidebar />
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
  );
};

export default Page;