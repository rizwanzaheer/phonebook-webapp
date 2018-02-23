const nodemailer = require("nodemailer");

exports.sendEmail = (req, res, next) => {
  const {userId, fname, profileId, lname, message} = req.body;
  const URL = `http://localhost:3000/my-shaadi/finduser/${profileId}`;
  console.log(`userId: ${userId}, profileId: ${profileId}, message: ${message}`);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    auth: {
      user: "rizwanzaheer003@gmail.com",
      pass: "Rizwan!003"
    }
  });
  const mailOptions = {
    from: "rizwanzaheer003@gmail.com",
    to: `rizwanzaheerr@gmail.com`,
    subject: "Want to Connect",
    html: `
        <h1 style="text-align:center; color: #ff5a60;">Welcome in Shaadidotcom</h1>
        <h2>${fname} ${lname} send you this message!</h2>
        <br /> 
        <p>${message}</p>
        <p>Click on given below link to check profile of ${fname} ${lname}.</p>
        <a href="${URL}">Check profile</a>
        <br />
        <br />
        <br />
        Regards, <br />
        ${fname} ${lname}
      `
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error: ", error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
  res.send({success: true, message: "email send successfuly!"});
};
