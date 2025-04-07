import  { useState, useEffect } from "react";

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
        <span key={i} className={`text-lg ${i < rating ? "text-yellow-400" : "text-gray-500"}`}>
          ★
        </span>
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
      rating: rating,
    };

    setTestimonials((prev) => [...prev, newTestimonial]);
    setActiveIndex(testimonials.length - 1); // Auto-scroll to the new review
    setShowFeedbackForm(false);
    setName("");
    setReview("");
    setRating(5);
    setPreviewUrl("/api/placeholder/80/80");
  };

  return (
    <div className="w-full h-auto flex flex-col justify-center items-center 
    bg-gradient-to-b from-black via-gray-800 to-transparent text-gray-100 py-12">
      
      <h2 className="text-5xl text-center font-extrabold tracking-wide text-green-400">
        Your Health, Your Story
      </h2>
      
   
      <div className="relative w-full max-w-4xl flex items-center justify-center mt-10">
       
        <button
          onClick={goToPrev}
          className="absolute left-0 sm:left-4 bg-green-500 hover:bg-green-600 text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-lg z-20"
        >
          ←
        </button>

      
        <div className="w-full max-w-lg p-6 bg-gray-900 rounded-lg shadow-lg text-gray-100 text-center">
          <div className="flex justify-center -mt-12 mb-4">
            <img
              src={testimonials[activeIndex].photo}
              alt={testimonials[activeIndex].name}
              className="w-20 h-20 rounded-full object-cover border-4 border-green-500 bg-white"
            />
          </div>
          <h3 className="text-lg font-bold">{testimonials[activeIndex].name}</h3>
          <p className="text-sm text-gray-300 mt-2">{testimonials[activeIndex].review}</p>
          {renderStars(testimonials[activeIndex].rating)}
        </div>

       
        <button
          onClick={goToNext}
          className="absolute right-0 sm:right-4 bg-green-500 hover:bg-green-600 text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-lg z-20"
        >
          →
        </button>
      </div>

   
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeIndex ? "bg-green-500" : "bg-gray-600"}`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>

      
      <div className="mt-10 bg-gray-900 p-6 rounded-lg text-center shadow-lg w-full max-w-lg">
        <p className="text-sm sm:text-base text-gray-300 mb-3">
          Want to share your experience? Leave a review!
        </p>
        <button
          onClick={() => setShowFeedbackForm(true)}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm rounded-lg shadow transition-colors"
        >
          Give Feedback
        </button>
      </div>

   
      {showFeedbackForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <form
            className="bg-gray-900 text-gray-100 rounded-lg p-6 max-w-md mx-auto"
            onSubmit={handleSubmitFeedback}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-4">Share Your Experience</h3>

            <label className="block text-sm font-medium mb-2">Profile Picture</label>
            <div className="flex items-center space-x-4 mb-4">
              <img src={previewUrl} className="w-16 h-16 rounded-full border-2 border-green-500" />
              <input type="file" accept="image/*" onChange={handleProfilePicChange} />
            </div>

            <input
              type="text"
              className="w-full border rounded p-2 mb-4 bg-gray-800 text-gray-100"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <textarea
              className="w-full border rounded p-2 h-24 bg-gray-800 text-gray-100"
              placeholder="Write your review..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />

            <div className="flex justify-end mt-4">
              <button type="button" onClick={() => setShowFeedbackForm(false)} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg mr-2">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg">
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
