const Wishlist = require('../models/wishlistModel.js')
const Product = require('../models/productModel.js')
const User = require('../models/userModel.js')
const ErrorHandler = require('../utils/errorHandler.js');

module.exports.getWishlist = async (req, res, next) => {
	try{
		const wishlist = await Wishlist.find({wishlistOf: req.user._id});

		if(!wishlist){
			return next(ErrorHandler('No product in wishlist.', 404))
		}

		res.status(200).json({
			success:true,
			wishlist
		})
	}catch(err){
		return next(new ErrorHandler(err.message, err.code));
	}
}

//add wish
module.exports.addToWishlist = async (req, res, next) => {
	try{
		const {productId, productName, productPrice, productImage} = req.body;

		const newWishlistProduct = await Wishlist.create({
			wishlistOf: req.user._id, 
			productId,
			productName,
			productPrice,
			productImage
		});

		res.status(201).json({
			success: true,
			message: 'Product added to wishlist.'
		});
	}catch(err){
		return next(new ErrorHandler(err.message, err.code));
	}
}

// delete wish
module.exports.deleteFromWishlist = async (req, res, next) => {
	try{
		console.log('hello')
		const item = await Wishlist.findOne({_id: req.body.id});

		if(!item){
			return next(new ErrorHandler('Item not found in wishlist!', 404));
		}

		await item.remove();

		res.status(200).json({
			success: true,
			message: 'Item deleted successfully from wishlist!',
			item
		});

	}catch(err){
		return next(new ErrorHandler(err.message, err.code))
	}

}