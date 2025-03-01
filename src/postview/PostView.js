import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCamera } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import './PostView.css';

const PostView = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  // Fetch posts from the backend
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/posts');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched data:', data); // Debug log
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get post image URL
  const getImageUrl = (post) => {
    if (post.postImage) {
      return post.postImage.startsWith('http') 
        ? post.postImage 
        : `http://localhost:5000${post.postImage}`;
    }
    return post.image ? `http://localhost:5000/uploads/${post.image}` : '/default-image.jpg';
  };

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>Error loading posts: {error}</div>;

  return (
    <div className="post-view-container">
      
      {/* Header Section */}
      <header className="post-header">
        <div className="header-left">
          <FaInstagram size={32} className="logo-icon" />
          <h1>Instagram Clone</h1>
        </div>
        
        {/* Camera Button */}
        <button className="camera-icon" onClick={() => navigate('/create')}>
          <FaCamera size={24} />
        </button>
      </header>

      {/* Posts Container */}
      <div className="posts-container">
        {posts.length === 0 ? (
          <div>No posts found</div>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="post-card">
              
              {/* Post Header */}
              <div className="post-header">
                <div className="user-info">
                  <h3>{post.name || 'Unknown User'}</h3>
                  <p>{post.location || 'Unknown Location'}</p>
                </div>
                <span className="more-options">...</span>
              </div>

              {/* Post Image */}
              <div className="post-image-container">
                <img 
                  src={getImageUrl(post)}
                  alt={post.description || 'No description available'} 
                  className="post-image"
                />
              </div>

              {/* Post Footer */}
              <div className="post-footer">
                <div className="post-actions">
                  <button className="like-button">Like</button>
                  <button className="share-button">Share</button>
                </div>
                <p className="likes-count">{post.likes || 0} likes</p>
                <p className="post-date">
                  {post.date ? new Date(post.date).toLocaleDateString() : 'No Date'}
                </p>
                <p className="post-description">
                  {post.description || 'No description provided'}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default PostView;
