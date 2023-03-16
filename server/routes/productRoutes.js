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
router.get('/products', getAllProducts);
router.get('/products/recommendation', getRecommendations);
router.get('/product/:id', getProductDetail);
router.put('/review', isAuthenticated, createProductReview);
router.route('/reviews').get(getProductReviews).delete(isAuthenticated, deleteReview);

// admin routes
router.get('/admin/products', isAuthenticated, isAdmin('admin'), getAdminProducts);
router.post('/admin/product/new', isAuthenticated, isAdmin('admin'), addProduct);
router.put('/admin/product/:id', isAuthenticated, isAdmin('admin'), updateProduct);
router.delete('/admin/product/:id', isAuthenticated, isAdmin('admin'), deleteProduct);

//export
module.exports = router