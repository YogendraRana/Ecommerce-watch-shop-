import React from 'react'
import {useSelector} from 'react-redux';

// import css
import './textMessage.css'

import profile from '../../images/profile.png'

const TextMessage = ({msg}) => {
	const {user} = useSelector(state => state.user);

	return (
		<div className={msg.sender === user._id ? "text-message outgoing" : "text-message incoming"}>
			<div className='text-message-picture'>
				<img src={profile} alt='profile-pic' />
			</div>

			<div className='text-message-content'>
				<p>{msg.message}</p>
				<p>2 hours ago</p>
			</div>
		</div>
	)
}

export default TextMessage;