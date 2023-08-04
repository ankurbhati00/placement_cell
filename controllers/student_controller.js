const Student = require('../models/student');
module.exports.createStudent = async (req, res) =>{

console.log(req.body);
await Student.create({
    name:req.body.name,
    email:req.body.email,
    college:req.body.college,
    placement_status:req.body.placement_status,
    dsa_score:req.body.dsa_score,
    Webd_score:req.body.Webd_score,
    react_score:req.body.react_score
}).catch((err)=>{
    console.log('Err in student create', err);
});

return res.redirect('/');

};


module.exports.createStudentPage = (req, res)=>{

    return res.render('add_student');
}