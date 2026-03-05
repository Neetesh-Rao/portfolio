
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const blogSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },

  slug: { 
    type: String, 
    unique: true 
  },

  content: { 
    type: String, 
    required: true 
  },

  excerpt: { 
    type: String, 
    required: true 
  },

  category: { 
    type: String, 
    default: "Development" 
  },

  image: { 
    type: String 
  },

  author: { 
    type: String, 
    default: "Neetesh" 
  },

  date: { 
    type: Date, 
    default: Date.now 
  },

  // ✅ Simple Like Count
  likes: {
    type: Number,
    default: 0
  },

  // ✅ Comments
  comments: [commentSchema]

});

module.exports = mongoose.model("Blog", blogSchema);