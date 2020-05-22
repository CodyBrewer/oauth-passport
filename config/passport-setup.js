const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
  new GoogleStrategy({
  // options for the Google strategy
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback",
  },
  (accessToken, refreshToken, profile, done) => {
    // passport callback function
    // User.findOrCreate({ googleId: profile.id}, (err, user) => done(err,user));
  }),
);