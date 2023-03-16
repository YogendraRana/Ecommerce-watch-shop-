const router = require('express').Router();
const {registerSubscriber} = require('../controllers/subscriberControllers.js');

//wishlist routes
router.post('/subscribe', registerSubscriber);

//export
module.exports = router;