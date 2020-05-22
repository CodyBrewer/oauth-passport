const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user-model.js');

passport.serializeUser((user, done) => {
  done(null, user.id); 
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  })
});

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
      if (currentUser){
        done(null, currentUser);
      } else {
        new User({
          username: profile.displayName,
          googleId: profile.id,
        }).save().then((newUser) => {
          done(null, newUser);
        });
      }
    });
  }),
);