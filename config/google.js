const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../models/User');
const passportInit = require('./passport');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  function(token, tokenSecret, profile, done) {

    console.log(token);
    console.log(tokenSecret);
    console.log(profile);

    const searchQuery = {
      name: profile.displayName
    };

    const updates = {
      name: profile.displayName,
      someID: profile.id
    };

    const options = {
      upsert: true
    };

    // update the user if s/he exists or add a new user
    // User.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
    //   if(err) {
    //     return done(err);
    //   } else {
    //     return done(null, user);
    //   }
    // });
  }

));

// serialize user into the session
passportInit();


module.exports = passport;