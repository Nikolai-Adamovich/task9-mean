const mongoose = require('../config/mongoose.js');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    dropDups: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    dropDups: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  createdAt: Date
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
