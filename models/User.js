const mongoose = require('mongoose');

// create User Schema
const UserSchema = new mongoose.Schema({
  googleName: String,
  googleId: String
});


module.exports = mongoose.model('User', UserSchema);