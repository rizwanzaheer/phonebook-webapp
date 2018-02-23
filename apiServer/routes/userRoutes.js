const getAge = require("get-age");
const {
  findUserByIdAndUpdateImageUrl,
  getUserDetail,
  updateAndSaveUser,
  saveAndUpdatePartnerPreferences,
  getDetails,
  getUsers,
  getAllUsers,
  getUserEmail,
  // sendMail,
  addUserInRejectedList,
  getMatchUsersProfile
} = require("../controllers/userController");
const { sendEmail } = require("../controllers/email");

module.exports = app => {
  app.post("/api/upload", findUserByIdAndUpdateImageUrl);
  // find specific user by userId
  app.post("/api/getuserdetail", getUserDetail);
  // find user's by userid/gender type female/male
  // throught partner preferences
  app.post("/api/getusers", getUsers);
  app.post("/api/getmatchusersprofile", getMatchUsersProfile);

  // get user/partner preferences using userId
  app.post("/api/getdetails", getDetails);

  app.post("/api/getuseremail", getUserEmail);

  // update the existing user
  //and send back the save new change
  app.post("/api/updateandsaveuser", updateAndSaveUser);

  app.patch("/api/adduserinrejectedlist", addUserInRejectedList);

  app.post("/api/getage", (req, res, next) => {
    const { age } = req.body;
    console.log(age);
    const finalage = getAge(age);
    res.send({ success: true, age: finalage });
  });

  app.post("/api/user/email", sendEmail);
};
