const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user-model.js');

passport.use(
  new GoogleStrategy({
  // options for the Google strategy
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback",
  },
  (accessToken, refreshToken, profile, done) => {
    // check if user already exists in our database
    User.findOne({ googleId: profile.id }).then((currentUser) => {
      if (currentUser) console.log('current user retrieved from database' + currentUser);
      else {
        new User({
          username: profile.displayName,
          googleId: profile.id,
        }).save().then((newUser) => {
          console.log('new user created: ' + newUser);
        });
      }
    });
  }),
);