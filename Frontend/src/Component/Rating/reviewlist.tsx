import { useState, useEffect } from "react";
import { Star } from "lucide-react";

export default function ReviewsComponent() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Form state
  const [username, setUsername] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);

  // Fetch all reviews when component mounts
  useEffect(() => {
    fetchReviews();
  }, []);

  // Fetch reviews from API
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3005/api/v1/Reviews/reviews");
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      setReviews(data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
      setError("Failed to load reviews. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Submit new review
  const handleSubmit = async () => {
    // Validate required fields
    if (!username || !photoUrl || !reviewText) {
      setSubmitMessage("Please fill all required fields");
      return;
    }
    
    setSubmitting(true);
    setSubmitMessage(null);
    
    try {
      const response = await fetch("http://localhost:3005/api/v1/Reviews/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          photo: photoUrl,
          review: reviewText,
          rating: Number(rating),
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const newReview = await response.json();
      
      // Add new review to the list and reset form
      setReviews([newReview, ...reviews]);
      setUsername("");
      setPhotoUrl("");
      setReviewText("");
      setRating(5);
      setSubmitMessage("Review submitted successfully!");
      
      // Refresh reviews from server to ensure we have the latest data
      fetchReviews();
    } catch (err) {
      console.error("Failed to submit review:", err);
      setSubmitMessage("Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Render stars for ratings
  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={18}
            fill={star <= rating ? "#FFD700" : "none"}
            stroke={star <= rating ? "#FFD700" : "#9CA3AF"}
          />
        ))}
      </div>
    );
  };
  
  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
      
      {/* Review submission form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
        
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Photo URL (Avatar)
              </label>
              <input
                type="text"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rating
            </label>
            <div className="flex items-center">
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="5">5 - Excellent</option>
                <option value="4">4 - Very Good</option>
                <option value="3">3 - Good</option>
                <option value="2">2 - Fair</option>
                <option value="1">1 - Poor</option>
              </select>
              <div className="ml-4">
                {renderStars(Number(rating))}
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Review
            </label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
          
          {submitMessage && (
            <p className={`mt-2 text-sm ${submitMessage.includes("Failed") ? "text-red-600" : "text-green-600"}`}>
              {submitMessage}
            </p>
          )}
        </div>
      </div>
      
      {/* Display reviews */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Recent Reviews</h3>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
            <p className="mt-2">Loading reviews...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="text-red-700">{error}</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-gray-600">No reviews yet. Be the first to leave a review!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review._id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start">
                  <div className="mr-4">
                    <img
                      src={review.photo || "/api/placeholder/40/40"}
                      alt={`${review.username}'s avatar`}
                      className="w-10 h-10 rounded-full object-cover"
                      onError={(e) => {
                        e.target.src = "/api/placeholder/40/40";
                      }}
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{review.username}</h4>
                      <span className="text-sm text-gray-500">
                        {formatDate(review.createdAt)}
                      </span>
                    </div>
                    
                    <div className="mb-2">
                      {renderStars(review.rating)}
                    </div>
                    
                    <p className="text-gray-700">{review.review}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}