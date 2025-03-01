const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        required: true
    },
    postImage: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', postSchema);