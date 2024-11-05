import axios from 'axios';

export const Base_url = 'http://localhost:8000/api/'

// Define the base URL for your Django backend
const API_URL = process.env.REACT_APP_API_URL || Base_url; // Update this URL if necessary

// Function to fetch all blog posts from the backend
export const fetchBlogPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}/blogposts/`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching blog posts:', error.response ? error.response.data : error.message);
    throw new Error('Unable to fetch blog posts. Please try again later.');
  }
};

// Function to set the auth token in the headers for authenticated requests
export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};





// Function to create a new  post
export const createBlogPost = async (postData) => {
  try {
    const response = await axios.post(`${API_URL}/blogposts/`, postData);
    return response.data; // Return the created post data
  } catch (error) {
    console.error('Error creating blog post:', error.response ? error.response.data : error.message);
    throw new Error('Unable to create blog post. Please try again later.');
  }
};