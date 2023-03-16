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

router.post('/order/new', isAuthenticated, newOrder);
router.get('/order/:id', isAuthenticated, getSingleOrder);
router.get('/orders/me', isAuthenticated, myOrders);

//admin routes
router.get('/admin/orders', isAuthenticated, isAdmin('admin'), getAllOrders);
router.put('/admin/order/:id', isAuthenticated, isAdmin('admin'), updateOrder);
router.delete('/admin/order/:id', isAuthenticated, isAdmin('admin'), deleteOrder);

//export routes
module.exports = router