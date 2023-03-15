const router = require('express').Router();
const {isAuthenticated} = require('../middleware/authMiddleware.js');
const {getWishlist, addToWishlist, deleteFromWishlist} = require('../controllers/wishlistControllers.js');


//wishlist routes
router.get('/api/v1/wishlist', isAuthenticated, getWishlist);
router.post('/api/v1/wishlist', isAuthenticated, addToWishlist);
router.delete('/api/v1/wishlist', isAuthenticated, deleteFromWishlist);

//export
module.exports = router;