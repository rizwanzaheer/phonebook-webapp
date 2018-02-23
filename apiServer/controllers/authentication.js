const jwt = require('jwt-simple');
const User = require('../models/Users');
const keys = require('../config/keys');
const ObjectId = require('mongodb').ObjectID;
const getAge = require('get-age');
const { mName, fName } = require('../config/dataArray');

function tokenForUser(user) {
  // sub = subject mean who's token belong to iat = issue at time
  const timestamp = new Date().getTime;
  return jwt.encode(
    {
      sub: user.id,
      iat: timestamp,
    },
    keys.jwtSecretkey
  );
}

exports.signin = (req, res, next) => {
  const { user } = req;
  console.log('user: ', user);
  // return; User has already had their email and password auth'd we just need to
  // give them a token getting current user with req.user
  res.send({ token: tokenForUser(user), user_detail: user });
};

exports.signup = (req, res, next) => {
  // fetching the data from post reqeust
  const { email, password, gender } = req.body;
  console.log('req.body: ', req.body);
  if (!email || !password) {
    return res
      .status(422)
      .send({ error: 'You Must provide email & password!' });
  }

  // See if a user with the given email exists
  User.findOne(
    {
      email,
    },
    (err, existingUser) => {
      if (err) return next(err);

      // If a user with email does exist, returns an error
      if (existingUser) {
        return res.status(422).send({ error: 'Email is in use' });
      }

      // If a user with email does Not Exist, create and save user record
      const objId = new ObjectId();
      const user = new User({
        _id: objId,
        email,
        password,
        gender,
        address: {
          $ref: 'address_home',
          $id: objId,
          $db: 'tutorialspoint',
        },
      });
      // saving User in Db
      user.save((err) => {
        if (err) return next(err);

        // Respond to request indication the user was created
        res.json({
          token: tokenForUser(user),
          success: true,
          currentUser: user,
        });
      });
    }
  );
};

// Checking Incomming Email of user is valid present in db or not
exports.findUserByEmail = (req, res, next) => {
  console.log('user controller working!!!!');
  console.log('req : ', req.body);
  console.log('res : ', res.body);
  const { email, password } = req.body;
  User.findOne(
    {
      email,
    },
    (err, existingUser) => {
      if (err) return next(err);
      if (!existingUser) {
        res.status(422).send({
          error: {
            password: 'Incorrect Password!',
          },
        });
      }
      // else {   return res.status(422).send({error: { email: "Incorrect Email!"}});
      // }
    }
  );
  next();
};

