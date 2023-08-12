const Interview = require("../models/interview");
const Student = require("../models/student");

module.exports.loadInterview = async (req, res) => {
  return res.render("interviews_list", {
    interviews: await Interview.find({}).catch((err) =>
      console.log("Err in interview_list", err)
    ),
  });
};

module.exports.createInterview = async (req, res) => {
  console.log(req.body);

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
