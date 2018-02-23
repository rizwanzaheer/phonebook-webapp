const mongoose = require("mongoose");
const { Schema } = mongoose;

const shortListSchema = new Schema({
  _user: { type: String, default: "" },
  shortListUsers: [{ type: Schema.Types.ObjectId, default: "" }],
  createdDate: {
    type: Date,
    default: Date.now(),
  },
  modifiedDate: {
    type: Date,
    default: Date.now(),
  },
});

// Create the Model class
const ModelClass = mongoose.model("shortlist", shortListSchema);
// Export Model Class
module.exports = ModelClass;
