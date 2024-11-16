const express = require('express');
const { sequelize } = require('./config/db');  // Import the Sequelize instance
const userRoutes = require('./routes/userRoutes');
const commentRoutes = require('./routes/commentRoutes');
const cors = require('cors');  //For enabling CORS 

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());  // Parse JSON requests
app.use(cors());  // To enable CORS

// Routes
app.use('/api/users', userRoutes);
app.use('/api/comments', commentRoutes);

// Sync Sequelize models and start the server
sequelize.sync().then(() => {
  console.log('Database synced');
  
  // Start the server after syncing the database
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Error syncing database:', error);
});
