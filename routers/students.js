const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student_controller');
const csvConversion = require('../controllers/csv_conversion');

router.post('/create', studentController.createStudent);
router.get('/create', studentController.createStudentPage);
router.get('/csv', csvConversion.csv);

module.exports = router;