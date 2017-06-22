const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(_id, cb) {
  User.findOne({ _id }).then(user => cb(null, user)).catch(err => cb(err));
});
