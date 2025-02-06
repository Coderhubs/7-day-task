"use client";

import React, { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

// interface RatingProps {
//   initialRating?: number;
//   onRate?: (newRating: number) => void;
// }

const Rating: React.FC = () => {
 const [rating, setRating] = useState(0); // Initial rating (out of 5)
  const [reviews, setReviews] = useState(0); // Initial reviews count

  // Handle star click
  const handleRate = (newRating: number) => {
    setRating(newRating); // Update rating
    setReviews((prev) => prev + 1); // Increment reviews
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1 cursor-pointer">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => handleRate(star)}
            className={star <= rating ? "text-yellow-500" : "text-yellow-500"}
          >
            {star <= rating ? <FaStar /> : <FaRegStar />}
          </span>
        ))}
      </div>
      <p className="text-sm text-gray-600">{reviews}+ Reviews</p>
    </div>
  );
};

export default Rating;
