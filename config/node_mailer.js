const nodemailer = require("nodemailer");
const Student = require("../models/student");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "bhatianuj79",
    pass: "lrjvalwknqlubvff",
  },
});

async function sendMail(data) {
  // send mail with defined transport object
  if (typeof data.emails == "object") {
    for (let email of data.emails) {
      await Student.findOne({ email: email }).then(async (student) => {
        const info = await transporter.sendMail({
          from: '"Code Bro | Placement Cell" <code.bro@gmail.com>',
          to: `${student.email}`,
          subject: `Interview Update`,
          html: `<html><h1>Hi ${
            student.name
          }</h1><h2>Your Interview has been Scheduled on ${new Date(data.date)
            .toString()
            .substring(0, 21)}
           at ${
             data.company
           }. Meeting link will be shared before 4 hours of Interview timing.</h2>
        <h4>Thankyou ! </h4>
        </html>`,
        });
      });
    }
  } else {
    await Student.findOne({ email: data.emails }).then(async (student) => {
      const info = await transporter.sendMail({
        from: '"Code Bro | Placement Cell" <code.bro@gmail.com>',
        to: `${data.emails}`,
        subject: `Interview Update`,
        html: `<html><h1>Hi ${
          student.name
        }</h1><h2>Your Interview has been Scheduled on ${new Date(data.date)
          .toString()
          .substring(0, 21)} 
        at ${
          data.company
        }. Meeting link will be shared before 4 hours of Interview timing.</h2>
        <h4>Thankyou ! </h4></html>`,
      });
    });
  }
}

module.exports.sendMail = sendMail;
