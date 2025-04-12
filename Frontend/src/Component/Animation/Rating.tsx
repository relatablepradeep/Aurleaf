import { useState, useEffect } from "react";

const Customer = () => {
  const initialTestimonials = [
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
  ];

  const [testimonials, setTestimonials] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [previewUrl, setPreviewUrl] = useState("/api/placeholder/80/80");

  useEffect(() => {
    const saved = localStorage.getItem("testimonials");
    if (saved) {
      setTestimonials(JSON.parse(saved));
    } else {
      localStorage.setItem("testimonials", JSON.stringify(initialTestimonials));
      setTestimonials(initialTestimonials);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("testimonials", JSON.stringify(testimonials));
  }, [testimonials]);

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
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitFeedback = (e) => {
    e.preventDefault();

    if (!name || !review) {
      alert("Please fill in all fields");
      return;
    }

    const newFeedback = {
      id: Date.now(),
      name,
      review,
      rating,
      photo: previewUrl,
    };

    const updated = [...testimonials, newFeedback];
    setTestimonials(updated);
    setActiveIndex(updated.length - 1);

    // Reset
    setShowFeedbackForm(false);
    setName("");
    setReview("");
    setRating(5);
    setPreviewUrl("/api/placeholder/80/80");
  };

  return (
    <div className="relative z-10 w-full min-h-screen flex flex-col items-center bg-gradient-to-b from-amber-100 via-amber-50 to-amber-100 text-gray-900 py-16 px-4">
      <h2 className="text-4xl font-bold text-amber-600 text-center mb-10">Your Health, Your Story</h2>

      {/* Carousel */}
      {testimonials.length > 0 && (
        <div className="relative w-full max-w-3xl flex items-center justify-center">
          <button onClick={goToPrev} className="absolute left-0 bg-amber-500 text-white rounded-full w-10 h-10 shadow-md">←</button>
          
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto text-center border border-amber-200">
            <img
              src={testimonials[activeIndex].photo}
              alt={testimonials[activeIndex].name}
              className="w-20 h-20 mx-auto rounded-full border-2 border-amber-500 object-cover"
            />
            <h3 className="text-xl font-semibold mt-4">{testimonials[activeIndex].name}</h3>
            <p className="mt-2 text-gray-700">{testimonials[activeIndex].review}</p>
            {renderStars(testimonials[activeIndex].rating)}
          </div>

          <button onClick={goToNext} className="absolute right-0 bg-amber-500 text-white rounded-full w-10 h-10 shadow-md">→</button>
        </div>
      )}

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {testimonials.map((_, i) => (
          <div
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer ${i === activeIndex ? "bg-amber-600" : "bg-gray-400"}`}
          />
        ))}
      </div>

      {/* Button to Open Modal */}
      <div className="mt-10">
        <button
          onClick={() => setShowFeedbackForm(true)}
          className="bg-amber-500 text-white px-6 py-2 rounded-full hover:bg-amber-600"
        >
          Give Feedback
        </button>
      </div>

      {/* Feedback Form Modal */}
      {showFeedbackForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-md rounded-lg p-6 mx-4"
          >
            <h2 className="text-lg font-bold mb-4 text-amber-600">Share Your Experience</h2>
            <form onSubmit={handleSubmitFeedback}>
              <label className="block mb-2 text-sm">Profile Picture</label>
              <div className="flex items-center gap-4 mb-4">
                <img src={previewUrl} alt="preview" className="w-14 h-14 rounded-full border border-amber-400" />
                <input type="file" accept="image/*" onChange={handleProfilePicChange} />
              </div>

              <input
                type="text"
                placeholder="Your Name"
                className="w-full mb-4 p-2 border rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <textarea
                placeholder="Your Feedback"
                className="w-full mb-4 p-2 border rounded h-24"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
              />

              <label className="block mb-1 text-sm">Your Rating</label>
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className={`text-xl ${star <= rating ? "text-amber-400" : "text-gray-400"}`}
                  >
                    ★
                  </button>
                ))}
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowFeedbackForm(false)}
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 rounded bg-amber-500 text-white hover:bg-amber-600">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customer;
