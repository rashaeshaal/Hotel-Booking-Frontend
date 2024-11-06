import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Base_url } from '../api';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${Base_url}accounts/postsviews/`);
        console.log('Fetched Posts:', response.data); 
        setPosts(response.data || []);
      } catch (err) {
        setError(err.response?.data?.detail || 'Failed to fetch posts');
        console.error('Fetch Error:', err); 
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4 text-center">Welcome</h1>
      <p className="text-lg text-center mb-6">Explore the latest Hotels</p>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => {
            console.log('Post Details:', post); 
            return (
              <div key={post.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                {post?.image ? (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover mb-4 rounded-lg"
                    onError={(e) => {
                      e.target.src = 'fallback-image-url.jpg'; 
                    }}
                  />
                ) : (
                  <p>No image available</p>
                )}
              
                <p className="text-gray-700 mb-4">{post.content.slice(0, 100)}...</p>
                <p className="text-lg font-bold mb-4">Amount: ${post.amount}</p> {/* Display amount */}
                <div className="text-right">
                  <Link
                    to="/payment-gateway"  
                    className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                  >
                    Book
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center">No posts available</p>
      )}
    </div>
  );
};

export default Home;
