const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes.js');
const rewardRoutes = require('./routes/rewardRoutes.js');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/user', userRoutes);
app.use('/reward', rewardRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`)).on('error', (error) => {
  console.error(`Failed to start server on port ${PORT}:`, error.message);
});