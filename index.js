require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');

const app = express();


// set up view engine
app.set('view engine', 'ejs');

// connect to mongodb
mongoose.connect(process.env.MONGODB_URI, () => {
  console.log('connected to mongodb');
});

const PORT = process.env.PORT || 4000;

// set up routes
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.render("home");
});

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});
