const {Server} = require('socket.io');

let activeUsers = [];

const io = new Server(8800, {
  pendingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    credentials: true
  }
});

const configSocket = () => {
	io.on("connection", (socket) => {
		
		// online users
		socket.on('add-active-user', newUserId => {
			if(!activeUsers.some(user => user.userId === newUserId)){
				activeUsers.push({userId: newUserId, socketId: socket.id});
				// console.log("activeUsers", activeUsers);
				io.emit('get-active-users', activeUsers);
			}
		})

		// send message to receiver in client side 
		socket.on('send-message', ({chatId, senderId, receiverId, message}) => {
			const user = activeUsers.find(user => user.userId === receiverId);
			// console.log(user);
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