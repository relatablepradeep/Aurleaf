import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReviewsComponent = () => {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    photo: '',
    review: '',
    rating: 0,
  });

  const fetchReviews = async () => {
    try {
      const response = await axios.get('http://localhost:3005/api/v1/Reviews/reviews');
      setReviews(response.data);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3005/api/v1/Reviews/reviews', formData);
      setReviews([response.data, ...reviews]); // Add new review on top
      setFormData({
        username: '',
        photo: '',
        review: '',
        rating: 0,
      });
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div>
      <h2>Submit a Review</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Photo URL"
          value={formData.photo}
          onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
          required
        />
        <textarea
          placeholder="Write your review"
          value={formData.review}
          onChange={(e) => setFormData({ ...formData, review: e.target.value })}
          required
        />
        <input
          type="number"
          min="1"
          max="5"
          placeholder="Rating"
          value={formData.rating}
          onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
          required
        />
        <button type="submit">Submit</button>
      </form>

      <h3>All Reviews</h3>
      {reviews.map((r) => (
        <div key={r._id} style={{ border: '1px solid #ccc', margin: '10px 0' }}>
          <img src={r.photo} alt={r.username} width="50" height="50" />
          <h4>{r.username}</h4>
          <p>{r.review}</p>
          <strong>Rating: {r.rating}</strong>
        </div>
      ))}
    </div>
  );
};

export default ReviewsComponent;
