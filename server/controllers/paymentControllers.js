const ErrorHandler = require('../utils/errorHandler.js');

//stripe instance
const stripe = require('stripe')('sk_test_51LJoYWJGadnVkB6Efl60cfoQYmAXZMTcPdV8y0pktdNJJwmIq3qzxXFr9xGvHAgiXe1T4TptUeWDAYGKi6wWjG45005BEpIcHS');


//payment process
module.exports.processPayment = async (req, res, next) => {
	const {amount, email} = req.body;

	try{
			const intent = await stripe.paymentIntents.create({
			  amount: Math.round(amount*100),
			  currency: 'npr',
			  payment_method_types: ['card'],
			  receipt_email: email
		});

		res.status(200).json({
			success: true, 
			client_secret: intent.client_secret
		});
	}

	catch(err){
		return next(new ErrorHandler(err.message, err.code));
	}
}


//send stripe publishable key to client
module.exports.sendStripePublishableKey = async (req, res, next) => {
  res.status(200).json({ stripepublishablekey: process.env.STRIPE_PUBLISHABLE_KEY });
};



