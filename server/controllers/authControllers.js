const User = require('../models/userModel.js')
const Chat = require('../models/chatModel.js')
const jwt = require('jsonwebtoken')
const ErrorHandler = require('../utils/errorHandler.js')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')


//register post authController
module.exports.registerUser = async (req, res, next) => {
	const {name, email, password, cpassword} = req.body

	try{
		if(password !== cpassword){
			return next(new ErrorHandler('Password do not match.', 400));
		}

		const user = await User.create({name, email, password, cpassword});
		const token = user.createToken();
		res.cookie('jwt', token, {
			expires: new Date(Date.now() + 900000), 
			domain: '.onrender.com',
			sameSite: 'none',
			httpOnly: false, 
			secure: true,
			path: '/',
		});

		// create chat 
		const admin = await User.find({role: "admin"});

		const newChat = await Chat.create({participants: [admin[0]._id.toString(), user._id.toString()]});

		res.status(201).json({
			success: true,
			message: 'User registered successfully',
			user
		});
		
	}

	catch(err){
		if (err.code == "11000")
			return next(new ErrorHandler("Email is already registered.", 400));
		else 
			return next(new ErrorHandler(err.message, err.code));
	}
}

//login post authControllers
module.exports.loginUser = async (req, res, next) => {
	let {email, password} = req.body

	try{
		if(email=='' || password==''){
			return next(new ErrorHandler('Please enter email and password', 400));			
		}

		const user = await User.findOne({email}).select('+password').select('+cpassword');

		if(!user){
			return next(new ErrorHandler('Invalid email or password', 400));
		}

		const isPasswordMatch = await user.comparePassword(password);
 
		if(!isPasswordMatch){
			return next(new ErrorHandler('Invalid email or password', 400));
		}

		const token = user.createToken();
		res.cookie('jwt', token, {
			expires: new Date(Date.now() + 900000), 
			domain: '.onrender.com',
			sameSite: 'none',
			httpOnly: false, 
			secure: true,
			path: '/',
		});

		res.json({
			success: true,
			message: 'User logged in successfully',
			user
		})

	}catch(err){
		return next(new ErrorHandler(err.message, err.code));
	}
}



//get user profile
module.exports.getUserProfile = async (req, res, next) => {
	try{
		const user = await User.findById(req.user.id);

		res.status(200).json({
			success: true,	
			user
		})
	}

	catch(err){
		return next(new ErrorHandler(err.message));
	}
}

//get user detail
module.exports.getUserDetail = async (req, res, next) => {
	try{
		const user = await User.findById(req.params.userId);

		res.status(200).json({
			success: true,	
			user
		})
	}

	catch(err){
		return next(new ErrorHandler(err.message));
	}
}


//logout get authController
module.exports.logoutUser = (req, res) => {
	res.clearCookie('jwt', {path: '/'});
	res.status(200).send({
		success: true,
		message: "User logged out"
	});
}

//forgot password
module.exports.forgotPassword = async (req, res, next) => {
	const user = await User.findOne({email: req.body.email});

	if(!user){
		return next(new ErrorHandler('User not found', 404));
	}

	const randomToken = await user.getResetPasswordToken();
	await user.save({validateBeforeSave: false});
	
	const resetPasswordUrl = `${req.protocol}://${req.get('host')}/password/reset/${randomToken}`;
	const message = `Click on the given link to reset password: ${resetPasswordUrl}\n\nPlease ignore the message if you did not request this email`;

	try{	
		sendEmail({sender: process.env.EMAIL_ADDRESS, receiver: user.email, subject: "Password Reset", message});

		res.status(200).json({
			success: true,
			message: `Email sent to ${user.email}`
		})
	}

	catch(err){
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;
		user.save({validateBeforeSave: false});
		return next(new ErrorHandler(err.message, 500));
	}
}


// send mail from contact
module.exports.sendMailFromContact = async (req, res, next) => {
    const {sender, name, subject, message} = req.body;

    sendEmail({sender, receiver: process.env.EMAIL_ADDRESS, name, subject, message});

    res.status(200).json({
        success: true,
        message: `Email sent.`
    })
};


//reset password
module.exports.resetPassword = async(req, res, next) => {
	try{
		//generating token's hash using crypto
		const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

		const user = await User.findOne({resetPasswordToken, resetPasswordExpire: {$gt: Date.now()}})

		if(!user){
			return next(new ErrorHandler('Invalid or expired reset password token', 400))
		}

		if(req.body.password != req.body.confirmPassword){
			return next(new ErrorHandler('Password do not match', 400))
		}

		user.password = req.body.password;
		user.cpassword = req.body.password;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;

		await user.save();

		const token = user.createToken();
		res.cookie('jwt', token, {expires: new Date(Date.now() + 9000000), httpOnly: true, secure: true});
		res.status(200).json({
			success: true,
			message: 'Password reset successfully',
			token,
			user
		})


	}
	catch(err){
		return next(new ErrorHandler(err.message, err.code))
	}
}


