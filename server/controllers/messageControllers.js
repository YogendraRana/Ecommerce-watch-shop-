const Message = require('../models/messageModel.js');
const ErrorHandler = require('../utils/errorHandler.js');


module.exports.getChatMessages = async (req, res, next) => {
	try{
		const chatMessages = await Message.find({chatId: req.params.chatId});
		res.status(200).json({
			success: true,
			message: "Messages fetched successfully!",
			chatMessages
		})
	}catch(err){
		return next(new ErrorHandler(err.message, err.code));
	}
}

module.exports.newMessage = async (req, res, next) => {
	try{
		const {message} = await Message.create(req.body);
		
		res.status(200).json({
			success: true,
			message: "Message sent successfully!",
			message
		})
	}catch(err){
		return next(new ErrorHandler(err.message, err.code));
	}
}