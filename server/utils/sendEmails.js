// sending email with OAuth (Second Option)

const nodemailer = require('nodemailer')
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;


const sendEmail = async(options) => {
  const myOAuth2Client = new OAuth2(process.env.OAUTH_CLIENTID, process.env.OAUTH_CLIENT_SECRET, process.env.REDIRECT_URI);

  myOAuth2Client.setCredentials({refresh_token: process.env.OAUTH_REFRESH_TOKEN});

  // not working down from here
  console.log('Here working')

	const myAccessToken = await myOAuth2Client.getAccessToken();

	const transporter = await nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        accessToken: myAccessToken
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