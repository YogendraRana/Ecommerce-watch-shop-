const router = require('express').Router();
const {isAuthenticated, isAdmin} = require('../middleware/authMiddleware.js');
const {
	getAllProducts, 
	getRecommendations,
	addProduct, 
	updateProduct, 
	deleteProduct, 
	getProductDetail,
	createProductReview,
	getProductReviews,
	deleteReview,
	getAdminProducts
} = require('../controllers/productControllers.js');

//product routes
router.get('/api/v1/products', getAllProducts);
router.get('/api/v1/products/recommendation', getRecommendations);
router.get('/api/v1/product/:id', getProductDetail);
router.put('/api/v1/review', isAuthenticated, createProductReview);
router.route('/api/v1/reviews').get(getProductReviews).delete(isAuthenticated, deleteReview);

// admin routes
router.get('/api/v1/admin/products', isAuthenticated, isAdmin('admin'), getAdminProducts);
router.post('/api/v1/admin/product/new', isAuthenticated, isAdmin('admin'), addProduct);
router.put('/api/v1/admin/product/:id', isAuthenticated, isAdmin('admin'), updateProduct);
router.delete('/api/v1/admin/product/:id', isAuthenticated, isAdmin('admin'), deleteProduct);

//export
module.exports = router