const path = require("path");
const PORT = process.env.PORT || 3001;
const express = require("express");
const keys = require("./config/keys");
const cors = require('cors');
const morgan = require("morgan");
const mongoose = require("mongoose");

// const { MongoClient, ObjectID } = require("mongodb");
// var obj = new ObjectID();
// const db = require('./db/db');
mongoose.Promise = global.Promise;

// Mongoose Connection URI set
// const URL = keys.localMongoURL;
mongoose.connect(keys.mongoURI);

const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const passport = require("passport");
const authRoutes = require("./routes/authRoutes");
const apiRoutes = require("./routes/apiRoutes");
const userRoutes = require("./routes/userRoutes");
const partnerPreferencesRoutes = require('./routes/partnerPreferencesRoutes');
const searchRoutes = require('./routes/searchRoutes');
const shortListRoutes = require('./routes/shortListRoutes');

require("./models/User");
require("./models/Survey");
// require("./models/PartnerPreferences");
require("./services/passport");

// These lines use for local Mongodb
// db.connect(URL, (err) => {
//   if (err) {
//     console.log('Unable to connect to Mongo.')
//     process.exit(1)
//   }
// });

// MongoClient.connect(URL, (err, db) => {
//   if (err) return;
//   const collection = db.collection("foods");
//   collection.insert({ name: "taco", tasty: true }, (err, result) => {
//     collection.find({ name: "taco" }).toArray((err, docs) => {
//       console.log(docs);
//     });
//     db.collection("foods").count((err, count) => {
//       if (err) throw err;

//       console.log("Total Rows: " + count);
//     });
//   });
//    delete many records "DeleteMany()"
//    delete one records "DeleteOne()"
//    find one and update record "findOneAndUpdate()"
//    find delete records "findOndAndDelete()"
//    db.collection('Users').insertOne({
//      name: 'Rizwan',
//      age: 24,
//      location: 'Islamabad'
//    },(err, result) => {
//         if(err){
//           return 'Unable to insert the Users data!';
//         }
//         console.log(JSON.stringify(result.ops[0]._id.getTimeStamp(), undefined, 2));
//    });
//    db.close();
// });

const app = express();

// body parser Any type of Http req
// goes through here that why used!!!
app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({limit: '50mb'}));

// cookieSession for 30 day's
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
// Session Middleware
app.use(passport.session());

// Calling Routes
authRoutes(app);
apiRoutes(app);
searchRoutes(app);
userRoutes(app);
partnerPreferencesRoutes(app);
shortListRoutes(app);
// require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);


const server = app.listen(PORT, err => {
  if (err) return console.log(err);
  return console.log(`App Listening at http://localhost:${PORT}`);
});
