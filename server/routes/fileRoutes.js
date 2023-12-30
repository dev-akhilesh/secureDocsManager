// routes/fileRoutes.js
const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');

// Initialize multer
const upload = multer();

// Using the 'upload' middleware to handle file uploads
router.post('/upload', authMiddleware.authenticateUser, upload.single('file'), fileController.uploadFile);
router.get('/list', authMiddleware.authenticateUser, fileController.getFiles);
router.delete('/:fileId', authMiddleware.authenticateUser, fileController.deleteFile);
router.post('/generate-download-url/:fileId', authMiddleware.authenticateUser, fileController.generateDownloadUrl);

module.exports = router;
