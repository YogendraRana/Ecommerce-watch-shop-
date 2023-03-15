const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please, enter your name"]
	},
	email: {
		type: String,
		required: [true, "Please, enter your email"],
		unique: true,
		lowercase: true,
		validate: [isEmail, "Please, enter a valid email"]
	},
	password: {
		type: String,
		required: [true, "Please, enter the password"],
		minlength: [6, "Minimum password length is 6"],
		select: false
	},
	cpassword: {
		type: String,
		required: [true, "Please, enter the password again"],
		select: false
	},
	avatar: {
		public_id: {
			type: String
		},
		url: {
			type: String
		}
	},
	role: {
		type: String,
		default: 'user'
	},
	joinedAt: {
		type: Date,
		default: Date.now
	},
	resetPasswordToken: String,
	resetPasswordExpire: Date,
});


//mongoose hook to hash password before saving document to db
userSchema.pre('save', async function(next){
	if(!this.isModified('password')){
		next();
	}

	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	this.cpassword = await bcrypt.hash(this.cpassword, salt);
	next();
});


//Function to generate JWT token
userSchema.methods.createToken = function (){
	return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY, {expiresIn: 24*60*60});
}

//compare password
userSchema.methods.comparePassword = async function(password){
	return await bcrypt.compare(password, this.password);
}

//generating password reset token using node js crypto module
userSchema.methods.getResetPasswordToken = async function (){
	const randomBytes = crypto.randomBytes(20).toString('hex');

	this.resetPasswordToken = crypto.createHash('sha256').update(randomBytes).digest('hex');
	this.resetPasswordExpire = Date.now() + 10*10*60*1000;

	return randomBytes;
}

//exporting the user model
module.exports = mongoose.model('User', userSchema);