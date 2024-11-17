const express = require('express');
const router = express.Router();
const avatarController = require('../controllers/avatarController');

// Route to get characters by page
router.get('/', avatarController.getCharactersByPage);

// Route to get character by ID
router.get('/:id', avatarController.getCharacterById);

// Route to get general info about the Avatar series
router.get('/info', avatarController.getAvatarInfo);

module.exports = router;
