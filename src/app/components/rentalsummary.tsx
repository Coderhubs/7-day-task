// import React from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { FaStar } from 'react-icons/fa';
// import { CiStar } from 'react-icons/ci';

// interface CarData {
//   name: string;
//   image: string;
//   price: string;
//   discountedPrice: string;
// }

// const RentalSummary = ({ carData }: { carData: CarData }) => {
//   if (!carData) return null;

//   const {
//     name,
//     image,
//     price,
//     discountedPrice,
//   } = carData;

//   return (
//     <div className="order-1 lg:order-2 space-y-8">
//       <Card className="bg-white">
//         <CardHeader>
//           <CardTitle className="text-xl">Rental Summary</CardTitle>
//           <p className="text-gray-500">
//             Prices may change depending on the length of the rental and the price of your rental car.
//           </p>
//         </CardHeader>
//         <CardContent>
//           <div className="flex items-center space-x-4">
//             <img
//               src={image}
//               alt={name}
//               className="w-[132px] h-[108px] rounded-lg object-cover"
//             />
//             <div>
//               <h3 className="text-3xl font-bold">{name}</h3>
//               <div className="flex items-center gap-[4px]">
//                 <p className="text-yellow-500 flex items-center gap-[2px]">
//                   <FaStar />
//                   <FaStar />
//                   <FaStar />
//                   <FaStar />
//                   <CiStar />
//                 </p>
//                 <p className="text-gray-500"> 440+ Reviews</p>
//               </div>
//             </div>
//           </div>
          
//           <hr className="text-gray-500 mt-10" />
          
//           <div className="mt-4 space-y-2">
//             <div className="flex justify-between text-gray-700">
//               <span className="font-medium text-base text-[#90A3BF]">Subtotal</span>
//               <span className="font-semibold text-base">${price}.00</span>
//             </div>
//             <div className="flex justify-between text-gray-700">
//               <span className="font-medium text-base text-[#90A3BF]">Tax</span>
//               <span className="font-semibold text-base">$0</span>
//             </div>
//           </div>

//           <div className="my-5 flex justify-between items-center p-3 border rounded-lg w-full h-[56px]">
//             <span className="font-medium text-base text-[#90A3BF]">Apply promo code</span>
//             <span className="font-medium mx-4 text-base">Apply code</span>
//           </div>

//           <div className="mt-4 flex justify-between items-center font-bold text-lg gap-1">
//             <div className="flex flex-col">
//               <span>Total Rental Price</span>
//               <span className="font-medium text-sm text-[#90A3BF] px-1">
//                 Overall price and includes rental discount
//               </span>
//             </div>
//             <span className="text-3xl font-bold">${price}.00</span>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default RentalSummary;