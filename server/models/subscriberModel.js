const mongoose = require('mongoose')
const {isEmail} = require('validator');

const suscriberSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, 'Please, enter the email.'],
		unique: true,
		lowercase: true,
		validate: [isEmail, "Please, enter a valid email"]
	},
	subscribedAt: {
		type: Date,
		default: Date.now
	}
})

// exporting model
module.exports = mongoose.model('Subscriber', suscriberSchema);
