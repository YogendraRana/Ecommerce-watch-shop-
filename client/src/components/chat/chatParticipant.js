import {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {toast} from 'react-toastify'

//import css
import './chatParticipant.css' 

import profile from '../../images/profile.png'

const ChatParticipant = ({chat, onlineUsers}) => {
	const [otherUser, setOtherUser] = useState({});
	const [loading, setLoading] = useState(true);
	const [online, setOnline] = useState(false);

	const {user} = useSelector(state => state.user);

	const otherParticipantId = chat.participants.find(id => id !== user._id);

	useEffect(() => {
		const getUser = async () => {
			try{
				const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/${otherParticipantId}`);
				const data = await res.json();
				setOtherUser(data.user);
				setLoading(false);	
			}catch(err){
				toast.error(err.message);
			}
		}

		getUser();

	}, [chat, user, otherParticipantId])


	useEffect(() => {
		const onlineParticiant = onlineUsers.find(user => user.userId === otherParticipantId);

		if(onlineParticiant) {
			setOnline(true);
		}else{
			setOnline(false);
		}
	},  [onlineUsers, otherParticipantId])

	return (
		<div className='participant'>
			<img src={profile} alt='profile-pic' />
			<div>
				<p className='participant-name'>{loading ? 'Loading...' : (otherUser.role === "admin") ? "Admin" : otherUser.name}</p>
				<p className='chat-state' style={{color: online ? "green" : "red"}}>{online ? "Online" : "Offline"}</p>
			</div>
		</div>
	)
}

export default ChatParticipant;