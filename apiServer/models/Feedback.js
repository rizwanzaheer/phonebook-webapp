const mongoose = require('mongoose');
const { Schema } = mongoose;

const feedbackSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  age: Number,
  stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});

const ModelClass = mongoose.model('feedbacks', feedbackSchema);

module.exports = ModelClass;