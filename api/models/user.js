const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstname: {
    trim: true,
    type: String,
    required: [true, 'A firstname is required']
  },
  lastname: {
    trim: true,
    type: String,
    required: [true, 'A lastname is required']
  },
  phone: {
    trim: true,
    type: String,
    required: [true, 'A phone number is required']
  },
  email: {
    type: String,
    required: [true, 'An email is required'],
    unique: true,
    trim: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: {
    trim: true,
    type: String,
    required: [true, 'A password is required']
  },
  role: {
    type: [String],
    default: 'Rider'
  },
  created_at: {
    type: Date
  },
  updated_at: {
    type: Date
  },
  temp_password: { type: String, trim: true },
  temp_password_time: String
});

module.exports = mongoose.model('user', userSchema);
