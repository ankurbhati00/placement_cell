const express = require('express');
const router = express.Router();
const interviewController = require('../controllers/interview_controller');

router.get('/' , interviewController.loadInterview);  // to display interviews 
router.post('/create', interviewController.createInterview);  //to create the interviews
router.get('/create', interviewController.createInterviewPage)
router.get('/students-list/:id', interviewController.studentsInIntervew);

module.exports = router;
