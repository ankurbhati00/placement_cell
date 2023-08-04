const Student = require("../models/student");

module.exports.home = async (req, res) => {
  const data = await Student.find({}).catch((err) => {
    console.log("Err in students find", err);
  });

  return res.render("students_list", {
    students: data,
  });
};
