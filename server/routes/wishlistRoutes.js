const router = require('express').Router();
const {isAuthenticated} = require('../middleware/authMiddleware.js');
const {getWishlist, addToWishlist, deleteFromWishlist} = require('../controllers/wishlistControllers.js');


//wishlist routes
router.get('/wishlist', isAuthenticated, getWishlist);
router.post('/wishlist', isAuthenticated, addToWishlist);
router.delete('/wishlist', isAuthenticated, deleteFromWishlist);

//export
module.exports = router;