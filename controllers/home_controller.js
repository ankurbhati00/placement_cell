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

//change status--->
module.exports.changeStatus = async (req, res) => {
  await Student.findById(req.params.id).then((student) => {
    if (req.body.placementstatus) {
      student.placement_status = req.body.placementstatus;
      student.save();
    }
  });

  res.redirect("back");
};
