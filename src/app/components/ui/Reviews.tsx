
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Reviews = () => {
  const [reviews, setReviews] = useState([
    {
      name: "Alex Stanton",
      role: "CEO at Bukalapak",
      date: "21 July 2022",
      review:
        "We are very happy with the service from the MORENT App. Morent has a low price and also a large variety of cars with good and comfortable facilities. In addition, the service provided by the officers is also very friendly and very polite.",
      rating: 4,
      profileImg: "/images/profile.jpg",
    },
    {
      name: "Skylar Dias",
      role: "CEO at Amazon",
      date: "20 July 2022",
      review:
        "We are greatly helped by the services of the MORENT Application. Morent has low prices and also a wide variety of cars with good and comfortable facilities. In addition, the service provided by the officers is also very friendly and very polite.",
      rating: 4,
      profileImg: "/images/skylex.jpg",
    },
  ]);

  const [newReview, setNewReview] = useState({
    name: "",
    role: "",
    review: "",
    rating: 0,
  });

  // Handle form input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  // Handle star rating
  const handleRating = (rating: number) => {
    setNewReview({ ...newReview, rating });
  };

  // Add new review
  const handleAddReview = () => {
    if (newReview.name && newReview.review && newReview.rating > 0) {
      setReviews([
        ...reviews,
        {
          ...newReview,
          date: new Date().toLocaleDateString(),
          profileImg: "/images/default-profile.jpg", // Default profile image
        },
      ]);
      setNewReview({ name: "", role: "", review: "", rating: 0 });
    } else {
      alert("Please fill out all fields and provide a rating.");
    }
  };

  return (
    <div className="w-full max-w-[1016px] p-4 md:p-6 lg:p-8 bg-white rounded-lg shadow-md mx-auto">
      {/* Reviews Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg md:text-xl font-bold p-2">Reviews</h2>
        <span className="bg-blue-500 text-white text-xs md:text-sm px-3 py-1 rounded-full">
          {reviews.length}
        </span>
      </div>

      {/* Review List */}
      <div className="space-y-6">
        {reviews.map((review, index) => (
          <div key={index} className="flex flex-col sm:flex-row items-start gap-4">
            <Image
              src={review.profileImg}
              alt={review.name}
              width={48}
              height={48}
              className="rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <div>
                  <h3 className="text-base md:text-lg font-bold">{review.name}</h3>
                  <p className="text-sm md:text-base font-medium text-gray-500">{review.role}</p>
                </div>
                <div className="text-sm text-gray-400 text-right">
                  <p>{review.date}</p>
                  <div className="flex text-yellow-500 mt-1">
                    {[...Array(5)].map((_, i) =>
                      i < review.rating ? <AiFillStar key={i} /> : <AiOutlineStar key={i} />
                    )}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm md:text-base mt-4">{review.review}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add Review Form */}
      <div className="mt-6">
        <h3 className="text-lg font-bold mb-4">Add Your Review</h3>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={newReview.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="text"
            name="role"
            placeholder="Your Role (Optional)"
            value={newReview.role}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
          />
          <textarea
            name="review"
            placeholder="Your Review"
            value={newReview.review}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
          />
          <div className="flex items-center gap-2">
            <span className="text-sm">Rating:</span>
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <span key={i} onClick={() => handleRating(i + 1)} className="cursor-pointer">
                  {i < newReview.rating ? <AiFillStar /> : <AiOutlineStar />}
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={handleAddReview}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
