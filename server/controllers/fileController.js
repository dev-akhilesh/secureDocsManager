// controllers/fileController.js
const cloudinary = require('cloudinary').v2;
const generateCode = require('../utils/generateCode');
const File = require('../models/File');
const User = require('../models/User');
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer configuration
const upload = multer();

exports.uploadFile = async (req, res) => {
    try {
        const userId = req.user._id;

        // Check if a file was uploaded
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Convert the Buffer to a data URI
        const dataUri = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

        // Upload file to Cloudinary
        const result = await cloudinary.uploader.upload(dataUri, { folder: 'secureDocsManager' });

        // Generate a unique code
        const code = generateCode();

        // Create a new file in the database
        const newFile = new File({
            filename: req.file.originalname, // Use the original filename from multer
            cloudinaryId: result.public_id,
            code,
            user: userId
        });

        await newFile.save();

        // Link the file to the user
        const user = await User.findById(userId);
        user.files.push(newFile);
        await user.save();

        res.json({ success: true, code });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getFiles = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming req.user is populated by authMiddleware

        // Retrieve files for a specific user
        const userFiles = await File.find({ user: userId });

        res.json({ files: userFiles });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteFile = async (req, res) => {
    try {
        const fileId = req.params.fileId;

        // Find the file in the database
        const file = await File.findById(fileId);

        if (!file) {
            return res.status(404).json({ error: 'File not found' });
        }

        // Check if the logged-in user owns the file
        if (file.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Permission denied' });
        }

        // Delete file from Cloudinary
        await cloudinary.uploader.destroy(file.cloudinaryId);

        // Delete file from the database using findOneAndDelete
        await File.findOneAndDelete({ _id: fileId });

        // Remove the file reference from the user
        const user = await User.findById(req.user._id);
        user.files.pull(fileId);
        await user.save();

        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.generateDownloadUrl = async (req, res) => {
    try {
        const fileId = req.params.fileId;
        const enteredCode = req.body.code;

        // Find the file in the database
        const file = await File.findById(fileId);

        if (!file) {
            return res.status(404).json({ error: 'File not found' });
        }

        // Check if the entered code matches the stored code
        if (enteredCode !== file.code.toString()) {
            return res.status(403).json({ error: 'Incorrect code' });
        }

        // Generate a download URL
        const downloadUrl = cloudinary.url(file.cloudinaryId);
        console.log('Download URL:', downloadUrl);
        res.json({ downloadUrl });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
