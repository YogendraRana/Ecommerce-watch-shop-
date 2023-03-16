const ErrorHandler = require('../utils/errorHandler.js');
const Stripe = require('stripe')


//send stripe publishable key to client
module.exports.sendStripePublishableKey = async (req, res, next) => {
  res.status(200).json({ stripepublishablekey: process.env.STRIPE_PUBLISHABLE_KEY });
};


//payment process
module.exports.processPayment = async (req, res, next) => {
	const {amount, email} = req.body;
	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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