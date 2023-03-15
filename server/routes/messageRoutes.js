const router = require('express').Router();
const {isAuthenticated} = require('../middleware/authMiddleware.js');
const {getChatMessages, newMessage} = require('../controllers/messageControllers.js');

// chat routes
router.get('/api/v1/messages/:chatId', getChatMessages);
router.post('/api/v1/message/new', newMessage);


//export
module.exports = router;