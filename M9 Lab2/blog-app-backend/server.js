const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const commentRoutes = require('./routes/commentRoutes');

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Allow cross-origin requests

// Routes
app.use('/api/users', userRoutes);
app.use('/api/comments', commentRoutes);

// Connect to MongoDB (no need for useNewUrlParser or useUnifiedTopology)
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
