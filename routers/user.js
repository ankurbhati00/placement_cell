const user_controller = require('../controllers/user_controller.js');
const passport = require('passport');
const router = require('express').Router();


router.get('/sign-in', user_controller.signInPage);
router.get('/sign-up', user_controller.signUpPage);
router.post('/sign-in/auth',passport.authenticate('local', {failureRedirect:'/user/sign-in'}), user_controller.signInAuth);
router.post('/sign-up/auth', user_controller.signUpAuth);
router.get('/logout', user_controller.logOut);

module.exports = router;