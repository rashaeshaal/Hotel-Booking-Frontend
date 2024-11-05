import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Base_url } from '../api';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', image: null, content: '' });

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${Base_url}accounts/postsviews/`);
        setPosts(response.data || []);
      } catch (err) {
        setError(err.response?.data?.detail || 'Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const openEditModal = (post) => {
    setSelectedPost(post);
    setEditForm({ title: post.title, image: null, content: post.content });
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedPost(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleImageChange = (e) => {
    setEditForm({ ...editForm, image: e.target.files[0] });
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', editForm.title);
    formData.append('content', editForm.content);
    if (editForm.image) {
      formData.append('image', editForm.image);
    }

    try {
      const response = await axios.put(`${Base_url}accounts/postsviews/${selectedPost.id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setPosts(posts.map((post) => (post.id === selectedPost.id ? response.data : post)));
      closeEditModal();
    } catch (error) {
      setError('Failed to update the post');
    }
  };

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
                <th className="px-6 py-3 border-b font-semibold text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
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
                  <td className="px-6 py-4 border-b">{post.content.slice(0, 50)}...</td>
                  <td className="px-6 py-4 border-b text-right space-x-2">
                    <button
                      onClick={() => openEditModal(post)}
                      className="bg-gray-600 hover:bg-gray-800 text-white font-bold py-1 px-3 rounded transition-colors duration-300"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center">No posts available</p>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
            <form onSubmit={handleUpdatePost}>
              <div className="mb-4">
                <label className="block text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={editForm.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Content</label>
                <textarea
                  name="content"
                  value={editForm.content}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
