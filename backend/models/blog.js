const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  slug: { type: String, unique: true },
  content: String,
  excerpt: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Blog", blogSchema);