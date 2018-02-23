const mongoose = require("mongoose");
const { Schema } = mongoose;

const partnerPreferencesSchema = new Schema({
  community: {
    type: String,
    trim: true,
    default: "",
  },
  status: {
    type: String,
    trim: true,
    default: "",
  },
  religion: {
    type: String,
    trim: true,
    default: "",
  },
  education: {
    type: String,
    trim: true,
    default: "",
  },
  fromAge: {
    type: Number,
    default: 0,
  },
  toAge: {
    type: Number,
    default: 0,
  },
  star: {
    type: String,
    trim: true,
    default: "",
  },
  movieGenre: {
    type: String,
    trim: true,
    default: "",
  },
  sport: {
    type: String,
    trim: true,
    default: "",
  },
  ethenic: {
    type: String,
    trim: true,
    default: "",
  },
  motherTongue: {
    type: String,
    trim: true,
    default: "",
  },
  annualIncome: {
    type: String,
    trim: true,
    default: "",
  },
  bodyType: {
    type: String,
    trim: true,
    default: "",
  },
  height: {
    type: Number,
    default: 0,
  },
  weight: {
    type: Number,
    default: 0,
  },
  familyAffluence: {
    type: String,
    trim: true,
    default: "",
  },
  healthInformation: {
    type: String,
    trim: true,
    default: "",
  },
  gender: {
    type: String,
    trim: true,
    default: "",
  },
  skinTone: {
    type: String,
    trim: true,
    default: "",
  },
  hairType: {
    type: String,
    trim: true,
    default: "",
  },
  smoke: {
    type: String,
    trim: true,
    default: "",
  },
  drink: {
    type: String,
    trim: true,
    default: "",
  },
  bloodGroup: {
    type: String,
    trim: true,
    default: "",
  },
  // _user is use to create a relationship btw partnerPreferences list and user
  // means which user made which partnerPreferences
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  created: {
    type: Date,
    default: Date.now(),
  },
  modifiedDate: {
    type: Date,
    default: Date.now(),
  },
});

const ModelClass = mongoose.model(
  "partnerpreferences",
  partnerPreferencesSchema
);
// Export Model Class
module.exports = ModelClass;
