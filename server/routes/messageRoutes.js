const router = require('express').Router();
const {isAuthenticated} = require('../middleware/authMiddleware.js');
const {getChatMessages, newMessage} = require('../controllers/messageControllers.js');

// chat routes
router.get('/messages/:chatId', getChatMessages);
router.post('/message/new', newMessage);


//export
module.exports = router;