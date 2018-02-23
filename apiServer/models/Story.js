const mongoose = require('mongoose');
const { Schema } = mongoose;

const storySchema = Schema({
  first_user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  second_user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  story: String,
  isPublish:{
    type: Boolean,
    default: false,
  }
  // fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
});

const ModelClass = mongoose.model('Story', storySchema); 

module.exports = ModelClass;