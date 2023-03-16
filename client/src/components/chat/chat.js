import {useState, useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import {io} from 'socket.io-client';

// import components
import TextMessage from './textMessage.js'
import ChatParticipant from './chatParticipant.js'

// import css
import './chat.css'

// import seo
import Seo from '../seo/seo.js'

// importing images
import profile from '../../images/profile.png'

const Chat = () => {
	const socket = useRef();
	const [getChatLoading, setGetChatLoading] = useState(true);
	const [chats, setChats] = useState([]);
	const [currentChat, setCurrentChat] = useState(null);
	const [currentMessages, setCurrentMessages] = useState([]);
	const [newMessage, setNewMessage] = useState('');
	const [onlineUsers, setOnlineUsers] = useState([]);
	const [arrivalMessage, setArrivalMessage] = useState(null);
		
	const {user} = useSelector(state => state.user);

	useEffect(() => {
		socket.current = io('https://mern-watch-shop-server.onrender.com');
		socket.current.on('get-message', data => {
			setArrivalMessage({
				chat: data.chatId,
				sender: data.senderId,
				message: data.message
			});
		})
	}, []);

	useEffect(() => {
		arrivalMessage && 
		currentChat?.participants.includes(arrivalMessage.senderId) &&
		setCurrentMessages(prev => [...prev, arrivalMessage])
	}, [arrivalMessage, currentChat?.participants])


	useEffect(() => {
		socket.current.emit('add-active-user', user?._id);
		socket.current.on('get-active-users', (activeUsers) => {
			setOnlineUsers(activeUsers);
		})
	}, [user])


	// get chats
	useEffect(() => {
		const getChats = async () => {
			try{
			    const res = await fetch(`https://mern-watch-shop-client.onrender.com/api/v1/chat/${user._id}`);
			    const data = await res.json();
			    setChats(data.chats);
			}catch(err){
				return toast.error(err.message);
			}
		}

		getChats();
	}, [user._id]);


	// get messsges
	useEffect(() => {
		const getChatMessages = async () => {
			try{
				if(currentChat === null) return;

				const res = await fetch(`https://mern-watch-shop-client.onrender.com/api/v1/messages/${currentChat?._id}`);
				const data = await res.json();
				setCurrentMessages(data.chatMessages);
				setGetChatLoading(false);
			}catch(err){
				return toast.error(err.message);
			}
		};

		getChatMessages();
	}, [currentChat, currentMessages]);


	const handleSendMessage = async (e) => {
		e.preventDefault();

		const message = {
			chatId: currentChat._id,
			sender: user._id,
			message: newMessage 
		}

		// send message to socket io
		const receiverId = currentChat.participants.find(id => id !== user._id);
		socket.current.emit('send-message', {
			chatId: currentChat._id,
			senderId: user._id, 
			receiverId, 
			message: newMessage
		});

		try{
			const res = await fetch('https://mern-watch-shop-client.onrender.com/api/v1/message/new', {
				method: 'POST',
				body: JSON.stringify(message),
				headers:{
					'Content-Type': 'application/json'
				}
			})

			const data = await res.json();
			setCurrentMessages([...currentMessages, data.message])
			setNewMessage('');

			// scroll to the last
			const chatFeed = document.getElementById('chat-feed');
			if (chatFeed) {
				chatFeed.scrollTop = chatFeed.scrollHeight;
			}
		}catch(err){
			toast.warn(err.message);
		}
	}

	return (
		<>
			<Seo title='Chat' descripion='Page for live chat.' />

			<section className='chat-section'>
				<div className='chat-container'>
					<div className='chat-participants'>
						<div className='participants-heading'>Chats</div>
						<div className='participants'> 
							{chats && chats.map((chat, index) => {
								return (
									<div onClick={() => setCurrentChat(chat)} key={index}>
										<ChatParticipant chat={chat} onlineUsers={onlineUsers} />
									</div>
								)
							})}
						</div>
					</div>
					
					<div className='chat-box'>
						<div className='chat-heading'>
							<div className='chat-intro'>
								<img src={profile} alt='profile-pic' />
								<span>{user?.name}</span>
							</div>

							<div className='chat-options'>
								<i className='fa fa-phone' onClick={() => toast.warn("This service is currently unavailable!")}></i>
								<i className='fa fa-video' onClick={() => toast.warn("This service is currently unavailable!")}></i>
								<i className='fa fa-bars' onClick={() => toast.warn("This service is currently unavailable!")}></i>
							</div>
						</div>

						<div className='chat-feed' id='chat-feed'>
							{(currentChat === null) && <div className='no-chat'>Please click on one of the chats to send message.</div>}
							{(currentChat !== null && !currentMessages.length && !getChatLoading) && <div className='no-message'>No messages yet. Please start typing your message...</div>}
							
							{
								currentMessages.map((msg, index) => {
									return <TextMessage key={index} msg={msg} />
								})
							}
						</div>

						<div className='chat-input'>
							<div className='input-text'>
								<input 
									type='text' 
									placeholder='Message...' 
									value={newMessage}
									onChange={(e) => setNewMessage(e.target.value)} 
								/>
							</div>

							<div className='input-audio' onClick={() => toast.warn("This service is currently unavailable!")}>
								<i className="fa fa-microphone"></i>
							</div>
							
							<div className='input-image'>
								<label htmlFor='image-message'>
									<i className="fa fa-image"></i>
								</label>
								<input id='image-message' type='file' accept='image/*' style={{display: 'none'}} />
							</div>

							<button className='send-btn' disabled={!currentChat || !newMessage} onClick={handleSendMessage}>Send</button>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default Chat;