// sending email normally (First Option)

const nodemailer = require('nodemailer');

const sendEmail = async(options) => {
	const transporter = nodemailer.createTransport({
	  service: 'gmail',
	  auth: {
	    user: process.env.MAIL_ADDRESS,
	    pass: 'dgim isqq jvda doku'
	  }
	});

	const mailOptions = {
      from: process.env.MAIL_ADDRESS,
      to: options.email,
      subject: options.subject,
      text: options.message
    };


	// send mail with defined transport object
	const info = await transporter.sendMail(mailOptions, (err, info) => {
		if(err){
			console.log("Error " + err)
		}else{
			console.log(`Email sent:` + info.response);
		}
	});
}

module.exports = sendEmail;