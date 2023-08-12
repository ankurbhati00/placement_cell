const express = require('express');
const router = express.Router();
const home_controller = require('../controllers/home_controller');
const passport = require('passport');

router.get("/", home_controller.home);
router.use('/user', require('./user'));
router.use("/student", passport.checkAuthentication,require("./students"));
router.use('/interview', require('./interviews'));



module.exports = router;