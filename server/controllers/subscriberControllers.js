const Subscriber = require('../models/subscriberModel.js')
const ErrorHandler = require('../utils/errorHandler.js');

//register subscriber
module.exports.registerSubscriber = async (req, res, next) => {
	try{
		const {email} = req.body;
		const newSubscriber = await Subscriber.create({email});

		res.status(201).json({
			success: true,
			message: 'Subscrption registered successfully!'
		});
	}catch(err){
		if (err.code == "11000")
			return next(new ErrorHandler("Email is already subscribed.", 400));
		else 
			return next(new ErrorHandler(err.message, err.code));
	}
}
