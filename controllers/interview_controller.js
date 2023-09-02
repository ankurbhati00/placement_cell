const Interview = require("../models/interview");
const Student = require("../models/student");
const Nodemailer = require("../config/node_mailer");

module.exports.loadInterview = async (req, res) => {
  //show remaining time in frontend------------>
  let interviews = await Interview.find({}).catch((err) =>
    console.log("Err in interview_list", err)
  );
  interviews.map((n) => {
    const currentDate = new Date();
    const givenDate = new Date(n.date);

    const differenceInMilliseconds =
      givenDate.getTime() - currentDate.getTime();
    const differenceInDays = Math.floor(differenceInMilliseconds / 86400000);
    const differenceInHours = Math.floor(differenceInMilliseconds / 3600000);

    const remainingTime = `${
      differenceInDays > 0 ? differenceInDays : 0
    } days, ${differenceInHours % 24 > 0 ? differenceInHours % 24 : 0} hours`;

    n.remainingTime = remainingTime;
  });

  return res.render("interviews_list", {
    interviews: interviews,
  });
};

module.exports.createInterview = async (req, res) => {
  try {
    const interview = await Interview.create({
      company: req.body.company,
      date: req.body.date,
    });

    if (interview) {
      // find student using email in db and save in interview's student array

      //check emails is an array of emails
      if (typeof req.body.emails == "object") {
        for (let email of req.body.emails) {
          const student = await Student.findOne({ email: email });
          if (student) {
            //save students for interview
            interview.student.push(student);
            //save interview of students
            student.interview.push(interview);
            student.save();
          }
        }
        interview.save();
        // send mail to student after creating student's interview
        Nodemailer.sendMail(req.body);

        //check emails is not an array of emails
      } else if (typeof req.body.emails == "string") {
        const student = await Student.findOne({ email: req.body.emails });
        if (student) {
          //save students for interview
          interview.student.push(student);
          interview.save();
          //save interview of syudents
          student.interview.push(interview);
          student.save();

          // send mail to student after creating student's interview
          Nodemailer.sendMail(req.body);
        }
      } else {
        return res.end(`<h2> please select atleast one student's email </h2> `);
      }
    }
  } catch (err) {
    console.log("Err in create Interview", err);
  }

  return res.redirect("/interview");
};

//load create interview page
module.exports.createInterviewPage = async (req, res) => {
  return res.render("create_interview", {
    students: await Student.find({}).catch((err) =>
      console.log("ERR in interview list", err)
    ),
  });
};

//load lists of students in an interview
module.exports.studentsInIntervew = async (req, res) => {
  let interview = await Interview.findById(req.params.id).populate("student");
  return res.render("students_in_interview", {
    interviews: interview,
  });
};

//send the interview result to student db and response to back
module.exports.interviewResult = async (req, res) => {
  let result = req.query.result;
  //beautyfye the result value to store in db
  switch (true) {
    case result == "pass":
      result = "Pass";
      break;
    case result == "fail":
      result = "Fail";
      break;
    case result == "onhold":
      result = "On Hold";
      break;
    case result == "didnotattempt":
      result = "Didn't Attempt";
      break;
    default:
      result = "None";
  }

  await Student.findById(req.params.student_id)
    .then((student) => {
      if (student) {
        //check if this interview is already present in data base or not
        for (let i of student.interview_result) {
          if (i.interview._id == req.query.interview_id) {
            student.interview_result.pull(i);
            break;
          }
        }
        //if interview not present then create new
        student.interview_result.push({
          interview: req.query.interview_id,
          result: result,
        });
        student.save();

        return res.status(200).json({
          data: result,
          message: "request successful",
        });
      }
      //if student not found
      return res.status(404).json({
        message: "Student not found in db",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    });
};

//delete an interview
module.exports.deleteInterview = async (req, res) => {
  // delete interview
  let studentArr;
  let interviewForDel;
  await Interview.findById(req.params.interview_id).then((data) => {
    interviewForDel = data;
    studentArr = data.student;
  });
  if (studentArr) {
    for (let studentId of studentArr) {
      await Student.findById(studentId).then((student) => {
        if (student) {
          //check if  interview  result is already present in data base or not then delete
          for (let i of student.interview_result) {
            if (i.interview._id.equals(interviewForDel._id)) {
              student.interview_result.pull(i);
            }
          }
          student.save();

          //check for intervview and then delete
          for (let i of student.interview) {
            if (i._id.equals(interviewForDel._id)) {
              student.interview.pull(i);
            }
          }
        }
      });

      // delete interview
      await Interview.findByIdAndDelete(req.params.interview_id);
    }
  }

  return res.redirect("back");
};

// Reschedule Interview------>
module.exports.reschedule = async (req, res) => {
  await Interview.findById(req.params.interview_id).then((interview) => {
    interview.date = req.body.datetime;
    interview.save();
  });
  return res.redirect("back");
};
