// dependencies
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// passport config
app.use(passport.initialize());
require('./config/passport')(passport);

// routes
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');

// connect to MongoDB
const { mongoURI } = require('./config/keys');
mongoose.connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('Welcome to Housing Alert! Development in process...');
});

// router
app.use('/api/users', users);
app.use('/api/profile', profile);


app.listen(PORT, () => {
  console.log(`Buzzed. Housing Alert is running on port ${PORT}`);
});