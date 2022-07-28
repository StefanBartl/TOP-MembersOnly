const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const db = require('./mongooseConnection');
const Message = mongoose.model(
  "Message",
  new Schema({
    message: { type: String, required: true },
    date: { type: Date, default: Date.now },
    author: { type: String, required: true}
  })
); 

module.exports = Message;