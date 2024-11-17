require('dotenv').config();
const express = require('express');
const avatarRoutes = require('./routes/avatarRoutes');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json()); // Parse incoming JSON requests
app.use('/api/avatar', avatarRoutes); // Use avatarRoutes for /api/avatar endpoints

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
