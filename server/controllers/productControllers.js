const Product = require('../models/productModel.js')
const ErrorHandler = require('../utils/errorHandler.js')
const ApiFeatures = require('../utils/apiFeatures.js')
const cloudinary = require('cloudinary')

//get all products
module.exports.getAllProducts = async (req, res, next) => {
	const resultPerPage = 12;
	const productsCount = await Product.countDocuments();

	try{
		//for finding filtered products length
		const apiFeature = new ApiFeatures(Product.find(), req.query).searchByName();
		let filteredProducts = await apiFeature.mongoQuery;
		let filteredProductsCount = filteredProducts.length;

		//for fetching products
		const feature = new ApiFeatures(Product.find(), req.query).searchByName().filterByCategory().pagination(resultPerPage);
		const products = await feature.mongoQuery;

		res.status(201).json({
			success: true,
			message: 'Products fetched successfully!',
			products,
			productsCount,
			resultPerPage,
			filteredProductsCount
		})
	}

	catch(err){
		return next(new ErrorHandler(err.message));
	}
}

// recommendated products
module.exports.getRecommendations = async (req, res, next) => {
	try{
		const products = await Product.find();
		const newArrivals = [...products].sort((a, b) => a.createdAt > b.createdAt ? -1 : a.createdAt > b.createdAt ? 1 : 0);
		const highestRated = [...products].sort((a, b) => a.avgRating > b.avgRating ? -1 : a.avgRating > b.avgRating ? 1 : 0);
		const specialOffers = [...products].sort((a, b) => a.discount > b.discount ? -1 : a.discount > b.discount ? 1 : 0);

		res.status(201).json({
			success: true,
			newArrivals,
			highestRated,
			specialOffers,
			message: 'Products fetched successfully'
		})
	}catch(err){
		return next(new ErrorHandler(err.message));

	}
}


//get all products --- admin
module.exports.getAdminProducts = async (req, res, next) => {
	try{
		//for fetching products
		const products = await Product.find();

		res.status(201).json({
			success: true,
			message: 'Products fetched successfully!',
			products
		})
	}

	catch(err){
		return next(new ErrorHandler(err.message));
	}
}

//create new product --- admin 
module.exports.addProduct = async (req, res, next) => { 
	try{ 
		req.body.createdBy = req.user.id;

		let productImages = []; 
		let productImagesLinks = []; 

		if (typeof req.body.images === "string") { 
			productImages.push(req.body.images); 
		} else { 
			productImages = req.body.images; 
		} 

		for (let i = 0; i < productImages.length; i++) { 
			const result = await cloudinary.v2.uploader.upload(productImages[i], {folder: "Products"}); 
			productImagesLinks.push({public_id: result.public_id, url: result.secure_url}); 
		} 

		req.body.images = productImagesLinks; 

		const product = await Product.create(req.body); 

		res.status(201).json({ 
			success: true, 
			message: 'New product created successfully!', 
			product: product 
		}); 

	} catch(err){ 
		return next(new ErrorHandler(err.message)) 
	} 
}


//update product --- admin
module.exports.updateProduct = async (req, res, next) => {
	try{
		req.body.createdBy = req.user.id;

		let images = [];
		let updatedImaggesLinks = [];
		let product = await Product.findById(req.params.id);

		if(!product){
			return next(new ErrorHandler('Product not found!', 404))
		}	

		if (typeof req.body.images === "string") {
			images.push(req.body.images);
		} else {
			images = req.body.images;
		}

		if(images.length === 0 || req.body.images.length === 0){
			req.body.images = product.images;
		}else {
			for (let i = 0; i < product.images.length; i++) {
			  await cloudinary.v2.uploader.destroy(product.images[i].public_id);
			}

			for (let i = 0; i < images.length; i++) {
				const result = await cloudinary.v2.uploader.upload(images[i], {folder: "Products"});
				updatedImaggesLinks.push({public_id: result.public_id, url: result.secure_url});
			}

			req.body.images = updatedImaggesLinks;
		}
		

		product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true, useFindAndModify: false});

		res.status(200).json({
			success: true,
			product,
		});
	}catch(err){
		return next(new ErrorHandler(err.message));
	}
	
}



//delete product --- admin
module.exports.deleteProduct = async (req, res, next) => {
	try{
		const product = await Product.findById(req.params.id);

		if(!product){
			return next(new ErrorHandler('Product not found!', 404))
		}

		for (let i = 0; i < product.images.length; i++) {
			await cloudinary.v2.uploader.destroy(product.images[i].public_id);
		}

		await product.remove();

		res.status(200).json({
			success: true,
			message: 'Product deleted successfully!',
			product
		});
	}catch(err){
		return next(new ErrorHandler(err.message));
	}
}



//get single product
module.exports.getProductDetail = async (req, res, next) => {
	try{
		const product = await Product.findById(req.params.id);

		if(!product){
			return next(new ErrorHandler('Product not found!', 404))
		}

		res.status(200).json({
			success: true,
			product	
		})
	}catch(err){
		return next(new ErrorHandler(err.message));
	}
}


//create new review or update the review
module.exports.createProductReview = async (req, res, next) => {
	const {productId, rating, comment} = req.body

	try{
		
		const product = await Product.findById(productId);

		if(!product){
			return next(new ErrorHandler('Product not found!', 404))
		}

		const isReviewed = await product.reviews.find(rev => rev.reviewerId.toString() === req.user._id.toString())

		if(isReviewed){
			product.reviews.forEach(rev => {
				if(rev.reviewerId.toString() === req.user._id.toString()){
					rev.rating = rating;
					rev.comment = comment;
				}
			})
		}
		else{
			await product.reviews.push({
				reviewerId: req.user._id,
				name: req.user.name,
				rating: Number(rating),
				comment
			});

			product.numOfReviews = product.reviews.length;
		}

		//averag rating
		let totalRating = 0;

		product.reviews.forEach(rev => {
			totalRating = totalRating + rev.rating ;
		})

		product.avgRating = totalRating/product.reviews.length;

		//saving 
		await product.save({validateBeforeSave: false});

		res.status(200).json({
			success: true,
			message: "Product reviewed successfully"
		})

	}

	catch(err){
		return next(new ErrorHandler(err.message));
	}
}


//get all reviews
module.exports.getProductReviews = async (req, res, next)=> {
	try{
		const product = await Product.findById(req.query.product_id);

		if(!product){
			return next(new ErrorHandler('Product not found!', 404))
		}

		res.status(200).json({
			success: true,
			reviews: product.reviews
		})
	}

	catch(err){
		return next(new ErrorHandler(err.message));
	}
}

//delete review
module.exports.deleteReview = async (req, res, next)=> {
	try{
		const product = await Product.findById(req.query.product_id);

		if(!product){
			return next(new ErrorHandler('Product not found!', 404))
		}

		const reviews = product.reviews.filter(rev => rev._id.toString() !== req.query.id.toString())

		//averag rating
		let totalRating = 0;

		reviews.forEach(rev => {
			totalRating = totalRating + rev.rating ;
		})

		const avgRating =  totalRating/reviews.length;

		const numOfReviews = reviews.length;

		await Product.findByIdAndUpdate(req.query.product_id, {reviews, avgRating, numOfReviews}, {
			new: true,
			runValidators: true,
			useFindAndModify: false
		})

		res.status(200).json({
			success: true,
			reviews: "Review deleted successfully"
		})
	}

	catch(err){
		return next(new ErrorHandler(err.message));
	}
}