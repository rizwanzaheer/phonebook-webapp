const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt-nodejs');
const AddressSchema = require('./Address');

// const MAX_LOGIN_ATTEMPTS = 5;
// const LOCK_TIME = 2 * 60 * 60 * 1000;
const userSchema = new Schema({
  fname: {
    type: String,
    trim: true,
    default: '',
  },
  lname: {
    type: String,
    trim: true,
    default: '',
  },
  dob: {
    type: Date,
    default: Date.now(),
  },
  phone: {
    type: String,
    trim: true,
    default: '',
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
  modifiedDate: {
    type: Date,
    default: Date.now(),
  },
});

// userSchema.virtual('isLocked').get(function() {
//   // check for a future lockUntil timestamp
//   return !!(this.lockUntil && this.lockUntil > Date.now());
// });

// On save Hook, encrypt password
userSchema.pre('save', function (next) {
  const user = this;
  // generate a salt then run callback
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    // Otherwise hash (encrypt) our password using the salt
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});
// User Schema Methods
// When new User is created then this
// func is everywhere can accessible
// arrow func didn't work here
userSchema.methods.comparePassword = function (candidatePssword, callback) {
  bcrypt.compare(candidatePssword, this.password, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

// Create the Model class
const ModelClass = mongoose.model('user', userSchema);
// Export Model Class
module.exports = ModelClass;
