const mongoose = require('mongoose');

// create User Schema
const UserSchema = new mongoose.Schema({
  name: String,
  someID: String
});


module.exports = mongoose.model('User', UserSchema);