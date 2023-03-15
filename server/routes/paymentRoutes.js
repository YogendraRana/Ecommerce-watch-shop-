const {Router} = require('express');
const {isAuthenticated} = require('../middleware/authMiddleware.js');
const {processPayment, sendStripePublishableKey} = require('../controllers/paymentControllers.js');

const router = Router();

router.get('/payment/stripepublishablekey', sendStripePublishableKey);
router.post('/payment/process', isAuthenticated, processPayment);

module.exports = router;