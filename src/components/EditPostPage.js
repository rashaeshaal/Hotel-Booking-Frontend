import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate for redirection
import { Base_url } from '../api';

const EditPostPage = () => {
  const { id } = useParams(); // Extract the 'id' from the URL params
  const navigate = useNavigate(); // Initialize navigation
  const [hotelDetails, setHotelDetails] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    amount: '',
    image: null,
  });

  // Fetch hotel details on component mount
  useEffect(() => {
    if (id) {
      axios.get(`${Base_url}accounts/hotelposts/${id}/`)
        .then((response) => {
          setHotelDetails(response.data);
          setFormData(response.data);  // Populate form data with fetched hotel details
        })
        .catch((error) => {
          console.error('Error fetching hotel details:', error);
        });
    } else {
      console.error('Hotel ID is undefined');
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      if (files && files[0]) {
        setFormData({ ...formData, image: files[0] });  // Store the file
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const updatedFormData = new FormData();
    updatedFormData.append('title', formData.title);
    updatedFormData.append('content', formData.content);
    updatedFormData.append('amount', formData.amount);
  
    if (formData.image instanceof File) {
      updatedFormData.append('image', formData.image); // If formData.image is a file object
    }
  
    axios.put(`${Base_url}accounts/hotelposts/${id}/`, updatedFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      console.log("Updated hotel post:", response.data);
      navigate('/post-list'); 
    })
    .catch((error) => {
      console.error("Error updating hotel post:", error);
    });
  };
  
  if (!hotelDetails) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Edit Hotel</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Hotel Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Hotel Title"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
            Hotel Description
          </label>
          <textarea
            name="content"
            id="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Hotel Description"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
            Price
          </label>
          <input
            type="number"
            name="amount"
            id="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Price"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
            Upload Image
          </label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none"
          >
            Update Hotel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPostPage;
