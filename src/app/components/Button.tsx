import React from 'react'
import Link from 'next/link'

const Button = () => {
  return (
    <div>
      <div className="flex justify-between items-center mt-12">
 
 {/* Show More Button centered */}
 <Link href="/about" className="inline-block mx-auto">
   <button className="px-6 py-3 text-base font-medium text-white bg-[#3563E9] rounded-md hover:bg-[#274bc9] transition duration-300 max-w-[200px]">
     Show more cars
   </button>
   
 </Link>
  {/* 120 Car Button */}
  <button className="text-slate-600 hover:text-black">
   120 Car
 </button>

</div>

    </div>
  )
}

export default Button;
