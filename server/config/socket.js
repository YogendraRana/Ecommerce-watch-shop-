const {Server} = require('socket.io');

let activeUsers = [];

const configSocket = () => {
	// server configuration
	const io = new Server(8800, {cors: {origin: process.env.CLIENT_URL, credentials: true}});

	io.on("connection", (socket) => {
		
		// online users
		socket.on('add-active-user', newUserId => {
			if(!activeUsers.some(user => user.userId === newUserId)){
				activeUsers.push({userId: newUserId, socketId: socket.id});
				io.emit('get-active-users', activeUsers);
			}
		})

		// send message to receiver in client side 
		socket.on('send-message', ({chatId, senderId, receiverId, message}) => {
			const user = activeUsers.find(user => user.userId === receiverId);
			if(user){
				io.to(user.socketId).emit('get-message', {chatId, senderId, message});
			}
		})

		socket.on('disconnect', () => {
			activeUsers = activeUsers.filter(user => user.socketId !== socket.id);
			io.emit('get-active-users', activeUsers);
		})
	});
}

module.exports = configSocket;