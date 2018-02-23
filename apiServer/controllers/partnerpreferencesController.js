const PartnerPreferences = require("../models/PartnerPreferences");

exports.findAllPartnerPreferences = (req, res, next) => {
  console.log("In Partner Preferences");
  // PartnerPreferences.find().
};

exports.getPartnerPreference = (req, res, next) => {
  const { userId } = req.body;
  PartnerPreferences.findOne({ _user: userId })
    .exec()
    .then((doc, err) => {
      if (err) return next(err);
      if (doc) {
        res.send({
          success: true,
          result: doc,
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
};
exports.saveAndUpdatePartnerPreferences = (req, res, next) => {
  const {
    fromAge,
    toAge,
    community,
    motherTongue,
    religion,
    status,
    skinTone,
    familyAffluence,
    bloodGroup,
    hairType,
    height,
    bodyType,
    drink,
    smoke,
    userId,
  } = req.body;
  // checking if user exist with userid
  PartnerPreferences.findOne({ _user: userId })
    .exec()
    .then((user, err) => {
      if (err) return next(err);
      // if user exist then update the
      // existing user with new values
      if (user) {
        PartnerPreferences.findOneAndUpdate(
          { _user: userId },
          {
            $set: {
              fromAge,
              toAge,
              community,
              motherTongue,
              religion,
              status,
              skinTone,
              familyAffluence,
              bloodGroup,
              hairType,
              bodyType,
              drink,
              height,
              smoke,
            },
          },
          { new: true },
          (err, doc) => {
            if (err) next(err);
            if (doc) {
              res.json({
                success: true,
                result: doc,
              });
            }
            next();
          }
        );
      } else {
        // if user doesn't exit's
        // then create a new partner preferences
        // and save with current userId
        const partnerPreferences = new PartnerPreferences({
          fromAge,
          toAge,
          community,
          motherTongue,
          religion,
          status,
          skinTone,
          familyAffluence,
          bloodGroup,
          hairType,
          bodyType,
          drink,
          height,
          smoke,
          _user: userId,
        });
        partnerPreferences
          .save(error => {
            console.log(error);
          })
          .then((user, err) => {
            if (err) return next(err);
            if (user) {
              res.json({
                success: true,
                result: user,
              });
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
};
