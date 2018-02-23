const User = require("../models/Users");
const { mName, fName } = require("../config/dataArray");

exports.getAllUsers = (req, res, next) => {
  User.find({})
    .sort({ age: 1 })
    // .limit(5)
    .then((users, err) => {
      if (err) return next(err);
      if (users) {
        res.send({ success: true, users });
      }
    })
    .catch(err => console.log(err));
};

exports.getUserById = (req, res, next) => {
  const { id } = req.body;
  User.findOne({ _id: id })
    .then(user => {
      // if (err) return next(err);
      if (user) {
        res.send({ success: true, user });
      }
    })
    .catch(errors => console.log(errors));
};

exports.getUserByName = (req, res, next) => {
  const { fname } = req.body;
  console.log("fname: ", fname);

  User.find({ fname })
    // .where('gender').equals(gender). where('age').gte(fromage).lte(toage).
    .sort('-age')
    .then(users => {
      res.send({ success: true, users, message: "getUserByName" });
    })
    .catch(err => console.log(err));
};
exports.getUsersBySearchCriteria = (req, res, next) => {
  const {
    userId,
    gender,
    fromage,
    toage,
    religion,
    mothertongue,
    matrialStatus,
    community,
    skintone,
    bodytype,
    hairtype,
    familyaffluence,
    drink,
    smoke,
    height,
    bloodgroup,
    pageSizeLimit,
    skipRecords,
    pageType,
  } = req.body;
  console.log("gender: ", typeof gender);
  console.log("fromage: ", fromage);
  console.log("toage: ", toage);
  console.log("religion: ", religion);
  console.log("mothertoungue: ", mothertongue);
  console.log("matrialStatus: ", matrialStatus);
  console.log("community: ", community);
  console.log("skintone: ", skintone);
  console.log("bodytype: ", bodytype);
  console.log("haritype: ", hairtype);
  console.log("familyaffluence: ", familyaffluence);
  console.log("drink: ", drink);
  console.log("pageSizeLimit: ", pageSizeLimit);
  console.log("skipRecords: ", skipRecords);
  console.log("smoke: ", smoke);
  console.log("height: ", height);
  console.log("pageType is: ", pageType);
  console.log('User ID is: ', userId);

  const religionArray = religion
    ? [`${religion}`]
    : ["Muslim", "Christian", "No Religion"];
  const motherTongueArray = mothertongue
    ? [`${mothertongue}`]
    : [
        "Urdu",
        "English",
        "Punjabi",
        "Sindhi",
        "Pashto",
        "Seraiki",
        "Hindko",
        "Kashmiri",
        "Balochi",
      ];
  const status = matrialStatus
    ? [`${matrialStatus}`]
    : ["Single", "Divorced", "Married"];
  const bodytypeArray = bodytype
    ? [`${bodytype}`]
    : ["Slim", "Average", "Athletic", "Heavy"];
  const skintoneArray = skintone
    ? [`${skintone}`]
    : ["Very Fair", "Fair", "Wheatish", "Dark"];
  const familyAffluenceArray = familyaffluence
    ? [`${familyaffluence}`]
    : [
        "Affluent",
        "Upper Middle class",
        "Middle class",
        "Lower Middle class",
        "Lower class",
      ];
  const communityArray = community
    ? [`${community}`]
    : [
        "Chauhdary",
        "Malik",
        "Raja",
        "Qurashi",
        "Shakeh",
        "Butt",
        "Mir",
        "Kayani",
        "Khan",
      ];

  const hairtypeArray = hairtype
    ? [`${hairtype}`]
    : [
        "Black Straight long",
        "Black Straight medium",
        "Black Straight short",
        "Brown Straight long",
        "Brown Straight short",
        "Brown Straight medium",
      ];
  const smokeArray = smoke ? smoke : 'no';
  const drinkArray = drink ? drink : 'no';
  console.log("status is: ", status);
  console.log("body type: ", bodytypeArray);
  var query;
  if (pageType === "advanceSearch" && userId) {
    console.log("query if");
    query = User.find({})
      .where("gender")
      .equals(gender)
      .where("status")
      .in(status)
      .where("skinTone")
      .in(skintoneArray)
      .where("bodyType")
      .in(bodytypeArray) // in array
      .where("familyAffluence")
      .in(familyAffluenceArray) // in array
      .where("community")
      .in(communityArray) // in array
      .where("religion")
      .in(religionArray)
      .where("motherTongue")
      .in(motherTongueArray)
      .where("hairType")
      .in(hairtypeArray)
      .where("drink")
      .equals(drinkArray)
      .where("smoke")
      .equals(smokeArray)
      .where("age")
      .gte(fromage || 18)
      .lte(toage || 25)
      .where("height")
      .gte(height || 5.3 - 0.5)
      .lte(toage || 5.5 + 0.5)
      .sort("-age height")
      .limit(pageSizeLimit || 15)
      .skip(skipRecords || 15);
  }
  else if (pageType === "shortlinks"){
    console.log('query else if')
    var typeOfparamsValue;
    var columnName;
    if (religion) {
      const newValue = religion.charAt(0).toUpperCase() + religion.slice(1);
      typeOfparamsValue = newValue;
      columnName = 'religion';
    }
    else if (mothertongue) {
      const newValue = mothertongue.charAt(0).toUpperCase() + mothertongue.slice(1);
      typeOfparamsValue = newValue;
      columnName = 'motherTongue';
    }
    else if(community) {
      const newValue = community.charAt(0).toUpperCase() + community.slice(1);
      typeOfparamsValue = newValue;
      console.log('community new value is: ', newValue);
      columnName = 'community';
    }
    query = User.find({}).where(columnName).equals(typeOfparamsValue).sort("-age height")
    .limit(pageSizeLimit || 15)
      .skip(skipRecords || 15);

  }
  else {
    console.log("query else");
    query = User.find({})
      .where("gender")
      .equals(gender)
      .where("religion")
      .in(religion)
      .where("motherTongue")
      .in(mothertongue)
      .where("age")
      .gte(fromage || 18)
      .lte(toage || 25)
      .sort("-age height")
      .limit(pageSizeLimit || 15)
      .skip(skipRecords || 15);
  }
  // .skip(skipRecords) .exists('pictures') // check column exists
  // .where('pictures').ne([]) // not equeal to null find({pictures: {$exists:
  // true}}) .nin(bodytypeArray) // not in array .ne(gender) // not equls
  // .nin(bodytypeArray) // not in array
  var countQuery;
  if (pageType === "advanceSearch" && userId) {
    console.log("countQuery if ");

    countQuery = User.find({})
      .where("gender")
      .equals(gender)
      .where("status")
      .in(status)
      .where("skinTone")
      .in(skintoneArray)
      .where("bodyType")
      .in(bodytypeArray) // in array
      .where("familyAffluence")
      .in(familyAffluenceArray) // in array
      .where("community")
      .in(communityArray) // in array
      .where("religion")
      .in(religionArray)
      .where("motherTongue")
      .in(motherTongueArray)
      .where("hairType")
      .in(hairtypeArray)
      .where("drink")
      .equals(drinkArray)
      .where("smoke")
      .equals(smokeArray)
      .where("age")
      .gte(fromage || 18)
      .lte(toage || 25)
      .where("height")
      .gte(height || 5.3 - 0.5)
      .lte(toage || 5.5 + 0.5)
      .sort("-age height");
  }
  else if (pageType === "shortlinks"){
    console.log('query else if')
    var typeOfparamsValue;
    var columnName;
    if (religion) {
      const newValue = religion.charAt(0).toUpperCase() + religion.slice(1);
      typeOfparamsValue = newValue;
      columnName = 'religion';
    }
    else if (mothertongue) {
      const newValue = mothertongue.charAt(0).toUpperCase() + mothertongue.slice(1);
      typeOfparamsValue = newValue;
      columnName = 'motherTongue';
    }
    else if(community) {
      const newValue = community.charAt(0).toUpperCase() + community.slice(1);
      typeOfparamsValue = newValue;
      console.log('community new value is: ', newValue);
      columnName = 'community';
    }
    countQuery = User.find({}).where(columnName).equals(typeOfparamsValue).sort("-age height")
    .limit(pageSizeLimit || 15)
      .skip(skipRecords || 15);
  }
  else {
    console.log("countQuery else ");
    countQuery = User.find({})
      .where("gender")
      .equals(gender)
      .where("religion")
      .in(religion)
      .where("motherTongue")
      .in(mothertongue)
      .where("age")
      .gte(fromage || 18)
      .lte(toage || 25)
      .sort("-age height")
      .limit(pageSizeLimit || 15)
      .skip(skipRecords || 15);
  }
  query
    // .count() select('name occupation').
    .exec()
    .then(users => {
      countQuery
        .count()
        .exec()
        .then(count => {
          if (count === 0) {
            console.log("count if");
            const sName =
              gender === "Female"
                ? fName[Math.floor(Math.random() * fName.length)]
                : mName[Math.floor(Math.random() * mName.length)];
            const eName = mName[Math.floor(Math.random() * mName.length)];

            const user = new User({
              email: `${sName}${eName}${Math.floor(
                Math.random() * 99999999
              )}@gmail.com`,
              bodyType: bodytype ? bodytype : "Slim",
              community: community ? community : "Malik",
              drink: drink ? drink : "no",
              fname: sName,
              lname: eName,
              gender: gender || "Male",
              age: gender === "Female" ? 23 : 25,
              height: 5.2,
              password:
                "$2a$10$zRl.RXESyyZ8JjfLIJnPju12jVjLtZRCRz9N.NHHg0lP0vgmONy8.",
              religion: religion || "Muslim",
              smoke: smoke ? smoke : "no",
              weight: Math.floor(Math.random() * 100),
              motherTongue: mothertongue || "Urdu",
              status: matrialStatus ? matrialStatus : "Single",
              skinTone: skintone ? skintone : "Fair",
              hairType: hairtype ? hairtype : "Black Straight long",
              familyAffluence: familyaffluence
                ? familyaffluence
                : "Middle class",
              city: "Islamabad",
              country: "Pakistan",
            });
            user
              .save()
              .then(doc => {
                console.log("doc of test is: ", doc);
                return res.send({
                  success: true,
                  message: "get users by search criteria success",
                  users: [doc],
                  count: 1,
                });
              })
              .catch(err => console.log("error is: ", err));
          } else {
            res.send({
              success: true,
              users,
              message: "get users by search criteria success",
              count,
            });
          }
        })
        .catch(err => console.log("users catch error is: ", err));
    })
    .catch(err => console.log("count catch error is: ", err));
};

// Specify AND as well as OR Conditions var cursor =
// db.collection('inventory').find({   status: "A",   $or: [ { qty: { $lt: 30 }
// }, { item: { $regex: "^p" } } ] }); SELECT * FROM inventory WHERE status =
// "A" AND ( qty < 30 OR item LIKE "p%")
// db.getCollection('shortlists').find({"_user": {$nin: ["5a64c911bfa7041c1eff64ca"]}})

// var Animal = mongoose.model('Animal', animalSchema);
// Animal.find().byName('fido').exec(function(err, animals) {
//   console.log(animals);
// });

