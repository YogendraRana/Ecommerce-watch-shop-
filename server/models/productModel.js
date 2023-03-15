const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please, enter the name"]
	},
	price: {
		type: Number,
		required: [true, "Please, enter the price"]
	},
	description: {
		type: String,
		required: [true, "Please, enter the description"]
	},
	category: {
		type: String,
		required: [true, "Please, enter the product category"]
	},
	images: [
		{
			public_id: {
				type: String,
				required: true
			},
			url: {
				type: String,
				required: true
			}
		}
	],
	stock: {
		type: Number,
		required: [true, "Please enter the product stock"],
		default: 1
	},
	createdBy: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	reviews: [
		{
			reviewerId: {
				type: mongoose.Schema.ObjectId,
				ref: 'User',
				required: true
			},
			name: {
				type: String,
				required: true
			},
			rating: {
				type: Number,
				required: true
			},
			comment: {
				type: String
			}
		}
	],
	numOfReviews: {
		type: Number,
		default: 0
	},
	avgRating: {
		type: Number, 
		default: 0		
	},
	discount: {
		type: Number,
		default: null
	}
})

module.exports = mongoose.model('Product', productSchema);