const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../models/User');
const passportInit = require('./passport');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  function(token, tokenSecret, user, done) {

    console.log(token);
    console.log(tokenSecret);
    console.log(user);

    // const searchQuery = {
    //   googleId: user.id
    // };

    // const updates = {
    //   googleName: user.name,
    //   googleId: user.id
    // };

    // const options = {
    //   upsert: true
    // };

    // update the user if s/he exists or add a new user
    // User.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
    //   if(err) {
    //     return done(err);
    //   } else {
    //     return done(null, user);
    //   }
    // });

    // update the user if s/he exists or add a new user
    const user = User.findOne(searchQuery, function(err, user) {
      if(err){
        return done(err);
      } else if(!user) {
        console.log('user not found, creating new user in DB...')
        user.create(updates)
        return done(null, user);
      } else {
        console.log('Existing User Found in DB...')
        return done(null, user);
      }
    });
  }
));

// serialize user into the session
passportInit();


module.exports = passport;