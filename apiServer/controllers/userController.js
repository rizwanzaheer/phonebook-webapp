const User = require("../models/Users");
const PartnerPreferences = require("../models/PartnerPreferences");
const getAge = require("get-age");
const { mName, fName } = require("../config/dataArray");

exports.findUserByEmail = (req, res, next) => {
  console.log("user controller working!!!!");
};
const Star = [
  "aquarius",
  "pisces",
  "aries",
  "taurus",
  "gemini",
  "cancer",
  "leo",
  "virgo",
  "libra",
  "scorpio",
  "sagittarius",
  "capricon",
];

const starDatesInit = [21, 20, 21, 21, 23, 23, 23, 23, 22, 22, 20, 19];
const starDatesEnd = [19, 20, 20, 22, 22, 22, 22, 21, 21, 19, 18, 20];

function getStar(date, month) {
  const getMonth = Star[parseInt(month) - 1];
  const starting = starDatesInit[parseInt(month)];
  const ending = starDatesInit[parseInt(month)];
  // console.log("get month is: ", getMonth); console.log("get month is: ", typeof
  // getMonth); console.log("get starting date is: ",  starting); console.log("get
  // starting date is: ", typeof starting); console.log("get ending month is: ",
  // typeof ending); console.log("get ending month is: ", typeof ending);
  // console.log("get getMonth is: ", getMonth);
  var newMonthName;
  if (starting >= parseInt(date) && ending <= parseInt(date)) {
    newMonthName = getMonth;
  }
  return newMonthName;
}
// findUserByIdAndUpdateImageUrl
exports.findUserByIdAndUpdateImageUrl = (req, res, next) => {
  const { userId, imageUrl } = req.body;
  console.log(userId, imageUrl);
  console.log("imageurl type:", typeof imageUrl);
  User.findOneAndUpdate(
    {
      _id: userId,
    },
    {
      $set: {
        image: imageUrl,
      },
    },
    {
      new: true,
    },
    (err, doc) => {
      if (err) return next(err);

      // If a user with email does exist, returns an error
      if (doc) {
        return res.json({ new_user_detail: doc });
      }

      // If a user with email does Not Exist, create and save user record Send
      // response back to user with "wrong user id" res.json({   success: false,
      // currentUser: null });
    }
  );
};

