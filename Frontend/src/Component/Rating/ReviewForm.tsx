import { useState, useEffect } from 'react';


type Review = {
  name: string;
  rating: number;
  thought: string;
  photo?: string;
};

const defaultAvatarURL = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

const ReviewForm = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  const [formData, setFormData] = useState<{
    name: string;
    rating: number;
    thought: string;
    photo: string;
  }>({
    name: '',
    rating: 0, 
    thought: '',
    photo: defaultAvatarURL,
  });

  const [reviews, setReviews] = useState<Review[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string>(defaultAvatarURL);

  const fetchReviews = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/reviews');
      const data = await res.json();
      setReviews(data);
      if (data.length > 0) {
        setActiveIndex(0);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const goToNext = () => setActiveIndex((prev) => (prev + 1) % reviews.length);
  const goToPrev = () => setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  const renderStars = (rating: number) => (
    <div className="flex justify-center mt-2">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={`text-lg ${i < rating ? 'text-amber-400' : 'text-gray-400'}`}>★</span>
      ))}
    </div>
  );

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setFormData((prev) => ({ ...prev, photo: url }));
    }
  };

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.thought.trim()) {
      alert('Please enter your name and review');
      return;
    }

    try {
      const res = await fetch('http://localhost:3001/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          rating: formData.rating,
          thought: formData.thought,
          photo: formData.photo,
        }),
      });

      const result = await res.json();
      if (res.ok) {
        setFormData({
          name: '',
          rating: 0, // Reset to 0 as well
          thought: '',
          photo: defaultAvatarURL,
        });
        setPreviewUrl(defaultAvatarURL);
        setShowFeedbackForm(false);
        fetchReviews();
      } else {
        alert(result.message || 'Error submitting review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Error submitting review');
    }
  };

  return (
    <div className="w-full flex flex-col items-center bg-amber-50 from-amber-100 via-amber-50 to-amber-100 transition-all text-gray-900 py-16 px-4 font-sans">
      <h2 className="text-4xl sm:text-5xl font-bold text-amber-600 text-center mb-10 tracking-wide">
        Your Health, Your Story
      </h2>

      {/* Reviews Carousel */}
      {reviews.length > 0 && (
        <>
          <div className="relative w-full max-w-4xl flex items-center justify-center">
            <button
              onClick={goToPrev}
              className="absolute left-0 sm:left-4 bg-amber-500 hover:bg-amber-600 text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-md flex items-center justify-center z-10 transition"
            >
              ←
            </button>

            <div className="w-full max-w-lg p-6 bg-amber-50 border border-amber-100 rounded-xl shadow-md text-center transition-all duration-300">
              <div className="flex justify-center -mt-14 mb-4">
                <img
                  src={reviews[activeIndex]?.photo || defaultAvatarURL}
                  alt={reviews[activeIndex]?.name || 'Profile Preview'}
                  className="w-20 h-20 rounded-full object-cover border-4 border-amber-500 bg-white"
                  onError={(e) => {
                    e.currentTarget.src = defaultAvatarURL;
                  }}
                />
              </div>
              <h3 className="text-lg font-semibold text-amber-800">
                {reviews[activeIndex]?.name}
              </h3>
              <p className="text-sm text-gray-600 mt-2">{reviews[activeIndex]?.thought}</p>
              {reviews[activeIndex] && renderStars(reviews[activeIndex].rating)}
            </div>

            <button
              onClick={goToNext}
              className="absolute right-0 sm:right-4 bg-amber-500 hover:bg-amber-600 text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-md flex items-center justify-center z-10 transition"
            >
              →
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex ? 'bg-amber-600 scale-125' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </>
      )}

      {/* Feedback CTA */}
      <div className="mt-10 bg-amber-50 border border-amber-100 p-6 rounded-lg text-center shadow-md w-full max-w-lg">
        <p className="text-sm sm:text-base text-gray-700 mb-3">
          Want to share your experience? Leave a review!
        </p>
        <button
          onClick={() => setShowFeedbackForm(true)}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm rounded-lg shadow transition"
        >
          Give Feedback
        </button>
      </div>

      {/* Feedback Form with Blurred Backdrop */}
      {showFeedbackForm && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white text-gray-800 rounded-xl p-6 w-full max-w-md shadow-lg"
          >
            <h3 className="text-xl font-bold mb-4 text-amber-700">Share Your Experience</h3>

            <label htmlFor="profile-picture" className="block text-sm font-medium mb-1 text-gray-700">Profile Picture</label>
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={previewUrl || defaultAvatarURL}
                alt="Profile Preview"
                className="w-16 h-16 rounded-full border-2 border-amber-500"
                onError={(e) => {
                  e.currentTarget.src = defaultAvatarURL;
                }}
              />
              <input
                id="profile-picture"
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
              />
            </div>

            {/* RATING SECTION */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-gray-700 text-center w-full">
                Rating
              </label>
              <div className="flex justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, rating: star }))}
                    className={`text-2xl ${
                      star <= formData.rating ? 'text-amber-400' : 'text-gray-400'
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            {/* END RATING SECTION */}

            <label htmlFor="reviewer-name" className="block text-sm font-medium mb-1 text-gray-700">Your Name</label>
            <input
              id="reviewer-name"
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4 bg-white"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              required
            />

            <label htmlFor="review-text" className="block text-sm font-medium mb-1 text-gray-700">Your Review</label>
            <textarea
              id="review-text"
              className="w-full border border-gray-300 rounded px-3 py-2 h-24 bg-white"
              placeholder="Write your review..."
              value={formData.thought}
              onChange={(e) => setFormData((prev) => ({ ...prev, thought: e.target.value }))}
              required
            />

            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={() => setShowFeedbackForm(false)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg mr-2"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewForm;
