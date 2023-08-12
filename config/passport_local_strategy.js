const LocalStrategy = require("passport-local").Strategy;
const passport = require('passport');
const User = require("../models/user");

passport.use(
  new LocalStrategy({ usernameField: "email" }, async function (
    email,
    password,
    done
  ) {
    await User.findOne({ email: email }).then((user) => {
      if (!user || password != user.password) {
        return done(null, false);
      }

      return done(null, user);
    }).catch((err) => {
        return done(err);
    })
  })
);
///serialize user 
passport.serializeUser((user, done) => {
    return done(null, user.id);
});

//deserialize user
passport.deserializeUser(async (id, done) => {
    await User.findById(id).then((user) => {
        return done(null, user);
    })
        .catch((err) => {
            console.log("Error in findin user -->passport");
            return done(err);
        })
});

//ccheck authantication
passport.checkAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
       return next()
    }
    return res.redirect('/user/sign-in');
}
//set authenticate user
passport.setAuthenticatedUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
    }
    next();
};
module.exports = passport;