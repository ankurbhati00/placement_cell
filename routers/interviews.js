const express = require('express');
const router = express.Router();
const interviewController = require('../controllers/interview_controller');
const passport = require('passport');

router.get('/' , interviewController.loadInterview);  // to display interviews 
router.post('/create', interviewController.createInterview);  //to create the interviews
router.get("/create", passport.checkAuthentication, interviewController.createInterviewPage);
router.get('/students-list/:id',passport.checkAuthentication, interviewController.studentsInIntervew);
router.post('/students-list/interview-result/:student_id', interviewController.interviewResult);
router.get('/students-list/delete/:interview_id',passport.checkAuthentication, interviewController.deleteInterview);
router.post("/students-list/reschedule/:interview_id",passport.checkAuthentication, interviewController.reschedule);

module.exports = router;
