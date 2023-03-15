const mongoose = require('mongoose')

const wishlistSchema = new mongoose.Schema({
	wishlistOf: {
		type: mongoose.Schema.ObjectId,
		ref: "User",
		required: true
	},

	productId: {
		type: mongoose.Schema.ObjectId,
		ref: "Product",
		required: true
	},

	productName: {
		type: String,
		required: true
	},

	productPrice: {
		type: String,
		required: true
	},

	productImage: {
		type: String,
		required: true
	},

	createdAt: {
		type: Date,
		default: Date.now
	}
})

// exporting model
module.exports = mongoose.model('Wishlist', wishlistSchema);
