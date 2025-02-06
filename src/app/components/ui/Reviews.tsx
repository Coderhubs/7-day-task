"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { client } from "@/sanity/lib/client";

// Add this interface at the top of the file
interface Review {
  _id: string;
  name: string;
  role: string;
  review: string;
  rating: number;
  date: string;
  profileImg?: string;
  userId: string | null | undefined;
  userProfile: {
    _type: string;
    image: string;
  };
}

const Reviews = () => {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({
    name: "",
    role: "",
    review: "",
    rating: 0,
  });

  // Fetch reviews from Sanity
  useEffect(() => {
    const fetchReviews = async () => {
      const reviewsData = await client.fetch(`
        *[_type == "review"] | order(_createdAt desc) {
          _id,
          name,
          role,
          review,
          rating,
          date,
          "profileImg": userProfile.image,
          userId
        }
      `);
      setReviews(reviewsData);
    };
    fetchReviews();
  }, []);

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
  const handleAddReview = async () => {
    if (!session) {
      alert("Please sign in to add a review");
      return;
    }

    if (newReview.review && newReview.rating > 0) {
      // Create new review document in Sanity
      const reviewDoc = {
        _type: 'review',
        name: session.user?.name || '',
        role: newReview.role || 'Verified User',
        review: newReview.review,
        rating: newReview.rating,
        date: new Date().toLocaleDateString(),
        userId: session.user?.email,
        userProfile: {
          _type: 'reference',
          image: session.user?.image || '/images/default-profile.jpg'
        }
      };

      try {
        const response = await client.create(reviewDoc);
        
        // Update local state with new review
        setReviews([
          {
            ...reviewDoc,
            _id: response._id,
            profileImg: session.user?.image || '/images/fallback.jpg'
          },
          ...reviews
        ]);

        // Reset form
        setNewReview({ name: "", role: "", review: "", rating: 0 });
      } catch (error) {
        console.error("Error adding review:", error);
        alert("Failed to add review. Please try again.");
      }
    } else {
      alert("Please provide a review and rating.");
    }
  };

  // Delete review
  const handleDeleteReview = async (reviewId: string) => {
    if (!session) return;

    const review = reviews.find(r => r._id === reviewId);
    if (review?.userId !== session.user?.email) {
      alert("You can only delete your own reviews");
      return;
    }

    try {
      await client.delete(reviewId);
      setReviews(reviews.filter(r => r._id !== reviewId));
    } catch (error) {
      console.error("Error deleting review:", error);
      alert("Failed to delete review. Please try again.");
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
        {reviews.map((review) => (
          <div key={review._id} className="flex flex-col sm:flex-row items-start gap-4">
            <Image
              src={review.profileImg || '/images/default-profile.jpg'}
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
              
              {/* Delete button - only shown for user's own reviews */}
              {session?.user?.email === review.userId && (
                <button
                  onClick={() => handleDeleteReview(review._id)}
                  className="text-red-500 text-sm mt-2 hover:text-red-600"
                >
                  Delete Review
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Review Form */}
      {session ? (
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-4">Add Your Review</h3>
          <div className="space-y-4">
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
      ) : (
        <p className="mt-6 text-center text-gray-500">Please sign in to add a review</p>
      )}
    </div>
  );
};

export default Reviews;
