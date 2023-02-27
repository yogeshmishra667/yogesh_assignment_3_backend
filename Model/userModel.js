const mongoose = require('mongoose');
const validator = require('validator'); //validator is a package for validation

//mongoose schema and schema type
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true, //unique username
    required: [true, 'please tell us your name'],
  },
  name: {
    type: String,
    required: [true, 'please tell us your name'],
  },
  email: {
    type: String,
    unique: true, //unique email
    lowercase: true,
    required: [true, 'please provide your email'],
    validate: [validator.isEmail, 'please provide your valid email'],
  },
  phone: {
    type: Number,
    required: [true, 'please provide your phone number'],
  },
  website: {
    type: String,
    required: [true, 'please provide your website'],
  },
  address: {
    street: {
      type: String,
      required: [true, 'please provide your street'],
    },
    suite: {
      type: String,
      required: [true, 'please provide your suite'],
    },
    city: {
      type: String,
      required: [true, 'please provide your city'],
    },
    zipcode: {
      type: String,
      required: [true, 'please provide your zipcode'],
    },
  },
  company: {
    name: {
      type: String,
      required: [true, 'please provide your company name'],
    },
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
