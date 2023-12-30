// models/File.js
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    cloudinaryId: { type: String, required: true },
    code: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Reference to User model
});

module.exports = mongoose.model('File', fileSchema);
