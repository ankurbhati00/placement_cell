const passport = require("passport");
const User = require("../models/user");

//render sign in page
module.exports.signInPage = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
  return res.render("sign_in");
};

//render sign up page
module.exports.signUpPage = (req, res) => {
     if (req.isAuthenticated()) {
       return res.redirect("/");
     }
  return res.render("sign_up");
};

//sign up user with his info
module.exports.signUpAuth = async (req, res) => {
    console.log(req.body);
    await User.findOne({ email: req.body.email })
        .then(async (user) => {
            if (user) {
                return res.redirect('back');
            }
            if (req.body.password==req.body.confirm_password) {
                await User.create(req.body);
                return res.redirect('/user/sign-in');
            } 
            return res.redirect('back');
    })
}


//authanticate the sign in info
module.exports.signInAuth = async (req, res) => {
  await User.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        return res.redirect('back');
    }

    if (user.password!=req.body.password) {
        return res.redirect("back");
    }
       
      return res.redirect('/');
  });
};

//log out user
module.exports.logOut = (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
    });
    return res.redirect('/user/sign-in');
}
