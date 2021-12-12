const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    userName: String
  },
  {
    timestamps: true,
    collection: "users",
  }
);


module.exports = model('User', userSchema);