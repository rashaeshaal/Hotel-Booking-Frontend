import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register'; 
import SinglePost from './pages/SinglePost';
import Navbar from './components/Navbar';
import HotelPosts from './components/HotelPosts'; 
import { UserProvider } from './context/UserContext';
import CreatePost from './components/CreatePost'; 
import UpdatePost from './pages/UpdatePost';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import EditPost from './pages/EditPost';
import PaymentGateway from './components/PaymentGateway';
import PostList from './components/PostList';
import EditPostPage from './components/EditPostPage';
function App() {
  return (
  <UserProvider> {/* Wrap your application with UserProvider */}
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<HotelPosts />} /> {/* Display BlogPosts on /posts */}
            <Route path="/posts/:id" element={<SinglePost />} />
            <Route path="/posts/:id/update" element={<UpdatePost />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/login" element={<Login />} />  {/* Route for Login */}
            <Route path="/register" element={<Register />} />  {/* Route for Register */}
            <Route path="/admin-login" element={<AdminLogin />}/>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/payment-gateway" element={<PaymentGateway />} />
            <Route path="/post-list" element={<PostList />} />
            <Route path="/hotels/:id/edit" element={<EditPostPage />} />
          </Routes>
        </main>
      </div>
    </Router>
    </UserProvider>
  );
}

export default App;
