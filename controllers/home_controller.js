const Student = require("../models/student");

module.exports.home = async (req, res) => {
  const data = await Student.find({})
    .then((data) => {
       res.render("students_list", {
        students: data,
      });
      
    })
    
    .catch((err) => {
    console.log("Err in students find", err);
  });
return;
};
