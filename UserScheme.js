const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const db = require('./mongooseConnection');
const User = mongoose.model(
  "User",
  new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    member: { type: Boolean},
    admin: { type: Boolean}
  })
);

module.exports = User;