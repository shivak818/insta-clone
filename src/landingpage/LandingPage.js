import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css'


const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="landing-content">
        <div className="landing-text">
          <h1>INSTA CLONE</h1>
          <button 
            className="enter-button"
            onClick={() => navigate('/posts')}
          >
            Enter
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;