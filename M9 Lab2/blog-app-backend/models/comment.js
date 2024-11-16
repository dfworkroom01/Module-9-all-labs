const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    default: null
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId], // Store user IDs of who liked the comment
    default: []
  }
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
