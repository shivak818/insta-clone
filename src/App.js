import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import LandingPage from './landingpage/LandingPage';
import PostView from './postview/PostView';
import CreatePost from './postview/CreatePost';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/posts" element={<PostView />} />
          <Route path="/create" element={<CreatePost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;