const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String },
  author: { type: String },
  url: { type: String },
  likes: { type: Number, default: 0 },
  comments: [
    {
      type: String,
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Blog', blogSchema);
