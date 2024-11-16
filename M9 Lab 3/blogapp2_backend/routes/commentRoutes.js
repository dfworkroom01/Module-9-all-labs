const express = require('express');
const Comment = require('../models/comment');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Post a comment (protected route)
router.post('/', authMiddleware, async (req, res) => {
  const { text, parentCommentId } = req.body;

  try {
    const comment = await Comment.create({
      text,
      userId: req.user.id,  // Use the user ID from the JWT token
      parentCommentId: parentCommentId || null,
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Error posting comment' });
  }
});

// Reply to a comment (answer)
router.post('/answer/:id', authMiddleware, async (req, res) => {
  const { text } = req.body;
  const parentCommentId = req.params.id;

  try {
    const comment = await Comment.create({
      text,
      userId: req.user.id,
      parentCommentId,
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Error posting reply' });
  }
});

// Delete a comment
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    if (comment.userId !== req.user.id) {
      return res.status(403).json({ message: 'You can only delete your own comments' });
    }

    await comment.destroy();
    res.status(200).json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting comment' });
  }
});

// Like a comment
router.post('/like/:id', authMiddleware, async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    if (comment.likes.includes(req.user.id)) {
      return res.status(400).json({ message: 'You already liked this comment' });
    }

    comment.likes.push(req.user.id);
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Error liking comment' });
  }
});

module.exports = router;
