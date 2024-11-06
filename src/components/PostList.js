import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation
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
        console.error('Error fetching posts:', err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : posts.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 border-b font-semibold text-left">Title</th>
                <th className="px-6 py-3 border-b font-semibold text-left">Image</th>
                <th className="px-6 py-3 border-b font-semibold text-left">Content</th>
                <th className="px-6 py-3 border-b font-semibold text-left">Amount</th>
                <th className="px-6 py-3 border-b font-semibold text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id || post.created_at} className="hover:bg-gray-50">
                  <td className="px-6 py-4 border-b">{post.title}</td>
                  <td className="px-6 py-4 border-b">
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-16 h-16 object-cover rounded-lg"
                        onError={(e) => { e.target.src = 'fallback-image-url.jpg'; }}
                      />
                    ) : (
                      <p>No image</p>
                    )}
                  </td>
                  <td className="px-6 py-4 border-b">{post.content}</td>
                  <td className="px-6 py-4 border-b">${post.amount}</td>
                  <td className="px-6 py-4 border-b">
                    <Link
                      to={`/hotels/${post.id}/edit`} // Link to edit page for this post
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center">No posts available</p>
      )}
    </div>
  );
};

export default Home;
