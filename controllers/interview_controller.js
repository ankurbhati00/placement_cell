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
      result: "None",
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
            interview.save();
            //save interview of syudents
            student.interview.push(interview);
            student.save();
          }
        }
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
  let interview = await Interview.findById(req.params.id).populate('student');
  return res.render('students_in_interview', {

    interviews: interview
  });
};
