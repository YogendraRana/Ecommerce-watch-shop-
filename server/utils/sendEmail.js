const nodemailer = require('nodemailer');

const sendEmail = async ({sender, receiver, name, subject, message}) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.APP_PASSWORD
    }
  });

  // send mail with defined transport object
  const info = transporter.sendMail({
      from: `${name || 'Time Zn'} <${sender}>`,
      to: receiver,
      replyTo: sender,
      subject: subject,
      text: `Sender: ${sender} \nMessage: ${message}`,
    }, (err, info) => {
    if(err) console.log("Failed" + err)
        else console.log(`Email sent:` + info.response);
  });
}

module.exports = sendEmail;