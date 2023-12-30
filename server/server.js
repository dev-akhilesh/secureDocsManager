// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());


// MongoDB Connection
mongoose.connect("mongodb+srv://akhileshtakawale703:" +
    process.env.MONGO_PASSWORD +
    "@cluster0.47wrssa.mongodb.net/secureDocsManagerDB?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
const authRoutes = require('./routes/authRoutes');
const fileRoutes = require('./routes/fileRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/files', fileRoutes);
app.get('/', (req, res) => {
    res.send("Hello, world!");
})

// Start server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