exports.testing = (req, res, next) =>
  // const { id } = req.body; console.log("req.body.author_id: ", author_id);
  // const name = "Rizwan Zaheer"; const id = "5a40f27dbc0568079bb7d3fc"; const
  // story = new Story({   title: name,   _id: new ObjectId(),   author: author_id
  // }); story.save(err => {   if (err) return next(err);   // Respond to request
  // indication the user was created   return res.json({ success: true,
  // createStories: "successfuly!" }); }); Story.find({ title: "Rizwan Zaheer" },
  // (err, story) => {   console.log('story!!!!!!!!');   if (err) return
  // next(err);   if (story) {     console.log("story find!!!!!");
  // console.log(story);     // stories = story;     return res.send({ success:
  // true, message: "users find!", story: story});   } }); Person.find({ _id:
  // author_id }, (err, users) => {   if (err) return next(err);   var stories =
  // [];   if (users) {     console.log("user find");     Story.find({ title:
  // "Rizwan Zaheer" }, (err, story) => {       console.log("story!!!!!!!!");
  //  if (err) return next(err);       if (story) {         console.log("story
  // find!!!!!", story);         stories.push(story);         // return res.send({
  //         //   success: true,         //   message: "users find!",         //
  // story: story         // });       }     });     console.log(stories);
  // return res.send({ success: true, message: "users find!", users: users ,
  // stories: stories});   } }); Story.findOne({ title: name })
  // .populate("author")   .exec(function(err, story) {     if (err) return
  // next(err);     console.log("The author is %s", story.author);     // prints
  // "The author is Ian Fleming"   }); const author_id = new
  // mongoose.Types.ObjectId(); var author = new Person({   _id: new
  // mongoose.Types.ObjectId(),   name: 'Rizwan Zaheer Ahmed',   age: 50,   //
  // stories: }); author.save(function (err) {   if (err) return handleError(err);
  //   var story1 = new Story({     title: 'Child refs on to may',     author:
  // author._id    // assign the _id from the person   });   story1.save(function
  // (err) {     if (err) return handleError(err);     // thats it!   });
  // author.stories.push(story1); }); var personObj = { name: "Rizwan" }; var
  // testid; var allRules; User.findById({ _id: author_id })   .select('fname
  // lname gender')   .exec((err, user) => {     if (err) return next(err);
  // console.log("user is: ", user);   })   .then((finduser, err) => {
  // console.log('then finduser is: ', finduser);     if (finduser) {
  // Story.find({ author: finduser._id })         //.select('title')
  // .exec((err, str) => {           console.log("stories", typeof str);
  // if (err) return next(err);           if (str) console.log("stories: ", str);
  //        })         .then((strresult, err) => {           console.log("sttst:
  // ", strresult);           const user = finduser._doc;           //
  // strresult.push(user);           // allRules = Object.assign({},strresult);
  //        // allRules = user;           // next();           res.send({
  //    success: true,             req: "Request Complete!",             result: {
  //               stories: strresult,               user             }
  // });         });     }   }).catch((err) => {     console.log("catch error: ",
  // err);   }); Person.find({})   // populate('stories'). // only works if we
  // pushed refs to children   //.select('name age')   .exec(function(err, person)
  // {     if (err) return next(err);     console.log(person);
  // console.log(person.name);     console.log("person age", person.age);
  // testid = person._id;     console.log(testid);     // personObj = person;
  // // personObj._id = person._id;     // personObj.name = person.name;     //
  // personObj.age = person.age;     // personObj.testName = "test name";
  // console.log("working!!!");   })   .then((person, err) => {     // if (err)
  // return next(err);     if (person) {       Story.find({ author: person._id })
  //        //.select('title')         .exec((err, str) => {
  // console.log("stories", typeof str);           if (err) return next(err);
  //      if (str) console.log("stories: ", str);         })
  // .then((strresult, err) => {           console.log("sttst: ", strresult);
  //      const user = person._doc;           // strresult.push(user);
  // // allRules = Object.assign({},strresult);           allRules = user;
  //   // next();           // res.send({           //   success: true,
  // //   req: "Request Complete!",           //   result: {           //
  // stories: strresult,           //     user: user           //   }           //
  // });         });     }   }); console.log("all users: ", allRules);
  // Person.aggregate([   {     $lookup: {       from: "stories",
  // localField: "_id",       foreignField: "author",       as: "all_stories"
  // }   },   // {   //   $match: { _id: author_id}   // } ]).exec(function(err,
  // person) {   if (err) return next(err);   // person.findOne({ _id: author_id
  // }).exec((err, findperson) => {     // if (err) return next(err);     if
  // (person) console.log(person);   // }); });

  // const {
  //   email,
  //   bodyType,
  //   community,
  //   dob,
  //   drink,
  //   familyAffluence,
  //   fname,
  //   gender,
  //   hairType,
  //   height,
  //   lname,
  //   motherTongue,
  //   password,
  //   religion,
  //   skinTone,
  //   smoke,
  //   status,
  //   education,
  //   weight,
  //   phone,
  //   bloodGroup,
  // } = req.body;

  // console.log('email is: ', email);
  // console.log('fname is: ', fname);
  // console.log('lname is: ', lname);
  // console.log('hairType is: ', hairType);
  // console.log('familyAffluence is: ', familyAffluence);
  // console.log('religion is: ', religion);
  // console.log('community is: ', community);
  // console.log('motherTongue is: ', motherTongue);
  // console.log('drink is: ', drink);
  // console.log('gender is: ', gender);
  // console.log('height is: ', height);
  // console.log('status is: ', status);
  // console.log('skinTone is: ', skinTone);
  // console.log('bodyType is: ', bodyType);
  // console.log('drink is: ', drink);
  // console.log('smoke is: ', smoke);
  // console.log('dob is: ', dob);
  // console.log('weight is: ', weight);
  // const user = new User({
  //   age: getAge(dob),
  //   email: `shaadidotcom${Math.floor(Math.random() * 99999999)}@gmail.com`,
  //   bodyType,
  //   community,
  //   dob,
  //   drink,
  //   familyAffluence,
  //   fname:
  //     gender === 'Female'
  //       ? fName[Math.floor(Math.random() * fName.length)]
  //       : mName[Math.floor(Math.random() * mName.length)],
  //   gender,
  //   hairType,
  //   height,
  //   lname: mName[Math.floor(Math.random() * mName.length)],
  //   motherTongue,
  //   password,
  //   religion,
  //   skinTone,
  //   smoke,
  //   status,
  //   education,
  //   weight,
  //   phone,
  //   bloodGroup,
  // });
  // console.log('mName is: ', mName.length);
  // user
  //   .save()
  //   .then((doc) => {
  //     console.log('doc of test is: ', doc);
  //     return res.send({
  //       success: true,
  //       mNameCount: mName.length,
  //       fNameCount: fName.length,
  //       req: 'Request Complete!',
  //       result: doc,
  //     });
  //   })
  // .catch((err) => console.log('error is: ', err));
  res.send({
    success: true,
    req: 'Request Complete!',
  });