//change password
module.exports.changePassword = async (req, res, next) => {
	const {oldPassword, newPassword, confirmNewPassword} = req.body

	try{
		const user = await User.findById(req.user.id).select('+password').select('+cpassword');

		const isOldPasswordMatch = await user.comparePassword(oldPassword);

		if(!isOldPasswordMatch){
			return next(new ErrorHandler('Old password is incorrect', 400))
		}

		if(newPassword !== confirmNewPassword){
			return next(new ErrorHandler('New password do not match', 400))
		}

		user.password = newPassword;
		user.cpassword = newPassword; 

		await user.save();

		const token = user.createToken();
		res.cookie('jwt', token, {expires: new Date(Date.now() + 9000000), httpOnly: true, secure: true});
		res.status(200).json({
			success: true,
			message: 'Password updated successfully',
			token,
			user
		})
	}

	catch(err){
		return next(new ErrorHandler(err.message));
	}
}


//update profile
module.exports.updateProfile = async (req, res, next) => {
	const {name, email} = req.body

	// update profile pic logic to be included later

	try{
		const newUserData = {name,email};

		const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
	        new: true, //it returns the updated document, not the original document
	        runValidators: true, //enforces the validations defined in the Mongoose schema for this document
	        useFindAndModify: false //ensures that the update uses the latest version of the document, and not a cached version
	    })

		res.status(200).json({
			success: true,
			message: 'Profile updated successfully',
			user
		})
	}

	catch(err){
		return next(new ErrorHandler(err.message));
	}
}


//Admin routes

//get all users (admin)
module.exports.getAllUsers = async(req, res, next) => {
	try{
		const users = await User.find();

		res.status(200).json({
			success: true,
			users
		});
	}
	catch(err){
		return next(new ErrorHandler(err.message))
	}
}


//get user detail (admin)
module.exports.getSingleUser = async(req, res, next) => {
	try{
		const user = await User.findById(req.params.id);

		if(!user){
			return next(new ErrorHandler(`User with id: ${req.params.id} do not exist`, 400))
		}

		res.status(200).json({
			success: true,
			user
		});

	}
	catch(err){
		return next(new ErrorHandler(err.message))
	}
}


//update user role (admin)
module.exports.updateUserRole = async (req, res, next) => {
	const {name, email, role} = req.body

	try{
		const newUserData = {name, email, role};

		const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
			new: true,
			runValidators: true,
			useFindAndModify: false
		})

		if(!user){
			return next(new ErrorHandler(`User with id: ${req.params.id} do not exist`, 400))
		}

		res.status(200).json({
			success: true,
			message: 'User role updated successfully',
		})
	}

	catch(err){
		return next(new ErrorHandler(err.message));
	}
}


//delete user (admin)
module.exports.deleteUser = async (req, res, next) => {
	try{
		const user = await User.findById(req.params.id);

		if(!user){
			return next(new ErrorHandler(`User with id: ${req.params.id} do not exist`, 400))
		}

		await user.remove();

		res.status(200).json({
			success: true,
			message: 'User deleted successfully',
			user
		})
	}

	catch(err){
		return next(new ErrorHandler(err.message));
	}
}


// Employees controllers

//get all employees (admin)
module.exports.getEmployees = async(req, res, next) => {
	try{
		const employees = await User.find({role: {$in : ['admin', 'employee']}});

		res.status(200).json({
			success: true,
			employees
		});
	}
	catch(err){
		return next(new ErrorHandler(err.message))
	}
}


module.exports.addEmployee = async (req, res, next) => {
	const {name, email, password, cpassword, role} = req.body;

	try{

		if(password !== cpassword){
			return next(new ErrorHandler('Password do not match.', 400));
		}

		const newEmployee = await User.create({name, email, password, cpassword, role})

		res.status(201).json({
			success: true,
			message: 'Employee added successfully!',
			newEmployee
		})
	}

	catch(err){
		return next(new ErrorHandler(err.message));
	}
}


//update employee role (admin)
module.exports.updateEmployee = async (req, res, next) => {
	const {id, name, email, role} = req.body

	try{
		const newEmployeeData = {name, email, role};

		const employee = await User.findByIdAndUpdate(id, newEmployeeData, {
			new: true,
			runValidators: true,
			useFindAndModify: false
		})

		if(!employee){
			return next(new ErrorHandler(`User with id: ${id} do not exist`, 400))
		}

		res.status(200).json({
			success: true,
			message: 'Employee data updated successfully',
		})
	}

	catch(err){
		return next(new ErrorHandler(err.message));
	}
}


//delete eployee (admin)
module.exports.deleteEmployee = async (req, res, next) => {
	try{
		const employee = await User.findById(req.params.id);

		if(!employee){
			return next(new ErrorHandler(`Employee with id: ${req.params.id} do not exist`, 400))
		}

		await employee.remove();

		res.status(200).json({
			success: true,
			message: 'Employee deleted successfully',
			employee
		})
	}

	catch(err){
		return next(new ErrorHandler(err.message));
	}
}

