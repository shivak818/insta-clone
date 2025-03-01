import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreatePost.css'

const CreatePost = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    postImage: null
  });

  const [successMessage, setSuccessMessage] = useState(''); // ✅ Success message state
  const [errorMessage, setErrorMessage] = useState(''); // ✅ Error message state
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === 'postImage') {
      setFormData({
        ...formData,
        postImage: e.target.files[0]
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('name', formData.name);
    data.append('location', formData.location);
    data.append('description', formData.description);
    data.append('postImage', formData.postImage);

    try {
      const response = await fetch('http://localhost:5000/posts', {
        method: 'POST',
        body: data
      });

      if (response.ok) {
        setSuccessMessage('Post created successfully! 🎉 Redirecting...');
        setErrorMessage('');

        setTimeout(() => {
          navigate('/posts'); // ✅ Redirect after 2 seconds
        }, 2000);
      } else {
        throw new Error('Failed to create post');
      }
    } catch (error) {
      setErrorMessage('Error: Unable to post. Try again later.');
      setSuccessMessage('');
      console.error('Error:', error);
    }
  };

  return (
    <div className="create-post-container">
      <form onSubmit={handleSubmit} className="create-post-form">
        <input
          type="file"
          name="postImage"
          accept="image/*"
          onChange={handleChange}
          required
        />
        
        <input
          type="text"
          name="name"
          placeholder="Author"
          value={formData.name}
          onChange={handleChange}
          required
        />
        
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        
        <button type="submit">Post</button>

        {/* ✅ Show Success or Error Messages */}
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default CreatePost;
