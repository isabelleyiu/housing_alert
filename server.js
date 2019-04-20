// dependencies
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// connect to MongoDB
const { mongoURI } = require('./config/keys');
mongoose.connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('Welcome to Housing Alert! Development in process...');
});

app.listen(PORT, () => {
  console.log(`Buzzed. Housing Alert is running on port ${PORT}`);
});