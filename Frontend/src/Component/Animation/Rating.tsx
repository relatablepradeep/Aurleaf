import React, { useState, useEffect } from 'react';

const Customer = () => {
  const [activeIndex, setActiveIndex] = useState(2);
  const [slideDirection, setSlideDirection] = useState('none');
  const [isAnimating, setIsAnimating] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [showReportForm, setShowReportForm] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(5);
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('/api/placeholder/80/80');
  const [errorType, setErrorType] = useState('Visual display issue');
  const [errorDescription, setErrorDescription] = useState('');
  
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      photo: "/api/placeholder/80/80",
      review: "This website completely transformed how I manage my online business. The intuitive interface and powerful features exceeded my expectations.",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      photo: "/api/placeholder/80/80",
      review: "I've tried many similar platforms, but none compare to the efficiency and reliability of this one. Customer support is also exceptional.",
      rating: 4
    },
    {
      id: 3,
      name: "Emma Williams",
      photo: "/api/placeholder/80/80",
      review: "The analytics tools provided valuable insights that helped grow my business by 40% in just three months. Highly recommended!",
      rating: 5
    },
    {
      id: 4,
      name: "David Rodriguez",
      photo: "/api/placeholder/80/80",
      review: "Simple to use yet powerful enough for my complex projects. The recent updates have made it even better.",
      rating: 4
    },
    {
      id: 5,
      name: "Olivia Taylor",
      photo: "/api/placeholder/80/80",
      review: "The seamless integration with other tools saves me hours every week. Worth every penny for the time-saving features alone.",
      rating: 5
    }
  ]);
  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSlideDirection('right');
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const goToPrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSlideDirection('left');
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={`text-lg md:text-xl ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
      );
    }
    return stars;
  };

  const getPositionClass = (index: number) => {
    let position = index - activeIndex;
    if (position < -2) position += testimonials.length;
    if (position > 2) position -= testimonials.length;
    return position;
  };

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePic(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName((prev) => prev + e.nativeEvent.data || "");
  };

  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview((prev) => prev + e.nativeEvent.data || "");
  };

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !review.trim()) {
      alert('Please fill in your name and review');
      return;
    }
    
    const newTestimonial = {
      id: testimonials.length + 1,
      name: name.trim(),
      photo: previewUrl,
      review: review.trim(),
      rating: rating
    };
    
    setTestimonials(prev => [...prev, newTestimonial]);
    
    // Reset form
    setName('');
    setReview('');
    setRating(5);
    setProfilePic(null);
    setPreviewUrl('/api/placeholder/80/80');
    
    setActiveIndex(testimonials.length);
    setShowFeedbackForm(false);
    
    alert('Thank you for your feedback! Your review has been added.');
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!errorDescription.trim()) {
      alert('Please describe the issue.');
      return;
    }
    alert('Thank you for your report!');
    setShowReportForm(false);
    setErrorDescription('');
    setErrorType('Visual display issue');
  };

  const getCardSize = () => {
    if (windowWidth < 640) return { width: '85%', height: '65%' };
    if (windowWidth < 768) return { width: '70%', height: '70%' };
    if (windowWidth < 1024) return { width: '60%', height: '75%' };
    return { width: '50%', height: '80%' };
  };

  const getOffsetPercentage = () => {
    if (windowWidth < 640) return 40;
    if (windowWidth < 768) return 45;
    if (windowWidth < 1024) return 50;
    return 55;
  };

  const cardSize = getCardSize();
  const offsetPercentage = getOffsetPercentage();

  const FeedbackForm = () => (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={() => setShowFeedbackForm(false)}
    >
      <form
        className="bg-white rounded-lg p-6 max-w-md w-full max-h-screen overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmitFeedback}
      >
        <h3 className="text-xl font-bold mb-4">Share Your Experience</h3>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Profile Picture</label>
          <div className="flex items-center space-x-4">
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
            />
            <label className="cursor-pointer px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm">
              Choose Photo
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleProfilePicChange}
              />
            </label>
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-1">Your Name</label>
          <input 
            id="name"
            type="text" 
            className="w-full border rounded p-2" 
            value={name}
            onChange={handleNameChange}
            placeholder="John Doe"
            autoComplete="off"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="review" className="block text-sm font-medium mb-1">Your Review</label>
          <textarea 
            id="review"
            className="w-full border rounded p-2 h-24" 
            value={review}
            onChange={handleReviewChange}
            placeholder="Share your thoughts about our website..."
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Rating</label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="text-2xl focus:outline-none"
                onClick={() => setRating(star)}
              >
                <span className={star <= rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end gap-2">
          <button 
            type="button"
            onClick={() => setShowFeedbackForm(false)}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );

  const ReportForm = () => (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={() => setShowReportForm(false)}
    >
      <form
        className="bg-white rounded-lg p-6 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmitReport}
      >
        <h3 className="text-xl font-bold mb-4">Report an Error</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Error Type</label>
          <select 
            className="w-full border rounded p-2"
            value={errorType}
            onChange={(e) => setErrorType(e.target.value)}
          >
            <option>Visual display issue</option>
            <option>Content error</option>
            <option>Navigation problem</option>
            <option>Performance issue</option>
            <option>Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea 
            className="w-full border rounded p-2 h-24" 
            placeholder="Please describe the error in detail..."
            value={errorDescription}
            onChange={(e) => setErrorDescription(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-2">
          <button 
            type="button"
            onClick={() => setShowReportForm(false)}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Submit Report
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="w-full h-full relative">
      <div className="relative w-full h-screen max-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute left-0 top-0 w-1/4 h-full z-10 cursor-pointer"
          onClick={goToPrev}
        />
        
        <div 
          className="absolute right-0 top-0 w-1/4 h-full z-10 cursor-pointer"
          onClick={goToNext}
        />
        
        <div className="relative w-full h-full flex items-center justify-center">
          {testimonials.map((testimonial, index) => {
            const position = getPositionClass(index);
            
            if (position < -2 || position > 2) return null;
            
            let translateX = position * offsetPercentage;
            let opacity = 1 - Math.abs(position) * 0.2;
            let scale = 1 - Math.abs(position) * 0.1;
            let zIndex = 5 - Math.abs(position);
            
            return (
              <div 
                key={testimonial.id}
                className="absolute bg-white rounded-lg shadow-lg flex flex-col"
                style={{
                  width: cardSize.width,
                  height: cardSize.height,
                  maxWidth: '500px',
                  maxHeight: '600px',
                  transform: `translateX(${translateX}%) scale(${scale})`,
                  opacity: opacity,
                  zIndex: zIndex,
                  transition: `all 0.5s ease-out`,
                  padding: '1.5rem',
                }}
              >
                <div className="flex justify-center -mt-12 mb-4">
                  <img 
                    src={testimonial.photo} 
                    alt={testimonial.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-blue-500 bg-white"
                  />
                </div>
                
                <h3 className="text-base sm:text-lg font-bold text-center mb-2">{testimonial.name}</h3>
                
                <div className="flex-grow overflow-y-auto mb-4">
                  <p className="text-xs sm:text-sm text-gray-600">"{testimonial.review}"</p>
                </div>
                
                <div className="flex justify-center mt-auto">
                  {renderStars(testimonial.rating)}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="absolute left-2 sm:left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-20">
          <button 
            onClick={goToPrev}
            className="bg-blue-500 hover:bg-blue-600 text-white w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg"
          >
            ←
          </button>
        </div>
        
        <div className="absolute right-2 sm:right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-20">
          <button 
            onClick={goToNext}
            className="bg-blue-500 hover:bg-blue-600 text-white w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg"
          >
            →
          </button>
        </div>
      </div>
      
      <div className="flex justify-center mt-4 gap-1 sm:gap-2 absolute bottom-20 sm:bottom-24 left-0 right-0">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${index === activeIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
            onClick={() => {
              setSlideDirection(index > activeIndex ? 'right' : 'left');
              setActiveIndex(index);
            }}
          />
        ))}
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 bg-gray-100 p-4 text-center">
        <p className="text-sm sm:text-base text-gray-700 mb-3">
          If you find any error, please report to us or want to give us feedback
        </p>
        <div className="flex justify-center gap-3 sm:gap-6">
          <button 
            onClick={() => setShowReportForm(true)}
            className="px-3 py-2 sm:px-4 sm:py-2 bg-red-500 hover:bg-red-600 text-white text-xs sm:text-sm rounded-lg shadow transition-colors"
          >
            Report Error
          </button>
          <button 
            onClick={() => setShowFeedbackForm(true)}
            className="px-3 py-2 sm:px-4 sm:py-2 bg-blue-500 hover:bg-blue-600 text-white text-xs sm:text-sm rounded-lg shadow transition-colors"
          >
            Give Feedback
          </button>
        </div>
      </div>
      
      {showFeedbackForm && <FeedbackForm />}
      {showReportForm && <ReportForm />}
    </div>
  );
};

export default Customer;