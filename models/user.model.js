const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  phone: Number,
  name: String,
  password: String,
  confirmPassword: String,
  token: String,
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;