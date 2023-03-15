const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema(
	{
		participants: {
			type: Array
		}
	},
	{
		timestamps: true
	}
)

// exporting model
module.exports = mongoose.model('Chat', chatSchema);
