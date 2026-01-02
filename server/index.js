require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

const authRoutes = require('./routes/auth');
const gameRoutes = require('./routes/games');
const favoriteRoutes = require('./routes/favorites');

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/games', gameRoutes);
app.use('/favorites', favoriteRoutes);

app.get('/', (req, res) => {
  res.send('Sports/Casino API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
