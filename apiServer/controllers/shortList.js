const User = require("../models/Users");
const ShortList = require("../models/ShortList");

exports.getShortList = (req, res, next) => {
  const { id } = req.body;
  ShortList.findOne({ _user: id })
    .then(user => {
      // if (err) return next(err);
      if (user) {
        const usersProfileList = [];
        user.shortListUsers.forEach(id => {
          console.log("id is: ", id);
          User.findOne({ _id: id })
            .select("fname lname age image city country provice height weight religion")
            .then(usr => {
              usersProfileList.push(usr);
            })
            .catch(err => console.log(err));
        });
        setTimeout(() => {
          return res.json({
            success: true,
            user: usersProfileList,
          });
          next();
        }, 800);
      }
    })
    .catch(errors => console.log(errors));
};

exports.addUserInShortList = (req, res, next) => {
  const { profileId, userId } = req.body;
  ShortList.findOne({ _user: userId })
    .then(users => {
      if (users) {
        const isPresent = users.shortListUsers.indexOf(profileId);
        console.log("isPresent: ", isPresent);
        if (isPresent === -1) {
          users.shortListUsers.push(profileId);
          console.log("users.shortListUsers: ", users.shortListUsers);
          console.log("isPresent: ", isPresent);
          ShortList.findOneAndUpdate(
            { _user: userId },
            {
              $set: {
                shortListUsers: users.shortListUsers,
              },
            },
            { new: true }
          )
            .then(doc => {
              if (doc) {
                return res.json({
                  success: true,
                  message: "Member Successfuly Added in your Short List!",
                  shortListUsers: doc,
                });
              }
              next();
            })
            .catch(err => console.log(err));
        } else
          return res.json({
            success: true,
            message: "Member is Already in your Short List!",
            shortListUsers: users,
          });
      } else {
        // if userid with not found then create new record and insert in shortlist table
        try {
          const shortlist = new ShortList({
            shortListUsers: profileId,
            _user: userId,
          });
          shortlist.save(err => {
            if (err) return next(err);
            res.json({
              success: true,
              message: "Member Successfuly Added in your Short List!",
              shortlist,
            });
          });
        } catch (error) {
          console.log("else catch error: ", error);
        }
      }
    })
    .catch(err => console.log("then catch occur:", err));
};
