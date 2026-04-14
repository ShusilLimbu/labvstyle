const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log(
      "----------------------------------------------------------\n" +
      "SMTP Credentials not provided in .env.\n" +
      "The following email content was requested to be sent:\n" +
      `To: ${options.email}\n` +
      `Subject: ${options.subject}\n` +
      `Message: \n${options.message}\n` +
      "----------------------------------------------------------"
    );
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: process.env.SMTP_PORT || 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `${process.env.FROM_NAME || "LabVStyle"} <${process.env.SMTP_USER}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
