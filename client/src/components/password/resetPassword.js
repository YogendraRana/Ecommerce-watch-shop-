import React, {useState, useEffect} from 'react'
import {Link, useHistory, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-toastify'

// import seo
import Seo from '../seo/seo.js'

//importing css
import './resetPassword.css'

// import action
import {resetPassword, clearError, clearMessage} from '../../store/slices/forgotPasswordSlice.js'

const ResetPassword = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const {token} = useParams();
	const { error, message, loading } = useSelector((state) => state.forgotPassword);

	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [showPassword, setShowpassword] = useState(false);

	const handlePasswordReset = async (e) => {
		e.preventDefault();
		dispatch(resetPassword({password, confirmPassword, token}));
	}

	useEffect(() => {
	    if (error) {
	      	toast.error(error);
	      	dispatch(clearError());
	    }

	    if (message) {
	     	toast.success(message);
	     	dispatch(clearMessage());
	     	history.push('/login');
	    }
	}, [dispatch, error, message, history]);


	return(	
		<>
			<Seo title='Reset Password' descripion='Page for resetting password.' />	
			
			<div className="reset-password-container">	
	  			<form className="reset-password-form">
			    	<div>
			    		<h2>Reset Password</h2>
			    		<i className= {!showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'} onClick={() => setShowpassword(!showPassword)}></i>
			      	</div>

			      	<div>
			        	<input type={showPassword ? "text" : "password"} name="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" autoComplete="off" required/>
			      	</div>

			      	
			      	<div>
			        	<input type={showPassword ? "text" : "password"} name="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm Password" autoComplete="off" required/>
			      	</div>

					<div>
						<button type="submit" onClick={handlePasswordReset}>{loading ? "Loading..." : "Submit"}</button>
					</div>

					<div className="home-link">
				    	<p>Want to return to home? Click here!</p>
				   		<Link to="/">Home</Link>	    
				   	</div>
				</form>
			</div>
		</>
	)
}

export default ResetPassword;