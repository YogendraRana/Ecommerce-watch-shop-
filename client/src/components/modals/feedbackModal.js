import React, {useState} from 'react';
import {useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'
import {toast} from 'react-toastify'

// import seo
import Seo from '../seo/seo.js'

//import css
import './feedbackModal.css'

// import actions
import {newReview} from '../../store/slices/reviewSlice.js'

const FeedbackModal = ({toggleFeedbackModal}) => {
	const [rating, setRating] = useState(null);
	const [comment, setComment] = useState('');
	const dispatch = useDispatch();
	const { id } = useParams();

	const handleRating = (value) => {
		setRating(value);
	}

	const handleFeedbackSubmit = () => {
		if(rating === null && comment === ''){
			toast.warn('Please, provide both the rating and comment...');
			return;
		}

		dispatch(newReview({rating, comment, id}));
		toggleFeedbackModal();
	}

	return (
		<div className = 'feedback-modal'>
			<Seo title='Feedback Page' descripion='Page for providing feedback and rating.' />
			<div className = 'feedback-content'>
				<h1>Feedback</h1>
				<div className="rating">
					{
						[1, 2, 3, 4, 5].map((val, index) => {
							return(
								<i key={index} className={val <= rating ? "fas fa-star" : "far fa-star"} onClick={() => handleRating(val)} aria-hidden='true' />
							)		
						})
					}
				</div>

				<textarea 
				className="comment" 
				placeholder="Please, comment your thought about this product..." 
				value={comment} 
				onChange={e => setComment(e.target.value)}></textarea>

				<div className="feedback-btns">
					<button onClick={handleFeedbackSubmit}>Submit</button>
					<button onClick={toggleFeedbackModal}>Cancel</button>
				</div>
			</div>
		</div>
	);
}

export default FeedbackModal;