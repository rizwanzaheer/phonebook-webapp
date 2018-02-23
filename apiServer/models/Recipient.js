const mongoose = require("mongoose");
const { Schema } = mongoose;

const recipientSchema = new Schema({
  email: {
    type: String,
    default: "test recipient"
  },
  responded: { type: Boolean, default: false }
});

module.exports = recipientSchema;
