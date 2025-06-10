const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/userModel');

//Modified to handle both saved and unsaved users
passport.serializeUser((user, done) => {
  if (user._id) {
    done(null, { id: user._id, email: user.email });
  } else {
    done(null, { email: user.email });
  }
});

//Handle unsaved users gracefully
passport.deserializeUser(async (sessionUser, done) => {
  if (sessionUser.id) {
    const user = await User.findById(sessionUser.id);
    return done(null, user);
  }
  done(null, sessionUser); //return email if not yet registered
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    //check if user exists — don't create
    const user = await User.findOne({ googleId: profile.id });

    if (user) {
      return done(null, user); // Already registered
    }

    //Not creating the user, just sending minimal info
    const tempUser = {
      email: profile.emails[0].value,
      googleId: profile.id,
      oauthOnly: true,
    };

    return done(null, tempUser); // Not in DB
  } catch (err) {
    return done(err, null);
  }
}));
