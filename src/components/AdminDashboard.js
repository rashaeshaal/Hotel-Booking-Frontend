// src/components/AdminDashboard.js

import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
      <p className="text-lg text-gray-700 mb-4">Welcome to the Admin Dashboard!</p>
      <div className="space-x-4">
        <Link to="/create-post" className="inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
          Create Post
        </Link>
        <Link to="/post-list" className="inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
          Post List
        </Link>
        <Link to="/" className="inline-block px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">
          Logout
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