exports.updateAndSaveUser = (req, res, next) => {
  const {
    fname,
    email,
    lname,
    education,
    religion,
    aboutMySelf,
    bloodGroup,
    community,
    dob,
    drink,
    familyAffluence,
    height,
    motherTongue,
    phone,
    province,
    smoke,
    status,
    skinTone,
    gender,
    hairType,
    bodyType,
    weight,
    city,
    country,
    userId,
    sport,
    movieGenre,
    annualIncome,
    ethenic,
    star,
  } = req.body;
  const newDob = new Date(dob);
  const splitDob = dob.split("-");
  const dobM = parseInt(splitDob[1]);
  const dobD = parseInt(splitDob[2]);
  console.log("dob is: ", dobM);
  console.log("splitDob  is: ", splitDob);
  console.log("dobD is: ", dobD);
  console.log("typeof height is: ", typeof height);
  console.log("typeof weight is: ", typeof weight);
  console.log("typeof phone is: ", typeof phone);
  console.log("height is: ", height);

  const getMonth = Star[dobM - 1];
  const starting = starDatesInit[dobM];
  const ending = starDatesInit[dobM];
  console.log("get month is: ", getMonth);
  console.log("get month is: ", typeof getMonth);
  console.log("get starting date is: ", starting);
  console.log("get starting date is: ", typeof starting);
  console.log("get ending month is: ", ending);
  console.log("get ending month is: ", typeof ending);
  console.log("get getMonth is: ", getMonth);
  var newMonthName;
  if (starting > dobD || starting < dobD) {
    console.log("in if get month");
    newMonthName = getMonth;
  }
  console.log("newMonthName name is: ", newMonthName);

  // console.log('height parsefloat is: ', parseFloat(height));
  // console.log('typeof height parsefloat is: ', typeof parseFloat(height));
  // return;
  User.findOneAndUpdate(
    {
      _id: userId,
    },
    {
      $set: {
        fname,
        email,
        lname,
        education,
        religion,
        aboutMySelf,
        bloodGroup,
        community,
        dob,
        age: getAge(dob),
        drink,
        familyAffluence,
        height,
        motherTongue,
        phone,
        province,
        smoke,
        status,
        skinTone,
        gender,
        hairType,
        bodyType,
        weight,
        city,
        country,
        annualIncome,
        userId,
        ethenic: ethenic.toLowerCase(),
        sport: sport.toLowerCase(),
        movieGenre,
        star: getMonth,
      },
    },
    {
      new: true,
    },
    (err, doc) => {
      if (err) next(err);
      if (doc) {
        const starName = getStar(dobD, dobM);
        console.log("star final name is: ", starName);
        PartnerPreferences.findOne({ _user: userId })
          .exec()
          .then((user, err) => {
            if (err) return next(err);

            // if user exist then update the existing user with new values
            if (user) {
              PartnerPreferences.findOneAndUpdate(
                {
                  _user: userId,
                },
                {
                  $set: {
                    education,
                    religion,
                    community,
                    age: getAge(dob) - 1,
                    drink,
                    familyAffluence,
                    height: parseFloat(height - 0.3, 1),
                    motherTongue,
                    smoke,
                    status,
                    skinTone,
                    // gender: doc.gender !==  doc.gender ? doc.gender : "Male",
                    hairType,
                    bodyType,
                    weight: weight - 5,
                    annualIncome: annualIncome || 0,
                    userId,
                    ethenic: ethenic.toLowerCase(),
                    sport: sport.toLowerCase(),
                    movieGenre,
                    star: getMonth,
                  },
                },
                {
                  new: true,
                },
                (err, doc) => {
                  if (err) next(err);
                  if (doc) {
                    res.json({ success: true, user: doc });
                  }
                  next();
                }
              );
            } else {
              // if user doesn't exit's then create a new partner preferences and save with
              // current userId
              const partnerPreferences = new PartnerPreferences({
                _user: userId,
                education,
                religion,
                community,
                fromAge: getAge(dob) - 10,
                toAge: getAge(dob),
                drink,
                familyAffluence,
                height: parseFloat(height - 0.3, 1),
                motherTongue,
                smoke,
                status,
                skinTone,
                // gender: doc.gender === "Female" ? doc.gender : "Male",
                hairType,
                bodyType,
                weight,
                annualIncome: annualIncome || 0,
                ethenic: ethenic.toLowerCase(),
                sport: sport.toLowerCase(),
                movieGenre,
                star: getMonth,
              });
              partnerPreferences
                .save(error => {
                  console.log(error);
                })
                .then((user, err) => {
                  if (err) return next(err);
                  if (user) {
                    // res.json({   success: true,   result: user, });
                    return res.json({ success: true, user: doc });
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
      // next();
    }
  );
};

// find specific user by userId
exports.getUserDetail = (req, res, next) => {
  const { userId } = req.body;
  console.log("userid: ", userId);
  User.findOne({ _id: userId })
    // where('name.last').equals('Ghost'). where('age').gt(17).lt(66).
    // where('likes').in(['vaporizing', 'talking']). .limit(10) sort('-occupation').
    // select('name occupation').
    .exec((err, doc) => {
      // If a user with id does exist, returns an error
      if (err) return next(err);
      if (doc) {
        return res.json({
          success: true,
          user: doc,
          // partnerPreferences
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
};

// get users by  partner preferences
exports.getUsers = (req, res, next) => {
  const { gender, userId } = req.body;
  // console.log("userid: ", userId);
  PartnerPreferences.findOne({ _user: userId }).exec((err, doc) => {
    if (err) return next(err);
    if (doc) {
      User.find({ gender })
        .where("age")
        .gte(doc.fromAge)
        .lte(doc.toAge)
        .sort("-age fname lname")
        // .select(   "fname lname motherTongue gender religion age height city country
        // province image" ) .where("likes") .in([doc.bodyType])
        // where('name.last').equals('Ghost'). where('likes').in(['vaporizing',
        // 'talking']).
        .limit(8)
        .exec((err, users) => {
          // If a user with id does exist, returns an error
          console.log(users);
          if (err) return next(err);
          if (users) {
            return res.json({ success: true, users });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  });
};

// getMatchUsersProfile
exports.getMatchUsersProfile = (req, res, next) => {
  const { gender, userId } = req.body;
  console.log("userid: ", userId);

  User.findOne({ _id: userId })
    .exec((err, doc) => {
      if (err) return next(err);
      if (doc) {
        console.log("weight is: ", doc.weight - 5);
        console.log("religion is: ", doc.religion);
        console.log("age is: ", doc.age);
        console.log("gender is: ", gender);
        const religionArray = [`${doc.religion}`] || ["Muslim"];
        const newAge = parseInt(doc.age);
        User.find({})
          .where("gender")
          .equals(gender)
          .where("age")
          // .gte(doc.fromAge)
          .lte(newAge)
          .where("weight")
          .lte(doc.weight - 5)
          .where("height")
          // .lte(doc.height)
          .lte(doc.height - 0.3)
          .where("hairType")
          .equals(doc.hairType)
          .where("religion")
          .equals(doc.religion || "Muslim")
          // .where("annualIncome")
          // .in([`${doc.annualIncome}`])
          .where("movieGenre")
          .in([`${doc.movieGenre}`])
          .where("familyAffluence")
          .in([`${doc.familyAffluence}`] || [""])
          .where("community")
          .in([`${doc.community}`] || [""])
          // .where("ethenic")
          // .in([`${doc.ethenic}`] || [""])
          .sort("-height")
          .count()
          // .exec()
          .then(count => {
            console.log("count is:", count);

            if (count !== 0) {
              User.find({})
              .where("gender")
              .equals(gender)
              .where("age")
              // .gte(doc.fromAge)
              .lte(newAge)
              .where("weight")
              .lte(doc.weight - 5)
              .where("height")
              // .lte(doc.height)
              .lte(doc.height - 0.3)
              .where("hairType")
              .equals(doc.hairType)
              .where("religion")
              .equals(doc.religion || "Muslim")
              // .where("annualIncome")
              // .in([`${doc.annualIncome}`])
              .where("movieGenre")
              .in([`${doc.movieGenre}`])
                .where("familyAffluence")
                .in([`${doc.familyAffluence}`] || [""])
                .where("community")
                .in([`${doc.community}`] || [""])
                // .where("ethenic")
                // .in([`${doc.ethenic}`] || [""])
                .sort("-height age").then(newUser => {
                  return res.send({
                    success: true,
                    totalCount: count,
                    users: newUser,
                  });
                }).catch(err =>console.log('testeing error'));
              // const sName =
              //   gender === "Female"
              //     ? fName[Math.floor(Math.random() * fName.length)]
              //     : mName[Math.floor(Math.random() * mName.length)];
              // const eName = mName[Math.floor(Math.random() * mName.length)];
              // const newUserCreation = new User({
              //   email: `${sName}${eName}${Math.floor(
              //     Math.random() * 99999999
              //   )}@gmail.com`,
              //   bodyType: bodytype ? bodytype : "Slim",
              //   community: community ? community : "Malik",
              //   drink: drink ? drink : "no",
              //   fname: sName,
              //   lname: eName,
              //   gender: gender || "Female",
              //   age: doc.age - 2,
              //   height: doc.height - 0.3,
              //   password:
              //     "$2a$10$zRl.RXESyyZ8JjfLIJnPju12jVjLtZRCRz9N.NHHg0lP0vgmONy8.",
              //   religion: religion || "Muslim",
              //   smoke: smoke ? smoke : "no",
              //   weight: Math.floor(Math.random() * 100),
              //   motherTongue: mothertongue || "Urdu",
              //   status: matrialStatus ? matrialStatus : "Single",
              //   skinTone: skintone ? skintone : "Fair",
              //   hairType: hairtype ? hairtype : "Black Straight long",
              //   sport: doc.sport || "cricket",
              //   ethenic: doc.ethenic || "Lahore",
              //   familyAffluence: familyaffluence
              //     ? familyaffluence
              //     : "Middle class",
              //   city: "Islamabad",
              //   country: "Pakistan",
              // });
              // newUserCreation.save().then().catch(err => console.log('new user creation erro,', err));
              // .then(userCreation => {
              //   console.log("userCreation of test is: ", userCreation);
              //   return res.send({
              //     success: true,
              //     message: "get users by search criteria success",
              //     users: [userCreation],
              //     count: 1,
              //   });
              // })
              // .catch(err => console.log("error is: ", err));
            } else {
              User.find({})
                .where("gender")
                .equals(gender)
                .where("age")
                // .gte(doc.fromAge)
                .lte(newAge)
                .where("weight")
                .lte(doc.weight - 5)
                .where("height")
                // .lte(doc.height)
                .lte(doc.height - 0.3)
                // .where('hairType') .in([`${doc.hairType}`]) .where('')
                .where("religion")
                .equals(doc.religion)
                .where("annualIncome")
                .in([`${doc.annualIncome}`])
                .where("movieGenre")
                .in([`${doc.movieGenre}`])
                .where("familyAffluence")
                .in([`${doc.familyAffluence}`])
                .where("community")
                .in([`${doc.community}`])
                .where("ethenic")
                .in([`${doc.ethenic}`])
                .sort("-height")
                .sort("-age")
                // .select(   "fname lname motherTongue gender religion age height city country
                // province image" ) .where("likes") .in([doc.bodyType])
                // where('name.last').equals('Ghost'). where('likes').in(['vaporizing',
                // 'talking']).
                .limit(12)
                .exec()
                .then(users => {
                  console.log("hello fuck");

                  const sName =
                    gender === "Female"
                      ? fName[Math.floor(Math.random() * fName.length)]
                      : mName[Math.floor(Math.random() * mName.length)];
                  const eName = mName[Math.floor(Math.random() * mName.length)];
                  const newUserCreation = new User({
                    email: `${sName}${eName}${Math.floor(
                      Math.random() * 99999999
                    )}@gmail.com`,
                    bodyType: doc.bodytype ? doc.bodytype : "Slim",
                    community: doc.community ? doc.community : "Malik",
                    drink: doc.drink ? doc.drink : "no",
                    fname: sName,
                    lname: eName,
                    gender: gender || "Female",
                    age: doc.age - 2,
                    dob: doc.dob,
                    height: doc.height - 0.3,
                    password:
                      "$2a$10$zRl.RXESyyZ8JjfLIJnPju12jVjLtZRCRz9N.NHHg0lP0vgmONy8.",
                    religion: doc.religion || "Muslim",
                    smoke: doc.smoke ? doc.smoke : "no",
                    weight: doc.weight - 10 || 55,
                    motherTongue: doc.mothertongue || "Urdu",
                    status: doc.matrialStatus ? doc.matrialStatus : "Single",
                    skinTone: doc.skintone ? doc.skintone : "Fair",
                    education: doc.education || 'Bs(IT)',
                    annualIncome: doc.annualIncome - 5000 || '30000',
                    hairType: doc.hairtype
                      ? doc.hairtype
                      : "Black Straight long",
                    sport: doc.sport || "cricket",
                    ethenic: doc.ethenic || "Lahore",
                    movieGenre: doc.movieGenre || "action",
                    familyAffluence: doc.familyaffluence
                      ? doc.familyaffluence
                      : "Middle class",
                    star: doc.star || "leo",
                    city: doc.city ||  "Islamabad",
                    country: doc.country || "Pakistan",
                    province: doc.province || "Capital"
                  });
                  newUserCreation
                    .save()
                    .then(data => {
                      console.log("data is: ", data);
                      return res.send({
                        success: true,
                        totalCount: 1,
                        users: [data],
                      });
                    })
                    .catch(err => console.log("new user creation erro,", err));

                  // If a user with id does exist, returns an error console.log(users); if (err)
                  // return next(err);
                  // if (users) {
                  //   return res.json({
                  //     success: true,
                  //     totalCount: count,
                  //     users,
                  //   });
                  // }
                })
                .catch(error => {
                  console.log(error);
                });
              // return res.json({   success: true,   doc, });
            }
          })
          .catch(err => consol.log("user count error!!!", err));
        // console.log("count is:", totalCount);
      }
    })
    .catch(err => console.log("find one errror", err));
};

exports.getDetails = (req, res, next) => {
  const { userId } = req.body;
  User.findById(
    {
      _id: userId,
    },
    (err, doc) => {
      // If a user with id does exist, returns an error
      if (err) return next(err);
      try {
        if (doc) {
          PartnerPreferences.findOne({ _user: doc._id })
            .then((partnerPreferences, err) => {
              if (err) return next(err);
              if (partnerPreferences) {
                return res.json({
                  success: true,
                  user: doc,
                  partnerPreferences,
                });
              } else {
                return res.json({
                  success: true,
                  user: doc,
                  partnerPreferences: {}, // due to this when partner preferences detail not present
                  // and want to render the user profile in My profile component
                });
              }
            })
            .catch(error => {
              console.log("catch error: ", error);
            });
        } else {
          return res.json({
            success: true,
            user: doc,
            partnerPreferences: {}, // due to this when partner preferences detail not present
            // and want to render the user profile in My profile component
          });
        }
      } catch (error) {
        console.log("in catch: ", error);
      }
    }
  );
};

exports.getUserEmail = (req, res, next) => {
  const { _id } = req.body;
  User.findById({ _id })
    .select("email")
    .then(email => {
      return res.send({ success: true, email });
    })
    .catch(err => console.log(err));
};

exports.addUserInRejectedList = (req, res, next) => {
  const { profileId, _id } = req.body;
  console.log("userId  is: ", _id);
  console.log("profileId  is: ", profileId);
  User.findOne({ _id }).then(user => {
    if (user) {
      const isPresent = user.rejectedBy.indexOf(profileId);
      if (isPresent === -1) {
        user.rejectedBy.push(profileId);
        User.findOneAndUpdate(
          {
            _id,
          },
          {
            $set: {
              rejectedBy: user.rejectedBy,
            },
          },
          { new: true }
        )
          .then(doc => {
            if (doc) {
              return res.json({
                success: true,
                message: "Member Successfuly Added in your Rejected List!",
                rejectedByList: doc,
              });
            }
            next();
          })
          .catch(err => console.log(err));
      } else
        return res.json({
          success: true,
          message: "Member is Already in your Rejected List!",
          rejectedByList: user,
        });
    }
    console.log("data is: ", user);
  });
};
