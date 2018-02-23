const mongoose = require("mongoose");
const { Schema } = mongoose;

const addressSchema = new Schema({
  city: { type: String, default: "" },
  country: { type: String, default: "" },
  province: { type: String, default: "" }
});

module.exports = addressSchema;
