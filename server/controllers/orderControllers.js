const Order = require('../models/orderModel.js');
const User = require('../models/userModel.js')
const Product = require('../models/productModel.js')
const ErrorHandler = require('../utils/errorHandler.js');


//create nre order
module.exports.newOrder = async(req, res, next) => {
	const {shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice} = req.body;

	try{
		const order = await Order.create({
			shippingInfo, 
			orderItems, 
			paymentInfo, 
			itemsPrice, 
			taxPrice, 
			shippingPrice, 
			totalPrice,
			paidAt: Date.now(),
			orderedBy: req.user._id
		})


		res.status(201).json({
			success: true,
			message: "Order placed successfully",
			order
		})

	}

	catch(err){
		return next(new ErrorHandler(err.message));
	}
}

//get single order detail
module.exports.getSingleOrder = async(req, res, next) => {
	try{
		const order = await Order.findById(req.params.id).populate('orderedBy', 'name email');

		if(!order){
			return next(new ErrorHandler("Order does not exist", 404))
		}

		res.status(200).json({
			success: true,
			order
		})
	}

	catch(err){
		return next(new ErrorHandler(err.message))
	}
}

//get orders made by ownself
module.exports.myOrders = async(req, res, next) => {
	try{
		const orders = await Order.find({orderedBy: req.user._id})

		res.status(200).json({
			success: true,
			orders
		})
	}

	catch(err){
		return next(new ErrorHandler(err.message))
	}
}

//get all orders (admin)
module.exports.getAllOrders = async(req, res, next) => {
	try{
		const orders = await Order.find();

		//finding gross revenue
		let totalSales = 0;
		orders.forEach(order => {
			totalSales = totalSales + order.totalPrice;
		})


		res.status(200).json({
			success: true,
			totalSales,
			orders
		})
	}

	catch(err){
		return next(new ErrorHandler(err.message))
	}
}

//update stock function
async function updateStock(id, quantity){
	const product = await Product.findById(id);
	product.stock = product.stock - quantity;
	await product.save({validateBeforeSave: false});
} 

//update order (admin)
module.exports.updateOrder = async(req, res, next) => {
	const {status} = req.body

	try{
		const order = await Order.findById(req.params.id);

		if(!order){
			return next(new ErrorHandler("Order does not exist", 404))
		}

		if(order.orderStatus === "delivered"){
			return next(new ErrorHandler('The order has already been delivered', 400))
		}

		if (status === "shipped") {
			order.orderItems.forEach(async (odr) => {
				await updateStock(odr.id, odr.quantity);
			});
		}

		order.orderStatus = status;

		if(status === 'delivered'){
			order.deliveredAt = Date.now();
		}

		await order.save({validateBeforeSave: false})

		res.status(200).json({
			success: true,
			message: 'Order updated successfully'
		})
	}

	catch(err){
		return next(new ErrorHandler(err.message))
	}
}


//delete order
module.exports.deleteOrder = async(req, res, next) => {
	try{
		const order = await Order.findById(req.params.id)

		if(!order){
			return next(new ErrorHandler("Order does not exist", 404))
		}

		await order.remove()
		
		res.status(200).json({
			success: true,
			message: 'Order deleted successfully',
			order
		})
	}

	catch(err){
		return next(new ErrorHandler(err.message))
	}
}