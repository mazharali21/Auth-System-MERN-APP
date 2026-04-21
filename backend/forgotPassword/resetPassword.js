const nodemailer = require("nodemailer");
const fs = require("fs")
const path = require("path")
const handlebars = require('handlebars')

const resetPassword = async (email,token) => {

  const emailTemplateSrc = fs.readFileSync(path.join(__dirname, "./resetPassword.hbs"), "utf-8");

  const template = handlebars.compile(emailTemplateSrc);
  const htmlToSend = template({token : token})

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
    subject: "Password Reset",
    html: htmlToSend
  };

  await transporter.sendMail(mailConfiguration, (error, info) => {
    if (error) {
      throw error;
    }

  });
};

module.exports = resetPassword;
