const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema(
	{
		chatId: {
			type: mongoose.Schema.ObjectId,
			required: true
		},
		sender: {
			type: mongoose.Schema.ObjectId,
			required: true
		},
		message: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true
	}
)

// exporting model
module.exports = mongoose.model('Message', messageSchema);
