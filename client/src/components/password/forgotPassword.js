import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-toastify'

// import seo
import Seo from '../seo/seo.js'

//importing css
import './forgotPassword.css'

// import actions
import {forgotPassword, clearError, clearMessage} from '../../store/slices/forgotPasswordSlice.js'

const ForgotPassword = () => {
	const dispatch = useDispatch();
	const { error, message, loading } = useSelector((state) => state.forgotPassword);

	const [email, setEmail] = useState('');

	const handlePasswordSubmit = async (e) => {
		e.preventDefault();
		dispatch(forgotPassword(email));
	}

	useEffect(() => {
	    if (error) {
	      	toast.error(error);
	      	dispatch(clearError());
	    }

	    if (message) {
	     	toast.warn(message);
	     	dispatch(clearMessage());
	    }
	}, [dispatch, error, message]);


	return(	
		<>
			<Seo title='Forgot Password' descripion='Page for getting reset password link password.' />	

			<section className="forgot-password-section">
	  			<form className="forgot-password-form">
			    	<div>
			    		<h2>Forgot Password ?</h2>
			      	</div>

			      	<div>
			        	<input type='text' name="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email..." autoComplete="off" required/>
			      	</div>

					<div>
						<button type="submit" onClick={handlePasswordSubmit}>{loading ? "Loading..." : "Send Email"}</button>
					</div>

					<div className="account-link">
				    	<p>Want to return to home? Click here!</p>
				   		<Link to="/">Home</Link>	    
				   	</div>
				</form>
			</section>
		</>
	)
}

export default ForgotPassword;