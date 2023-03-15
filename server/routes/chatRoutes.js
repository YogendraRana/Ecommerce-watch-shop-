const router = require('express').Router();
const {isAuthenticated} = require('../middleware/authMiddleware.js');
const {getAdmin, getChats, newChat} = require('../controllers/chatControllers.js');

// chat routes
router.get('/api/v1/chat/:userId', getChats);
router.post('/api/v1/chat/new', newChat);


//export
module.exports = router;