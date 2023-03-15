const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js')
const ErrorHandler = require('../utils/errorHandler.js')

//jwt authentication to check if user is logged in

module.exports.isAuthenticated = async (req, res, next) => {
	const token = req.cookies.jwt;

	if(!token){
		return next(new ErrorHandler('Please, login first to access this resource', 401));
	}

	jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {
		if(err){
			return next(new ErrorHandler('The token is not authentic', 401));
		}
		else{
			req.user = await User.findById(decodedToken.id);
			next();
		}
	})
}


//middleware to check the role of user
module.exports.isAdmin = (...roles) => {
	return(req, res, next) => {
		if(!roles.includes(req.user.role)){
			return next(new ErrorHandler(`${req.user.role} cannot access this resource`, 403));
		}

		next();
	}
}