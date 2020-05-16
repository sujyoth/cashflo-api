const express = require('express');
const featureController = require('../controllers/feature.controller');
const {verifyToken} = require('../middleware/middleware');

const router = express.Router();

// Route to create image thumbnail.
router.post('/generate-thumbnail',
    verifyToken,
    featureController.generate_thumbnail_post,
);

module.exports = router;
