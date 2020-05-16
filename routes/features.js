const express = require('express');
const featureController = require('../controllers/features.controller');
const { verifyToken } = require('../middleware/tokenMiddleware');

const router = express.Router();

// Route to create image thumbnail.
router.post('/create-thumbnail', verifyToken, featureController.create_thumbnail_post);

module.exports = router;
