import React, {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-toastify'

// import seo
import Seo from '../seo/seo.js'

//importing css
import './login.css'

// import actions
import {loginUser, clearError} from '../../store/slices/userSlice.js'

const Login = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const {loading, isAuthenticated, error} = useSelector(state => state.user)

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const redirect = history.location.search ? history.location.search.split('=')[1] : '/';

	const handleLogin = async (e) => {
		e.preventDefault();
		dispatch(loginUser({email, password}));
	}

	useEffect(() => {
		if(error){
			toast.error(error);
			dispatch(clearError());
		}

		if(isAuthenticated){
			toast.success('Logged in successfully!')
			history.push(redirect);
		}
	}, [dispatch, error, history, isAuthenticated, redirect]);


	return(	
		<>
			<Seo title='Login Page' descripion='Page for logging in already registered users.' />
			
			<section className="login-section">	
	  			<form className="login-form">
			    	<div>
			    		<h2>Log In</h2>
			      	</div>

			      	<div>
			        	<input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" autoComplete="off" required/>
			      	</div>

			      	<div>
			        	<input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" autoComplete="off" required/>
			      	</div>

			      	<div className="remember-me">
			        	<input type="checkbox" />
			        	<span>Remember me?</span>
					</div>	

					<div>
						<button type="submit" onClick={handleLogin}>{loading ? "Loading..." : "Log In"}</button>
					</div>

					<div className="forgot-password">
						<Link to='/password/forgot'>Forgot Password?</Link>
		            </div>

				    <div className="register-link">
				    	<p>New here? Register and discover great amount of new opportunities!</p>
				   		<Link to="/register">Register</Link>	    
				   	</div>
				</form>
			</section>
		</>
	)
}

export default Login