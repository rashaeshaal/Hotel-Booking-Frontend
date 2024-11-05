import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Base_url } from '../api';

const UpdatePost = () => {
  const { id } = useParams(); // Get the post ID from the URL
  const navigate = useNavigate(); // For navigation after updating
  const [post, setPost] = useState(null); // State to store the post
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(''); // Error state
  const [title, setTitle] = useState(''); // State for title
  const [content, setContent] = useState(''); // State for content
  const [image, setImage] = useState(''); // State for image URL

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${Base_url}accounts/postsviews/${id}/`);
        setPost(response.data);
        setTitle(response.data.title);
        setContent(response.data.content);
        setImage(response.data.image);
      } catch (err) {
        setError('Failed to fetch post data');
        console.error('Error fetching post:', err.message);
      } finally {
        setLoading(false); // Set loading to false whether the fetch was successful or not
      }
    };

    fetchPost(); // Fetch the post data
  }, [id]); // Depend on the post ID to fetch data

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      await axios.put(`${Base_url}accounts/postsviews/${id}/update/`, {
        title,
        content,
        image,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      navigate(`/posts/${id}`); // Redirect to the post detail page after successful update
    } catch (err) {
      setError('Failed to update post');
      console.error('Error updating post:', err.message);
    }
  };

  if (loading) return <p className="text-center text-xl text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-xl text-red-500">{error}</p>;
  if (!post) return <p className="text-center text-xl text-gray-500">No post found</p>;

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Update Post</h1>
      <form onSubmit={handleUpdate} className="bg-white shadow-lg rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700">Image URL (optional)</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition ease-in-out duration-150"
        >
          Update Post
        </button>
      </form>
    </div>
  );
};

export default UpdatePost;