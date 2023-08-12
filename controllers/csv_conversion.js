const csvParser = require('@json2csv/plainjs').Parser;
const Students = require('../models/student');

module.exports.csv =async (req, res) => {
    
try {
  let student = await Students.find({})
    .populate("interview_result")
    .populate("interview");
  let arrStudents = [];

  student.forEach((student) => {
    console.log(student);
      const { name, email, college, dsa_score, Webd_score, react_score, placement_status} = student;
      const interview = [];
      const interview_result = [];
      for (let i of student.interview) {
          interview.push(i.company);
      }
      for (let j of student.interview_result) {
          interview_result.push(j.result);
      }

      for (let k = 0; k < interview.length; k++){
          const interviews = interview[k];
          const interview_results = interview_result[k];
          arrStudents.push({name, email, college,dsa_score,Webd_score,react_score,placement_status,interviews,interview_results});
      }

  });
    const opts = ['Name','Email','College','DSA Score','WebD Score','React Score','Placement Status','Interviews','interview results'];
    const parser = new csvParser({ opts });
    const csv = parser.parse(arrStudents);
  //   console.log(csv);
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attatchment: filename=userdata.csv');
    res.status(200).end(csv);
} catch (err) {
  console.error(err);
}


}
