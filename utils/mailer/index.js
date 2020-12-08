/* eslint-disable no-console */
const nodemailer = require("nodemailer");
//const logger = require("../../utils/logger");

const transporter = nodemailer.createTransport({
  service: process.env.Email_Service,
  auth: {
    user: process.env.Email_User,
    pass: process.env.Email_Password // naturally, replace both with your real credentials or an application-specific password
  }
});

const sendMail = (to, subject, body) => {
  const mailOptions = {
    from: process.env.Email_User,
    to,
    subject,
    text: body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
     // logger.error(error);
    } else {
      console.log(`Email sent: ${info.response}`);
      //logger.info(`Email sent: ${info.response}`);
    }
  });
};

module.exports = {
  sendMail
};
