import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Base_url } from '../api';

const SinglePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${Base_url}accounts/postsviews/${id}/`);
        console.log('Fetched post:', response.data);
        setPost(response.data);
      } catch (err) {
        setError('Failed to fetch post data');
        console.error('Error fetching post:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await axios.delete(`${Base_url}accounts/postsviews/${id}/delete/`);
        navigate('/'); // Redirect to home after successful deletion
      } catch (err) {
        setError('Failed to delete post');
        console.error('Error deleting post:', err.message);
      }
    }
  };

  if (loading) return <p className="text-center text-xl text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-xl text-red-500">{error}</p>;
  if (!post) return <p className="text-center text-xl text-gray-500">No post found</p>;

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">{post.title}</h1>
        
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-96 object-cover mb-6 rounded-lg shadow-md"
          />
        )}
        
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">{post.content}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition ease-in-out duration-150"
          >
            Delete Post
          </button>
          <Link
            to={`/posts/${post.id}/update`}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition ease-in-out duration-150"
          >
            Edit Post
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
