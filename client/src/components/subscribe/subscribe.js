import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-toastify'

//import style
import './subscribe.css'

// import actions
import {registerSubscriber, clearError, resetAdded} from '../../store/slices/subscribeSlice.js'

const Subscribe = () => {
	const [email, setEmail] = useState('');

	const dispatch = useDispatch();

	const {loading, error, isAdded} = useSelector(state => state.subscribe)

	const handleEmailSubmit = (e) => {
		e.preventDefault();
		if(email==='') return toast.warn('Fill up the email field first!');
		dispatch(registerSubscriber(email));
	}

	useEffect(() => {
		if(error){
			toast.error(error)
			dispatch(clearError());
		}

		if(isAdded){
			toast.success('Subscribed successfully!')
			dispatch(resetAdded());
		}
	}, [dispatch, error, isAdded])


	return(
		<div className="subscribe-container">
			<h3>Subscribe</h3>
			<p>Get updates about new products and discount informations by registering your email.</p>

			<form onSubmit={handleEmailSubmit} className="subscribe-form">
				<input 
				type="email" 
				placeholder="Enter your email address here..." 
				value={email}
				onChange={(e) => setEmail(e.target.value)} 
				required />
				<button type="submit" className="subscribe-btn">{loading ? 'Subscribing...' : 'Subscribe'}</button>
			</form>
		</div>
	)
}

export default Subscribe