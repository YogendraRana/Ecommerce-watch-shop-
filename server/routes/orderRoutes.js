const {Router} = require('express');
const {isAuthenticated, isAdmin} = require('../middleware/authMiddleware.js');
const {
	newOrder, 
	getSingleOrder, 
	myOrders,
	getAllOrders,
	updateOrder,
	deleteOrder
} = require('../controllers/orderControllers.js')

const router = Router();

router.post('/api/v1/order/new', isAuthenticated, newOrder);
router.get('/api/v1/order/:id', isAuthenticated, getSingleOrder);
router.get('/api/v1/orders/me', isAuthenticated, myOrders);

//admin routes
router.get('/api/v1/admin/orders', isAuthenticated, isAdmin('admin'), getAllOrders);
router.put('/api/v1/admin/order/:id', isAuthenticated, isAdmin('admin'), updateOrder);
router.delete('/api/v1/admin/order/:id', isAuthenticated, isAdmin('admin'), deleteOrder);

//export routes
module.exports = router