import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Base_url } from '../api';

const EditHotel = () => {
  const { user } = useUser();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { id } = useParams(); // Get the hotel ID from the URL

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await axios.get(`${Base_url}accounts/hotels/${id}/`, {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
        });
        const hotel = response.data;
        setTitle(hotel.title);
        setDescription(hotel.description);
        setTags(hotel.tags);
      } catch (error) {
        const errorMsg = error.response?.data?.detail || 'Failed to fetch hotel details. Please try again.';
        setErrorMessage(errorMsg);
      }
    };

    fetchHotelDetails();
  }, [id, user.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('tags', tags);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.put(
        `${Base_url}accounts/hotels/${id}/`,  // Change to PUT request for updating
        formData,
        {
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        setSuccessMessage('Hotel updated successfully!');
        navigate('/'); // Redirect after success
      } else {
        setErrorMessage('Failed to update hotel. Please try again.');
      }
    } catch (error) {
      const errorMsg = error.response?.data?.detail || 'Failed to update hotel. Please try again.';
      setErrorMessage(errorMsg);
      console.error('Failed to update hotel:', errorMsg);
    }
  };

  return (
    <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold mb-6">Edit Hotel</h1>
      {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Hotel Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border border-gray-300 rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
        <div>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="border border-gray-300 rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            rows="6"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Tags (optional)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="border border-gray-300 rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
        <div>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="border border-gray-300 rounded-lg p-4 w-full"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
        >
          Update Hotel
        </button>
      </form>
    </div>
  );
};

export default EditHotel;
