const ErrorHandler = require('../utils/errorHandler.js')

module.exports = (err, req, res, next) => {

	err.statusCode = err.statusCode || 500;
	err.message = err.message || "Internal Server Error";

	// Wrong Mongodb Id error
	if (err.name === "CastError") {
		err = new ErrorHandler(`Resource not found. Invalid: ${err.path}`, 400);
	}

	// Mongoose duplicate key error
	// if (err.statusCode === 11000) {
	// 	err = new ErrorHandler(`Email is already registered.`, 400);
	// }

	// Wrong JWT error
	if (err.name === "JsonWebTokenError") {
		err = new ErrorHandler(`Json Web Token is invalid, Try again.`, 400);
	}

	// JWT EXPIRE error
	if (err.name === "TokenExpiredError") {
		err = new ErrorHandler( `Json Web Token is Expired. Login again.`, 400);
	}

	res.status(err.statusCode).json({
		success: false,
		message: err.message,
	});
}