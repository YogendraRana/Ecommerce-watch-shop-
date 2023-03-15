import React from 'react'

// import css
import './message.css'

const Message = ({message, style}) => {
	return(
		<div className='message' style={style}>
			<p>{message}</p>
		</div>
	)
}

export default Message;