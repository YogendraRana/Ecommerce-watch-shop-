const router = require('express').Router();
const {isAuthenticated} = require('../middleware/authMiddleware.js');
const {getAdmin, getChats, newChat} = require('../controllers/chatControllers.js');

// chat routes
router.get('/chat/:userId', getChats);
router.post('/chat/new', newChat);


//export
module.exports = router;