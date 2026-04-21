const nodemailer = require("nodemailer");
const fs = require("fs")
const path = require("path")
const handlebars = require('handlebars')

const verifyMail = async (token, email) => {

  const emailTemplateSrc = fs.readFileSync(path.join(__dirname, "./template.hbs"), "utf-8");

  const template = handlebars.compile(emailTemplateSrc);
  const htmlToSend = template({token : encodeURIComponent(token)})

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailConfiguration = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Email Verification",
    html: htmlToSend
  };

  transporter.sendMail(mailConfiguration, (error, info) => {
    if (error) {
      throw new Error(error);
    }

    cosnole.log("Email sent successfully");
    console.log(info);
  });
};

module.exports = verifyMail;
