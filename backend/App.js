const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Import Post model
const Post = require('./model/Post');

// Routes
app.get('/posts', async (req, res) => {
  try {
    console.log('Fetching posts...'); // Debug log
    const posts = await Post.find().sort({ date: -1 });
    console.log('Found posts:', posts); // Debug log
    res.json(posts);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ 
      message: 'Error fetching posts',
      error: err.message 
    });
  }
});

app.post('/posts', upload.single('postImage'), async (req, res) => {
    const { name, location, description } = req.body;
    const postImage = `/uploads/${req.file.filename}`;

    const post = new Post({
        name,
        location,
        description,
        postImage,
        likes: 0
    });

    try {
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = app;