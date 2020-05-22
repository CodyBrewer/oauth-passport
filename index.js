require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/auth-routes.js');
const profileRoutes = require('./routes/profile-routes.js')
const passportSetup = require('./config/passport-setup.js');
const passport = require('passport');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');

const app = express();
const PORT = process.env.PORT || 4000;

// set up view engine
app.set('view engine', 'ejs');

// set up cookieSession
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.SECRET],
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// connect to mongodb
mongoose.connect(process.env.MONGODB_URI, () => {
  console.log('connected to mongodb');
});

// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

app.get('/', (req, res) => {
  res.render("home", { user: req.user });
});

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});
