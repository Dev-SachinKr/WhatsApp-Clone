const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const processPayloads = require('./utils/processPayloads');
const messageRoutes = require('./routes/messageRoutes');


dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api', messageRoutes);


// Test route
app.get('/', (req, res) => {
  res.send('WhatsApp Web Clone API is running...');
});

// Call payload processor on server start (for one-time testing)
// processPayloads();

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
