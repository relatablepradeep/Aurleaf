import { useState } from "react";

const Customer = () => {
  const [activeIndex, setActiveIndex] = useState(2);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [previewUrl, setPreviewUrl] = useState("/api/placeholder/80/80");

  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      photo: "/api/placeholder/80/80",
      review: "Ayurleaf's personalized care changed my life. Highly recommended!",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      photo: "/api/placeholder/80/80",
      review: "Great experience with Ayurvedic consultation. Felt amazing!",
      rating: 4,
    },
    {
      id: 3,
      name: "Emma Williams",
      photo: "/api/placeholder/80/80",
      review: "Best natural treatments. My health has improved significantly.",
      rating: 5,
    },
  ]);

  const goToNext = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const goToPrev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const renderStars = (rating) => (
    <div className="flex justify-center mt-2">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={`text-lg ${i < rating ? "text-amber-400" : "text-gray-400"}`}>★</span>
      ))}
    </div>
  );

  const handleProfilePicChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    if (!name.trim() || !review.trim()) {
      alert("Please enter your name and review");
      return;
    }

    const newTestimonial = {
      id: testimonials.length + 1,
      name: name.trim(),
      photo: previewUrl,
      review: review.trim(),
      rating,
    };

    setTestimonials((prev) => [...prev, newTestimonial]);
    setActiveIndex(testimonials.length - 1);
    setShowFeedbackForm(false);
    setName("");
    setReview("");
    setRating(5);
    setPreviewUrl("/api/placeholder/80/80");
  };

  return (
    <div className="w-full flex flex-col items-center bg-white bg-gradient-to-b from-amber-100 via-amber-50 to-amber-100 transition-all text-gray-900 py-16 px-4 font-sans">
      <h2 className="text-4xl sm:text-5xl font-bold text-amber-600 text-center mb-10 tracking-wide">
        Your Health, Your Story
      </h2>

      {/* Carousel */}
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
              src={testimonials[activeIndex].photo}
              alt={testimonials[activeIndex].name}
              className="w-20 h-20 rounded-full object-cover border-4 border-amber-500 bg-white"
            />
          </div>
          <h3 className="text-lg font-semibold text-amber-800">{testimonials[activeIndex].name}</h3>
          <p className="text-sm text-gray-600 mt-2">{testimonials[activeIndex].review}</p>
          {renderStars(testimonials[activeIndex].rating)}
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
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === activeIndex ? "bg-amber-600 scale-125" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

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

      {/* Feedback Form */}
      {showFeedbackForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <form
            onSubmit={handleSubmitFeedback}
            onClick={(e) => e.stopPropagation()}
            className="bg-white text-gray-800 rounded-xl p-6 w-full max-w-md shadow-lg"
          >
            <h3 className="text-xl font-bold mb-4 text-amber-700">Share Your Experience</h3>

            <label className="block text-sm font-medium mb-1 text-gray-700">Profile Picture</label>
            <div className="flex items-center space-x-4 mb-4">
              <img src={previewUrl} className="w-16 h-16 rounded-full border-2 border-amber-500" />
              <input type="file" accept="image/*" onChange={handleProfilePicChange} />
            </div>

            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4 bg-white"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <textarea
              className="w-full border border-gray-300 rounded px-3 py-2 h-24 bg-white"
              placeholder="Write your review..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
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
                type="submit"
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg"
              >
                Submit Review
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Customer;
