const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");

const User = require("../models/Users");

const keys = require("../config/keys");

// Create local Strategy
// sending the email field and tell localstrategy to find
// usernamefield with email not username
const localOptions = { usernameField: "email" };
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  // Verify this email and password, call done with the user
  // if it is the correct email and password
  // otherwise, call done with false
  User.findOne({ email: email }, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false);
    // compare passwords - is `password` equal to user.password?
    user.comparePassword(password, (err, isMatch) => {
      if (err) return done(err);
      // Didn't find user
      if (!isMatch) return done(null, false);

      // send back with user
      return done(null, user);
    });
  });
  // async/ await code
  // const user = await User.findOne({ email: email });
  //   if (!user) return done(null, false);
  //   // compare passwords - is `password` equal to user.password?
  //   const isMatch = await user.comparePassword(password);

  //   // Didn't find user
  //   if (!isMatch) {
  //     return done(null, false);
  //   } else {
  //     // send back with user
  //     return done(null, user);
  //   }
});

// const User = mongoose.model("users");

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: keys.jwtSecretkey
};

// Create JWT Strategy
// payload is comming back with userid & timestamp from authentication.js
const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  // See if the user ID in the payload exists in our database
  // If ti does, call 'done' with that other
  // otherwise, call done without a user object
  const existingUser = await User.findById(payload.sub);
  try {
    if (existingUser) {
      done(null, existingUser);
    } else {
      done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });
// passport.deserializeUser((id, done) => {
//   User.findById(id).then(user => {
//     done(null, user);
//   });
// });

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: keys.googleClientID,
//       clientSecret: keys.googleClientSecret,
//       callbackURL: "/auth/google/callback",
//       proxy: true
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       const existingUser = await User.findOne({ googleId: profile.id });
//       if (existingUser) {
//         // done func pass err, existingUser
//         console.log("found");
//         return done(null, existingUser);
//       }
//       // saving in DB
//       const user = await new User({ googleId: profile.id }).save();
//       done(null, user);
//       console.log("New user added in DB");
//     }
//   )
//   // if async function not run correctly then use this function comment code
//   // User.findOne({ googleId: profile.id }).then(existingUser => {
//   //   if (existingUser) {
//   //     // done func pass err, existingUser
//   //     console.log("User found!");
//   //     return done(null, existingUser);
//   //   } else {
//   //     // saving in DB
//   //     new User({ googleId: profile.id })
//   //       .save()
//   //       .then(user => done(null, user));
//   //   }
//   // });
// );
