const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    required: 'You must supply a name',
    trim: true,
  },
  facebookId: {
    type: String,
  },
});

module.exports = mongoose.model('User', userSchema);
