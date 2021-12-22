const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String },
  author: { type: String },
  url: { type: String },
  likes: { type: Number, default: 0 },
});

module.exports = mongoose.model('Blog', blogSchema);
