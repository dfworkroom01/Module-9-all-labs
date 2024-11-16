const express = require('express');
const Comment = require('../models/comment');
const authMiddleware = require('../middleware/authMiddleware'); // Import the authMiddleware
const router = express.Router();

// Post a comment (protected route)
router.post('/', authMiddleware, async (req, res) => {
  const { text, parentComment } = req.body; // No need to expect userId here

  try {
    // Create a new comment and associate it with the user from the token
    const comment = new Comment({
      text,
      user: req.user,  // The userId is retrieved from the token, not the request body
      parentComment: parentComment || null  // Optional: If replying to a parent comment, provide the parentComment ID
    });

    // Save the comment to the database
    await comment.save();
    
    // Return the saved comment
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Error posting comment' });
  }
});

// Answer to a comment (respond to a parent comment)
// POST: Reply to a comment (answer)
router.post('/answer/:id', authMiddleware, async (req, res) => {
    const { text } = req.body;  // The reply text
    const parentComment = req.params.id;  // The parent comment ID from the URL
  
    try {
      const comment = new Comment({
        text,
        user: req.user,  // The user replying (from the JWT token)
        parentComment: parentComment,  // Link this comment to the parent comment
      });
  
      await comment.save();  // Save the new comment
      res.status(201).json(comment);  // Return the newly created comment
  
    } catch (error) {
      res.status(500).json({ message: 'Error posting reply' });
    }
  });

// Delete a comment
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    // Check if the user is the owner of the comment
    if (comment.user.toString() !== req.user) {
      return res.status(403).json({ message: 'You can only delete your own comments' });
    }

    await comment.remove();
    res.status(200).json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting comment' });
  }
});

// Like a comment
router.post('/like/:id', authMiddleware, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    if (comment.likes.includes(req.user)) {
      return res.status(400).json({ message: 'You already liked this comment' });
    }

    comment.likes.push(req.user);
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Error liking comment' });
  }
});

module.exports = router;

