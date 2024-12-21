import React from "react";
import Image from "next/image"; // Import Image from next/image
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FaChevronDown } from "react-icons/fa";

const Reviews = () => {
  return (
    <div className="w-full max-w-[1016px] p-4 md:p-6 lg:p-8 bg-white rounded-lg shadow-md mx-auto">
      {/* Reviews Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg md:text-xl font-bold p-2">Reviews</h2>
        <span className="bg-blue-500 text-white text-xs md:text-sm px-3 py-1 rounded-full">
          13
        </span>
      </div>

      {/* Review List */}
      <div className="space-y-6">
        {/* Review 1 */}
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <Image
            src="/images/profile.jpg"
            alt="Alex Stanton"
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex justify-between items-start flex-wrap gap-2">
              <div>
                <h3 className="text-base md:text-lg font-bold">Alex Stanton</h3>
                <p className="text-sm md:text-base font-medium text-gray-500">
                  CEO at Bukalapak
                </p>
              </div>
              <div className="text-sm text-gray-400 text-right">
                <p>21 July 2022</p>
                <div className="flex text-yellow-500 mt-1">
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiOutlineStar />
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-sm md:text-base mt-4">
              We are very happy with the service from the MORENT App. Morent
              has a low price and also a large variety of cars with good and
              comfortable facilities. In addition, the service provided by
              the officers is also very friendly and very polite.
            </p>
          </div>
        </div>

        {/* Review 2 */}
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <Image
            src="/images/skylex.jpg"
            alt="Skylar Dias"
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex justify-between items-start flex-wrap gap-2">
              <div>
                <h3 className="text-base md:text-lg font-bold">Skylar Dias</h3>
                <p className="text-sm md:text-base font-medium text-gray-500">
                  CEO at Amazon
                </p>
              </div>
              <div className="text-sm text-gray-400 text-right">
                <p>20 July 2022</p>
                <div className="flex text-yellow-500 mt-1">
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiOutlineStar />
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-sm md:text-base mt-4">
              We are greatly helped by the services of the MORENT
              Application. Morent has low prices and also a wide variety of
              cars with good and comfortable facilities. In addition, the
              service provided by the officers is also very friendly and
              very polite.
            </p>
          </div>
        </div>
      </div>

      {/* Show All Button */}
      <div className="text-center mt-6">
        <button className="text-blue-500 flex items-center justify-center gap-1 text-sm md:text-base font-semibold hover:underline">
          Show All <FaChevronDown />
        </button>
      </div>
    </div>
  );
};

export default Reviews;
