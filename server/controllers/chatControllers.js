const Chat = require('../models/chatModel.js');
const ErrorHandler = require('../utils/errorHandler.js');

// get chat
module.exports.getChats = async (req, res, next) => {
	try{
		const chats = await Chat.find({
			participants: {$in: [req.params.userId]}
		})

		res.status(200).json({
			success: true,
			chats
		})

	}catch(err){
		return next(new ErrorHandler(err.message, err.code));
	}
}

// new chat
module.exports.newChat = async (req, res, next) => {
	try{  
		const newChat = await Chat.create({participants: [req.body.senderId, req.body.receiverId]});

		res.status(201).json({
			success: true,
			newChat
		})
		
	}catch(err){
		return next(new ErrorHandler(err.message, err.code));
	}
}
